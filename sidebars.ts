import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  notesSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Frontend',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'JavaScript',
          collapsed: false,
          items: ['frontend/javascript/js-core', 'frontend/javascript/js-class'],
        },
        {
          type: 'category',
          label: 'TypeScript',
          collapsed: false,
          items: ['frontend/typescript/typescript-overview'],
        },
        {
          type: 'category',
          label: 'Vue / Nuxt',
          collapsed: false,
          items: ['frontend/vue/vue3-composition-api', 'frontend/vue/nuxt3'],
        },
        {
          type: 'category',
          label: 'CSS / Layout',
          collapsed: false,
          items: [
            'frontend/css/bootstrap5',
            'frontend/css/element-plus-tailwind',
            'frontend/css/rendered-vs-native-resolution',
          ],
        },
        {
          type: 'category',
          label: 'Libraries',
          collapsed: false,
          items: [
            'frontend/libraries/echarts',
            'frontend/libraries/gsap',
            'frontend/libraries/rich-text-editor',
          ],
        },
        {
          type: 'category',
          label: 'Frameworks',
          collapsed: false,
          items: ['frontend/frameworks/frontend-frameworks'],
        },
        {
          type: 'category',
          label: 'Web APIs',
          collapsed: false,
          items: [
            'frontend/web-apis/selection-range',
            'frontend/web-apis/image-upload',
            'frontend/web-apis/web-tips',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tooling',
      collapsed: false,
      items: ['tooling/package-managers', 'tooling/corepack', 'tooling/hackmd', 'tooling/bash-bom-crlf', 'tooling/ghostty', 'tooling/cron'],
    },
    {
      type: 'category',
      label: 'Testing & Performance',
      collapsed: false,
      items: [
        'testing-performance/jest-unit-testing',
        'testing-performance/jmeter-scripts',
        'testing-performance/jmeter-distributed',
      ],
    },
    {
      type: 'category',
      label: 'Web Platform',
      collapsed: false,
      items: ['web-platform/localstorage'],
    },
    {
      type: 'category',
      label: 'Backend & API',
      collapsed: false,
      items: [
        'backend-api/json-server',
        'backend-api/messaging-systems',
        'backend-api/database-selection',
        'backend-api/db-migrations',
        'backend-api/jwt',
      ],
    },
    {
      type: 'category',
      label: 'DevOps',
      collapsed: false,
      items: [
        'devops/linux-commands',
        'devops/ssh',
        'devops/docker',
        'devops/nginx',
        'devops/tailscale-subnet-router',
        'devops/k8s',
        'devops/k8s-windows-share',
        'devops/grafana-elk-prometheus',
        'devops/pki-ca-tls',
        'devops/nexus-repository',
      ],
    },
    {
      type: 'category',
      label: '.NET / C#',
      collapsed: false,
      items: ['dotnet/multithreading', 'dotnet/base64-encoding'],
    },
    {
      type: 'category',
      label: 'Analytics',
      collapsed: false,
      items: ['analytics/matomo'],
    },
  ],
};

export default sidebars;
