import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// 引入自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    
    uni(),
    
   
    AutoImport({
      // 需要自动导入的库
      imports: [
        'vue',      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        'uni-app'   // 自动导入 uni-app 相关函数，如：onLoad, onShow, onPullDownRefresh 等
      ],
      // 指定生成 d.ts 文件的位置，以便 IDE 和 TypeScript 能智能识别
      dts: 'src/auto-imports.d.ts'
    })
  ],
})