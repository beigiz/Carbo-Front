<template>
  <div class="landing pb-12 px-12">
    <div class="landing__intro xl:flex-row-reverse flex-col xl:px-16 pt-12">
      <div class="landing__intro__logo pl-0 mb-4 xl:mb-0 xl:pl-4"><img src="@/assets/img/logo-cut.png" alt=""></div>
      <div class="landing__intro__moto pr-0 mb-4 xl:mb-0 xl:pr-4 xl:pr-8 pr-0 text-right">
        <h2 class="text-white font-extrabold text-5xl gradient-text">اسم اینجاست</h2>
        <h3 class="text-white font-semibold text-2xl gradient-text">یک موتوی جذاب  هم زیرش داریم</h3>
        <h5 class="text-white">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر
          آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</h5>
      </div>
    </div>
    <div class="card landing__card xl:absolute justify-center relative xl:bottom-16 xl:mt-0 mt-4 shadow-lg">

      <div class="content flex xl:flex-row flex-col-reverse justify-center items-center px-8 py-16">

        <div class="landing__card__action w-full flex-1 flex flex-col xl:pr-4 pr-0">
          <div class="w-full ex-input ex-input-large mt-3">
            <input v-model="usdt_amount" class="" id="grid-password" inputmode="numeric" placeholder="example@gmail.com">
          </div>
          <button class="ex-btn w-full bg-g2 ">ارسال</button>
        </div>
        <div class="landing__card__text font-bold xl:pl-4 pl-0 flex-1 text-3xl  text-white" dir="rtl">
          برای خبردار شدن از اتفاقات جذاب ایمیلت رو وارد کن!
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){

      let h = window.innerHeight
      console.log(h, document.getElementsByClassName('landing')[0].style);
      document.getElementsByClassName('landing')[0].style.minHeight = `${h}px`

      VanillaTilt.init(document.querySelector(".card"), {
          max: 10,
          speed: 100,
          perspective: 2000,
          glare: true,
          "max-glare": 0.5,
        });
    }
  }
</script>

<style scoped>

</style>