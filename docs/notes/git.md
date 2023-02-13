---
group:
  title: Git
  order: 6
---

# Git 相关笔记

## 简单命令

### 常用命令举例

- git init 创建仓库
- git config user.name "zhuziyi" //配置当前开发者名字
- git config user.email user@gmail.com //配置当前开发者 Email
- git add file 新增文件 file 到版本库
- git rm file 从版本库里删除 file，本地文件不受影响
- git commit -m "代码提交信息/修改注释" 提交修改到版本可以
- git status 查看状态
- `git log --no-merges --author=zhuziyi --pretty=format:'* %s <%ad>'` 查看本人不含有 merges 的日志,并美化格式化时间
  - `git log --no-merges --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --date=relative`
- git reflog 查看详细命令日志
- git clone -b {分支名} {仓库地址} 克隆远程仓库，默认情况是克隆主分支，若要克隆其它分支

## 重要命令

### git checkout

```bash
git checkout -- test.txt   //恢复误删本地文件test.txt（区别于版本库里的文件！）
```

### git reset

```bash
git reset --mixed HEAD  //将你当前的改动从缓存区中移除，但是这些改动还留在工作目录中
git reset --hard HEAD  //放弃本地所有的改动（谨慎操作！请先提交存档本地改动！）
```

```bash
#  ⚠️⚠️⚠️ 谨慎操作！请先将本地改动 commit + stash 存档
git reset --hard HEAD^   // 硬回滚到上一个版本，`HEAD^` 即上一个版本
git reset --hard 3628164 // 回到commit id是"3628164"的版本
```

### git rm

如何忽略**已经提交**的文件或文件夹 (.gitignore 文件无效)？

```bash
git rm --cached <file> //这个命令会直接从暂存区删除文件，工作区则不做出改变。
```

## 其他实战操作

### 1. 远程操作

#### 🔑 SSH Key 钥匙配置

1. 创建：`ssh-keygen -t rsa -C "user@gmail.com"` （不同仓库可以自定义`id_rsa`名称）
2. 复制公有钥匙内的文本：`pbcopy < ~/.ssh/id_rsa.pub`
3. 到远程仓库，粘贴到该网站对应的设置中。
4. 多仓库需要配置 config 文件，看下一条笔记。
5. **检测是否配置好**，如：`ssh -vT github.com -p 65533`
   - id_rsa：私密钥匙
   - id_rsa.pub：公有钥匙（在 github 上点`Add SSH Key`，填写标题，并粘贴公钥到 Key 里）

#### 🧑 多仓库单用户配置

多仓库需要产生不同钥匙，且需要配置 config 文件，配置例子：

```ini
#公司需要设置 User
Host gitlab.jd.com
 HostName gitlab.jd.com
 User {用户名}
 IdentityFile ~/.ssh/id_rsa.gitlab

#github不需要设置 User ，统一用 git 代替
Host github.com
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_rsa.github
```

同远程仓库，多个账号设置，自行 Google

#### 📡 本地与远程关联

先在远程仓库创建一个名叫`tools`的仓库，所有改动需要本地仓库提交完之后才能对同步远程仓库。

`git remote add tools git@github.com:zhuziyi1989/tools.git` 远程仓库名称: tools 账户: zhuziyi1989

#### 📡 推送到远程

把本地 master 分支的最新修改推送至 GitHub:

`git push -u tools master` （tools：远程仓库名称；master：主分支）

假设有其他人修改了远程主分支，我需要先 `git pull` 拉取远程更，再把本地更新`git push`到远程服务器

### 2. 修改历史提交信息 [参考](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2#_git_amend)

发现某项目历史提交里有敏感数据或信息有误，比如要全局修改邮箱地址、作者姓名等，使用核武器级选项：filter-branch

```bash
git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_EMAIL" = "user@gmail.com" ];
        then
                GIT_AUTHOR_NAME="xiaozhang";
                GIT_COMMITTER_NAME="xiaozhang";
                GIT_AUTHOR_EMAIL="user@gmail.com";
                GIT_COMMITTER_EMAIL="user@gmail.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD

```

### 3. vim 怎么退出?

如果是输出状态，首先 Esc 退出输入状态，然后**Shift+;**，再输入 q!或 wq!（不保存改动，wq!是保存文件的写入修改）退出

### 4. 文件名包含中文，导致字符乱码

使用 git 命令，如果文件名包含中文，终端显示却是被转成八进制编码的字符

有时候会出现以下情况：

```bash
11:07:29 › git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

 deleted:    "../git/git \345\221\275\344\273\244\345\244\247\345\205\250.txt"
 # 这里实际上是 => deleted:    ../git/git 命令大全.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

 git.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

解决方案：

```bash
git config --global core.quotepath false
git config core.quotepath false
```

### 5. 在 VSCode 中使用 git，尝试拉取 git 时（默认会先使用 `git pull --tags origin master` ），可能拉取失败

错误日志案例：

```bash
From https://gitlab.chinamcloud.com/front/xxxx
 * branch            master               -> FETCH_HEAD
! [rejected]   latest -> latest  (would clobber existing tag)
```

原因可能是您或者其他协作者删除了原来的一个标签，并重新创建了一个相同的名称。

解决方案：执行以下命令，强制刷新本地标签

```bash
git fetch --tags -f
```
