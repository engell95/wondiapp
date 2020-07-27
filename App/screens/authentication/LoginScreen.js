import React from 'react';
import {Alert,Keyboard, KeyboardAvoidingView, Platform, SafeAreaView,TextInput, TouchableWithoutFeedback, View ,NetInfo,Image,StatusBar} from "react-native";
//import NetInfo from "@react-native-community/netinfo";
import {StackActions, NavigationActions ,Header } from 'react-navigation';
//estilo
import {Block, Button, Input, NavBar, Text,} from 'galio-framework';
import design from '../../config/style/Style';
//componentes
import Load from '../../components/general/Loader2Component';
//servicios
import NotifService from '../../config/services/NotifService';
//import {loadSettings} from '../../config/SettingsStorage';
//redux
import {loginpost} from '../../redux/actions/LoginAction';
import {signuppost} from '../../redux/actions/SignupAction';
import {connect} from 'react-redux';
//external api
import { LoginButton, AccessToken ,LoginManager,GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import type { User } from 'react-native-google-signin';
import PushNotification from 'react-native-push-notification';

const Initialslide = NavigationActions.navigate({
	routeName: 'Login_ini',
	params: {},
	action: NavigationActions.navigate({ routeName: 'Initialslide' }),
});

const resetAction = StackActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Beforestarting' })],
});

const resetHome = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  index: 0,
  action: [NavigationActions.navigate({ routeName: 'Home_ini' })],
});

const logo = require('../../assets/img/logo2.png');

type ErrorWithCode = Error & { code?: string };

type State = {
  error: ?ErrorWithCode,
  userInfo: ?User,
};

class Login extends React.Component {

	static navigationOptions = {header: null,};

  	constructor(props) {
    	super(props)
    	this.state = {
      		email: '',
      		password: '',
      		loader:false,
      		userInfo:null,
      		userlogin:null,
      		loader2:true
    	};
    	this.notif = new NotifService();
  	}	

  	_configureGoogleSignIn() {
	    /*GoogleSignin.configure({
	      iosClientId: '229995166-ah81827ktcibg73488es52hu23ia4dg4.apps.googleusercontent.com',
	      webClientId: '229995166-ah81827ktcibg73488es52hu23ia4dg4.apps.googleusercontent.com',
	      offlineAccess: false
	    });*/
	    GoogleSignin.configure();
	}

  	componentDidMount() {
  		this._configureGoogleSignIn();
  	}

	componentDidUpdate(prevProps, prevState) {
	    if(prevProps.userlogin !== this.props.userlogin)
	    {
	      this.Initial(1);
	    }
	    if(prevProps.login !== this.props.login)
	    {
	      this.Initial(2);
	    }
  	}

  	Initial = async (id) => { 
	    if (id == 1) {   
	      if (this.props.userlogin) {
	        if (this.props.userlogin.item.success == true) {
	       
	            this.setState({loader:false})
	            setTimeout(() => {this.props.navigation.dispatch(resetAction) }, 1000);
	        }
	      }
	    }
	    else{
	      if (this.props.login) {
	        if (this.props.login.item.success == true) {
	          this.setState({loader:false})
	          setTimeout(() => { this.props.navigation.dispatch(resetHome);}, 1000);
	        }
	      }
	    }
  	}

  	handleChange = (name, value) => {this.setState({ [name]: value });}

  	closemodalload = () =>{this.setState({loader:false});}

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

  	getInitialState = () => {    
  		if (this.state.email != '' & this.state.password != '') {
  			this.setState({loader:true})
    		this.props.loginpost({email:this.state.email,password:this.state.password});
    		this.closemodalload();
  		}
  		else{
  			Alert.alert('Espera un momento!','Correo o contraseña vacios');
  		}
  	}

  	render() {

	    const { navigation } = this.props;
	    const { email, password } = this.state;

	    return (
	    	<KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
            	<StatusBar barStyle="dark-content" backgroundColor="white"/>
        		<Load open={this.state.loader} close={this.closemodalload.bind(this)}/>
                <SafeAreaView style={design.style.flex_container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={design.style.inner}>
                           	<Block center space="evenly" style={{paddingTop: design.statusbar}}>
			        			<Image source={logo} style={design.style.logo} />
			        		</Block>
			        		<Block row center style={{ marginVertical: design.theme.SIZES.BASE * 1.875 }}>
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
					                  //color='#F6F6F6'
					                  shadowColor={design.theme.COLORS.GOOGLE}
					                  //shadowColor='rgba(151, 151, 151, 0.302)'
					                  iconColor={design.theme.COLORS.WHITE}
					                  style={design.style.social}
					                  onPress={() => this._GmLogin()}
					                />
				            	</Block>
				        	</Block>
				        	<Text center color={design.theme.COLORS.TEXT2} size={14}>O Inicia Sesión con tú Correo Electronico</Text>
			        		<Block center>
				            	<Block style={{marginTop: 10}}>
					            	<Input
						                rounded
						                type="email-address"
						                placeholder="Correo"
						                autoCapitalize="none"
						                style={design.style.input2}
						                placeholderTextColor={design.theme.COLORS.PLACEHOLDER}
						                onChangeText={(text) => this.setState({ email: text })} 
					              	/>
					              	<Input
						                rounded
						                password
						                viewPass
						                placeholder="Contraseña"
						                style={design.style.input2}
						                placeholderTextColor={design.theme.COLORS.PLACEHOLDER}
						                onChangeText={(text) => this.setState({ password: text })} 
					              	/>
					              	<Text
						                color={design.theme.COLORS.TEXT}
						                size={design.theme.SIZES.FONT * 0.80}
						                onPress={() => navigation.navigate('Resetpassword')}
						                style={{ alignSelf: 'flex-end', lineHeight: design.theme.SIZES.FONT * 2 }}
						                size={14}
					              	>
				                		Olvidaste tu contraseña?
				              		</Text>
				            	</Block>
			          		</Block>
			          		<Block center style={{marginTop: 10}}>
					            <Button
						            radius={20}
						            shadowColor={design.theme.COLORS.BLOCK}
						            color={design.theme.COLORS.PRIMARY2}
						            onPress={() => {this.getInitialState()}}
					            >
					                <Text 
					                	center 
					                	color={design.theme.COLORS.WHITE} 
					                	size={design.theme.SIZES.FONT * 1} 
					                	//bold
					                	size={16}
					                >
					                	Ingresar
					             	</Text>
				            	</Button>
					            <Button color="transparent" shadowless onPress={() => navigation.navigate('Signup')}>
						            <Text center color={design.theme.COLORS.TEXT} size={14}>
						                {"No tienes cuenta? Regístrate."}
						            </Text>
					            </Button>
			          		</Block>
                            <View style={{ flex : 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
	    );
  	}
}

const mapStateToProps = state => {
  return {
    userlogin: state.signup,
    login: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      signuppost: (data) => {return dispatch(signuppost(data))},
      loginpost: (data) => {return dispatch(loginpost(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)