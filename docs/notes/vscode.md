# 文本编辑器的使用

🍇 除特殊说明，均以 macOS 为例

## Vscode

### 光标多行选中

在 macOS 中: **`command` + `option` + 方向下键**

或 **option + 鼠标点选** 或 **option + shift + 鼠标拖动**

## Sublime Text

- Ctrl+Alt+Enter 每一行包裹标签，修改标签名字
- Ctrl+Shift+K（Command+Shift+K） 删除行
- 光标选中文本，按下 Alt+F3（ Ctrl+Command+G ），即可一次性选择全部的相同文本进行同时编辑；
- 光标选中多行，按下 Ctrl+Shift+L（Command+Shift+L），即可同时编辑这些行；
- Shift 鼠标右键 (Win) 或 Option 鼠标左键 (Mac) 或使用鼠标中键可以用鼠标进行竖向多行选择；
- Ctrl 鼠标左键(Win) 或 Command 鼠标左键(Mac) 可以自定义选择要编辑的地方。

### 关闭该模式，防止使用中进入该模式

经常不小心按下 `Esc` 键就会进入 `insert mode`（Vim 模式），光标变成一个灰白色的方块儿，且无法进行输入，这时可以按`i`退出该模式。

如果平时不用插入模式，可以禁用掉，在设置里加入以下配置即可

```json
    "ignored_packages":[
        "Vintage",// 忽略按 ESC 进入 insert mode
    ],
```
