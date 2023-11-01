import { defineConfig } from 'dumi';

console.log('process.env.gh', process.env.gh);

function withGH(uri: string): string {
  const prefix = process.env.gh ? '/dumi-theme-chakra/dist/' : '/';
  return [prefix, uri].join('');
}

export default defineConfig({
  // disable mfsu for HMR
  mfsu: false,
  base: withGH(''),
  publicPath: withGH(''),
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  devtool: 'cheap-module-source-map',
  sitemap: {
    hostname: 'https://dumi-theme-chakra.deno.dev'
  },
  // all in one to fix ConfigProvider error
  codeSplitting: {
    jsStrategy: 'bigVendors'
  },
  // apiParser: {},
  // resolve: {
  //   entryFile: './src/index.ts'
  // },
  // alias: {
  //   example: require.resolve('./src/index.ts')
  // },
  clickToComponent: {},
  // pass theme config
  themeConfig: {
    // name: '前端指南',
    logo: withGH('favicon.png'),
    helmetIcon: '',
    theme: { '@c-primary': '#1DA57A' },
    settingPanelVisible: true,
    thumbBackground: true,
    description: 'no desc',
    keywords: 'no keywords',
    author: 'zhuziyi',
    social: {
      github: {
        name: 'zhuziyi1989',
        link: 'https://github.com/zhuziyi1989'
      },
      twitter: {
        name: 'zhuziyi',
        link: 'https://twitter.com/zhuziyi'
      }
    },
    search: {
      type: 'docsearch',
      config: {
        appId: 'CQNSFVVYJA',
        apiKey: '2c50fefc041d570e018d5d9f569086b7',
        indexName: 'dumi-theme-chakra'
      }
    },
    hero: {
      showVersionBadge: false
    },
    announcementBar: {
      id: 'announce current progress info',
      content: '欢迎信息！',
      isCloseable: true
    },
    footer: `Copyright © ${new Date().getFullYear()} JANDOU.COM`
  }
});
