import React, {Component} from 'react';
import {Image,RefreshControl,ImageBackground,Alert,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,H3,Col, Row, Grid,ActionSheet,View,Text,Icon,Button} from 'native-base';
//General
import OfflineNotice from '../general/offlinecomponent'
import {withNavigation,StackActions,NavigationActions} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

var BUTTONS = [
  { text: "Español (Nicaragua)", icon: "globe", iconColor: "#002D73" },
  { text: "English (United States of America)", icon: "globe", iconColor: "#002D73" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const Welcome = NavigationActions.navigate({
  routeName: 'Login_ini',

  params: {},

  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});


class ConfigureComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      push:true,
      isConnected: true,
      refreshing: false,
      notificacionios: 'ios-notifications',
      notificacion: 'md-notifications',
      languajeios:'language',
      languaje:'language',
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); }); 
  }

  async componentWillMount() {
    const {navigation} = this.props;
    console.log(navigation)
     try {
      const notif = await AsyncStorage.getItem('notif');
      if (notif == '2') {
        this.setState({notificacionios:'ios-notifications-off',notificacion:'md-notifications-off'});
      }
      else{
        this.setState({notificacionios:'ios-notifications',notificacion:'md-notifications'});
      }
     }
     catch (error) {
      console.log(error);
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  updatenotif = async () => {
    if (this.state.notificacionios == 'ios-notifications-off') {
      this.setState({notificacionios:'ios-notifications',notificacion:'md-notifications'});
      AsyncStorage.setItem('notif', '2'); 
    }
    else{
      this.setState({notificacionios:'ios-notifications-off',notificacion:'md-notifications-off'}); 
      AsyncStorage.setItem('notif', '1'); 
    }
  }

  off = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('id_shopping');
      await AsyncStorage.removeItem('name_shopping');
      await AsyncStorage.removeItem('photo');
      await AsyncStorage.removeItem('search');
      this.props.navigation.dispatch(Welcome);
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  updatelangu = () =>{
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: I18n.t('welcome.mwelcome4')
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }  
    )
  }


  render() {

    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

  	return(
      <Container  style={globals.body}>
        <ImageBackground source={require("../../src/general/configuracionfondo.png")} style={{width: '100%', height: '100%'}}>
          <View style={globals.contenttop}>
            <H3 style={globals.title}>Configuración</H3>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={globals.viewiconconfi}>
              <Button 
                onPress={() => {this.props.navigation.navigate("Perfil")}}
                style={globals.buttonconfig} >
                <Icon ios='ios-person' android="md-person" style={globals.icoconfig}/>
              </Button>
            </View>
            <View style={globals.viewiconconfi}>
              <Button
                onPress={()=>{
                  Alert.alert(
                    I18n.t('configure.mexit'),
                    I18n.t('configure.mnotific'),
                    [
                      {text: I18n.t('global.yes'), onPress: () => {this.updatenotif()}, style: 'cancel'},
                      {text: 'No', onPress: () => {}, style: 'destructive'},
                    ],
                      { cancelable: false }
                  )
                }} 
                style={globals.buttonconfig2} >
                  <Icon ios={this.state.notificacionios} android={this.state.notificacion} style={globals.icoconfig}/>
              </Button>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={globals.viewiconconfi}>
              <Button 
                onPress={() => {this.updatelangu()}}
                style={globals.buttonconfig} >
                  <Icon type="FontAwesome" ios={this.state.languajeios} android={this.state.languaje} style={globals.icoconfig}/>
              </Button>
            </View>  
            <View style={globals.viewiconconfi}>
              <Button 
                onPress={()=>{
                    Alert.alert(
                      I18n.t('configure.mexit'),
                      I18n.t('configure.mexit1'),
                      [
                        {text: I18n.t('global.cancel'), onPress: () => {}, style: 'cancel'},
                        {text: I18n.t('global.delete'), onPress: () => {this.off()}, style: 'destructive'},
                      ],
                        { cancelable: false }
                    )
                  }}
                style={globals.buttonconfig2} >
                  <Icon ios='ios-power' android="md-power" style={globals.icoconfig}/>
              </Button>        
            </View>          
          </View>
          <View style={globals.viewimgconfig}> 
            <Image resizeMode="contain" source={require("../../src/general/configuracion.png")} style={globals.mascota} />
          </View>
          </ImageBackground>
      </Container>
  	)
  }
}

export default withNavigation(ConfigureComponent);