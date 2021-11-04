import BA2CS2 from "./BA2CS2.json";
import Vue from "vue/dist/vue.esm.js";
import "style-loader!css-loader!./main.css";

new Vue({
  el: "#pane1",
  data: {
    BA2CS2: BA2CS2,
    lang: "cn",
    factorVal: {},
    scores: {},
    risks: {},
  },
  methods: {
    calcScore: function () {
      Object.keys(BA2CS2.factorTypes).map((factorTypeKey) => {
        BA2CS2.factorTypes[factorTypeKey].factorGroups.map((factorGroupKey) => {
          let score = 0;
          BA2CS2.factorGroups[factorGroupKey].factors.map((factorKey) => {
            let modulus = BA2CS2.factorGroups[factorGroupKey].weight[factorKey];
            score += modulus * this.factorVal[factorKey];
          });
          let finalScore = (
            score / BA2CS2.factorGroups[factorGroupKey].factors.length
          ).toFixed(2);
          this.scores[factorGroupKey] = finalScore;
          this.risks[factorGroupKey] = BA2CS2.risks[Math.ceil(finalScore)];
        });
      });

      Object.keys(BA2CS2.scoring).map((scoringKey) => {
        let score = 0;
        BA2CS2.scoring[scoringKey].factorGroups.map((factorGroupKey) => {
          let modulus = BA2CS2.scoring[scoringKey].weight[factorGroupKey];
          if(modulus<0){
            score += 9 - Math.abs(modulus) * this.scores[factorGroupKey];
          }else{
            score += modulus * this.scores[factorGroupKey];
          }
        });
        let finalScore = (
          score / BA2CS2.scoring[scoringKey].factorGroups.length
        ).toFixed(2);
        this.scores[scoringKey] = finalScore;
        this.risks[scoringKey] = BA2CS2.risks[Math.ceil(finalScore)];
      });
      this.$forceUpdate();
    },
  },
  mounted() {
    this.calcScore();
  },
  created() {
    Object.keys(BA2CS2.factors).map((factorKey) => {
      this.factorVal[factorKey] = Math.floor(Math.random() * 10);
    });
    Object.keys(BA2CS2.factorGroups).map((factorGroupKey) => {
      this.scores[factorGroupKey] = 0;
      this.risks[factorGroupKey] = BA2CS2.risks[0];
    });
    Object.keys(BA2CS2.scoring).map((scoringKey) => {
      this.risks[scoringKey] = BA2CS2.risks[0];
    });
  },
});
