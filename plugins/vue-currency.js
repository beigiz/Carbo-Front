import Vue from 'vue'
import VueCurrencyFilter from "vue-currency-filter";

export default function ({
  $config,
}) {
  //TODO: handle currency dynamically
  Vue.use(VueCurrencyFilter, {
    symbol: "",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: "0",
    symbolPosition: "back",
    symbolSpacing: true
  });
}