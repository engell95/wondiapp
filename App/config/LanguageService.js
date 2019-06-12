import I18n  from 'react-native-i18n';
import AsyncStorage from '@react-native-community/async-storage';
import es from './translator/es.json';
import en from './translator/en.json';


I18n.defaultLocale = 'es';
I18n.locale = 'es';
I18n.fallbacks = true;
I18n.translations = { es, en };


export default I18n;