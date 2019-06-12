import React, { PureComponent } from 'react';
import {ImageBackground,ActivityIndicator,Modal} from 'react-native';
import {View} from 'native-base';
//Estilos
import globals from "../../styles/globals";

class Load2 extends PureComponent {
    
  closemodal = () => {
    this.props.close();
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.open}
        onRequestClose={() => this.closemodal()}
      >
        <View style={globals.contenedor_spi}>
          <ImageBackground resizeMode="contain" source={require("../../src/intro/login.png")} style={{width:45,height:80}}>
            <ActivityIndicator size={80} color='white' style={globals.spinner2}/>
          </ImageBackground>
        </View>
      </Modal>
    );
  }
}

export default Load2;