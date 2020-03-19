import React, { PureComponent } from 'react';
import {Image,RefreshControl,View,ScrollView} from 'react-native';
//Estilos
import design from '../../config/style/Style';
import {Text} from 'galio-framework';

class Empty extends PureComponent {
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing = {this.props.refreshing}
            onRefresh= {this.props._onRefresh}
            //colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
          />
        }
        contentContainerStyle={{ backgroundColor: design.theme.COLORS.WHITE }}
      >
        <View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height: '100%'}}>
          <Image style={{width: 150,height: 150}} resizeMode="contain" source={require("../../assets/img/error.png")} />
          <Text h4>No se encuentran datos disponibles</Text>
        </View> 
      </ScrollView>
    );
  }
}

export default Empty;