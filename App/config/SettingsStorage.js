import AsyncStorage from '@react-native-community/async-storage';

const DEFAULT_SETTINGS = {
  install: null,
  languaje: 'es',
  user:null,
  token:null,
  notif:null,
  vibr:null,
  tono:null,
  photo:null,
};

export const loadSettings = async () => {
  try {
    let languaje = await AsyncStorage.getItem('languaje');
    let user = await AsyncStorage.getItem('user');
    let install = await AsyncStorage.getItem('install');
    let token = await AsyncStorage.getItem('token');
    let notif = await AsyncStorage.getItem('notif');//notificaciones
    let vibr = await AsyncStorage.getItem('vibr');//vibración
    let tono = await AsyncStorage.getItem('tono');//tono
    let photo = await AsyncStorage.getItem('photo');//tono
    if (languaje == null) { 
    	const DEFAULT_SETTINGS = {
  			install: install,
  			user:user,
  			languaje: 'en',
  			token:token,
        notif:notif,
        vibr:vibr,
        tono:tono,
        photo:photo
		};
    	return DEFAULT_SETTINGS; 
    }
    const DEFAULT_SETTINGS = {
  		install: install,
  		languaje: languaje,
  		user:user,
  		token:token,
      notif:notif,
      vibr:vibr,
      tono:tono,
      photo:photo
	};
    return DEFAULT_SETTINGS;
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
}

export const saveSettings = (settings) => {
  AsyncStorage.setItem('languaje', settings);
}