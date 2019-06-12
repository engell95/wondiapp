import React, {Component} from 'react';
import {Image} from 'react-native';
import {Button,Icon,View} from 'native-base';
import PerfilComponent from "../../../components/configure/perfilcomponent";
import globals from "../../../styles/globals";

class perfilscreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <Image style={globals.logo_header_b} resizeMode="contain" source={require("../../../src/general/header.png")} />
    ),
    headerRight:( 
      <Button transparent style={{marginTop:6}} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })
  
  render() {
    return (
      <PerfilComponent/>
    );
  }
}

export default perfilscreen 