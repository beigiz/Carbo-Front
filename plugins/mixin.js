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
      // vuejs v-model doesn't update Persian values until
      // space is pressed on chrome mobile. this method is for
      // fixing this problem
      // see https://github.com/vuejs/vue/issues/8231
      // and https://github.com/vuejs/vue/pull/9814
      handleLiveInput (e, property, obj) {
          const localObj = obj ? obj : this
          if(e.isComposing){
              // if button delete from mobile is pressed
              if(e.target.value === ''){
                  Vue.set(localObj, property, obj[property].slice(0, -1))
              }else{
                  Vue.set(localObj, property, e.target.value)
              }
          } else {
              Vue.set(localObj, property, e.target.value)
          }
      },
      priceFormat (priceStr) {
          priceStr = String(priceStr) // double check
          let result = ''
          for (var i = priceStr.indexOf(".") != -1 ? priceStr.indexOf(".") : priceStr.length; i > 3; i -= 3) {
              result = ',' + priceStr.slice(Math.max(i - 3, 0), i) + result
          }
          result = priceStr.slice(0, i) + result;
          let afterFixedPoint = (priceStr.indexOf(".") != -1 ? priceStr.slice(priceStr.indexOf(".") + 1, priceStr.length) : null);
          if(afterFixedPoint){
              result += '.';
              // var i = 0;
              // while (i < afterFixedPoint.length) {
              //     result += afterFixedPoint.slice(i, i + 3) + (i + 3 < afterFixedPoint.length ? ',' : '');
              //     i += 3;
              // }
              result += afterFixedPoint;
          }
          return result
      },
      toEnglishNumber(str) {
        return this.convertNumbersToEnglish(str)
            .replace(/[^\d.-]/g, '') // for just keeping digits and dots.
      },
      convertNumbersToEnglish(str) {
        return str.replace(new RegExp('۰', 'g'), '0')
          .replace(new RegExp('۱', 'g'), '1')
          .replace(new RegExp('۲', 'g'), '2')
          .replace(new RegExp('۳', 'g'), '3')
          .replace(new RegExp('۴', 'g'), '4')
          .replace(new RegExp('۵', 'g'), '5')
          .replace(new RegExp('۶', 'g'), '6')
          .replace(new RegExp('۷', 'g'), '7')
          .replace(new RegExp('۸', 'g'), '8')
          .replace(new RegExp('۹', 'g'), '9')
          .replace(new RegExp('٪', 'g'), '%')
      },
      cutNDigitAfterPrecision(str, n) {
        let strEn = this.toEnglishNumber(str)
        if(strEn.lastIndexOf('.') != -1) {
          return strEn.substr(0, strEn.lastIndexOf('.') + n + 1);
        } else {
          return strEn
        }
      },
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