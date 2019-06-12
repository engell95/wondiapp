import React, { PureComponent } from 'react';
import {Image,RefreshControl,View,Text,ScrollView} from 'react-native';
import {H3} from 'native-base';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

class Empty extends PureComponent {
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing = {this.props.refreshing}
            onRefresh= {this.props._onRefresh}
            colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
          />
        }
        contentContainerStyle={[globals.body,{flexGrow: 1}]}
      >
        <View style={globals.contenedor_spi2}>
          <Image style={globals.img_spinner3} resizeMode="contain" source={require("../../src/general/result.png")} />
          <H3 style={globals.title}>{I18n.t('global.nodata')}</H3>
        </View> 
      </ScrollView>
    );
  }
}

export default Empty;