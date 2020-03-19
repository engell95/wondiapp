import React, {Component, useState , useEffect}from 'react';
import { View,YellowBox,NetInfo,StatusBar,BackHandler} from 'react-native';
import Router from './app/routers';
import { Provider } from "react-redux";
import ConfigureStore from "@redux/ConfigureStore";
import NavigationService from '@config/services/NavigationService';
import {loadSettings} from '@config/SettingsStorage';
import I18n from '@config/services/LanguageService';
import {Sentry,SentrySeverity,SentryLog } from 'react-native-sentry';
import { Toast } from 'react-native-redux-toast';
import SplashScreen from 'react-native-splash-screen';
import OfflineNotice from '@components/general/OfflineComponent';

//configure sentry and warning
Sentry.config("https://904624f63bd944d4a3b614483c92694e:3e60d75bac0d4e5991ecb35d064d5583@sentry.io/1493812", {
  deactivateStacktraceMerging: false, // default: true | Deactivates the stack trace merging feature
  logLevel: SentryLog.Debug, // default SentryLog.None | Possible values:  .None, .Error, .Debug, .Verbose
  disableNativeIntegration: false, // default: false | Deactivates the native integration and only uses raven-js
  handlePromiseRejection: true // default: true | Handle unhandled promise rejections
  // sampleRate: 0.5 // default: 1.0 | Only set this if you don't want to send every ev
}).install();
Sentry.setTagsContext({
  "environment": "production",
  "react": true
});
YellowBox.ignoreWarnings(['WebView'])
console.disableYellowBox = true;


function Wondiapp() {
  
  const [IsConnected, setIsConnected] = useState(true);
  const [IsBackHandler, setIsBackHandler] = useState(true);

  useEffect(()=>{
    NetInfo.isConnected.addEventListener('connectionChange', handleConnectionChange);
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    SplashScreen.hide(); 
  })

  function handleConnectionChange(isConnected){
    setIsConnected(isConnected)
  }

  function handleBackPress(){return true}

  if (!IsConnected) {
    return <OfflineNotice/>;
  }

  return ( 
    <View style={{ flex: 1,backgroundColor:'white'}}>
      <StatusBar hidden={false} barStyle="dark-content" translucent backgroundColor={"transparent"}/>
      <Provider store={ConfigureStore}>
        <Router
          ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
        />
        <Toast messageStyle={{ color: 'white' }} />
      </Provider>
    </View>
  )
}

export default  class App extends Component {

  render() {
    return (
      <Wondiapp/>
    );
  }
}
