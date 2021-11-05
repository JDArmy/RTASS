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
    levels: {},
  },
  methods: {
    caclFinally: function () {
      //FactorGroup的值从factorVal计算
      this.calcScores(RTASS.factorGroups, this.factorVal);
      //Scoring的值从scores获取
      this.calcScores(RTASS.scoring, this.scores);
      //刷新界面
      this.$forceUpdate();
    },
    calcScores: function (Dimension, Scores) {
      Object.keys(Dimension).map((key) => {
        let score = 0;
        Object.keys(Dimension[key].weight).map((factorKey) => {
          let modulus = Dimension[key].weight[factorKey];
          if (modulus < 0) {
            score += 9 + modulus * Scores[factorKey];
          } else {
            score += modulus * Scores[factorKey];
          }
        });
        let finalScore = (
          score / Object.keys(Dimension[key].weight).length
        ).toFixed(2);
        this.scores[key] = finalScore;
        this.levels[key] = RTASS.levels[Math.ceil(finalScore)];
      });
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
    this.caclFinally();
  },
  created() {
    Object.keys(RTASS.factors).map((factorKey) => {
      this.factorVal[factorKey] = 9;//Math.floor(Math.random() * 10);
    });
    Object.keys(RTASS.factorGroups).map((factorGroupKey) => {
      this.scores[factorGroupKey] = 0;
      this.levels[factorGroupKey] = RTASS.levels[0];
    });
    Object.keys(RTASS.scoring).map((scoringKey) => {
      this.levels[scoringKey] = RTASS.levels[0];
    });

    let lang = this.getUrlParameter("lang");
    if (lang != "") {
      this.lang = lang;
    }
  },
});
