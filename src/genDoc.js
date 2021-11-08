import RTASS from "./RTASS.json";

let doc = "";
Object.keys(RTASS.factors).map(factorKey => {
    doc += RTASS.factors[factorKey].cnName + "\n\n";
    doc += "主要评估本次演练，" + RTASS.factors[factorKey].cnDesc + "\n"
    RTASS.factors[factorKey].cnOptions.map(cnOptions=>{
        doc += cnOptions + "\n";
    });
});
console.log(doc);