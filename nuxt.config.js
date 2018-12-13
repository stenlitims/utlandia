const pkg = require('./package')

module.exports = {
  mode: 'universal',

  // server: {
  //   //  port: 8000, // default: 3000
   //    host: '185.233.116.23', // default: localhost
  //   },

  env: {
    api: "https://web.utlandia.com/api?id="
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
        type: "text/javascript"
      },
      //   { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js', type: "text/javascript" }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    {
    src: '~sass/style.scss',
    lang: 'scss'
  },
  '~node_modules/slick-carousel/slick/slick.css'

],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~plugins/scrollactive.js',
      ssr: false
    },
    {
      src: '~plugins/vue-slick.js',
      ssr: false
    }

  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    // filenames: {
    //   css: ({
    //     isDev
    //   }) => isDev ? '[name].css' : '[contenthash].css',
    // },
    /*
     ** You can extend webpack config here
     */
    //  extractCss: true,
    extend(config, ctx) {

    }
  }
}
