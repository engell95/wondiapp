import React, { PureComponent } from 'react';
import {Image,StatusBar} from 'react-native';
import {Container,Content,View,Text,Button } from 'native-base';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

function MiniOfflineSign() {
  return (
      <Container  style={globals.body}>
      <StatusBar backgroundColor = '#B60101'/>
      <Content style={{marginTop:'40%'}}>
        <View style={globals.center}>
          <Image style={{width:200,height: 200}} resizeMode="contain" source={require("../../src/general/conexion.png")} />
          <Text style={globals.textoff}>{I18n.t('global.conect')}</Text>
        </View>
        <Button rounded style={globals.button_login} onPress={this.handleConnectionChange}><Text style={[globals.center]}>Reconectar</Text></Button>
      </Content>
    </Container>
  );
}
class OfflineNotice extends PureComponent {
  render() {
      return <MiniOfflineSign />;
  }
}

export default OfflineNotice;