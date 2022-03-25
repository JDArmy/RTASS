import en from './en/index.json';
import cn from './cn/index.json';
import enRTASS from './en/RTASS.json';
import cnRTASS from '../RTASS.json';
import { createI18n } from "vue3-i18n";

en.RTASS = enRTASS;
cn.RTASS = cnRTASS;

const messages = {
  en: en,
  cn: cn,
};

const languages = {
  en: "English", 
  cn: "中文"
};

const i18n = createI18n({
  locale: "cn",
  messages: messages,
});

export default i18n;
export {i18n, languages};