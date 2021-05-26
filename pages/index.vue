<template>
  <div class="landing pb-12 px-12">
    <div class="landing__intro xl:flex-row-reverse flex-col xl:px-16 pt-12">
      <div class="landing__intro__logo pl-0 mb-4 xl:mb-0 xl:pl-4"><img src="@/assets/img/logo-cut.png" alt=""></div>
      <div class="landing__intro__moto pr-0 mb-4 xl:mb-0 xl:pr-4 xl:pr-8 pr-0 text-center">
        <h2 class="text-white font-extrabold text-5xl gradient-text">Carbo Exchange</h2>
        <h3 class="text-white py-2 font-semibold text-2xl gradient-text">گر تو نمی پسندی تغییر کن قضا را</h3>
        <h5 class="text-white pt-2">در حال حاضر این مسئله به وضوح به چشم میخورد که آینده مالی جهان دچار تغییرات گسترده ای در حوزه اقتصاد خواهد شد و با توجه به پیشرفت تکنولوژی و گذار از حالت سنتی به عصر دیجیتالی نیاز های جدیدی در جامعه احساس خواهد شد و ما برآن شدیم گوشه ای از این تغییر باشیم</h5>
      </div>
    </div>
    <div class="card landing__card xl:absolute justify-center relative xl:bottom-16 xl:mt-0 mt-4 shadow-lg">

      <div class="content flex xl:flex-row flex-col-reverse justify-center items-center px-8 py-16">

        <div class="landing__card__action w-full flex-1 flex flex-col xl:pr-4 pr-0">
          <div class="w-full ex-input ex-input-large mt-3">
            <input @keyup.enter="sendContactInfo" v-model="email" class="" id="grid-password" inputmode="numeric" placeholder="example@gmail.com">
            <input @keyup.enter="sendContactInfo" v-model="phone" class="mt-2" id="grid-password" inputmode="numeric" placeholder="شماره تماس (اختیاری)">
          </div>
          <!-- <div class="w-full ex-input ex-input-large">
          </div> -->
          <button class="ex-btn w-full bg-g2 " @click="sendContactInfo">ارسال</button>
        </div>
        <div class="landing__card__text font-bold xl:pl-4 pl-0 flex-1 text-3xl  text-white" dir="rtl">
          برای خبردار شدن از اتفاقات جذاب ایمیلت رو وارد کن!
          <br />
          <span style="font-size:16px">دو ماه کارمزد رایگان در استفاده از کربو اکسچنج</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        phone_number: '',
      }
    },
    methods: {
      sendContactInfo(){
        this.$axios.post('https://t.cafepay.app/api/v1/contact-us/create/',{
          full_name: 'carbo',
          text: this.email ? this.email : 'خالی',
          phone_number: this.phone_number ? this.phone_number : 'خالی'
        }).then((res) => {
          alert('اطلاعات با موفقیت ثبت شد. با تشکر از شما :)')
        })
      }
    },
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