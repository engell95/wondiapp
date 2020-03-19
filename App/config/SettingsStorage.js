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
  theme:1,
};

export const loadSettings = async () => {
  try {
    let languaje  = await AsyncStorage.getItem('languaje');//lenguaje
    let user 	    = await AsyncStorage.getItem('user');//usuario
    let install   = await AsyncStorage.getItem('install');//verificar instalaci;on
    let token 	  = await AsyncStorage.getItem('token');//token de acceso
    let notif 	  = await AsyncStorage.getItem('notif');//notificaciones
    let vibr 	    = await AsyncStorage.getItem('vibr');//vibración
    let tono 	    = await AsyncStorage.getItem('tono');//tono
    let photo 	  = await AsyncStorage.getItem('photo');//foto
    let theme 	  = await AsyncStorage.getItem('theme');//tema de la aplicacion
    if (languaje == null) { 
    	const DEFAULT_SETTINGS = {
  			install: install,
  			user:user,
  			languaje: 'es',
  			token:token,
	      notif:notif,
	      vibr:vibr,
	      tono:tono,
	      photo:photo,
	      theme:theme
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
      	photo:photo,
      	theme:theme
	};
    return DEFAULT_SETTINGS;
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
}

export const saveSettings = (settings) => {
  AsyncStorage.setItem('languaje', settings);
}