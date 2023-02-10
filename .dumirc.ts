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
    { id: 'en-US', name: 'English' },
    { id: 'zh-CN', name: '中文' }
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
    // logo: withGH('dumi-theme-chakra-logo.png'),
    logo: "https://front.jandou.com/favicon.png",
    // helmetIcon: '🍺',
    settingPanelVisible: true,
    thumbBackground: true,
    description:'111111111111111111111',
    keywords:'2222',
    author:'zhuziyi',
    social: {
      github: {
        name: 'dumi-theme-chakra',
        link: 'https://github.com/innocces/dumi-theme-chakra'
      },
      discord: {
        name: 'maryoku-ui-discord',
        link: 'https://discord.gg/N82HK72uJk'
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
