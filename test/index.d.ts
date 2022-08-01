declare module 'vue' { 
  export interface GlobalComponents { 
    'm-config-provider': typeof import('./component/modules/config-provider/index.vue')['default'];
    'm-ref-demo': typeof import('./component/modules/base/ref-demo/index.vue')['default'];
    'm-ref-setup-demo': typeof import('./component/modules/base/ref-setup-demo/index.vue')['default'];
    'm-tsx-demo': typeof import('./component/modules/base/tsx-demo/index')['default'];
  }
}
export {};
