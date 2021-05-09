<template>
  <div class="container">
    <!-- <div class="intro__background"></div> -->

  <section>
    <h1>Alpha Exchange</h1>
    <h2>صرافـی آلفـا</h2>
    <h3>بهترین قیمت در سریع ترین زمان ممکن</h3>
  </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo,
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

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/


h1 {
  font-size: 36px;
  font-weight: 800;
}
h2 {
  font-size: 36px;
  font-weight: 600;
}

h3{
  font-size: 28px;
  font-weight: 500;
}
.container {
  background: rgb(222,168,144);
background: linear-gradient(45deg, rgba(222,168,144,1) 0%, rgba(232,154,187,1) 50%, rgba(202,157,214,1) 100%);
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
