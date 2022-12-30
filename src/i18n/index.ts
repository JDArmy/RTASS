import { createI18n } from "vue-i18n";
import en from "./en/index.json";
import cn from "./zh-CN/index.json";

import enRTASS from "./en/RTASS";
import cnRTASS from "../RTASS";

const languages = {
  en: "English",
  cn: "中文",
};

const messages = {
  en: { ...en, RTASS: enRTASS },
  cn: { ...cn, RTASS: cnRTASS },
};

const i18n = createI18n({
  locale: "cn",
  messages: messages,
});

export { i18n, languages };
