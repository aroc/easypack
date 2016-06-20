# Easy Pack
The fastest, easiest, most straightforward way to build assets for the web. Powered by Gulp behind the scenes, you can easily plug in your own custom Gulp tasks and make use of the huge Gulp plugin ecosystem whenever you need more customization.

## Quick Start Guide

1. Install EasyPack as a development dependency `npm install --save-dev easypack`.
2. Add an entry in your `package.json` scripts to run easypack, for example:
```sh
"scripts": {
  "dev": "easypack"
}
```
1. Create a `easypack.json` file in the root of your project directory. Example scripts and all available options are listed below.
2. Run easypack with `npm run dev`.

## How to make an easypack.json file

`easypack.json` files are what EasyPack looks for to know how to build your assets. It consists of a single array of objects under the `tasks` key. Each object in the array is a task that should be run.