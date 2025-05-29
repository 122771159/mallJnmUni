// 1. glob 模式已更新为匹配当前目录下的 .js 文件
const modulesFiles = import.meta.glob('./*.js', { eager: true });

const modules = {};
for (const key in modulesFiles) {
  // 2. 使用更精确的正则表达式来提取文件名
  // 将 './api.js' 转换为 'api'
  const moduleName = key.replace(/^\.\/([^.]+)\.js$/, '$1');
  const value = modulesFiles[key];
    if (value) {
      for (const exportKey in value) {
        modules[exportKey] = value[exportKey];
      }
    }
}
export default modules;