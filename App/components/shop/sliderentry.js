import React, {Component} from 'react';
import {Image,View,TouchableWithoutFeedback,TouchableOpacity,Text} from 'react-native';
import globals from "../../styles/globals";

export default class SliderEntry extends Component {

    render () {
        const { navigation,data } = this.props; 
        return (
          <TouchableOpacity 
            onPress={() => {this.props.navigation.navigate("Promo",{id:data.Cod_Empresa,name:data.N_Empresa,img:data.Logo})}}
          >
            <View style={{width:'100%'}}>
                <Image resizeMode={'cover'} style={globals.bannerimg} source={{uri: data.Logo}}/>        
            </View>
          </TouchableOpacity>
        )
    }
}