import RTASS from "@/RTASS";
import vm from "vm-browserify";
import Chart from "chart.js/auto";
import { i18n } from "@/i18n";

export default {
  data() {
    return {
      RTASS: RTASS,
      plusmode: false,
      vectorVal: {},
      scores: {},
      levels: {},
      scoreVector: "",
      scoreVectorUrl: "",
      charts: {},
    };
  },
  methods: {
    calcFinally: function () {
      // 从 ability 计算 factor 的值，写到 vectorVal 中
      if (this.plusmode) this.calcFactors();
      // processScores 的值从 vectorVal 计算，写到 scores 中
      this.calcScores(RTASS.processScores, this.vectorVal);
      // finalScores 的值从 scores 获取，写到 scores 中
      this.calcScores(RTASS.finalScores, this.scores);
      //根据因子分数生成矢量URL
      this.genVectorUri();
      history.replaceState(null, null, this.scoreVectorUrl);
      //生成雷达图
      if (this.plusmode) this.initCharts();
      //刷新界面
      this.$forceUpdate();
    },
    calcFactors: function () {
      Object.keys(RTASS.factors).map((factorKey) => {
        if (RTASS.factors[factorKey]["vectors"] !== undefined) {
          let vectors = RTASS.factors[factorKey]["vectors"];
          let expression = Object.values(vectors)
            .map((v) => "(" + v.algorithm + ")")
            .join("+");
          let score = vm
            .runInNewContext(
              `(${expression})/${Object.keys(vectors).length}`,
              this.vectorVal
            )
            .toFixed(0);
          this.vectorVal[factorKey] = parseInt(score);
        }
      });
    },
    calcScores: function (Dimension, Scores) {
      Object.keys(Dimension).map((key) => {
        let vectors = Dimension[key]["vectors"];
        let expression = Object.values(vectors)
          .map((v) => "(" + v.algorithm + ")")
          .join("+");
        let score = vm
          .runInNewContext(
            `(${expression})/${Object.keys(vectors).length}`,
            Scores
          )
          .toFixed(2);

        this.scores[key] = parseFloat(score);
        let levelScore = score > 0 && score < 1 ? 1 : score;
        this.levels[key] = Math.floor(levelScore);
      });
    },
    getUrlParameter: function (name) {
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    resetVector: function () {
      Object.keys(RTASS.factors).map((factorKey) => {
        this.vectorVal[factorKey] = 0;
      });
      Object.keys(RTASS.abilities).map((abilityKey) => {
        this.vectorVal[abilityKey] = 0;
      });
      this.calcFinally();
    },
    genVectorUri: function () {
      let vectorStr = "RTASS:" + RTASS.version;
      Object.keys(RTASS.factors).map((factorKey) => {
        vectorStr += `/${factorKey}:${this.vectorVal[factorKey]}`;
      });
      if (this.plusmode) {
        Object.keys(RTASS.abilities).map((abilityKey) => {
          vectorStr += `/${abilityKey}:${this.vectorVal[abilityKey]}`;
        });
      }
      this.scoreVector = vectorStr;
      const language = localStorage.getItem("locale");
      this.scoreVectorUrl =
        "?lang=" +
        language +
        "&plusmode=" +
        this.plusmode +
        "&vector=" +
        this.scoreVector;
    },
    parseVectorUri: function (vectorStr) {
      let vectorVal = {};
      if (vectorStr && /^RTASS:/.test(vectorStr)) {
        vectorStr.split("/").map((vector) => {
          vectorVal[vector.split(":")[0]] = parseInt(vector.split(":")[1]);
        });
      }
      return vectorVal;
    },
    initCharts: function () {
      let references = RTASS.charts.references;
      let chartVals = {};
      Object.keys(references).map((key) => {
        chartVals[key] = this.parseVectorUri(references[key].vectorStr);
      });
      chartVals["current"] = this.vectorVal;
      //render for every chart
      Object.keys(RTASS.charts.data).map((chartKey) => {
        let radarLabels = [];
        let chartDatas = [];
        Object.keys(chartVals).map((key) => {
          chartDatas[key] = [];
        });
        //get scores from each factor or ability
        let factors = RTASS.charts.data[chartKey].factors;
        Object.keys(factors).map((factorKey) => {
          //有abilitiy的因子时
          if (RTASS.factors[factorKey]["vectors"] !== undefined) {
            let abilityVectors = RTASS.factors[factorKey]["vectors"];
            Object.keys(abilityVectors).map((abilityKey) => {
              radarLabels.push(
                i18n.global.t(`RTASS.abilities.${abilityKey}.name`)
              );
              Object.keys(chartVals).map((key) => {
                chartDatas[key].push(chartVals[key][abilityKey]);
              });
            });
          } else {
            //没有abilitiy的因子时
            radarLabels.push(i18n.global.t(`RTASS.factors.${factorKey}.name`));
            if (RTASS.charts.data[chartKey].factors[factorKey] == -1) {
              Object.keys(chartVals).map((key) => {
                chartDatas[key].push(4 - chartVals[key][factorKey]);
              });
            } else {
              Object.keys(chartVals).map((key) => {
                chartDatas[key].push(chartVals[key][factorKey]);
              });
            }
          }
        });

        let datasets = [];
        Object.keys(chartDatas).map((key) => {
          datasets.push({
            label: i18n.global.t(`RTASS.charts.references.${key}.name`),
            // spanGaps: true,
            backgroundColor: references[key].backgroundColor,
            borderColor: references[key].borderColor,
            data: chartDatas[key],
          });
        });
        this.initChart("chart-" + chartKey, radarLabels, datasets);
      });
      //end of render
    },
    initChart: function (id, radarLabels, datasets) {
      const data = {
        labels: radarLabels,
        datasets: datasets,
      };

      const config = {
        type: "radar",
        data: data,
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 4,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };

      if (this.charts[id] !== undefined) {
        this.charts[id].destroy();
      }
      this.charts[id] = new Chart(id, config);
    },
  },
  mounted() {
    this.calcFinally();
  },
  created() {
    [
      ...Object.keys(RTASS.processScores),
      ...Object.keys(RTASS.finalScores),
    ].map((scoreKey) => {
      this.levels[scoreKey] = 0;
    });

    //获取URL plusmode状态
    let plusmode = this.getUrlParameter("plusmode");
    if (plusmode != "") {
      this.plusmode = plusmode == "true";
    }

    //生成随机因子分值
    Object.keys(RTASS.factors).map((factorKey) => {
      this.vectorVal[factorKey] = Math.floor(Math.random() * 5);
    });

    //从URL中取值
    let vectorStr = this.getUrlParameter("vector");
    if (vectorStr != "") {
      this.vectorVal = this.parseVectorUri(vectorStr);
    }

    if ((vectorStr != "" && !this.plusmode) || vectorStr == "") {
      // 生成随机能力值
      Object.keys(RTASS.abilities).map((abilityKey) => {
        this.vectorVal[abilityKey] = Math.floor(Math.random() * 5);
      });
    }
  },
};
