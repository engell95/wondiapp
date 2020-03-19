import React, { PureComponent } from 'react';
import {ImageBackground,ActivityIndicator,Modal,StatusBar} from 'react-native';
import {Block, Button, Input, NavBar, Text,Icon} from 'galio-framework';
//Estilos
import design from '../../config/style/Style';

class Load2 extends PureComponent {
    
  closemodal = () => {
    this.props.close();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.open}
        onRequestClose={() => this.closemodal()}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#000"/>
        <Block style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#000',opacity:0.5}}>
          <ImageBackground resizeMode="contain" source={require("../../assets/img/logo.png")} style={{width: 150,height: 150}}>
          </ImageBackground>
          <ActivityIndicator size="small" color='white'/>
        </Block>
      </Modal>
    );
  }
}

export default Load2;