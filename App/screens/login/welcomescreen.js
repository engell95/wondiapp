import React, {Component} from 'react';
import {StatusBar,Image,ImageBackground,TouchableOpacity,StyleSheet,Alert,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,Icon,Grid,Row,Col,View,Text,Button,ActionSheet,H3,Thumbnail} from "native-base";
import { LoginButton, AccessToken ,LoginManager,GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import type { User } from 'react-native-google-signin';
import OfflineNotice from "../../components/general/offlinecomponent"
//Estilos
import globals from "../../styles/globals";
//Redux
import {StackActions, NavigationActions } from 'react-navigation';
import {signuppost} from '../../redux/actions/signupaction';
import {connect} from 'react-redux';
//Extra
import Orientation from 'react-native-orientation-locker';
//notificaciones
import NotifService from '../../config/NotifService';
//idioma
import I18n from '../../config/LanguageService';
//fix reloader
import {loadSettings} from '../../config/SettingsStorage';

var BUTTONS = [
  { text: "Español (Nicaragua)", icon: "globe", iconColor: "#002D73" },
  { text: "English (United States of America)", icon: "globe", iconColor: "#002D73" }
];

type ErrorWithCode = Error & { code?: string };

type State = {
  error: ?ErrorWithCode,
  userInfo: ?User,
};

const Initialslide = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Initialslide' }),
});

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Beforestarting' })],
});

class Welcome extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      userInfo:null,
      userlogin:null
    };
    this.notif = new NotifService();
  }

  componentDidMount() {
    this._configureGoogleSignIn();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  }

  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      if (settings.languaje !== null){
        I18n.locale = settings.languaje
      }
      this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.userlogin !== this.props.userlogin)
    {
      this.Initial();
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  Initial = () => {    
    if (this.props.userlogin) {
      if (this.props.userlogin.data.success == true) {
        this.notif.localNotif(I18n.t('validate.login10'),I18n.t('validate.login12'),I18n.t('validate.login10'));
        this.props.navigation.dispatch(resetAction)
      }
    }
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure();
  }

  _GmLogin = async () => {
    try {
      //await GoogleSignin.hasPlayServices();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('Inicio cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert(I18n.t('configure.mexit'),I18n.t('welcome.mwelcome'));
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(I18n.t('welcome.mwelcome2'),I18n.t('welcome.mwelcome3'));
      } else {
        Alert.alert(I18n.t('welcome.mwelcome2'), error.toString());
      }
    }
    if (this.state.userInfo != null) {
      this._signOut(); 
      const username = this.state.userInfo.user.familyName+'.'+this.state.userInfo.user.givenName+this.state.userInfo.user.id.substring(0,5);
      const usernamefilter = username.substring(0,20);
      this.props.signuppost({nombre:this.state.userInfo.user.name,user:usernamefilter,email:this.state.userInfo.user.email,pass:this.state.userInfo.user.id,passc:this.state.userInfo.user.id,photo:this.state.userInfo.user.photo,social:true,languaje:this.state.languaje,notif:this.state.notif})
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      Alert.alert(I18n.t('welcome.mwelcome2'), error.toString());
    }
  };

  _fbLogin = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          //alert('Login cancelled');
        } else {
               AccessToken.getCurrentAccessToken().then(
              (data) => {
                let accessToken = data.accessToken

                const responseInfoCallback = (error, result) => {
                  if (error) {
                    //console.log(error)
                    alert('Error fetching data: ' + error.toString());
                  } else {
                    //console.log(result)
                    const username = result.first_name+'.'+result.last_name+result.id.substring(0,5);
                    const usernamefilter = username.substring(0,20);
                    this.FBLogout();
                    this.props.signuppost({nombre:result.name,user:usernamefilter,email:result.email,pass:result.id,passc:result.id,photo:result.picture.data.url,social:true,languaje:this.state.languaje,notif:this.state.notif})
                  }
                }

                const infoRequest = new GraphRequest(
                  '/me',
                  {
                    accessToken: accessToken,
                    parameters: {
                      fields: {
                        string: 'email,name,middle_name,first_name,last_name,picture.type(large)'
                      }
                    }
                  },
                  responseInfoCallback
                );

                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start()

              }
            )
        }
      },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  FBLogout = (accessToken) => {
    let logout = new GraphRequest(
      "me/permissions/",
      {
        accessToken: accessToken,
        httpMethod: 'DELETE'
      },
      (error, result) => {
        if (error) {
          //console.log('Error fetching data: ' + error.toString());
        } 
        else {
          LoginManager.logOut();
        }
      });
    new GraphRequestManager().addRequest(logout).start();
  };

  actions = (index) => {

    ActionSheet.hide();
    if (index == 0) {
      AsyncStorage.setItem('languaje', 'es');
      this.props.navigation.dispatch(Initialslide);
    }
    else if (index == 1){
      AsyncStorage.setItem('languaje', 'en');
      this.props.navigation.dispatch(Initialslide);
    }
  }

	render() {
    if (!this.state.isConnected) {
      return <OfflineNotice/>;
    }

    return (
      <Container>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated/>
        <ImageBackground source={require("../../src/intro/wondi1.png")} style={{width: '100%', height: '100%'}}>
          <View style={{alignSelf: 'flex-end',marginRight: 10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login",{languaje:this.state.languaje})}>
              <Icon ios='ios-person' android="md-person" style={globals.icologin}/>
              <Text style={{color:'white'}}>{I18n.t('global.start')}</Text>
            </TouchableOpacity>
          </View>  
          <View style={globals.object_center}>
            <Text style={globals.title_ini}>{I18n.t('initial.slidet')}</Text>
            <View style={globals.viewimgwel}>
              <Image source={require("../../src/intro/wondi1-1.png")} style={globals.imgwel} />
            </View>
            <Button full rounded bordered  light style={globals.buttonregis} onPressIn={() => this.props.navigation.navigate("Signup",{languaje:this.state.languaje})}>
              <Text>{I18n.t('global.add2')}</Text>
            </Button>
            <View style={globals.flexicon}>
              <TouchableOpacity onPress={() => this._fbLogin()}>
                <Thumbnail small source={require("../../src/intro/fb.png")} style={{marginRight: 5}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._GmLogin()}>
                <Thumbnail small source={require("../../src/intro/gm.png")} style={{marginLeft: 5}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:  'center',marginBottom: 5}}>
            <Text 
              style={{color:'white'}}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    title: I18n.t('welcome.mwelcome4')
                  },
                buttonIndex => {this.actions(buttonIndex);}
              )}
            >
              {I18n.t('welcome.mwelcome5')}
            </Text>
          </View>
        </ImageBackground>
      </Container>
    )
	}
}

const mapStateToProps = state => {
  return {
    userlogin: state.signup
  }
}

const mapDispatchToProps = dispatch => {
  return {
      signuppost: (data) => {return dispatch(signuppost(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)