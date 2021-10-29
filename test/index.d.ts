declare module 'vue' { 
  export interface GlobalComponents { 
    'config-provider': typeof import('./component/modules/config-provider/index.vue')['default'];
    'ref-demo': typeof import('./component/modules/base/ref-demo/index.vue')['default'];
    'ref-setup-demo': typeof import('./component/modules/base/ref-setup-demo/index.vue')['default'];
    'tsx-demo': typeof import('./component/modules/base/tsx-demo/index')['default'];
  }
}
export {}
