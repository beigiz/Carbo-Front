<template>
  <div class="container">
    <!-- <div class="intro__background"></div> -->
  <nav class="g1-background my-4 mx-8 rounded-md">
    <ul>
      <li v-for="(link , i) in links" :key="i" class="p-2">{{link.name}}</li>
    </ul>
  </nav>
  <section dir="rtl" class="main-section">
    <div class="moto">
        <h1>Alpha Exchange</h1>
        <h2>صرافـی آلفـا</h2>
        <h3>بهترین قیمت در سریع ترین زمان ممکن</h3>
    </div>
    <div class="flex justify-center items-center">
      <div class="purchase-card shadow-lg p-4">
        <h1>adsdasdsadsa</h1>
      </div>
    </div>

  </section>
  <section class="features">
    <div class="feature">
      <img src="@/assets/img/rocket.png" alt="">
      <h4 class="font-extrabold text-6xl">سریع معامله کنید</h4>
    </div>

    <div class="feature">
      <img src="@/assets/img/rocket.png" alt="">
      <h4 class="font-extrabold text-6xl">سریع معامله کنید</h4>
    </div>

    <div class="feature">
      <img src="@/assets/img/rocket.png" alt="">
      <h4 class="font-extrabold text-6xl">سریع معامله کنید</h4>
    </div>

  </section>
  <section class="footer">
    <div class="footer-card g1-background">

    </div>
  </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      links: [
        {name: 'قوانین'},
        {name: 'ویژگی‌ها'},
        {name: 'تماس با ما'},
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
  mounted() {
    if (process.browser) {
      
      // let timeLine = this.$anime.timeline({
      //   targets: '.intro__animated-line',
      //   easing: 'spring(1, 80, 10, 0)',
      //   loop: true
      // })
      // timeLine.add({
      //   width: '100%',
      //   duration: 1000,
      // }, 2000)
      // .add({
      //   targets: '.intro__animated-line',
      //   translateY: '125px',
      //   easing: 'easeInOutQuad',
      //   duration: 1000,
      // }, 3000)
      // .add({
      //   targets: '.intro__cover-box',
      //   height: '0',
      //   easing: 'easeInOutQuad',
      //   duration: 1000,
      // }, 3000)
      // .add({
      //   targets: '.intro__animated-line',
      //   width: '0%',
      //   easing: 'easeInOutQuad',
      //   duration: 1000,
      // }, 4000)
      // .add({
      //   targets: '.intro__background',
      //   top: 0,
      //   left: 0,
      //   r: 10,
      //   width: '100%',
      //   height: '100vh',
      //   //   rotate: {
      //   //   value: 360,
      //   //   duration: 1800,
      //   //   easing: 'easeInOutSine'
      //   // },
      //   easing: 'easeInOutCirc',
      //   duration: 1000,
      // }, 500)

    
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

.features 
  @apply flex justify-center items-center text-center mx-auto
  .feature
    img
      width: 200px
      margin: auto
      z-index: 100
    h4
      @apply relative bottom-14


nav
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
</style>
