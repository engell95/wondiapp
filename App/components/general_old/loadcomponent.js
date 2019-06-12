import React, { PureComponent } from 'react';
import {Image,RefreshControl,View,Text} from 'react-native';
import {Container,Content,Grid,Col,Button} from 'native-base';
//Estilos
import globals from "../../styles/globals";

class Load extends PureComponent {
  render() {
    return (
      <Container styles={globals.body}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing = {this.props.refreshing}
              onRefresh= {this.props._onRefresh}
              colors={["#DE0001", "#85D848", "#009DC3"]}
            />
          }
          styles={globals.body}
          contentContainerStyle={{flex: 1}}
        >  
          <Grid style={[globals.body,{alignItems: 'center'}]}>
            <Col>
              <View style={globals.contenedor}> 
               <Image style={globals.img_spinner} resizeMode={'contain'} source={require("../../src/general/spinner.gif")} />
              </View>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Load;