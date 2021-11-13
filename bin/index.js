#!/usr/bin/env node
"use strict";
// 定义脚手架的文件路径，__dirname 是当前文件所在的路径
process.env.NODE_PATH = __dirname + "/../node_modules/";

const program = require("commander");

// 获取 package.json 中的 version 来做为项目的版本号
program.version(require("../package").version);

// 定义脚手架的用法，在 program.help 方法中显示
program.usage("<command>");

program
  .command("init")
  .description("init a project")
  .alias("i")
  .action(() => {
    require("../lib/init.js")();
  });

// program.parse(arguments) 处理参数，没有被使用的选项会被存放在 program.args 数组中
program.parse(process.argv);

// 多余参数提示
// if (program.args.length) {
//   program.help();
// }
