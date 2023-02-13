---
group:
  title: Linux
  order: 2
---

# 防火墙配置、管理与实践

_在本文中，将展示如何为您的 CentOS 8 设置防火墙，并在`firewall-cmd`管理工具的帮助下进行管理。_

## 防火墙`firewalld`

**防火墙**是被用于从不信任的流量中保护工作站或者服务器的机制，它通过定义一组安全规则来工作，这些安全规则确定是允许还是阻止特定流量，正确配置的防火墙是整个系统安全的最重要方面之一，**CentOS 8 提供了一个动态的、可定制的、基于主机的、带有 D-Bus 接口的防火墙——`firewalld`**。在 CentOS 8 中，`nftables`取代`iptables`成为默认的 Linux 网络包过滤框架，中间采取 daemon 动态管理防火墙，管理工具是`firewalld`。也就是说，`firewalld`只是一个前端管理工具，它负责配置规则，真正起作用的是后面的过滤框架。

[![img](https://i.loli.net/2020/03/10/6Si5vcJ7Anpqwjg.png)](https://i.loli.net/2020/03/10/6Si5vcJ7Anpqwjg.png)

`firewalld`其实在 CentOS 7 中就已经存在，可能大多数人更习惯于`iptables`。`iptables`里默认是每个服务是允许，需要拒绝的才去限制。而与`iptables`相反，**`firewalld`默认是拒绝**，需要放行的服务需要去设置。`firewalld`和`iptables`还有很多区别，这里不展开说来，有兴趣的同学请戳 ☞[firewalld 官网](https://firewalld.org/)或者自行去了解。

要配置防火墙，**你必须以 root 或者具有`sudo`权限的用户的身份登录**。`firewalld`可以通过`firewall-cmd`命令行工具和图形化工具`firewll-config`等来配置和管理，本文均采用命令行的方式叙述。

首先确定`firewalld`是运行着：

```shell
$ firewall-cmd --state # firewalld的状态，启动为`running`，未启动为`not running`

# 如果发现firewall基于某些原因没有安装或者启动:
yum install firewalld firewall-config # 安装firewalld，其中firewall-config是图形界面，可以选择不安装
systemctl start  firewalld # 启动
systemctl stop firewalld  # 停止
systemctl enable firewalld # 启用自动启动
systemctl disable firewalld # 禁用自动启动
systemctl status firewalld # 或者 firewall-cmd --state 查看状态
```

接下来介绍`firewalld`的基本概念和操作。

---

## 认识`firewalld`

`firewalld`使用**区域**和**服务**的概念。基于区域和服务，能够允许或阻止进入或流出系统的网络流量。

### 区域(zone)

区域是预定义的规则集，指定您的计算机所连接的网络的信任级别。**可以将网卡接口(Interfaces)和源地址(Sources)分配到区域，这也是激活区域的方法。**

可以通过以下命令来查看所有的区域：

```Shell
$ firewall-cmd --get-zones
#或者
$ ls -l /usr/lib/firewalld/zones/
```

下面是`firewalld`提供的区域，它们根据区域的信任级别从不可信到可信排序：

| 区域         | 描述                                                                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **drop**     | 任何传入的网络连接都被丢弃，并且没有任何通知（发送方无法感知）。仅能有发送出去的网络连接。                                                                                 |
| **block**    | 任何接收的网络连接都被 IPv4 的 `icmp-host-prohibited` 信息和 IPv6 的 `icmp6-adm-prohibited` 信息所拒绝（发送方可感知），即拒绝所有网络连接，但是您可以允许选定的传入连接。 |
| **public**   | 供不受信任的公众地方使用。仅接受 ssh 或 dhcpv6-client 等服务连接（仅仅接收经过选择的连接）。**这个也是默认设置的区域**。                                                   |
| **external** | 用于在系统充当网关或路由器时并启用了 NAT 伪装的外部网络，出去的 ipv4 网络连接通过此区域伪装和转发，仅仅接收经过选择的连接。                                                |
| **internal** | 用于在系统充当网关或路由器时的内部网络。网络上的其他系统通常是受信任的。仅允许选择的传入连接。                                                                             |
| **dmz**      | 经典的非军事区(DMZ)区域，提供对 LAN 的有限访问，仅接受 ssh 服务接连（仅仅接收经过选择的连接）。                                                                            |
| **work**     | 用于工作机器。网络上的其他计算机通常是可信的。仅接受 ssh、ipp-client 或 dhcpv6-client 服务连接 （仅仅接收经过选择的连接）。                                                |
| **home**     | 用于家用机器。网络上的其他计算机通常是可信的。仅接受 ssh、mdns、ipp-client、samba-client、或 dhcpv6-client 服务连接（仅仅接收经过选择的连接）。                            |
| **trusted**  | 接受所有网络连接。信任网络中的所有计算机。                                                                                                                                 |

需要注意的是，block 会明确拒绝掉数据包，而 drop 会选择丢弃掉数据包。因此，drop 比较节省服务器资源；block 会回应，比较占用资源。区域的规则不是固定的，用户可以根据自身的需求定制。

### 服务(service)

服务只是本地端口、协议、源端口、目的地和防火墙帮助模块的列表，例如：

- Port – 443 or 25 or 110
- Service – SSH, HTTP
- Protocols – ICMP

除了以上两个基本概念还有一些其他的配置项要注意：

### 运行时和永久设置

`firewalld`使用两个独立的配置集，即运行时配置和永久配置。

运行时配置是实际运行的配置，在重新启动后不再生效。当`firewalld`守护进程启动时，它将加载永久配置，该配置将成为运行时配置。

在`firewalld-cmd`执行的命令中，如果是规则相关的，加上`--permanent`参数不会立即生效，只会被记录到配置文件。如果要生效需要调用`firewall-cmd --reload`重新加载；如果不加`--permanent`则是立即生效，但如果重新加载会被清掉。

此外，在`firewall-cmd`命令中有些命令需要必须加`--permanent`参数，比如`--set-target`。

要在两个配置集中应用更改，您可以使用以下两种方法之一:

1. 更改运行时配置并使其永久:

```Shell
$ firewall-cmd <options>
$ firewall-cmd --runtime-to-permanent # 将之前做的更改永久化
```

1. 更改永久配置并重新加载`firewalld`守护进程:

```Shell
$ firewall-cmd --permanent <options
$ firewall-cmd --reload # 永久配置重启生效
```

### 区域里包含的基本信息

当查询某区域的信息时：

```Shell
$ firewall-cmd --zone=work --list-all
```

输出信息：

[![img](https://i.loli.net/2020/03/09/zvYksrayhmc1Q56.png)](https://i.loli.net/2020/03/09/zvYksrayhmc1Q56.png)

```Shell
target:default
```

区域放行策略。它决定了与该区域匹配，但是没有由这里的设置中显式处理的数据包的动作，可结合

匹配的优先级

来理解。它有四个值：

- `ACCEPT`：通过这个包。
- `%%REJECT%%`：拒绝这个包，并返回一个拒绝的回复。
- `DROP`：丢弃这个包，不回复任何信息。
- `default`：不做任何事情。该区域不再管它，把它踢到“楼上”。

- `icmp-block-inversion` 这个是一个禁 ping 的参数，默认关闭

- `work (active)` active 表示该区域是活动的，因为，它至少有一个接口或源分配给它。再次注意，**将网卡接口和源分配到区域上将激活区域。**

- `interfaces: docker0` （网卡接口）是系统中的硬件和虚拟的网络适配器的名字，所有的活动的接口都将被分配到区域，要么是默认的区域，要么是用户指定的一个区域。但是，**一个接口不能被分配给多于一个的区域**。

- `sources:` 列出了分配到这个区域的源，可以是 ip 地址也可以是 ip 地址段。**一个源（或重叠的源）不能被分配到多个区域**。这样做的结果是产生一个未定义的行为，因为不清楚应该将哪些规则应用于该源。

- `services: dockpit dhcpv6-client ssh` 列出了允许通过这个防火墙的服务。你可以通过运行 `firewall-cmd --get-services` 得到一个防火墙预定义服务的详细列表。

- `ports:` 列出了一个允许通过这个防火墙的目标端口。它是用于你需要去允许一个没有在 `firewalld` 中定义的服务的情况下。

- `protocal`当前 Zone 开启的协议。通过 `/etc/protocols` 可以查看，常用的协议包括 `tcp`, `udp`等。

- `masquerade: no` 表示这个区域是否允许 IP 伪装。如果允许，它将允许 IP 转发，它可以让你的计算机作为一个路由器。

- `forward-ports:` 列出转发的端口。

- `icmp-blocks:` 可添加 ICMP 类型，当`icmp-block-inversion`为 no 时，这些 ICMP 类型被拒绝；当`icmp-block-inversion`为 yes 时，这些 ICMP 类型被允许。

- `rich rules:` 富规则，即更细致、更详细的防火墙规则策略，它的优先级在所有的防火墙策略中也是最高的。

### 匹配的优先级（包处理流程）

因为指定一个源不是必需的，任何包都可以通过接口匹配而归属于一个区域，而不需要通过源匹配来归属一个区域。活动区域中扮演两个不同的角色。关联接口行为的区域作为接口区域，并且，关联源行为的区域作为源区域（一个区域能够扮演两个角色）。`firewalld` 按下列顺序处理一个包：

1. 如果匹配到 source 的 Zone（可以存在零个或一个这样的区域）。如果这个包满足一个**富规则 rich rule、服务是白名单中的、target 不是 default**，那么源区域处理这个包，并且在这里结束。否则，向上传递这个包。
2. 如果匹配到 interface 的 Zone（肯定有一个这样的区域）。如果该 Zone 能处理这个包，那么到这里结束。否则，向上传递这个包。
3. 若网络接口未关联到特定的区域，则使用默认区域并执行该区域所指定的规则。

这里的关键信息是，源区域优先于接口区域。因此，一般多区域的设计模式是：先创建一个 source Zone 允许特殊 IP 地址访问系统服务，再通过 interface Zone 来对其他的访问做限制。

包处理流程的例子：

```Shell
$ firewall-cmd --zone=home --add-source=192.168.1.1/24
```

当 IP 为 `192.168.1.2` 的数据包访问 `http` 服务时，将会首先匹配到 home Zone，`firewall-cmd --zone=home --list-all` 查看发现 `http` 服务没有开启，target 为 default，所以会被丢到上一层；这里假设 `192.168.1.1` 属于 `enp0s8` 网卡，那么将会匹配到 drop Zone，target 为 DROP，所以会将包直接丢弃。

## 在`firewalld`上的操作

---

### 默认的 zone

所谓默认的 zone，就是在你没有使用`--zone`参数指定 zone 时，所有操作默认使用的 zone，**同时也在包处理流程中的默认 zone**。

获取默认的 zone:

```Shell
$ firewall-cmd --get-default-zone # 如果没做过配置，默认的应该为public
$ firewall-cmd --get-active-zones # 查看活动中的zone
```

当向`NetworkManager`添加新接口连接(例如 eth0 或 ens3)时，它们被附加到默认的 zone。查看网卡接口：

```Shell
$ ip link show
# 或者
$ nmcli device status
```

改变默认的 zone:

```Shell
$ firewall-cmd --set-default-zone=[zone]
```

### 常用命令

#### 查看具体 zone 的信息

```Shell
$ firewall-cmd --zone=[zone] --list-all # 下面是命令输出，对于每一项都可以单独设置
```

**活动中的 zone**

```Shell
$ firewall-cmd --get-active-zones # 这个命令会返回所有绑定了source、interface以及默认的zone，并会说明在什么情况下使用。
```

**查看所有 zone 的信息**

```Shell
$ firewall-cmd --list-all-zones # 查看所有zone的详细信息，这是个很长的列表
$ firewall-cmd --get-zones # 查看可用的zone
```

#### 设置 zone 上的规则

##### 目标设置(target)

```Shell
$ firewall-cmd --permanent --get-target # 这里的 --permanent 不能省略
$ firewall-cmd --permanent --set-target=[target] # 值有default,ACCEPT,REJECT和DROP，这里的 --permanent 不能省略
```

##### 端口设置(ports)

```Shell
$ firewall-cmd --zone=[zone] --add-port=8080/tcp # 放行tcp访问的8080端口,协议有tcp/udp/sctp/dccp
$ firewall-cmd --zone=[zone] --add-port=8080-9090/tcp # 一串端口
$ firewall-cmd --zone=[zone] --list-ports # 查看端口
$ firewall-cmd --zone=[zone] --query-port=8080/tcp # 查看指定zone的指定端口
$ firewall-cmd --zone=[zone] --remove-port=8080/tcp # 移除端口
```

##### 源设置(sources)

```Shell
$ firewall-cmd --zone=[zone] --add-source=192.168.1.10/24 # 绑定源到区域
$ firewall-cmd --zone=[zone] --list-sources # 查看区域所绑定源的列表
$ firewall-cmd  --zone=[zone] --query-source=192.168.1.10/24 # 查看指定zone是否和指定源绑定
$ firewall-cmd --get-zone-of-source=192.168.1.10/24 # 通过源查询绑定的区域
$ firewall-cmd  --zone=[zone] --change-source=192.168.1.10/24 # 用于改变source地址所绑定的zone，如果原来没有绑定则进行绑定
$ firewall-cmd --zone=[zone] --remove-source=192.168.1.10/24 # 解除源的绑定
```

##### 网卡接口(interfaces)

```Shell
$ firewall-cmd --zone=[zone] --add-interface=[interface] # 添加指定 interface 到指定的 Zone
$ firewall-cmd --zone=[zone] --change-interface=[interface] # 将eth1接口分配给work区域
$ firewall-cmd --zone=[zone] --remove-interface=[interface] # 删除work上的eth1接口
$ firewall-cmd --zone=[zone] --list-interfaces # 查看指定 Zone 下的 interfaces
$ firewall-cmd --get-zone-of-interface=[interface] # 通过接口查询绑定的区域
```

##### 端口转发(forward-ports)

```Shell
$ firewall-cmd --zone=external --add-forward-port=port=80:proto=tcp:toport=8080 # 同一主机上的端口转发
$ firewall-cmd --zone=external --add-forward-port=port=80:proto=tcp:toaddr=10.10.10.2 # 从80端口转发到10.10.10.2的80端口(默认端口)
$ firewall-cmd --zone=external --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=10.10.10.2 # 从80端口转发到10.10.10.2的8080端口
$ firewall-cmd --zone=external --remove-forward-port=port=80:proto=tcp:toport=8080:toaddr=10.10.10.2 # 删除上一条的端口转发

### 伪装 ###
$ firewall-cmd --zone=public --add-masquerade # 如果需要将流量(端口443)转发到lxd服务器/容器托管，请打开伪装
$ firewall-cmd --zone=public --add-forward-port=port=443:proto=tcp:toport=443:toaddr=192.168.2.42
$ firewall-cmd --zone=public --remove-masquerade # 删除上面设置的伪装
$ firewall-cmd --zone=public --remove-forward-port=port=443:proto=tcp:toport=443:toaddr=192.168.2.42
```

##### 服务(services)

```Shell
$ firewall-cmd --zone=public --add-service=http # 增加服务
$ firewall-cmd --zone=public --list-services # 列出服务
$ firewall-cmd --zone=public --remove-service=http # 移除服务
```

##### 协议(protocals)

```Shell
$ firewall-cmd --add-protocol=<protocol# 允许协议 (例：icmp，即允许ping)
$ firewall-cmd --remove-protocol=<protocol# 取消协议
$ firewall-cmd --list-protocols # 查看允许的协议
```

##### 高级规则(rich rules)

```Plaintext
//区域里的富规则按先后顺序匹配，按先匹配到的规则生效。#firewall-cmd ↓
--add-rich-rule='<RULE'    //在指定的区添加一条富规则
--remove-rich-rule='<RULE' //在指定的区删除一条富规则
--query-rich-rule='<RULE'  //找到规则返回0 ，找不到返回1
--list-rich-rules       //列出指定区里的所有富规则
--list-all 和 --list-all-zones 也能列出存在的富规则

[rich-rule]有一套完整的 rich-rule-language:
rule
  [family="ipv4|ipv6"]
  [source address="address[/mask]"|mac="mac-address"|ipset="ipset"]
  [destination address="address[/mask]"]
  service|port|protocol|icmp-block|icmp-type|masquerade|forward-port|source-port
  [log]
  [audit]
  [accept|reject|drop|mark]
```

```Shell
$ firewall-cmd --add-rich-rule="rule family="ipv4" source address="192.168.2.1" accept" # accept表示接受，reject表示拒绝，drop表示直接丢弃，这条命令表示允许来自192.168.2.1的所有流量
$ firewall-cmd --add-rich-rule="rule family="ipv4" source address="192.168.2.208" service name="ssh" accept" # 允许192.168.2.208主机访问ssh服务
$ firewall-cmd --add-rich-rule="rule family="ipv4" source address="192.168.2.1" port protocol="tcp" port="22" accept" # 允许192.168.2.1主机访问22端口
$ firewall-cmd --zone=drop --add-rich-rule="rule family="ipv4" source address="192.168.2.0/24" port protocol="tcp" port="22" reject" # 表示禁止192.168.2.0/24网段的主机访问22端口
```

##### 应急命令

```Shell
$ firewall-cmd --panic-on  # 拒绝所有流量，远程连接会立即断开，只有本地能登陆
$ firewall-cmd --panic-off  # 取消应急模式，但需要重启firewalld后才可以远程ssh
$ firewall-cmd --query-panic  # 查看是否为应急模式
```

##### 超时(timeout)

```Shell
$ firewall-cmd --zone=public --add-service=ssh --timeout=5m # 个timeout 选项是一个以秒（s）、分（m）或小时（h）为单位的时间值,表示该配置有效时间
```

还有许多的规则配置就不一一列举了，需要时去查相关的命令即可。

**注意**，以上配置都是运行时配置，如果需要使其永久生效在命令行后边加上`--permanent`选项然后重新加载，**或者**使用命令

```Shell
$ firewall-cmd --runtime-to-permanent
```

也可以自定义自己的 zone 和 service，见后文。

##### 创建自定义的 zone

```Shell
$ firewall-cmd --new-zone=memcached --permanent # 创建zone
$ firewall-cmd --zone=memcached --add-port=11211/udp --permanent # 添加规则
$ firewall-cmd --zone=memcached --add-source=192.168.100.30/32 --permanent #同上
$ firewall-cmd --reload # 重新加载生效
```

#### 服务设置

##### 获取所有可用服务的列表

```Shell
$ firewall-cmd --get-services
```

通过在`/usr/lib/firewalld/services`目录中打开相关的.xml 文件，您可以找到关于每个服务的更多信息。例如，HTTP 服务的定义如下:

```Xml
<?xml version="1.0" encoding="utf-8"?
<service
  <shortWWW (HTTP)</short
  <descriptionHTTP is the protocol used to serve Web pages. If you plan to make your Web server publicly available, enable this option. This option is not required for viewing pages locally or developing Web pages.</description
  <port protocol="tcp" port="80"/
</service>
```

为 public 区域中的接口允许传入 HTTP 通信流(端口 80)，仅为当前会话(运行时配置)类型：

```Shell
$ firewall-cmd --zone=public --add-service=http
$ firewall-cmd --zone=public --list-services # 查看
```

移除

```Shell
$ firewall-cmd --zone=public --remove-service=http
```

##### 自定义服务

如前所述，默认服务存储在`/usr/lib/firewalld/services`目录中。创建新服务的最简单方法是将现有的服务文件复制到`/etc/firewalld/services`目录，该目录是用户创建服务的位置，并修改文件设置。我们创建的`/etc/firewalld/services/plexmediaserver.xml`如下的

```Xml
<?xml version="1.0" encoding="utf-8"?
<service version="1.0"
<shortplexmediaserver</short
<descriptionPlex is a streaming media server that brings all your video, music and photo collections together and stream them to your devices at anytime and from anywhere.</description
<port protocol="udp" port="1900"/
<port protocol="tcp" port="32400"/
</service
```

重新加载生效

```Shell
$ firewall-cmd --reload
```

## 实践

其实到这里，我遇到的问题就可以迎刃而解了。

### 1. 放行整个区域

首先查看网卡接口和区域设置

```Shell
$ ip link show
$ firewall-cmd --get-active-zone
public
  interfaces: docker0 eth0
```

根据[包处理流程](https://kidon.fun/2020/03/10/firewalld/#jump)，由于没有源的分配，匹配到 interface 的 Zone，外网访问 docker 容器服务的时候会匹配到 public 区域，target 是 default，于是采用 firewall 默认行为。所以只要将 default 设置为 ACCEPT 便可访问。下面是我的操作,你也可以设置自己的策略。

```Shell
$ firewall-cmd --set-default-zone=work # 设置默认区域为work
$ firewall-cmd --change-interface=docker0 # 将docker0接口分配到work区域
$ firewall-cmd --permanent --set-target=ACCEPT # 将target设置为ACCEPT
$ firewall-cmd --runtime-to-permanent # 设置永久生效
```

### 2. 放行源地址

```Shell
$ firewall-cmd --zone=home --add-source=192.168.1.1/24 --permanent
$ firewall-cmd --permanent --set-target=ACCEPT --zone=home
$ firewall-cmd --reload
```

### 3. docker 容器内 dns 问题

```Shell
$ firewall-cmd --zone=public --add-masquerade --permanent && firewall-cmd --reload
```
