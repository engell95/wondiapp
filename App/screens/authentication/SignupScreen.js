import React from 'react';
import {Alert,Keyboard, KeyboardAvoidingView, Platform, SafeAreaView,Picker,TextInput, TouchableWithoutFeedback, View ,NetInfo,Image,StatusBar,TouchableOpacity} from "react-native";
import {StackActions, NavigationActions } from 'react-navigation';
//import NetInfo from "@react-native-community/netinfo";
//estilo
import {Block, Button, Input, Text, NavBar,Icon} from 'galio-framework';
import design from '../../config/style/Style';
//componentes
import Load from '../../components/general/Loader2Component';
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
//servicios
import NotifService from '../../config/services/NotifService';
//Redux
import {loginpost} from '../../redux/actions/LoginAction';
import {signuppost} from '../../redux/actions/SignupAction';
import {connect} from 'react-redux';
//external api
import { LoginButton, AccessToken ,LoginManager,GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';

const Initialslide = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Initialslide' }),
});

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Beforestarting' })],
});

const MARGIN_LEFT = '5%';

class Signup extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      visible:false,
      user: '',
      genero: "Masculino",
      loader:false,
      validPassword:false,
      validName: false,
      validEmail: false,
      validUser: false,
      activo:true
    }
    this.notif = new NotifService();
    this.handlenameChange  = this.handlenameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleuserChange  = this.handleuserChange.bind(this);
    //this.handleNextButton  = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      iosClientId: '229995166-ah81827ktcibg73488es52hu23ia4dg4.apps.googleusercontent.com',
      webClientId: '229995166-ah81827ktcibg73488es52hu23ia4dg4.apps.googleusercontent.com',
      offlineAccess: false
    });
  }

  componentDidMount() {
    this._configureGoogleSignIn();
  }

  closemodalload = () =>{this.setState({loader:false});}

  handlenameChange(name) {
    const { validName } = this.state;
    this.setState({ name });
    if (!validName) {
      if (name.length > 4) {
        this.setState({ validName: true ,nameError:null});
      }
      else{
        this.setState(() => ({ nameError: 'Nombre debe contener al menos 3 caracteres'}));
      }
    } else if (name.length <= 4) {
      this.setState({ validName: false ,nameError:null});
    }
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ email: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true ,emailError: null});
      }
      else{
        this.setState(() => ({ emailError:'El correo no es valido'}));
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false ,emailError: null});
    }
  }

  handleuserChange(user) {
    this.setState({userError:null});
    const { validUser } = this.state;
    this.setState({ user });
    if (!validUser) {
      if (user.length > 4 && user.length <= 20) {
        this.setState({ validUser: true ,userError:null});
      }
      else if (user.length <= 4) {
        this.setState(() => ({validUser: false ,userError:'El usuario debe contener al menos 3 caracteres'}));
      }
      else if (user.length >= 20){
        this.setState(() => ({ validUser: false ,userError:'El usuario no debe contener mas de 20 caracteres'}));
      }
    } else if (user.length <= 4 || user.length >= 20) {
      this.setState({ validUser: false ,userError:null});
    }
  }

  handlePasswordChange(password) {
    //const { validPassword } = this.state;
    this.setState({password: password });
    if (!this.state.validPassword) {
      if (password.length > 6) {
        // Password has to be at least 4 characters long
        this.setState({ validPassword: true ,pass1Error:null});
      }
      else{
        this.setState(() => ({ pass1Error: 'La Contraseña debe contener al menos 6 caracteres'}));
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false ,pass1Error:null});
    }
  }

  _GmLogin = async () => {
    this.setState({loader:true})
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('Inicio cancelado');
        this.setState({loader:false});
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('Espera un momento!','Procesando ....');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Algo salió mal', 'Servicios de Google Play no disponibles o desactualizados.');
      } else {
        Alert.alert('Algo salió mal', error.toString());
      }
    }
    if (this.state.userInfo != null) {
      this._signOut();
      const username = this.state.userInfo.user.familyName+'.'+this.state.userInfo.user.givenName+this.state.userInfo.user.id.substring(0,5);
      const usernamefilter = username.substring(0,20);
      this.setState({loader:true})
      console.log('yes')
      this.props.signuppost({name:this.state.userInfo.user.name,user:usernamefilter,email:this.state.userInfo.user.email,pass:this.state.userInfo.user.id,passc:this.state.userInfo.user.id,photo:this.state.userInfo.user.photo,social:true,languaje:this.state.languaje,notif:this.state.notif,gener:'Masculino'})
    }
  };

  _signOut = async () => {
    this.closemodalload();
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      Alert.alert('Algo salió mal', error.toString());
    }
  };

  _fbLogin = () => {
      this.setState({loader:true})
      LoginManager.logInWithPermissions(["public_profile","email"]).then(
        (result) => {
            if (result.isCancelled) {
              this.setState({loader:false});
            } 
            else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                      let accessToken = data.accessToken
                      const responseInfoCallback = (error, result) => {
                        if (error) {
                            Alert.alert('Algo salió mal', error.toString());
                        }else {
                          const username = result.first_name+'.'+result.last_name+result.id.substring(0,5);
                          const usernamefilter = username.substring(0,20);
                          this.FBLogout();
                          this.setState({loader:true})
                          this.props.signuppost({name:result.name,user:usernamefilter,email:result.email,pass:result.id,passc:result.id,photo:result.picture.data.url,social:true,languaje:this.state.languaje,notif:this.state.notif,gener:'Masculino'})
                        }
                    }
                     const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken: accessToken,
                            parameters: {
                              fields: {
                                  string: 'gender,email,name,middle_name,first_name,last_name,picture.type(large)'
                                }
                            }
                        },
                        responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start()
                  }
                )
            }
        },
        (error) => {
            alert('inicio de sesión con error: ' + error);
        }
      );
  }

  FBLogout = (accessToken) => {
    this.closemodalload();
    let logout = new GraphRequest(
      "me/permissions/",
      {
        accessToken: accessToken,
        httpMethod: 'DELETE'
      },
      (error, result) => {
      if (error) {
        Alert.alert('Algo salió mal', error.toString());
      } 
      else {
        LoginManager.logOut();
      }
    });
    new GraphRequestManager().addRequest(logout).start();
  };

  handleSignUp = () =>{ 
    this.setState({loader:true});
    try {
      this.props.signuppost({
        name:this.state.name,
        user:this.state.user,
        email:this.state.email,
        pass:this.state.password,
        passc:this.state.password,
        gener:this.state.genero,
      });
    } catch (error) {
       Alert.alert('Algo salió mal', error.toString());
    }
    this.closemodalload();
  }

  toggleNextButtonState() {
    const { validEmail, validPassword ,validName ,validUser} = this.state;
    if (validEmail && validPassword && validName && validUser) {
      return false;
    }
    return true;
  }

  handleGoBack = () =>{
    this.props.navigation.goBack();
  }

  selectsex = () =>{
    return(
      <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {this.setState({'visible': false})}}
        width={0.9}
      >
        <DialogContent>
          <Block style={{ marginTop: 10 }}>
            <Block style={{width:design.width * 0.8}}>
              <TouchableOpacity onPress={() => this.setState({'visible': false})} style={{marginLeft:-10,marginBottom:10}}>
                <Icon
                  family='evilicons'
                  color={design.theme.COLORS.GREY}
                  size={design.theme.SIZES.BASE * 1.7}
                  name='close'
                />
              </TouchableOpacity>
              <Text muted size={design.theme.SIZES.FONT * 1}>Genero</Text>
            </Block>
            <Picker
              //iosHeader="Start Year"
              selectedValue={this.state.genero}
              style={{width: design.width * 0.8}} 
              itemStyle={{height: design.width * 0.30}}         
              onValueChange={(itemValue, itemIndex) =>{this.setState({'genero': itemValue}),this.setState({'visible': false})}}
            >
              <Picker.Item label="Seleccione" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
            </Picker>
          </Block> 
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    const {formValid, loadingVisible, validEmail, validPassword,validName,validUser} = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 ,backgroundColor:'white'}}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <Load open={this.state.loader} close={this.closemodalload.bind(this)}/>
        <SafeAreaView style={design.style.flex_container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={design.style.inner}>
              <NavBar
                transparent
                back
                leftStyle={{marginLeft:5,paddingLeft:5}}
                leftIconColor={design.theme.COLORS.TEXT2}
                onLeftPress={this.handleGoBack}
              />
              <Header title="Crear nueva cuenta" />
              <Block row center style={design.style.container3}>
                <Block right>
                  <Button
                    round
                    onlyIcon
                    iconSize={design.theme.SIZES.BASE * 1.625}
                    icon="facebook"
                    iconFamily="font-awesome"
                    color={design.theme.COLORS.FACEBOOK}
                    shadowColor={design.theme.COLORS.FACEBOOK}
                    iconColor={design.theme.COLORS.WHITE}
                    style={design.style.social}
                    onPress={() => this._fbLogin()}
                  />
                  </Block>
                  <Block style={{width:30}}></Block>
                  <Block left>
                    <Button
                      round
                      onlyIcon
                      iconSize={design.theme.SIZES.BASE * 1.625}
                      icon="google"
                      iconFamily="font-awesome"
                      color={design.theme.COLORS.GOOGLE}
                      shadowColor={design.theme.COLORS.GOOGLE}
                      iconColor={design.theme.COLORS.WHITE}
                      style={design.style.social}
                      onPress={() => this._GmLogin()}
                    />
                  </Block>
                </Block>
                <Text muted center color={design.theme.COLORS.TEXT2} size={14}>O Registráte con tú correo</Text>
                <Block>
                <Block style={{ marginBottom: 20}}>
                  <Input
                    borderless
                    placeholder="Nombre"
                    style={design.style.input}
                    placeholderTextColor={design.theme.COLORS.TEXT2}
                    color={design.theme.COLORS.TEXT}
                    //onChangeText={text => handleChange('name', text)}
                    onChangeText={this.handlenameChange}
                  />
                  {!!this.state.nameError && (
                    <Text style={design.style.texterror}>{this.state.nameError}</Text>
                  )}
                  <Input
                    borderless
                    type="email-address"
                    placeholder="Correo"
                    autoCapitalize="none"
                    style={design.style.input}
                    placeholderTextColor={design.theme.COLORS.TEXT2}
                    color={design.theme.COLORS.TEXT}
                    //onChangeText={text => handleChange('email', text)}
                    onChangeText={this.handleEmailChange}
                  />
                  {!!this.state.emailError && (
                    <Text style={design.style.texterror}>{this.state.emailError}</Text>
                  )}
                  <Input
                    borderless
                    placeholder="Usuario"
                    style={design.style.input}
                    placeholderTextColor={design.theme.COLORS.TEXT2}
                    color={design.theme.COLORS.TEXT}
                    //onChangeText={text => handleChange('user', text)}
                    onChangeText={this.handleuserChange}
                  />
                  {!!this.state.userError && (
                    <Text style={design.style.texterror}>{this.state.userError}</Text>
                  )}
                  <Input
                    borderless
                    password
                    viewPass
                    placeholder="Contraseña"
                    style={design.style.input}
                    placeholderTextColor={design.theme.COLORS.TEXT2}
                    color={design.theme.COLORS.TEXT}
                    //onChangeText={text => handleChange('password', text)}
                    onChangeText={text => this.handlePasswordChange(text)}
                    showCheckmark={validPassword}
                  />
                  {!!this.state.pass1Error && (
                    <Text style={design.style.texterror}>{this.state.pass1Error}</Text>
                  )}
                  <TouchableOpacity onPress={() => this.setState({'visible': true})}>
                    <Input
                      editable = {false}
                      borderless
                      placeholder="Genero"
                      style={design.style.input}
                      value ={this.state.genero}
                      placeholderTextColor={design.theme.COLORS.TEXT2}
                      color={design.theme.COLORS.TEXT}
                      onFocus={() => this.setState({'visible': true})}
                    />
                  </TouchableOpacity>
                  {this.selectsex()}
                </Block>
                <Block center style={{ marginBottom: 20 }}>
                  <Button
                    radius={20}
                    shadowColor={design.theme.COLORS.BLOCK}
                    color={design.theme.COLORS.PRIMARY2}
                    onPress={this.handleSignUp}
                  >
                    <Text 
                      center 
                      color={design.theme.COLORS.WHITE} 
                      size={design.theme.SIZES.FONT * 1} 
                      //bold
                      size={16}
                    >
                      Regístrarse
                    </Text>
                  </Button>
                  <Button color="transparent" shadowless onPress={() => this.props.navigation.navigate('Login')}>
                    <Text center color={design.theme.COLORS.TEXT} size={14}>
                      {"Ya tienes cuenta? Inicia Sesión."}
                    </Text>
                  </Button>
                </Block>
              </Block>
              <View style={{ flex : 1 }} />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>     
    );
  }
}

const Header = ({ title }) => (
  <Block left style={design.style.header}>
    <Text h4 color={design.theme.COLORS.TEXT}>{title}</Text>
  </Block>
);

const mapStateToProps = state => {
  return {
    user: state.signup,
    login: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signuppost: (data) => {return dispatch(signuppost(data))},
    loginpost: (data) => {return dispatch(loginpost(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)