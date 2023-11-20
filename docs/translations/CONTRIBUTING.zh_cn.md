# 如何参与贡献

## 开始之前

### 你应该了解一些术语

- Game - 在 `resource` 目录中的游戏静态文件
- Platform - 我们将运行在扩展程序上的系统称作 platform

## 可以贡献哪些内容？

### 你可以贡献

- 新的游戏
- 修复现有游戏的问题
- 为现有游戏添加新功能
- 修复 platform 的问题
- 为 platform 添加新功能

目前我们支持 1.84 以上的版本，但我们正在努力支持更低的版本。

## 入门

这部分将指导您本地构建和调试 vsc-gameboy 扩展以及目录结构。

### 在本地构建项目用于开发

1. 克隆仓库

   ```
   https://github.com/hp-potion/vsc-gameboy.git
   ```

2. 运行 `npm install` 或 `npm i`

3. 按下 `F5` 或者点击 `Run > Start Debugging`

   - 你将在活动栏上看到 vsc-gameboy 扩展程序的黑白图标。 ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/3ce0c10e-5898-4867-b404-e3757ab55d09)

### 如何调试

- 调试 platform 特性
  - 你可以使用 `console.log` 或其他的 `console` 方法进行调试，它将显示在 VSC 调试控制台上。
- 调试游戏(或任何其他 webview 内容)
  - 你可以使用 `Webview Debug Tools` 进行调试
    1. 打开 VSC 命令提示符
    2. 输入 `Open Webview Debug Tools` ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/8499650c-189e-47ed-8d35-bfeaeeb20638)
    3. 像在浏览器上一样调试本地扩展！ ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/9ba30d81-2606-4f9f-9721-09702405d824) 我个人建议为 `Webview Debug Tools` 绑定快捷键。(可以是 `F12` - 就和 Chrome 一样)

### 目录结构

- docs - 文档文件
- resource - 静态文件
  - game - 游戏文件(html、js、mp3 等)
  - icon - VSC 侧边栏和活动栏的图标
- src
  - game
    - meta-data.ts - 可运行游戏的元数据
- util - 构建扩展程序所需的工具库
- test - 测试代码
- extension.ts - 用于激活扩展
- game-provider.ts - 用于选择游戏并转换成 HTML 

## 如何贡献游戏

### 创建游戏资源文件

1. 准备好你的游戏文件夹
2. 放在 `resource > game > your-game-identifier` 目录下

- 重要规则
  - 你的游戏应该只包含一个 HTML 文件。
  - 在本地文件中的 `src` 或 `href` 中需要使用相对路径(以 https 开头的路径无需更改)

### 声明元数据

你应该在 `src > game > meta-data.ts` 中声明你的文件元数据

```
{
  id: "my-game", // 用于定位资源的标识符
  title: "MyGame", // 决定你的游戏标题
  description: "My fancy js game", // 描述
  author: "Junman Choi", // 作者
  root: "index.html", // 位于游戏资源目录中的根 HTML 文件(建议放在游戏目录的根目录)
  icon: { // 图标将显示在边栏上
    light: "image-light.svg", // 将图像放在 icon > dark/light 中
    dark: "image-dark.svg",
  },
}
```

## Pull Request

### 规则

- 如果是添加新游戏，请提交你存放 HTML、JS 游戏的 GitHub 仓库
- 欢迎添加用于描述项目的视频或者 gif 
- Fork 我们的仓库并开始开发
  - **请不要尝试在 vsc-gameboy 仓库中创建新分支！**
  - 参见：[fork-a-repo](https://docs.github.com/get-started/quickstart/fork-a-repo)

## 遇到问题了吗？

- 可以随时创建 issue 告诉我们

感谢您对 vsc-extension 的支持和喜爱。