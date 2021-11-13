// lib/init.js
const inquirer = require("inquirer");
const chalk = require("chalk");
const { exec } = require("child_process");
chalk.level = 3; // 设置 chalk 等级为3

// TODO: 做成链接的方式，避免每次都需要升级该包
const templates = require("./templates.json");

const utils = require("./utils");

module.exports = () => {
  console.log(chalk.green("Start init"));
  console.log(chalk.gray("loading..."));
  console.log(chalk.green("Init end"));
};

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
      // clone 模板
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
    ])
    .then((answer) => {
      const { template, projectName } = answer;
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
        console.log(chalk.green("Clone end"));
        process.exit(); // 退出这次命令行操作
      });
    });
};
