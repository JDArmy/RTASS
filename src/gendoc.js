const fs = require("fs");
const path = require("path");
const vm = require("vm");
const {i18n, languages} = require("./i18n/index.js");


const RTASS = require("./RTASS.json");
const LANG = require("./i18n/cn/doc.json");
///////////////////////////////////////////////////////////////////////////////
const readmePath = path.resolve(__dirname+"/../README.md");

function genDoc(RTASS, LANG, docPath){
  let doc = `
# **${RTASS.title} ${RTASS.version}**

> ${RTASS.keyword}
>
> Github: <${RTASS.github}>
>
> ${LANG.license}: ${RTASS.license}
>
> ${LANG.maintainer}: ${RTASS.maintainer}, ${LANG.collaborators}: ${Object.values(RTASS.thanks).map(t => t.name).join(", ")}
>
> ${LANG.onlineCalculator} <${RTASS.calculator}>

## **${LANG.introduction}**

${RTASS.description}

> ${RTASS.rights}

## **${LANG.background}**

${LANG.backgroundDesc}

## **${LANG.methods}**

${vm.runInNewContext(LANG.categoryIntro,{RTASS})}

${Object.values(RTASS.factorCategories).map(fc=>{
  let fcDoc = "";
  fcDoc += fc.name+fc.description;
  fcDoc += vm.runInNewContext(LANG.categoryDesc,{RTASS})+"\n\n";
  fcDoc += RTASS.factorCategories.CF.processScores.map(ps=>"- "+RTASS.processScores[ps].name+RTASS.processScores[ps].description).join("\n");
  return fcDoc;
}).join("\n\n")}

${vm.runInNewContext(LANG.methodsDesc,{RTASS})}

${
  Object.keys(RTASS.finalScores).map(fsKey=>{
    let doc = "";
    let fs = RTASS.finalScores[fsKey];
    //最终分值介绍
    doc += "### **"+fs.name+"["+fsKey+", "+fs.keyword+"]**\n\n";
    doc += vm.runInNewContext(LANG.finalScoresDesc, {RTASS,fs,fsKey})+"\n\n";
    //最终分值算法公式
    doc += "> "+fs.name+": "+fsKey+" = (";
    doc += Object.values(fs.vectors).map(v=>v.algorithm).join("+");
    doc += ")/"+Object.values(fs.vectors).length+"\n\n";
    //算法介绍
    doc += Object.values(fs.vectors).map(v=>v.description).join("");

    return doc;
  }).join("\n\n")
}

${LANG.finalScoresPS}

${LANG.scoringDesc}

${LANG.scoringDescHeader}
| ------------ | ---- |
| 0.00         | ${RTASS.levels[0].name}   |
| 0.01 - 3.99  | ${RTASS.levels[2].name}   |
| 4.00 - 6.99  | ${RTASS.levels[5].name}   |
| 7.00 - 8.99  | ${RTASS.levels[8].name}   |
| 9.00 - 10.00 | ${RTASS.levels[10].name}   |

> ${LANG.scoringDescPS}

## **${LANG.scoreFactor}**

${
  Object.values(RTASS.factorCategories).map(fc=>{
    let doc = "";
    doc += "### **"+fc.name+"**\n\n";
    //因子分类
    doc += vm.runInNewContext(LANG.processScoreDesc,{RTASS,fc})+"\n\n";
    //因子
    doc += fc.processScores.map(ps=>{
      let psDoc = "";
      psDoc += "#### **"+RTASS.processScores[ps].name+"["+ps+"]**\n\n";

      let psVectors = RTASS.processScores[ps].vectors;
      psDoc += vm.runInNewContext(LANG.processScoringDesc,{RTASS,ps,psVectors})+"\n\n";

      psDoc += "> "+RTASS.processScores[ps].name+"["+ps+"] = (";
      psDoc += Object.values(psVectors).map(v=>v.algorithm).join("+");
      psDoc += ")/"+Object.values(psVectors).length+"\n\n";

      //因子介绍
      psDoc += Object.keys(psVectors).map(fkey=>{
        let fDoc = "";
        let f = RTASS.factors[fkey];
        fDoc += "##### **"+f.name+"["+fkey+"]**\n\n";
        fDoc += vm.runInNewContext(LANG.factorDesc,{f})+"\n\n";
        fDoc += f.options.map(o=>"- "+o).join("\n");

        return fDoc;
      }).join("\n\n");

      return psDoc;
    }).join("\n\n");

    return doc;
  }).join("\n\n")
}

## **${LANG.scoreAbility}**

${LANG.scoreAbilityDesc}

${Object.keys(RTASS.factors).map(fKey=>{
  let f = RTASS.factors[fKey];
  let bDoc = "";
  if (f.vectors !== undefined) {
    bDoc += "### **"+f.name+"["+fKey+"]**\n\n";
    bDoc += vm.runInNewContext(LANG.factorScoreDesc,{f,RTASS})+"\n\n";
    //算法
    bDoc += "> "+f.name+"["+fKey+"] = (";
    bDoc += Object.values(f.vectors).map(v=>v.algorithm).join("+");
    bDoc += ")/"+Object.values(f.vectors).length+"\n\n";
    //算法介绍
    bDoc += Object.values(f.vectors).map(v=>v.description).join("")+"\n\n";
    //能力介绍
    bDoc += Object.keys(f.vectors).map(aKey=>{
      let aDoc = "";
      let a = RTASS.abilities[aKey];
      aDoc += "##### **"+a.name+"["+aKey+"]**\n\n";
      aDoc += vm.runInNewContext(LANG.abilityDesc,{a})+"\n\n";
      aDoc += a.options.map(o=>"- "+o).join("\n")+"\n\n";
      return aDoc;
    }).join("");
  }
  return bDoc;
}).join("")}

## **${LANG.vectorString}**

${LANG.vectorStringDesc}

### **${LANG.factor}**

${LANG.vectorStringDescFactorHeader}
| ---------------- | ------- |
${Object.keys(RTASS.factors).map(fKey=>{
  let fDoc = "";
  fDoc += "| "+RTASS.factors[fKey].name+"["+fKey+"]    | 0-4     |";
  return fDoc;
}).join("\n")}

### **${LANG.ability}**

> ${LANG.vectorStringDescPS}

${LANG.vectorStringDescAbilityHeader}
| ---------------- | ------- |
${Object.keys(RTASS.abilities).map(aKey=>{
  let aDoc = "";
  aDoc += "| "+RTASS.abilities[aKey].name+"["+aKey+"]    | 0-4     |";
  return aDoc;
}).join("\n")}

RTASS Base${LANG.vectorStringExample}
RTASS:${RTASS.version}/${Object.keys(RTASS.factors).map(fKey=>{
  let fDoc = "";
  fDoc += fKey+":"+Math.floor(Math.random()*5);
  return fDoc;
}).join("/")}

RTASS Plus${LANG.vectorStringExample}
RTASS:${RTASS.version}/${[...Object.keys(RTASS.factors),...Object.keys(RTASS.abilities)].map(fKey=>{
  let fDoc = "";
  fDoc += fKey+":"+Math.floor(Math.random()*5);
  return fDoc;
}).join("/")}

${LANG.vectorStringExamplePS}

## **${LANG.oneThingAbout}**

${LANG.ontThingAboutDesc}

## **${LANG.collaborateAndContribute}**

${LANG.collaborateAndContributeDesc}

### **${LANG.thanks}**

${Object.values(RTASS.thanks).map(t=>"- "+t.description).join("\n")}

## **${LANG.reference}**

${Object.values(RTASS.references).map(r=>"- "+r.url+", "+r.name+", "+r.description).join("\n")}

## **RTASS ${LANG.onlineCalculator}**

![calculator-cn](./docs/img/calculator-cn.jpg)

${LANG.onlineCalculator}: <${RTASS.calculator}>

  `;
  
  fs.writeFile(docPath, doc, (err) => {
    if (err) throw err;
    console.log('The file has been saved to '+docPath+'!');
  });

}

function genDoc4Lang(lang, docPath) {
  genDoc(i18n.messages[lang].RTASS, i18n.messages[lang].doc, docPath);
}

(()=>{
  Object.keys(languages).map(lang=>{
    let docPath = path.join(__dirname, "../docs", "README_"+lang+".md");
    if(lang=="cn"){
      docPath = path.join(__dirname, "../README.md");
    }
    if(lang=="en"){
      docPath = path.join(__dirname, "../README_en.md");
    }
    genDoc4Lang(lang, docPath);
  });
})();