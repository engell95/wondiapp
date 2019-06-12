import React, {Component} from 'react';
import {Image,StatusBar,ImageBackground,TouchableOpacity,NetInfo,Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import { Container,Content,Grid,Row,Icon,Form,Item,Label,Input,View,Button,Text} from "native-base";
import OfflineNotice from "../../components/general/offlinecomponent"
//Estilos
import globals from "../../styles/globals";
import Load from '../../components/loader/loader2component';
import {StackActions, NavigationActions } from 'react-navigation';
//Redux
import {loginpost} from '../../redux/actions/loginaction';
import {connect} from 'react-redux';
//notificaciones
import NotifService from '../../config/NotifService';
//idioma
import I18n from '../../config/LanguageService';

const resetHome = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Home_ini' }),
});

class Login extends React.Component {

  constructor(props) {super(props)
    this.state = {
      isConnected: true,
      cargando:false,
      email: '',
      pass: '',
      coloremail: 'white',
      colorpass1: 'white',
      security:true,
      eye:'eye',
    };
    this.notif = new NotifService();
  }
	
  static navigationOptions = {
    header: null,
  };

  getInitialState = () => {    
    this.props.loginpost({username:this.state.email,password:this.state.pass})
    this.closemodalload()
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillMount() {
    const {navigation} = this.props;
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    const languaje = navigation.getParam('languaje', 'NO-ID');
    if (languaje !== 'NO-ID'){
      I18n.locale = languaje
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.login !== this.props.login)
    {
      this.Initial();
    }
  }

  Initial = () => {    
    if (this.props.login) {
      if (this.props.login.data.success == true) {
        this.closemodalload();
        this.props.navigation.dispatch(resetHome)
        this.notif.localNotif(I18n.t('validate.login10'),I18n.t('validate.login11'),I18n.t('validate.login10'));
      }
      this.closemodalload();
    }
  }

  closemodalload = () =>{
    this.setState({cargando:false});
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  onFocus(index) {
    if (index == 1) {
      this.setState({
        coloremail: globals.buttonlogin.backgroundColor
      });
    }
    else{
     this.setState({
        colorpass: globals.buttonlogin.backgroundColor
      });  
    }
  }

  onBlur() {
    this.setState({
      coloremail: 'white',colorpass:'white'
    });
  }

   onSecurity= (opt) =>{
    if (opt == 1) {
      if (this.state.security == true) {
        this.setState({security: false,eye:'eye-off'});
      }
      else{
        this.setState({security: true,eye:'eye'});
      }
    }
  }

  closemodalload = () =>{
    this.setState({cargando:false});
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    return (
    	<Container>
    		<StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated/>
        <ImageBackground source={require("../../src/intro/loginfondo.png")} style={{width: '100%', height: '100%'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={[globals.viewiconback,{marginTop: '10%'}]}>
              <Icon ios='ios-arrow-back' android="md-arrow-round-back" style={{color:'white'}}/>
            </View>
          </TouchableOpacity>
          <Load open={this.state.cargando} close={this.closemodalload.bind(this)}/>
          <View style={globals.viewlogin}>
            <View style={globals.center}>
              <Image resizeMode="contain" source={require("../../src/intro/login.png")} style={globals.img_login} />
            </View>
            <Form>
              <Item full rounded style={{marginBottom: 20,borderColor: this.state.coloremail}}>
                <Input 
                  returnKeyType = { "next" }
                  onSubmitEditing={(event) => {this.pass._root.focus();}}
                  autoCorrect={true} 
                  placeholder={I18n.t('input.user')}
                  placeholderTextColor="white" 
                  value={this.state.email} 
                  onChangeText={(text) => this.setState({ email: text })} 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(1)} 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              <Item full rounded style={{borderColor: this.state.colorpass}}>
                <Input 
                  ref={(input) => { this.pass = input; }}
                  returnKeyType='go' 
                  secureTextEntry={this.state.security}
                  value={this.state.pass}
                  autoCapitalize='none'
                  onChangeText={(text) => this.setState({ pass: text })} 
                  autoCorrect={false}  
                  blurOnSubmit={true}
                  maxLength={20}
                  placeholder={I18n.t('input.pass')}
                  placeholderTextColor="white" 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(2)} 
                  onBlur={ () => this.onBlur() }
                />
                <Icon active name={this.state.eye} onPress={()=>{this.onSecurity(1)}} style={{color: 'white'}}/>
              </Item>
              <Button full rounded style={globals.buttonlogin} onPress={() => {this.getInitialState(),this.setState({cargando:true})}}>
                <Text>{I18n.t('global.start')}</Text>
              </Button>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Resetpassword")}>
                <Text style={[globals.center,{marginTop:15,color:'white'}]}>
                  {I18n.t('global.passold')}
                </Text>
              </TouchableOpacity>
            </Form>
          </View>
          <View style={{textAlign: 'center'}}>
            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.termsfeed.com/privacy-policy/05fb15b13682cf96b87b0c0d2ea9ae95')}}>
              <Text style={{marginBottom:10,textAlign: 'center',color:'white'}}>
                {I18n.t('global.term')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
    	</Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loginpost: (data) => {return dispatch(loginpost(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)