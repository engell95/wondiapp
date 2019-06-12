import React, { PureComponent } from 'react';
import {Image,RefreshControl,StatusBar} from 'react-native';
import {Container,Content,View,Grid,Col,Button,Text} from 'native-base';
//Estilos
import globals from "../../styles/globals";

class Load extends PureComponent {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor={globals.body.backgroundColor} animated/>
        <Content
          styles={globals.body}
          contentContainerStyle={{flex: 1}}
        >  
          <Grid style={[globals.body,{alignItems: 'center'}]}>
            <Col>
              <View style={globals.contenedor}> 
               <Image style={globals.img_spinner} resizeMode={'contain'} source={require("../../src/intro/wondi1-5.png")} />
               
              </View>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Load;