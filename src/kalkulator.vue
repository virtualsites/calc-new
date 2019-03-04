<template>
  <div id="mbank-app">
    <div style="height: 100px; width: auto"></div>
    <div class="container">
      <div class="row">
        <div class="col-sm-7">
          <h1 class="app-header">Pierwszy kredyt gotówkowy</h1>
          <div class="moneyNeeded">
            Ile pieniędzy potrzebujesz?
            <span>{{Math.round(money / 100) * 100}} zl</span>
          </div>
          <div class="moneyValue">
            <VueSlideBar v-model="money" :min="500" :max="150000" :range="sliderMoney.range">
              <template slot="tooltip" slot-scope="tooltip">
                <img
                  class="handle"
                  src="https://s3-eu-west-1.amazonaws.com/landingi-editor-uploads/cmacn0ZG/arrow.png"
                >
              </template>
            </VueSlideBar>
          </div>
          <div class="timeNeeded">
            W jakim czasie chcesz spłacić?
            <span>{{time}} mies.</span>
          </div>
          <div class="timeValue">
            <VueSlideBar v-model="time" :min="3" :max="120" :range="sliderTime.range">
              <template slot="tooltip" slot-scope="tooltip">
                <img
                  class="handle"
                  src="https://s3-eu-west-1.amazonaws.com/landingi-editor-uploads/cmacn0ZG/arrow.png"
                >
              </template>
            </VueSlideBar>
          </div>
          <div id="insurance-checkbox">
            <div class="box">
              <label>
                <input v-model="checked" type="checkbox"> Z ubezpieczeniem
              </label>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div>
            <span class="loanTooltip">Zobacz koszt kredytu</span>
          </div>
          <br>
          <h4 class="monthlyRate">
            Miesięczna rata:
            <span class="monthlyValue">{{Math.round(money / time)}} zl</span>
          </h4>
          <div class="totalCost">
            <div class="intValue">
              Oprocentowanie nominalne w skali roku:
              <span>{{interestValue}}%</span>
            </div>
            <div class="commValue">
              Prowizja:
              <span>{{commissionValue}}%</span>
            </div>
            <div class="loanValue">
              Calkowity koszt kredytu:
              <span>{{Math.round(money * (interestValue / 100))}} zł</span>
            </div>
            <div v-if="checked" class="insValue">
              Miesięczna składka ubezpieczeniowa:
              <span>{{insuranceValue}}%</span>
            </div>
          </div>
          <br>
          <div class="rrsoValue">
            RRSO:
            <span>{{(Math.round(money / time) / 100)}}%</span>
            <br>
            <button type="button" name="button" class="btn">ZŁÓŻ WNIOSEK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlideBar from "vue-slide-bar";
export default {
  data() {
    return {
      checked: false,
      money: "",
      time: "",
      monthlyLoanValue: "",
      totalLoanValue: "",
      sliderMoney: {
        range: [
          {
            label: "500"
          },
          {
            label: "75 000"
          },
          {
            label: "150 000 zl"
          }
        ]
      },
      sliderTime: {
        range: [
          {
            label: "3"
          },
          {
            label: "60"
          },
          {
            label: "120 mies."
          }
        ]
      }
    };
  },
  methods: {},
  components: {
    VueSlideBar
  },
  computed: {
    interestValue: function() {
      if (this.money <= 5000) {
        return (this.interestValue = 9.99);
      } else if (this.money > 5000 && this.money <= 15000) {
        return (this.interestValue = 9.49);
      } else if (this.money > 15000 && this.money <= 50000) {
        return (this.interestValue = 8.99);
      } else if (this.money > 50000) {
        return (this.interestValue = 7.99);
      }
    },
    commissionValue: function() {
      if (
        this.money >= 500 &&
        this.money <= 5000 &&
        this.time >= 3 &&
        this.time <= 96
      ) {
        return (this.commissionValue = 6.99);
      } else if (
        this.money > 5000 &&
        this.money <= 15000 &&
        this.time >= 3 &&
        this.time <= 96
      ) {
        return (this.commissionValue = 6.49);
      } else if (
        this.money > 15000 &&
        this.money <= 30000 &&
        this.time >= 3 &&
        this.time <= 96
      ) {
        return (this.commissionValue = 5.49);
      } else if (this.money > 30000 && this.money <= 50000) {
        return (this.commissionValue = 4.99);
      } else if (this.money > 50000 && this.money <= 100000) {
        return (this.commissionValue = 4.49);
      } else if (this.money > 100000) {
        return (this.commissionValue = 3.99);
      } else if (this.money <= 30000 && this.time <= 96) {
        return (this.commissionValue = 5.49);
      } else if (this.time > 96) {
        return (this.commissionValue = 5.49);
      }
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
</style>
