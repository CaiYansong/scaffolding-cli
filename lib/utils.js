// lib/utils.js
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
chalk.level = 3; // 设置 chalk 等级为3

function detectPlatform() {
  return process.platform.toLowerCase();
  // darwin: unix 系统内核
  // win32: windows 系统内核
}

function removeFolder(filePath) {
  // 判断文件是否存在
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`;
      // 获取文件状态
      const states = fs.statSync(nextFilePath);
      if (states.isDirectory()) {
        // 递归删除
        removeFolder(nextFilePath);
      } else {
        // 删除文件或符号链接
        fs.unlinkSync(nextFilePath);
      }
    });
    fs.rmdirSync(filePath);
  } else {
    console.error("文件不存在");
  }
}

function editFile(pathName, reg, str) {
  let res = fs.readFileSync(path.normalize(pathName));
  if (res) {
    res = res.toString().replace(reg, str);
    fs.writeFileSync(pathName, res);
  }
}

module.exports = {
  detectPlatform,
  removeFolder,
  editFile,
};

/*
const { exec } = require("child_process");

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

*/
