import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import postcssPxToRem from 'postcss-pxtorem'
import { viteVConsole } from 'vite-plugin-vconsole'
import path from 'node:path'
import process from 'node:process'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return defineConfig({
        define: {
            __TIMESTAMP__: Date.now(),
        },
        base: env.VITE_BASE_PATH,
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(), // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),
                    VantResolver(),
                    // 自动注册图标组件
                    IconsResolver({
                        // ep 是 Element Plus 的缩写
                        enabledCollections: ['ep'],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            viteVConsole({
                entry: [path.resolve('src/main.js')],
                localEnabled: mode !== 'production',
                enabled: mode !== 'production',
                config: {
                    maxLogNumber: 3000,
                },
            }),
        ],
        css: {
            postcss: {
                plugins: [
                    postcssPxToRem({
                        rootValue: 37.5,
                        unitPrecision: 3,
                        propList: ['*'],
                        selectorBlackList: ['van'],
                        replace: true,
                        mediaQuery: true,
                        minPixelValue: 0,
                    }),
                ],
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            // hmr: false,
            // port: 5173,
            host: '0.0.0.0',
            port: 9856,
            open: true,
            // 目前不需要代理
            // proxy: {
            //     '/r': {
            //         target: import.meta.env.VITE_BASE_API,
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/r/, ''),
            //     },
            // },
        },
    })
}