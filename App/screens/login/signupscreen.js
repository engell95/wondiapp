import React, {Component} from 'react';
import {Image,StatusBar,ImageBackground,TouchableOpacity,NetInfo,ScrollView,Linking,Modal,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import { Container,Content,Grid,Row,Icon,Form,Item,Label,Input,View,Button,Text,H3} from "native-base";
import OfflineNotice from "../../components/general/offlinecomponent"
//Redux
import {StackActions, NavigationActions } from 'react-navigation';
import {signuppost} from '../../redux/actions/signupaction';
import {connect} from 'react-redux';
//Estilos
import globals from "../../styles/globals";
import Load from '../../components/loader/loader2component';
//notificaciones
import NotifService from '../../config/NotifService';
//idioma
import I18n from '../../config/LanguageService';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Beforestarting' })],
});

class Signup extends React.Component {
	
	static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      cargando:false,
      name: '',
      name2: '',
      pass1: '',
      pass2: '',
      email: '',
      user: '',
      colorname: 'white',
      colorname2: 'white',
      colorpass1: 'white',
      colorpass2: 'white',
      coloremail: 'white',
      coloruser: 'white',
      security1:true,
      security2:true,
      eye1:'eye',
      eye2:'eye',
      modalVisible: false,
      languaje:''
     };
     this.notif = new NotifService();
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
    if(prevProps.user !== this.props.user)
    {
      this.Initial();
    }
  }

  Initial = () => {    
    if (this.props.user) {
      if (this.props.user.data.success == true) {
        this.closemodalload();
        this.props.navigation.dispatch(resetAction)
        this.notif.localNotif(I18n.t('validate.login10'),I18n.t('validate.login12'),I18n.t('validate.login10'));
      }
      this.closemodalload();
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  closemodalload = () =>{
    this.setState({cargando:false});
  }

  onSecurity= (opt) =>{
    if (opt == 1) {
      if (this.state.security1 == true) {
        this.setState({security1: false,eye1:'eye-off'});
      }
      else{
        this.setState({security1: true,eye1:'eye'});
      }
    }
    else{
      if (this.state.security2 == true) {
        this.setState({security2: false,eye2:'eye-off'});
      }
      else{
        this.setState({security2: true,eye2:'eye'});
      }
    }
  }

  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({cargando:true});
    this.setState({ nameError: null,userError:null,emailError:null,pass1Error:null,pass2Error:null,colorname:'white',coloruser:'white',coloremail:'white',colorpass1:'white',colorpass1:'white'});
    if (this.state.name.trim() == '') {
      this.setState(() => ({ nameError: I18n.t('validate.name1')}));
      this.setState({colorname:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.name.length < 3) {
      this.setState(() => ({ nameError: I18n.t('validate.name2')}));
      this.setState({colorname:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.email.trim() == '') {
      this.setState(() => ({ emailError: I18n.t('validate.email1')}));
      this.setState({coloremail:globals.texterror2.color});
      this.closemodalload();
    }
    else if (reg.test(this.state.email) === false) {
      this.setState(() => ({ emailError: I18n.t('validate.email2')}));
      this.setState({coloremail:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.user.trim() == '') {
      this.setState(() => ({ userError: I18n.t('validate.user1')}));
      this.setState({coloruser:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.user.length < 3) {
      this.setState(() => ({ userError: I18n.t('validate.user2')}));
      this.setState({coloruser:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.user.length > 20) {
      this.setState(() => ({ userError: I18n.t('validate.user3')}));
      this.setState({coloruser:globals.texterror2.color});
      this.closemodalload();
    }
    else if (this.state.pass1.trim() == '') {
      this.setState(() => ({ pass1Error: I18n.t('validate.pass1')}))
      this.setState({colorpass1:globals.texterror2.color});
      this.closemodalload(); 
    }
    else if (this.state.pass1.length < 5) {
      this.setState(() => ({ pass1Error: I18n.t('validate.pass2')}));
      this.setState({colorpass1:globals.texterror2.color});
      this.closemodalload(); 
    }
    else if (this.state.pass1 != this.state.pass2) {
      this.setState(() => ({ pass2Error: I18n.t('validate.pass3')}));
      this.setState({colorpass2:globals.texterror2.color});
      this.closemodalload();
    }
    else{
      const namefull = this.state.name + ' ' + this.state.name2;
      this.props.signuppost({nombre:namefull,user:this.state.user,email:this.state.email,pass:this.state.pass1,passc:this.state.pass2})
    }
  }

  onFocus(index) {
    if (index == 1) {
      this.setState({
        colorname: globals.buttonlogin.backgroundColor
      });
    }
    else if(index == 2){
      this.setState({
        colorname2: globals.buttonlogin.backgroundColor
      }); 
    }
    else if(index == 3){
     this.setState({
        coloremail: globals.buttonlogin.backgroundColor
      });  
    }
    else if(index == 4){
     this.setState({
        coloruser: globals.buttonlogin.backgroundColor
      });  
    }
    else if(index == 5){
     this.setState({
        colorpass1: globals.buttonlogin.backgroundColor
      });  
    }
    else{
     this.setState({
        colorpass2: globals.buttonlogin.backgroundColor
      });  
    }
  }

  onBlur() {
    this.setState({
      colorname: 'white',colorname2:'white',coloremail:'white',coloremail:'white',coloruser:'white',colorpass1:'white',colorpass2:'white'
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _handlePress = (d) => {
    Linking.openURL('inbox-gmail:');
  };
  
  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    return (
    	<Container>
    		<StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated/>
        <ImageBackground source={require("../../src/intro/loginfondo.png")} style={{width: '100%', height: '100%'}}>
    		  <ScrollView>
          <Load open={this.state.cargando} close={this.closemodalload.bind(this)}/>
          
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <StatusBar backgroundColor="#0089AF"/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0089AF'}}>
              <View style={globals.center}>
              <Image resizeMode="contain" source={require("../../src/general/add.png")} style={{width: 200, height: 200}} />
              </View>
              <H3 style={{color:'white',paddingBottom:10}}>Consultar su correo electrónico</H3>
              <Text style={{color:'white'}}>Para confirmar su dirección de correo electrónico</Text>
              <Text style={{color:'white'}}>toque el botón "Abrir Correo App"</Text>
              <Text style={{color:'white',paddingBottom:20}}>Te enviamos un correo a {this.state.email}</Text>
              
              <Button 
                info 
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible),
                  this._handlePress("mailto://support@expo.io")
                }}
                style={{alignSelf: 'center'}}
              >
                <Text>Abrir Correo App</Text>
              </Button>

            </View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{color:'white',backgroundColor: '#0089AF',textAlign:'center'}}>¿Ya tienes una cuenta?</Text>
            </TouchableOpacity>
          </Modal>
          
          <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
            <View style={[globals.viewiconback,{marginTop: '10%'}]}>
              <Icon ios='ios-arrow-back' android="md-arrow-round-back" style={{color:'white'}}/>
            </View>
          </TouchableOpacity>
          <View style={globals.viewsignup}>
            <View style={globals.center}>
              <Image resizeMode="contain" source={require("../../src/intro/login.png")} style={globals.img_login} />
            </View>
           
            <Form>
              <Item full rounded style={{marginBottom: 20,borderColor: this.state.colorname}}>
                <Input
                  returnKeyType = { "next" }
                  onSubmitEditing={(event) => {this.name2._root.focus();}}
                  autoCorrect={false} 
                  placeholder={I18n.t('input.ipname')}
                  value={this.state.name} 
                  onChangeText={(text) => this.setState({ name: text })} 
                  placeholderTextColor="white" 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(1)} 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              {!!this.state.nameError && (
                <Text style={globals.texterror2}>{this.state.nameError}</Text>
              )}
              <Item full rounded style={{marginBottom: 20,borderColor: this.state.colorname2}}>
                <Input 
                  ref={(input) => { this.name2 = input; }}
                  returnKeyType = { "next" }
                  onSubmitEditing={(event) => {this.email._root.focus();}}
                  autoCorrect={false} 
                  placeholder={I18n.t('input.ipname2')}
                  value={this.state.name2} 
                  onChangeText={(text) => this.setState({ name2: text })} 
                  placeholderTextColor="white" 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(2)} 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              {!!this.state.name2Error && (
                <Text style={globals.texterror2}>{this.state.name2Error}</Text>
              )}
              <Item full rounded style={{marginBottom: 20,borderColor: this.state.coloremail}}>
                <Input 
                  ref={(input) => { this.email= input; }}
                  keyboardType="email-address"
                  returnKeyType = { "next" }
                  onSubmitEditing={(event) => {this.user._root.focus();}}
                  autoCorrect={true}
                  autoComplete="email"  
                  value={this.state.email} 
                  onChangeText={(text) => this.setState({ email: text })}
                  placeholder={I18n.t('input.email')}
                  placeholderTextColor="white" 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(3)} 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              {!!this.state.emailError && (
                <Text style={globals.texterror2}>{this.state.emailError}</Text>
              )}
              <Item full rounded style={{marginBottom: 20,borderColor: this.state.coloruser}}>
                <Input 
                  ref={(input) => { this.user= input; }}
                  returnKeyType = { "next" }
                  onSubmitEditing={(event) => {this.security1._root.focus();}}
                  autoComplete="username" 
                  autoCorrect={true} 
                  value={this.state.user} 
                  onChangeText={(text) => this.setState({ user: text })} 
                  placeholder={I18n.t('input.user')} 
                  placeholderTextColor="white" 
                  style={globals.inputbordered}
                  onFocus={ () => this.onFocus(4)} 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              {!!this.state.userError && (
                <Text style={globals.texterror2}>{this.state.userError}</Text>
              )}
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Item full rounded style={{width:'50%',marginRight: 2,borderColor: this.state.colorpass1}}>
                  <Input
                    ref={(input) => { this.security1= input; }}
                    returnKeyType = { "next" }
                    onSubmitEditing={(event) => {this.security2._root.focus();}}
                    autoCapitalize='none'
                    autoCorrect={false} 
                    blurOnSubmit={true}
                    maxLength={20}
                    secureTextEntry={this.state.security1}
                    placeholder={I18n.t('input.pass')} 
                    value={this.state.pass1} 
                    onChangeText={(text) => this.setState({ pass1: text })}
                    placeholderTextColor="white" 
                    style={[globals.inputbordered,{width: '100%'}]}
                    onFocus={ () => this.onFocus(5)} 
                    onBlur={ () => this.onBlur() }
                  />
                   <Icon active name={this.state.eye1} onPress={()=>{this.onSecurity(1)}} style={{color: 'white'}}/>
                </Item>
                <Item full rounded style={{width:'50%',marginLeft:2,borderColor: this.state.colorpass2}}>
                  <Input 
                    ref={(input) => { this.security2= input; }}
                    onSubmitEditing={() => {this.validate();}}
                    autoCapitalize='none'
                    autoCorrect={false}  
                    blurOnSubmit={true}
                    maxLength={20}
                    secureTextEntry={this.state.security2}
                    value={this.state.pass2} 
                    onChangeText={(text) => this.setState({ pass2: text })} 
                    placeholder={I18n.t('input.passr')}
                    placeholderTextColor="white" 
                    style={[globals.inputbordered,{width: '100%'}]}
                    onFocus={ () => this.onFocus(6)} 
                    onBlur={ () => this.onBlur() }
                  />
                   <Icon active name={this.state.eye2} onPress={()=>{this.onSecurity(2)}} style={{color: 'white'}}/>
                </Item>
              </View>
              {!!this.state.pass2Error && (
                <Text style={globals.texterror2}>{this.state.pass2Error}</Text>
              )}
              {!!this.state.pass1Error && (
                <Text style={globals.texterror2}>{this.state.pass1Error}</Text>
              )}
              <Button full rounded style={globals.buttonlogin} onPress={() => {this.validate();}}>
                <Text>{I18n.t('global.add2')}</Text>
              </Button>
            </Form>
            
          </View>
          </ScrollView>
          <View style={{textAlign: 'center'}}>
            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.termsfeed.com/privacy-policy/05fb15b13682cf96b87b0c0d2ea9ae95')}}>
              <Text style={[globals.center,{marginBottom:10,textAlign: 'center',color:'white'}]}>
                {I18n.t('global.term2')}
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
    user: state.signup
  }
}

const mapDispatchToProps = dispatch => {
  return {
      signuppost: (data) => {return dispatch(signuppost(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)