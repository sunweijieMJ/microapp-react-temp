/**
 * 获取终端启动参数
 */
const argv = process.argv ?? [];
const inputArgv = argv.slice(2);
const microApps = inputArgv.map((item) => {
  return item.replace(/-/g, '');
});

module.exports.microApps = microApps;
