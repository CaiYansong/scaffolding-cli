// lib/utils.js
const chalk = require("chalk");
const { exec } = require("child_process");
chalk.level = 3; // 设置 chalk 等级为3

function detectPlatform() {
  return process.platform.toLowerCase();
  // darwin: unix 系统内核
  // win32: windows 系统内核
}

function removeFolder(pathStr) {
  const cliEnum = {
    darwin: "rm -rf ",
    win32: "rd /s /q ",
  };

  const platform = detectPlatform();
  let path = pathStr;

  if (platform === "win32") {
    path = process.cwd() + "\\" + path.replace(/\//g, "\\");
  }

  return new Promise((resolve, reject) => {
    console.log(chalk.gray("Deleting .git ..."));
    try {
      exec(
        `${cliEnum[detectPlatform()]} "${path}"`,
        (error, stdout, stderr) => {
          if (error) {
            // 当有错误时，打印出错误并退出操作
            console.log(chalk.red(error));
            reject(error);
            process.exit();
          }
          console.log(chalk.green("Remove Success"));
          resolve();
          process.exit(); // 退出这次命令行操作
        }
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports = {
  detectPlatform,
  removeFolder,
};
