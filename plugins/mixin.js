import Vue from 'vue'

export default function ({
  $config,
}) {
  Vue.mixin({
    data() {
      return {
        mediaUrl: $config.CAFEPAY_WEBAPP_MEDIA_URL,
        baseUrl: $config.CAFEPAY_WEBAPP_BASE_URL,
      }
    },

    methods: {
      convertPersian(str) {
        let persianNumbers = [
            /۰/g,
            /۱/g,
            /۲/g,
            /۳/g,
            /۴/g,
            /۵/g,
            /۶/g,
            /۷/g,
            /۸/g,
            /۹/g
          ],
          enNumbers = [
            /0/g,
            /1/g,
            /2/g,
            /3/g,
            /4/g,
            /5/g,
            /6/g,
            /7/g,
            /8/g,
            /9/g
          ]

        if (typeof str === 'string') {
          for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i).replace(enNumbers[i], i)
          }
        }
        return str
      }
    },
    computed: {
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      },
    },
  })
}