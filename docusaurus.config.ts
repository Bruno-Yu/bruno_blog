import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Bruno's Notes",
  tagline: 'Bruno 的公開技術筆記',
  favicon: 'img/favicon.svg',
  url: 'https://blog.jackhellowin.win',
  baseUrl: '/',
  organizationName: 'Bruno-Yu',
  projectName: 'bruno_blog',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        useAllContextsWithNoSearchContext: true,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Bruno's Notes",
      logo: {
        alt: "Bruno's Notes",
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notesSidebar',
          position: 'left',
          label: '筆記',
        },
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/Bruno-Yu',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {label: '筆記', to: '/'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            {label: 'GitHub', href: 'https://github.com/Bruno-Yu'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bruno Yu.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
