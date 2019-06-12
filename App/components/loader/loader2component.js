import React, { PureComponent } from 'react';
import {ImageBackground,ActivityIndicator,Modal,View} from 'react-native';
//Estilos
import globals from "../../styles/globals";

class loader2component extends PureComponent {
    
  closemodal = () => {
    this.props.close();
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.open}
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

export default loader2component;