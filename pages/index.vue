<template>
  <div class="">
    <!-- <div class="intro__background"></div> -->
  <nav class="my-4 mx-8 p-4 flex items-center">
    <ul class="flex-1 bg-white mr-4 px-4 shadow-sm py-2 rounded-md">
      <li v-for="(link , i) in links" :key="i" class="py-2 px-4">{{link.name}}</li>
    </ul>
    <div class=""><img src="@/assets/img/logo.png" alt=""></div>
  </nav>
  <section dir="rtl" class="main-section px-24">

    <div class="moto flex justify-center items-center flex-1 flex-col">
        <div id="swapMoney-animation"></div>
        <div class="moto-text">
          <h1>Carbo Exchange</h1>
          <h3>معامله‌ای سریع و مطمئن</h3>
        </div>
    </div>

    <div class="flex justify-center p-8 items-center flex-1">
      
      <div class="purchase-card bg-white shadow-xl p-8 w-full rounded-lg">

          <div dir="ltr" class="wrapper">
            <div id="tab-switch" class="e-tab-switch text-gray-800 text-center" :class="{'left': tab == 'buy', 'left': tab == 'sell'}">
              <div class="e-tab" @click="tab = 'buy'" :class="{'active': tab == 'buy'}" >میخواهم تتر بخرم</div><!--
          --><div class="e-tab" @click="tab = 'sell'" :class="{'active': tab == 'sell'}" >میخواهم تترم را بفروشم</div>
            </div>
          </div>


          <div class="price-box rounded-md p-4 my-4 text-lg">
           <span>{{(tab == 'buy') ? 'قیمت خرید از ما' : 'قیمت فروش به ما'}}: </span> <span class="font-semibold text-xl" v-if="tetherPrice">{{(tab == 'buy') ? tetherPrice.buy_price : tetherPrice.sell_price | currency}}</span> <span class="toman">تومان</span>
          </div>

        <div class="w-full ex-input">
          <label class="">مقدار تتر درخواستی</label>
          <input v-model="usdt_amount" class="" id="grid-password" inputmode="numeric" placeholder="مقدار تتر درخواستی را وارد کنید">
        </div>

        <div class="flex mt-12">
          <div class="flex-1 flex justify-start items-end"><span>مبلغ نهایی:</span> 
          <span class="text-lg final-price font-semibold">{{ final_price | currency}} </span> تومان </div>
          <div class="flex-1">
            <button class="ex-btn w-full bg-g2">مرحله بعد</button>
          </div>
        </div>


      </div>
    </div>

  </section>
  <section class="features py-8">
    <div class="feature">
      <img src="@/assets/img/hand.png" alt="">
      <h4 class="font-extrabold text-5xl">بهترین قیمت</h4>
    </div>

    <div class="feature">
      <img src="@/assets/img/rocket.png" alt="">
      <h4 class="font-extrabold text-5xl">سریع معامله کنید</h4>
    </div>

    <div class="feature">
      <img src="@/assets/img/shield.png" alt="">
      <h4 class="font-extrabold text-5xl">امن و مطمئن</h4>
    </div>

  </section>
  <section class="footer">
    <div class="footer-card bg-g1">

    </div>
  </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import lottie from 'lottie-web'
import swapMoney from '~/assets/img/43059-bitcoin-trade.json'
export default {
  computed: {
    tetherPrice(){
      return this.$store.getters.tetherPrice;
    },
    final_price() {
      if(!this.tetherPrice) {
        return 0
      }
      return (this.tab == 'buy') ? this.usdt_amount * this.tetherPrice.buy_price : this.usdt_amount * this.tetherPrice.sell_price 
    },
  },
  components: {
    Logo,
  },
  data() {
    return {
      swapMoney,
      tab: 'buy',
      usdt_amount: null,
      usdt_buy_price: 23850,
      usdt_sell_price: 23500,
      links: [
        
        {name: 'ویژگی‌ها'},
        {name: 'تماس با ما'},
        {name: 'درباره کربو'},
        {name: 'چگونه خرید و فروش کنیم؟'},
        {name: 'خرید و فروش'}
      ]
    }
  },
  created() {
    if (process.client) {
      document.addEventListener('DOMContentLoaded', function () {})

      window.onload = (event) => {
        console.log('page is fully loaded')
      }
    }
  },

  methods: {
  },
  mounted() {
    if (process.browser) {


    let preInvoiceAnime = lottie.loadAnimation({
      container: document.getElementById('swapMoney-animation'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.swapMoney // the path to the animation json
    })
    preInvoiceAnime.play()

    
    }
  },
}
</script>

<style lang="sass">
/* Sample `apply` at-rules with Tailwind CSS


h1 
  font-size: 36px
  font-weight: 800
h2 
  font-size: 36px
  font-weight: 600

h3
  font-size: 28px
  font-weight: 500

.main-section 
  @apply flex justify-center items-center text-center mx-auto
  #swapMoney-animation
    width: 75%


.features 
  @apply flex flex-col lg:flex-row items-center text-center mx-auto justify-around
  .feature
    position: relative
    img
      width: 200px
      margin: auto
      z-index: 100
    h4
      position: absolute
      left: -50px
      top: 0
      width: 120px
      // line-height: 3rem
      text-align: right

nav
  img
    width: 75px
  ul
    li
      display: inline-block

.title 
  display: block
  font-weight: 300
  font-size: 100px
  color: #35495e
  letter-spacing: 1px

.subtitle 
  font-weight: 300
  font-size: 42px
  color: #526488
  word-spacing: 5px
  padding-bottom: 15px

.links 
  padding-top: 15px

/* e-tab-switch styles */
.e-tab-switch 
  position: relative

.e-tab-switch
  will-change: transform
  &:after 
    will-change: transform
    content: ""
    position: absolute
    width: 50%
    top: 0
    left: 0
    transition: transform cubic-bezier(.88, -.35, .565, 1.35) .6s
    @apply rounded-md
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .1)
    background: rgb(222,168,144)
    background: linear-gradient(45deg, rgba(222,168,144,1) 0%, rgba(232,154,187,1) 50%, rgba(202,157,214,1) 100%)
    // background: rgb(247,37,133)
    // background: linear-gradient(45deg, rgba(247,37,133,1) 0%, rgba(114,9,183,1) 100%)
    // background-image: linear-gradient(to right, rgb(0, 148, 236), rgb(245, 55, 195))
    // background-image: linear-gradient(to right, #fad0c4 0%, #ffd1ff 100%)
    // @apply bg-purple-500
    height: 100%
    z-index: 0

.e-tab-switch.right
  &:after 
    transform: translateX(0%)

.e-tab-switch.left
  &:after 
    transform: translateX(100%)

.e-tab-switch .e-tab 
  display: inline-block
  width: 50%
  padding: 12px 0
  z-index: 1
  position: relative
  cursor: pointer
  transition: color 200ms
  font-size: 16px
  font-weight: bold
  line-height: normal


.e-tab-switch .e-tab.active 
  color: #ffffff

.wrapper
  @apply rounded-md
  background-color: #f4f4f4
  padding: 8px
  width: 100%
  // max-width: 316px
  margin-left: auto
  margin-right: auto

.final-price
  padding-left: 5px

.moto
  position: relative
  bottom: 2rem
  .moto-text
    position: relative
    bottom: 2rem



</style>
