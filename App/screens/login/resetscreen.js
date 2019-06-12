import React, {Component} from 'react';
import {Alert ,Linking,Image,StatusBar,TouchableOpacity,NetInfo} from 'react-native';
import {Container,Content,Grid,Row,Text,H3,View,Item,Icon,Input,Button,Form} from "native-base";
//import NetInfo from "@react-native-community/netinfo";
import OfflineNotice from "../../components/general/offlinecomponent"
//Estilos
import globals from "../../styles/globals";
import Load from '../../components/loader/loader2component';
//idioma
import I18n from '../../config/LanguageService';

class Resetpassword extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        isConnected: true,
      	color: globals.notfocus.color,
        cargando:false
      }
    };
  

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  onFocus() {
    this.setState({
      color: globals.focus.color,
    });
  }

  onBlur() {
    this.setState({
      color: globals.notfocus.color,
    });
  }

  //alerta de cambio de pass
  send = () => {
    Alert.alert(
      I18n.t('reset.mreset'),
      I18n.t('reset.mreset2'),
	    [
	      {text: 'Ok', onPress:() => this.props.navigation.goBack()},
	    ],
	    { cancelable: false }
    )
  }

  closemodalload = () =>{
    this.setState({cargando:false});
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    return (
    	<Container style={globals.body}>
        <StatusBar backgroundColor={globals.focus.color} barStyle="light-content"/>
    		<Content>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={[globals.viewiconback,{marginTop: '10%'}]}>
              <Icon ios='ios-arrow-back' android="md-arrow-round-back" style={globals.title2}/>
            </View>
          </TouchableOpacity>
          <Load open={this.state.cargando} close={this.closemodalload.bind(this)}/>
          <View style={globals.center}>
            <Image style={globals.imgheader} resizeMode="contain" source={require("../../src/general/header.png")} />
          </View>
          <View style={globals.viewlogin}>
            <Form>
              <H3 style={globals.title}>Recupera tu cuenta</H3>
              <Item  style={{marginLeft:0,borderColor:this.state.color,marginTop: 20}}>
                <Icon active ios='ios-mail-open' android="md-mail-open" style={globals.focus}/>
                <Input 
                  autoFocus = {true}
                  autoCorrect={true}  
                  placeholder={I18n.t('input.email')}
                  value={this.state.email} 
                  onChangeText={(text) => this.setState({ email: text })} 
                  onFocus={ () => this.onFocus() } 
                  onBlur={ () => this.onBlur() }
                />
              </Item>
              <View style={[globals.form,{width: '50%',marginTop:30}]}>
                <Button full rounded style={globals.button} onPress={this.send}>
                  <Text>{I18n.t('reset.breset')}</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
        <View style={[globals.form,{width: '90%',marginBottom: 10}]}>
          <Text style={[globals.text3,{marginBottom: 5}]}>Servicio de ayuda</Text>
          <Text onPress={() => this.props.navigation.navigate("Help")} style={globals.text}>
            {I18n.t('reset.helpreset')}
          </Text>
          <Text 
            style={globals.text}
            onPress={() => Linking.openURL('mailto:engel.lopez@wondiapp.com') }
            title="engel.lopez@wondiapp.com"
          >
            {I18n.t('reset.contac')}
          </Text>
        </View>
    	</Container>
    )
  }
}

export default Resetpassword