import React, {Component} from 'react';
import { StyleSheet, View, Text, Image,StatusBar,ImageBackground,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'native-base';
import globals from "../../styles/globals";
import {StackActions, NavigationActions} from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashScreen from 'react-native-splash-screen'
//idioma
import I18n from '../../config/LanguageService';
import {loadSettings} from '../../config/SettingsStorage';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
});

const Home = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Home_ini' }),
});

class Initialslide extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showRealApp: false,
      cargando:false,
      isConnected: true,
      slide:[],
      languaje:null,
      install:null,
      notif:null,
      token:null
    };
  }

  Welcome(languaje,user,notif,token){
    const Welcome = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Welcome'}),  
      ],
    });
    this.props.navigation.dispatch(Welcome);
  }
  
  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      if (settings.user !== null & settings.token !== null){
        I18n.locale = settings.languaje
        this.props.navigation.dispatch(Home);
      }
      else if (settings.install !== null) {
        this.Welcome(settings.languaje,settings.user,settings.notif,settings.token);
      }
      else{
        I18n.locale = settings.languaje
        const slides = [
          {
            key: 'somethun',
            title: I18n.t('initial.slidet'),
            text: I18n.t('initial.slidetex'),
            icon: 'ios-images',
            url: require("../../src/intro/wondi1.png"),
            url2: require("../../src/intro/wondi1-1.png")
          },
          {
            key: 'somethun1',
            title: I18n.t('initial.slidet2'),
            text: I18n.t('initial.slidetex2'),
            icon: 'ios-options',
            url: require("../../src/intro/wondi2.png"),
            url2: require("../../src/intro/wondi1-3.png"),
            url3: require("../../src/intro/wondi1-2.png")
          },
          {
            key: 'somethun2',
            title: I18n.t('initial.slidet3'),
            text: I18n.t('initial.slidetex3'),
            icon: 'ios-beer',
            url: require("../../src/intro/wondi3.png"),
            url2: require("../../src/intro/wondi1-4.png"),
            url3: require("../../src/intro/wondi1-2.png")
          },
        ];
        this.setState({slide: slides,languaje:settings.languaje})
      }
      SplashScreen.hide();   
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }
   
  componentDidMount() { 
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  _renderNextButton = () => {
    return (
      <View>
        <Icon
          name="md-arrow-round-forward"
          style={globals.ico_ini}
        />
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View>
        <Icon
          name="md-checkmark"
          style={globals.ico_ini}
        />
      </View>
    );
  }

  static navigationOptions = {
    header: null,
  };

  _onDone = () => {
    this.setState({ showRealApp: true });
    this.props.navigation.dispatch(resetAction);
  }

  _renderItem = props => (
    <View style={[globals.mainContent, {width: props.width,height: props.height}]}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated/>
      <ImageBackground source={props.url} style={{width: '100%', height: '100%'}}>
        {props.url3 != null
          ? <View style={{alignItems: 'center'}}>
              <Image source={props.url3} style={{width: 130, height: 130}} resizeMode="contain" />
               <View style={{marginTop:'20%'}}>
                  <Text style={globals.title_ini}>{props.title}</Text>
                  <View style={{justifyContent: 'center',alignItems: 'center',marginBottom: 15}}>
                    <Image source={props.url2} style={{width: 80, height: 80}} />
                  </View>
                  <Text style={globals.text_ini}>{props.text}</Text>
               </View>
            </View>
          :<View style={globals.object_center}>
              <Text style={globals.title_ini}>{props.title}</Text>
                <View style={{justifyContent: 'center',alignItems: 'center',marginBottom: 10}}>
                  <Image source={props.url2} style={{width: 100, height: 100}} />
                </View>
              <Text style={globals.text_ini}>{props.text}</Text>
            </View>        
        }      
      </ImageBackground>
    </View>
  );

  render() { 

    return (
      <AppIntroSlider
        slides={this.state.slide}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        dotStyle={globals.dotStyleslide}
        activeDotStyle={globals.activeDotStyleslide}
        onDone={this._onDone}
      />
    );
  }

}

export default Initialslide