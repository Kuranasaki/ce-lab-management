import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import th from './th';

const resources = {
  en,
  th,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'th', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    ns: ['common', 'view_experiments', 'view_experiment_detail'], // specify namespaces for each view
    defaultNS: 'common', // default namespace if not specified

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
