// 获取命令行变量
const argv = process.argv ?? [];
const inputArgv = argv.slice(2);
const microApps = inputArgv.map((item) => {
  return item.replace(/-/g, '');
});

module.exports.microApps = microApps;
