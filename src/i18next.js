import i18n from "i18next"
import {initReactI18next} from "react-i18next"

import engLang from "./language/en.json"
import trLang from "./language/tr.json"

const resources = {
    en : {
        translation : engLang,
    },
    tr : {
        translation : trLang,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",

    interpolation : {
        escapeValue : false,
    },
});

export default i18n;