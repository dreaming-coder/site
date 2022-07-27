import {path} from '@vuepress/utils'
import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'
import mdEnhancePlugin from "vuepress-plugin-md-enhance";
import clipboardPlugin from "vuepress-plugin-clipboard";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import navbar from "./navbar";
import getSidebar from "./sidebar";
import copyrightPlugin from "vuepress-plugin-copyright2";
import {docsearchPlugin} from "@vuepress/plugin-docsearch";


export default defineUserConfig({
    lang: 'zh-CN',
    title: "ice's blog",
    description: '宁可累死自己，也要卷死别人',

    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },
    theme: localTheme({
        logo: '/avatar.png', // 左上角的 logo
        repo: 'dreaming-coder', // 此博客代码仓库地址
        colorMode: 'light',
        colorModeSwitch: false,
        navbar: navbar,
        sidebar: getSidebar(),
        sidebarDepth: 0,
        editLink: false,
        contributors: true,
        contributorsText: '作者',
        lastUpdated: true,
        lastUpdatedText: '上次更新'
    }),
    plugins: [
        mdEnhancePlugin({
            // 添加选项卡支持
            tabs: true,
            // 启用代码块分组
            codetabs: true,
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 启用自定义对齐
            align: true,
            // Enable attrs support
            attrs: true,
            // 开启标记
            mark: true,
            // 启用任务列表
            tasklist: true,
            // 启用图片大小
            imageSize: true,
            // 启用 mermaid
            mermaid: true,
            // 启用 TeX 支持
            tex: true,
            // 启用代码演示
            demo: true,
        }),
        clipboardPlugin({
            align: 'top',
            staticIcon: false,
            color: '#3eaf7c',
        }),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        docsearchPlugin({
            apiKey:"b00ef7fe898577737645859b8abd4e90",
            indexName:"e-thunder",
            appId:"IOKB014S8Y",
            placeholder:"搜索文档"
        }),
        copyrightPlugin({
            hostname:"http://e-thunder.space",
            author:"ice",
            license: "MIT",
            global: true
        }),
    ]
})