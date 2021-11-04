import RTASS from "./RTASS.json";
import Vue from "vue/dist/vue.esm.js";
import "style-loader!css-loader!./main.css";

new Vue({
  el: "#pane1",
  data: {
    RTASS: RTASS,
    lang: RTASS.defaultLang,
    factorVal: {},
    scores: {},
    risks: {},
  },
  methods: {
    calcScore: function () {
      Object.keys(RTASS.factorTypes).map((factorTypeKey) => {
        RTASS.factorTypes[factorTypeKey].factorGroups.map((factorGroupKey) => {
          let score = 0;
          RTASS.factorGroups[factorGroupKey].factors.map((factorKey) => {
            let modulus = RTASS.factorGroups[factorGroupKey].weight[factorKey];
            if (modulus < 0) {
              score += 9 + modulus * this.factorVal[factorKey];
            } else {
              score += modulus * this.factorVal[factorKey];
            }
          });
          let finalScore = (
            score / RTASS.factorGroups[factorGroupKey].factors.length
          ).toFixed(2);
          this.scores[factorGroupKey] = finalScore;
          this.risks[factorGroupKey] = RTASS.risks[Math.ceil(finalScore)];
        });
      });

      Object.keys(RTASS.scoring).map((scoringKey) => {
        let score = 0;
        RTASS.scoring[scoringKey].factorGroups.map((factorGroupKey) => {
          let modulus = RTASS.scoring[scoringKey].weight[factorGroupKey];
          if (modulus < 0) {
            score += 9 + modulus * this.scores[factorGroupKey];
          } else {
            score += modulus * this.scores[factorGroupKey];
          }
        });
        let finalScore = (
          score / RTASS.scoring[scoringKey].factorGroups.length
        ).toFixed(2);
        this.scores[scoringKey] = finalScore;
        this.risks[scoringKey] = RTASS.risks[Math.ceil(finalScore)];
      });
      this.$forceUpdate();
    },
    getUrlParameter: function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
  },
  mounted() {
    this.calcScore();
  },
  created() {
    Object.keys(RTASS.factors).map((factorKey) => {
      this.factorVal[factorKey] = Math.floor(Math.random() * 10);
    });
    Object.keys(RTASS.factorGroups).map((factorGroupKey) => {
      this.scores[factorGroupKey] = 0;
      this.risks[factorGroupKey] = RTASS.risks[0];
    });
    Object.keys(RTASS.scoring).map((scoringKey) => {
      this.risks[scoringKey] = RTASS.risks[0];
    });

    let lang = this.getUrlParameter("lang");
    if (lang != "") {
      this.lang = lang;
    }
  },
});
