// vite-plugin-local-ip.js
import ip from "ip";

export default function localIpPlugin(options = {}) {
  const { port, path, variableName } = {
    port: 8090, // 默认端口
    path: "", // 默认路径（如果API在根路径，则为空）
    variableName: "VITE_APP_BASE_API", // 默认环境变量名
    ...options, // 允许用户覆盖默认值
  };

  return {
    name: "vite-plugin-local-ip", // 插件名称，必须
    config(config, { command }) {
      // command 可以是 'serve' 或 'build'
      // 仅在开发服务器启动时 (serve) 设置该环境变量
      if (command === "serve") {
        const localIp = ip.address();
        const basePath = path.startsWith("/") ? path : `/${path}`;
        const apiUrl = `http://${localIp}:${port}${basePath}`;

        console.log(`[Local IP Plugin] Setting ${variableName} to: ${apiUrl}`);

        // 将其定义为 Vite 的环境变量
        // Vite 环境变量需要以 'VITE_' 开头才能通过 import.meta.env 暴露给客户端代码
        if (!variableName.startsWith("VITE_")) {
          console.warn(
            `[Local IP Plugin] Environment variable "${variableName}" does not start with "VITE_". It will not be exposed to client-side code via import.meta.env.`
          );
        }

        return {
          define: {
            // 注意：这里我们直接定义 import.meta.env 上的属性
            // 或者可以通过修改 config.env 对象来实现，但 define 更直接
            // 如果直接修改 config.env，Vite 会自动处理前缀
            // 'process.env.VITE_APP_BASE_API': JSON.stringify(apiUrl) // 也可以用这种方式
            [`import.meta.env.${variableName}`]: JSON.stringify(apiUrl),
          },
          // 更推荐的方式是修改 server.host 或使用 .env 文件配合脚本
          // 但如果只是为了在 import.meta.env 中注入一个开发时使用的 API 地址，define 是可行的。
          // 或者，如果想让 Vite 自身加载环境变量，可以动态生成一个 .env.development.local 文件
          // 但那样会更复杂，插件直接 define 是开发时动态修改的一种方式。
        };
      }
      // 在构建时不进行任何操作，或者您可以根据需求有不同的行为
      return {};
    },
    // 可选：在服务器启动后打印信息
    configureServer(server) {
      const localIp = ip.address();
      const basePath = path.startsWith("/") ? path : `/${path}`;
      const apiUrl = `http://${localIp}:${port}${basePath}`;
      console.log(`[Local IP Plugin] API URL for development: ${apiUrl}`);
      console.log(
        `[Local IP Plugin] Your application can access this via import.meta.env.${variableName}`
      );

      // 也可以在这里通过 server.config.define 再次确认或修改，
      // 但 config 钩子通常是更早且更合适的地方。
    },
  };
}
