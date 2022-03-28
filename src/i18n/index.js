const { createI18n } = require("vue3-i18n");
const en = require('./en/index.json');
const cn = require('./cn/index.json');
en.RTASS = require('./en/RTASS.json');
cn.RTASS = require('../RTASS.json');
en.doc = require('./en/doc.json');
cn.doc = require('./cn/doc.json');

const languages = {
  en: "English", 
  cn: "中文"
};

const messages = {
  en: en,
  cn: cn,
};

const i18n = createI18n({
  locale: "cn",
  messages: messages,
});

exports.i18n = i18n;
exports.languages = languages;