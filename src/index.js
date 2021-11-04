import RTACSS from "./RTACSS.json";
import Vue from "vue/dist/vue.esm.js";
import "style-loader!css-loader!./main.css";

new Vue({
  el: "#pane1",
  data: {
    RTACSS: RTACSS,
    lang: RTACSS.defaultLang,
    factorVal: {},
    scores: {},
    risks: {},
  },
  methods: {
    calcScore: function () {

      Object.keys(RTACSS.factorTypes).map((factorTypeKey) => {
        RTACSS.factorTypes[factorTypeKey].factorGroups.map((factorGroupKey) => {
          let score = 0;
          RTACSS.factorGroups[factorGroupKey].factors.map((factorKey) => {
            let modulus = RTACSS.factorGroups[factorGroupKey].weight[factorKey];
            score += modulus * this.factorVal[factorKey];
          });
          let finalScore = (
            score / RTACSS.factorGroups[factorGroupKey].factors.length
          ).toFixed(2);
          this.scores[factorGroupKey] = finalScore;
          this.risks[factorGroupKey] = RTACSS.risks[Math.ceil(finalScore)];
        });
      });

      Object.keys(RTACSS.scoring).map((scoringKey) => {
        let score = 0;
        RTACSS.scoring[scoringKey].factorGroups.map((factorGroupKey) => {
          let modulus = RTACSS.scoring[scoringKey].weight[factorGroupKey];
          if(modulus<0){
            score += 9 - Math.abs(modulus) * this.scores[factorGroupKey];
          }else{
            score += modulus * this.scores[factorGroupKey];
          }
        });
        let finalScore = (
          score / RTACSS.scoring[scoringKey].factorGroups.length
        ).toFixed(2);
        this.scores[scoringKey] = finalScore;
        this.risks[scoringKey] = RTACSS.risks[Math.ceil(finalScore)];
      });
      this.$forceUpdate();
    },
  },
  mounted() {
    this.calcScore();
  },
  created() {
    Object.keys(RTACSS.factors).map((factorKey) => {
      this.factorVal[factorKey] = Math.floor(Math.random() * 10);
    });
    Object.keys(RTACSS.factorGroups).map((factorGroupKey) => {
      this.scores[factorGroupKey] = 0;
      this.risks[factorGroupKey] = RTACSS.risks[0];
    });
    Object.keys(RTACSS.scoring).map((scoringKey) => {
      this.risks[scoringKey] = RTACSS.risks[0];
    });
  },
});
