<template>
  <div class="">
    <!-- <div class="intro__background"></div> -->
  <nav class="my-4 mx-8 p-4 flex items-center">
    <ul class="flex-1 bg-white mr-4 px-4 shadow-sm py-2 rounded-md">
      <li v-for="(link , i) in links" :key="i" class="py-2 px-4">{{link.name}}</li>
    </ul>
    <div @click="$toast(msg, 'success', 4000)" class=""><img src="@/assets/img/logo.png" alt=""></div>
  </nav>
  <section dir="rtl" class="main-section px-24">

    <div class="moto flex justify-center items-center flex-1 flex-col">
        <div id="swapMoney-animation"></div>
        <div class="moto-text">
          <h1>Carbo Exchange</h1>
          <h3>معامله‌ای سریع و مطمئن</h3>
        </div>
    </div>

    <div class="flex justify-center px-8 pb-8 items-center flex-1">
      
      <div class="purchase-card bg-white shadow-xl p-8 w-full rounded-lg">

          <div dir="ltr" class="wrapper">
            <div id="tab-switch" class="e-tab-switch text-gray-800 text-center" :class="{'left': ExchangeRequestType == ExchangeRequestTypeEnum.BUY, 'left': ExchangeRequestType == ExchangeRequestTypeEnum.SELL}">
              <div class="e-tab" @click="ExchangeRequestType = ExchangeRequestTypeEnum.BUY" :class="{'active': ExchangeRequestType == ExchangeRequestTypeEnum.BUY}" >میخواهم تتر بخرم</div><!--
          --><div class="e-tab" @click="ExchangeRequestType = ExchangeRequestTypeEnum.SELL" :class="{'active': ExchangeRequestType == ExchangeRequestTypeEnum.SELL}" >میخواهم تترم را بفروشم</div>
            </div>
          </div>

        <template v-if="currentState == currentStateEnum.TETHER_AMOUNT">
          <div class="price-box rounded-md p-4 my-4 text-lg">
            <span>{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? 'قیمت خرید از ما' : 'قیمت فروش به ما'}}: </span> <span class="font-semibold text-xl" v-if="tetherPrice">{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY ? tetherPrice.buy_price : tetherPrice.sell_price) | currency}}</span> <span class="toman">تومان</span>
          </div>

          <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.BUY">
            <div class="w-full ex-input">
              <label class="">می دهید (تومان)</label>
              <input @keyup.enter="startTetherRequest"
                @keyup="tomanAmountUpdated"
                :value="toman_amount"
                @input="(e) => handleLiveInput(e, 'toman_amount')"
                id="grid-password" inputmode="numeric" placeholder="مبلغ">
            </div>
            <div class="w-full ex-input">
              <label class="">می گیرید (تتر)</label>
              <input @keyup.enter="startTetherRequest"
                @keyup="tetherAmountUpdated"
                :value="usdt_amount"
                @input="(e) => handleLiveInput(e, 'usdt_amount')"
                id="grid-password" inputmode="numeric"
                placeholder="مقدار تتر درخواستی">
            </div>
          </template>

          <template v-else>
            <div class="w-full ex-input">
              <label class="">می دهید (تتر)</label>
              <input @keyup.enter="startTetherRequest"
                @keyup="tetherAmountUpdated"
                :value="usdt_amount"
                @input="(e) => handleLiveInput(e, 'usdt_amount')"
                id="grid-password" inputmode="numeric"
                placeholder="مقدار تتر">
            </div>
            <div class="w-full ex-input">
              <label class="">می گیرید (تومان)</label>
              <input @keyup.enter="startTetherRequest"
                @keyup="tomanAmountUpdated"
                :value="toman_amount"
                @input="(e) => handleLiveInput(e, 'toman_amount')"
                id="grid-password" inputmode="numeric"
                placeholder="مبلغ درخواستی">
            </div>
          </template>

          <div class="flex mt-12">
            <!-- <div class="flex-1 flex justify-start items-end"><span>مبلغ نهایی:</span> 
            <span class="text-lg final-price font-semibold">{{ final_price | currency}} </span> تومان </div> -->
            <div class="flex-1">
              <button class="ex-btn w-full bg-g2" @click="startTetherRequest">مرحله بعد</button>
            </div>
          </div>
        </template>

        <template v-else-if="currentState == currentStateEnum.PHONE_NUMBER">
          <div class="price-box rounded-md p-4 my-4 text-lg">
            <span>{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? 'قیمت خرید از ما' : 'قیمت فروش به ما'}}: </span> <span class="font-semibold text-xl" v-if="tetherPrice">{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? tetherPrice.buy_price : tetherPrice.sell_price | currency}}</span> <span class="toman">تومان</span>
          </div>

          <div class="w-full ex-input">
            <label class="">شماره همراه</label>
            <input @keyup.enter="sendCode" v-model="phone_number" class="" id="grid-password" inputmode="numeric" placeholder="شماره تلفن را وارد کنید">
          </div>

          <div class="flex mt-12">
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="currentState = currentStateEnum.TETHER_AMOUNT">مرحله قبل</button>
            </div>
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="sendCode">ارسال کد تایید</button>
            </div>
          </div>
        </template>

        <template v-else-if="currentState == currentStateEnum.OTP">
          <div class="price-box rounded-md p-4 my-4 text-lg">
            <span>{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? 'قیمت خرید از ما' : 'قیمت فروش به ما'}}: </span> <span class="font-semibold text-xl" v-if="tetherPrice">{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? tetherPrice.buy_price : tetherPrice.sell_price | currency}}</span> <span class="toman">تومان</span>
          </div>

          <div class="w-full ex-input">
            <label class="">کد تایید</label>
            <input @keyup.enter="checkCode" v-model="user_code" class="" id="grid-password" inputmode="numeric" placeholder="12345">
          </div>

          <div class="flex mt-12">
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="currentState = currentStateEnum.PHONE_NUMBER">ویرایش شماره</button>
            </div>
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="checkCode">تایید</button>
            </div>
          </div>
        </template>

        <template v-else-if="currentState == currentStateEnum.ENTER_ACCOUNT_INFO">

          <div class="price-box rounded-md p-4 my-4 text-lg">
            <span> قیمت فروش به ما</span> <span class="font-semibold text-xl" v-if="tetherPrice">{{ tetherPrice.sell_price }}</span> <span class="toman">تومان</span>
            <br />
            <span>شما <span style="color: green">{{ usdt_amount }}</span> تتر می دهید و <span style="color: green">{{ toman_amount }}</span> تومان می گیرید</span>
          </div>

          <div class="w-full ex-input">
            <label class="">شماره کارت</label>
            <input @keyup.enter="submitAccountInfo" v-model="userProfileToEdit.card_number" class="" id="grid-password" placeholder="شماره کارت">
            <label class="">نام صاحب حساب</label>
            <input @keyup.enter="submitAccountInfo" v-model="userProfileToEdit.first_name" class="" id="grid-password" placeholder="نام و نام خانوادگی صاحب حساب">
          </div>

          <div class="flex mt-12">
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="currentState = currentStateEnum.TETHER_AMOUNT">بازگشت</button>
            </div>
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="submitAccountInfo">مرحله بعد</button>
            </div>
          </div>
        </template>

        <template v-else-if="currentState == currentStateEnum.ENTER_REQUEST_INFO">
          
          <div class="price-box rounded-md p-4 mt-4 text-lg">
            <span>{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? 'قیمت خرید از ما' : 'قیمت فروش به ما'}}: </span> <span class="font-semibold text-xl" v-if="tetherPrice">{{(ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? tetherPrice.buy_price : tetherPrice.sell_price | currency}}</span> <span class="toman">تومان</span>
            <br />
            <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.BUY">
              <span>شما <span style="color: green">{{ toman_amount }}</span> تومان می دهید و <span style="color: green">{{ usdt_amount }}</span> تتر می گیرید</span>
            </template>
            <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.SELL">
              <span style="font-size: 13px;">شما <span style="color: green">{{ usdt_amount }}</span> تتر می دهید و <span style="color: green">{{ toman_amount }}</span> تومان می گیرید</span>
            </template>
          </div>

          <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.BUY">
            <div class="w-full ex-input">
              <label class="">آدرس  کیف پول</label>
              <input @keyup.enter="submitTetherRequestInfo" v-model="usdtWalletAddress" class="" id="grid-password" placeholder="آدرس واریز TRC20">
              <div class="px-4 pt-2" style="color: #777777; font-size: 14px;">
                کارمزد انتقال تتر TRC20 برابر با 1 USDT است که مربوط به شبکه بلاک چین بوده و کربو ذی‌تفغ نمی باشد
              </div>
            </div>
          </template>

          <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.SELL">
            <div class="px-4">
              لطفا {{ usdt_amount }} تتر TRC20 به کیف پول زیر ارسال نمایید
              <br />
              <span style="color: #CC0000;">مقدار تتر ارسالی، بعد از کسر کارمزد می باشد</span>
            </div>
            <div class="w-full ex-input pt-4" @click="copyWalletAddressToClipboard">
              <label class="">آدرس کیف پول <span style="text-decoration: underline; font-weight: bold; font-size: 13px">(کپی کردن)</span></label>
              <input class="my-2" id="ourWalletAddress" disabled type="text" value="THRmd715Zo4NYXF8CvPDZ8rvTkftk2wGfw" style="text-align: center;">
            </div>
            <div class="px-4 pt-4">
              سپس txId تراکنش را در کادر زیر وارد کنید.
            </div>
            <div class="w-full ex-input">
              <label class="">کد txId</label>
              <input @keyup.enter="submitTetherRequestInfo" v-model="txId" class="" id="grid-password" placeholder="txId تراکنش">
            </div>
          </template>

          <div class="flex mt-6">
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="currentState = currentStateEnum.TETHER_AMOUNT">مرحله قبل</button>
            </div>
            <div class="flex-1 m-1">
              <button class="ex-btn w-full bg-g2" @click="submitTetherRequestInfo">ثبت درخواست</button>
            </div>
          </div>
        </template>

        <template v-else-if="currentState == currentStateEnum.FINISHED">
          
          <div class="price-box rounded-md px-6 pt-4 my-4 text-lg">
            <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.BUY">
              درخواست شما با موفقیت ثبت شد!
            </template>
            <template v-else>
              درخواست شما با موفقیت ثبت شد و پس از تایید، در سریع ترین زمان ممکن واریز می شود
            </template>
          </div>
          <div class="px-12">
            <div>کد رهگیری شما</div>
            <div class="pb-4 text-lg" style="letter-spacing: 3px; font-weight: 500; color: green;">{{ exchangeRequestResult.ref_code }}</div>
            <template v-if="ExchangeRequestType == ExchangeRequestTypeEnum.BUY">
              <div>لطفا مبلغ <span style="color: #004400">{{ toman_amount }}</span> تومان به شماره کارت </div>
              <div class="my-2 text-lg">5022-2910-9198-2353</div>
              <div>به نام امیرحسین کرمی واریز نموده و رسید پرداخت را به همراه کد رهگیری به واتساپ این شماره ارسال کنید</div>
            </template>
            <template v-else>
              <div>پشتیبانی واتساپ</div>
            </template>
            <div class="mt-4"><a href="https://wa.me/+989120350075" target="_blank" style="color: blue; text-decoration: underline; font-size: 18px;">09120350075</a></div>
          </div>
        </template>
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
</template>۱

<script>
import Logo from '~/components/Logo.vue'
import lottie from 'lottie-web'
import Vue from 'vue'
import swapMoney from '~/assets/img/43059-bitcoin-trade.json'
const currentStateEnum = Object.freeze({
  TETHER_AMOUNT: 0,
  PHONE_NUMBER: 1,
  OTP: 2,
  ENTER_ACCOUNT_INFO: 3,
  ENTER_REQUEST_INFO: 4,
  VERIFY_REQUEST: 5,
  FINISHED: 6
})
const ExchangeRequestTypeEnum = Object.freeze({
  BUY: 0,
  SELL: 1
})
const LastChangedInputEnum = Object.freeze({
  USDT: 0,
  IRT: 1
})
export default {
  watch: {
    ExchangeRequestType(_newValue, _oldValue) {
      this.resetComponent()
    },
    userProfile(newValue, _oldValue) {
      this.userProfileToEdit = Object.assign({}, newValue)
    }
  },
  computed: {
    userProfile(){
      return this.$store.getters.userProfile
    },
    tetherPrice(){
      return this.$store.getters.tetherPrice;
    },
    final_price() {
      if(!this.tetherPrice) {
        return 0
      }
      return (this.ExchangeRequestType == ExchangeRequestTypeEnum.BUY) ? this.usdt_amount * this.tetherPrice.buy_price : this.usdt_amount * this.tetherPrice.sell_price 
    },
  },
  components: {
    Logo,
  },
  data() {
    return {
      msg: 'اطلاعات وارد شده صحیح نمی باشد لطفا اطلاع صحیح وارد کنید',
      loading: false,
      userProfileToEdit: null,
      ExchangeRequestTypeEnum,
      currentStateEnum,
      currentState: currentStateEnum.TETHER_AMOUNT,
      swapMoney,
      ExchangeRequestType: ExchangeRequestTypeEnum.BUY,
      exchangeRequestResult: null,

      usdtWalletAddress: '',
      phone_number: '',
      user_code: '',
      lastChangedInput: null,
      usdt_amount: '',
      toman_amount: '',
      txId: '',

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
    copyWalletAddressToClipboard(){
      /* Get the text field */
      var copyText = document.getElementById("ourWalletAddress");

      copyText.removeAttribute('disabled');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      /* Copy the text inside the text field */
      document.execCommand("copy");
      copyText.setAttribute('disabled', true);

      /* Alert the copied text */
      alert('در کلیپ بورد کپی شد');
    },
    startTetherRequest(){
      if(!this.toman_amount) {
        alert('لطفا مقدار درخواستی را وارد کنید')
        return
      }
      if(this.ExchangeRequestType == ExchangeRequestTypeEnum.BUY && this.usdt_amount > 1000){
        alert('حداکثر 1000 تتر قابل خرید می باشد')
        return
      }
      if(!this.isAuthenticated) {
        this.currentState = currentStateEnum.PHONE_NUMBER
      } else {
        if (this.ExchangeRequestType == this.ExchangeRequestTypeEnum.BUY) {
          this.currentState = currentStateEnum.ENTER_REQUEST_INFO
        } else {
          this.currentState = currentStateEnum.ENTER_ACCOUNT_INFO
        }
      }
    },
    submitAccountInfo(){
      if(this.loading) {
        return
      }
      if(!this.userProfileToEdit.card_number){
        alert('لطفا شماره کارت را وارد کنید')
        return
      }
      if(!this.userProfileToEdit.first_name){
        alert('لطفا نام صاحب حساب را وارد کنید')
        return
      }
      if(this.userProfile.first_name == this.userProfileToEdit.first_name
        && this.userProfile.card_number == this.userProfileToEdit.card_number){
        this.currentState = currentStateEnum.ENTER_REQUEST_INFO
        return
      }
      this.loading = true
      this.$axios
        .patch('v1/user_profile/user-profile/', {
          card_number: this.userProfileToEdit.card_number,
          first_name: this.userProfileToEdit.first_name
        },{
          headers: {
              Authorization: 'Token ' + this.$store.getters.token
          }
        })
        .then(res => {
          this.$store.commit('setUserProfile', res.data)
          this.currentState = currentStateEnum.ENTER_REQUEST_INFO
        })
        .catch(err => {
          console.log(err)
          if(err.response) {
            alert(JSON.stringify(err.response.data))
          } else {
            alert('خطا در ارتباط با سرور')
          }
        }).finally(() => {
          this.loading = false
        })
    },
    submitTetherRequestInfo(){
      if(this.loading) {
        return
      }
      if(this.ExchangeRequestType == ExchangeRequestTypeEnum.BUY) {
        if(!this.usdtWalletAddress) {
          alert('لطفا آدرس کیف پول را وارد کنید')
          return
        }
        this.loading = true
        let data = {
          trading_pair: this.tetherPrice.pk,
          from_amount: this.usdt_amount,
          to_amount: Number(this.toman_amount.replaceAll(',', '')),
          type: this.ExchangeRequestType,
          trc20_payout_address: this.usdtWalletAddress
        }
        this.$axios
          .post('v1/core/exchange/usdt/irt/buy/request/', data,{
            headers: {
                Authorization: 'Token ' + this.$store.getters.token
            }
          })
          .then(res => {
            window.location = res.data.idpay_transaction.payment_url
          })
          .catch(err => {
            console.log(err)
            if(err.response) {
              alert(JSON.stringify(err.response.data))
            } else {
              alert('خطا در ارتباط با سرور')
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
      if(this.ExchangeRequestType == ExchangeRequestTypeEnum.SELL) {
        if(!this.txId) {
          alert('لطفا txId تراکنش را وارد کنید')
          return
        }
        this.loading = true
        let data = {
          trading_pair: this.tetherPrice.pk,
          from_amount: this.usdt_amount,
          to_amount: Number(this.toman_amount.replaceAll(',', '')),
          type: this.ExchangeRequestType,
          payout_card_number: this.userProfile.card_number,
          transaction_hash: this.txId
        }
        this.$axios
          .post('v1/core/exchange/usdt/irt/sell/request/', data,{
            headers: {
                Authorization: 'Token ' + this.$store.getters.token
            }
          })
          .then(res => {
            this.exchangeRequestResult = res.data
            this.currentState = currentStateEnum.FINISHED
          })
          .catch(err => {
            console.log(err)
            if(err.response) {
              alert(JSON.stringify(err.response.data))
            } else {
              alert('خطا در ارتباط با سرور')
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    resetComponent(){
      this.currentState = currentStateEnum.TETHER_AMOUNT
      this.usdtWalletAddress = '';
      this.phone_number = '';
      this.user_code = '';
      this.lastChangedInput = null;
      this.usdt_amount = '';
      this.toman_amount = '';
      this.txId = '';
    },
    tomanAmountUpdated(){
        const num = this.toEnglishNumber(String(this.toman_amount));
        this.toman_amount = this.priceFormat(num);
        let str = String(Number(num) / Number(
          this.ExchangeRequestType == ExchangeRequestTypeEnum.BUY ? this.tetherPrice.buy_price : this.tetherPrice.sell_price
        ))
        this.usdt_amount = Number(this.cutNDigitAfterPrecision(str, 2));
        this.lastChangedInput = LastChangedInputEnum.IRT
    },
    tetherAmountUpdated(){
        let str = String(this.usdt_amount)
        this.usdt_amount = Number(this.cutNDigitAfterPrecision(str, 2));
        this.toman_amount = this.priceFormat(Number(this.usdt_amount) * (
          this.ExchangeRequestType == ExchangeRequestTypeEnum.BUY ? this.tetherPrice.buy_price : this.tetherPrice.sell_price
        ));
        this.lastChangedInput = LastChangedInputEnum.USDT
    },
    sendCode() {
      if(this.loading) {
        return
      }
      let phone_numberEn = this.convertPersian(this.phone_number)
      let validation = /^(\0|0)?9\d{9}$/g
      if (phone_numberEn.match(validation)) {
        this.loading = true
        this.$axios
          .post('v1/user_profile/send-code/', {
            phone_number: phone_numberEn
          })
          .then(res => {
            this.currentState = currentStateEnum.OTP
            this.user_code = res.data.code
          })
          .catch(err => {
            console.log(err)
            if(err.response) {
              alert(JSON.stringify(err.response.data))
            } else {
              alert('خطا در ارتباط با سرور')
            }
          })
          .finally(() => {
            this.loading = false
          })
      } else if (phone_numberEn == '') {
        // phone number empty
        alert('لطفا یک شماره معتبر وارد کنید')
      } else {
        // phone number invalid
        alert('لطفا یک شماره معتبر وارد کنید')
      }
    },

    checkCode() {
      if(this.loading) {
        return
      }
      this.loading = true
      this.$axios
        .post('v1/user_profile/verify-code/', {
          phone_number: this.convertPersian(this.phone_number),
          code: this.convertPersian(this.user_code)
        })
        .then(res => {
          this.$store.commit('setUserProfile', res.data)
          this.$store.commit('setToken', res.data.token)
          this.startTetherRequest()
        })
        .catch(err => {
          console.log(err)
          if(err.response) {
            if (err.response.status == 403) {
              alert('کد وارد شده نادرست است')
            } else {
              alert(JSON.stringify(err.response.data))
            }
          } else {
            alert('خطا در ارتباط با سرور')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  created() {
    if(this.userProfile) {
      this.userProfileToEdit = Object.assign({}, this.userProfile)
    }
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
