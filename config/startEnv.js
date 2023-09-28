/**
 * 获取终端启动参数
 */
const argv = process.argv ?? [];
const inputArgv = argv.slice(2);
const microAppsEnv = inputArgv.map((item) => {
  return item.replace(/-/g, '');
});

module.exports.microAppsEnv = microAppsEnv;
