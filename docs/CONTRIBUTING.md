# How to contribute

## Before starting contribution
### You should know a few terms
* Game - games in resource directory which considered as a static file
* Platform - we call the whole system running on extension as platform

## What can you contribute to?
### You can start contributing to add
* a new game
* fix current existing game issues
* add a new feature to current existing game
* fix platform issue
* adda new feature to platform

currently we support version upper than 1.84, but we are working to support lower version.

## Getting started
This column instructs you to build and debug vsc-gameboy extension locally and directory structure.

### Build locally for development
1. Clone app
   ```
   https://github.com/hp-potion/vsc-gameboy.git
   ```
3. Run `npm install` or `npm i`
4. Press `F5` or click `Run > Start Debugging`
   * you will see our vsc-gameboy extension black and white icon on activity bar.
    ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/3ce0c10e-5898-4867-b404-e3757ab55d09)

### How to debug extension
* Debug Platform features
  * You can debug using `console.log` or any other console method and it reveals on VSC debug console.
 
* Debug games(Or any other webview content)
  * You can debug using `Webview Debug Tools`
    1. open vsc command prompt
    2. type `Open Webview Debug Tools`
      ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/8499650c-189e-47ed-8d35-bfeaeeb20638)
    3. debug local extension just like browser debugger!
      ![image](https://github.com/hp-potion/vsc-gameboy/assets/22022776/9ba30d81-2606-4f9f-9721-09702405d824)
  I personally recommend to bind `Webview Debug Tools` as a shortcut.(maybe `F12` - same as chrome debugger)

### Directory structure
* docs - where files for document are in
* resource - static files are treated here
  * game - game files(html, js, mp3, etc...)
  * icon - icon images for VSC sideBar and activityBar.
* src
  * game
    * meta-data.ts - handle meta data of executable games.
* util - utils needed on extension build
* test - where test codes are in
* extension.ts - the file where our extension activates
* game-provider.ts - select game and convert html here

## How to contribute(Game)
### Creating game resource files
1. Get your game folder ready.
2. Put them under `resource > game > your-game-identifier` directory.
* Important rules
  * your game should contain only one html file.
  * need to write all local file `src` or `href` path in relative path. (path starts with https doesn't need to be changed)
 
### Declare meta data
you should declare your file meta data in `src > game > meta-data.ts`
```
{
  id: "my-game", // identifier to locate resource path
  title: "MyGame", // How your game's name reveals
  description: "My fancy js game", // description
  author: "Junman Choi", // author
  root: "index.html", // root html file located in your game resource directory(recommend to position on root of your game dir)
  icon: { // icon will appear on side bar
    light: "image-light.svg", // put images in icon > dark/light
    dark: "image-dark.svg",
  },
}
```

## Pull Request
### Rules
* If you contribute on adding new game, please submit your github repository of html,js game.
* All mp4 or gif animated videos are welcomed to describe your work.

## Running into problems?
* feel free to report issues on issue tab

Thank you for your support and love of vsc-extension.
