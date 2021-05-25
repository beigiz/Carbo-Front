require('dotenv').config()

export default {
  ssr: true,
  target: 'server',
  server: {
    port: process.env.CARBO_EXCHANGE_NUXT_PORT, // default: 3000
    host: process.env.CARBO_EXCHANGE_NUXT_HOST, // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Carbo Exchange',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/font.css',
    // '~/assets/css/iransans.css',
    '~/assets/app.sass'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/mixin",
    "@/plugins/animeJs",
    {
      src: '@/plugins/vue-currency',
      mode: 'client'
    },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxyHeaders: false,
    credentials: false
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.CARBO_EXCHANGE_BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.CARBO_EXCHANGE_BASE_URL,
    }
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    [ '@nuxtjs/dotenv', {
      systemvars: true
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },


  proxy: process.env.CARBO_EXCHANGE_proxyUrl ? {
    '/api/': {
      target: process.env.CARBO_EXCHANGE_proxyUrl,
      // pathRewrite: {
      //   '^/api' : '/'
      //   }
      }
  } : null
}
