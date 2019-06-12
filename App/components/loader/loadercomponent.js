import React, { PureComponent } from 'react';
import {Image,RefreshControl,View,Text,ScrollView} from 'react-native';
//Estilos
import globals from "../../styles/globals";

class Load extends PureComponent {
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
        <View style={globals.object_center}>
          <Image style={globals.img_spinner2} resizeMode={'contain'} source={require("../../src/general/spinner.gif")} />
        </View> 
      </ScrollView>
    );
  }
}

export default Load;