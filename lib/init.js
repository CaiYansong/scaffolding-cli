// lib/init.js
const inquirer = require("inquirer");
const chalk = require("chalk");
const { exec } = require("child_process");
chalk.level = 3; // 设置 chalk 等级为3

const templates = require("./templates.json");

const utils = require("./utils");

module.exports = async () => {
  inquirer
    .prompt([
      // 选择模板
      {
        type: "list",
        message: "Check your template",
        choices: Object.keys(templates),
        name: "template",
        validate: (val) => {
          // 对输入的值做判断
          if (val.length <= 0) {
            return chalk.red("不能为空，请重新输入");
          }
          return true;
        },
      },
      // clone 模板 & 处理相关信息
      {
        type: "input",
        message: "Your projectName:",
        name: "projectName",
        validate: (val) => {
          // 对输入的值做判断
          if (val === "") {
            return chalk.red("不能为空，请重新输入");
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Your project description:",
        name: "projectDesc",
        validate: (val) => {
          // 对输入的值做判断
          if (val === "") {
            return chalk.red("不能为空，请重新输入");
          }
          return true;
        },
      },
    ])
    .then((answer) => {
      const { template, projectName, projectDesc } = answer;
      console.log(chalk.green("Clone project."));
      console.log(chalk.gray("Cloning..."));
      const gitUrl = templates[template].url;
      exec(`git clone ${gitUrl} ${projectName}`, (error, stdout, stderr) => {
        if (error) {
          // 当有错误时，打印出错误并退出操作
          console.log(chalk.red(error));
          process.exit();
        }
        // 删除 .git 文件夹
        utils.removeFolder(`${projectName}/.git`);

        // 修改相关名称
        // package.json name
        utils.editFile(
          `./${projectName}/package.json`,
          /"name" *: *"[^"]+"/,
          `"name": "${projectName}"`
        );
        // package.json description
        utils.editFile(
          `./${projectName}/package.json`,
          /"description" *: *"[^"]+"/,
          `"description": "${projectDesc}"`
        );

        console.log(chalk.green("Clone end"));
        process.exit(); // 退出这次命令行操作
      });
    });
};
