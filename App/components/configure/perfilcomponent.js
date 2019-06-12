import React, {Component} from 'react';
import {Image,RefreshControl,NetInfo} from 'react-native';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,View,Text,Button,Thumbnail,H2,Form,Label,Input,Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
//General
import OfflineNotice from '../general/offlinecomponent'
import {withNavigation} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

class PerfilComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      refreshing: false,
      photo:'',
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); }); 
  }

  async componentWillMount() {
    try {
      const photo = await AsyncStorage.getItem('photo');
      if (photo !== null) {
        this.setState({photo:photo});
      }
    }
    catch(error) {
      console.log("fetch Error: ", error)
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  render() {

    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

  	return(
      <Container style={globals.body}>
        <Content>
          <View style={{width:'100%',height:200,backgroundColor:'#02cda2',alignItems: 'center',flex: 1,justifyContent: 'center'}}>
            {this.state.photo
              ?<Thumbnail large source={{uri:this.state.photo}} />
              :<Thumbnail large source={require("../../src/general/avatar.png")} />
            }
            <H2 style={{color:'white'}}>{I18n.t('input.user')}</H2>
            <Text style={{color:'white'}}>{I18n.t('input.email')}</Text>
          </View>
          <Form>
           <Item floatingLabel>
              <Label>{I18n.t('input.ipname')}</Label>
              <Input />
           </Item>
           <Item floatingLabel>
              <Label>{I18n.t('input.pass')}</Label>
              <Input />
           </Item>
           <Item floatingLabel>
              <Label>{I18n.t('input.passr')}</Label>
              <Input />
           </Item>
          </Form>
        </Content>
          <Button full rounded style={globals.buttonlogin}>
            <Text>{I18n.t('input.update')}</Text>
          </Button>
      </Container>      
  	)
  }
}

export default withNavigation(PerfilComponent);