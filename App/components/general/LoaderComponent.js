import React, { PureComponent } from 'react';
import {Image,StatusBar,KeyboardAvoidingView,ScrollView,RefreshControl} from 'react-native';
import {Block} from 'galio-framework';
import design from '@config/style/Style';
/*
refreshControl={
          <RefreshControl
            refreshing = {this.props.refreshing}
            onRefresh= {this.props._onRefresh}
            colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
          />
        }
*/

class Load extends PureComponent {
  render() {
    return (
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
      >
        <StatusBar hidden={false} barStyle="dark-content" translucent backgroundColor={"transparent"}/>
        <Block center style={design.style.center}> 
          <Image style={design.style.img_offline} resizeMode="contain" source={require("@assets/img/spinner.gif")} />
        </Block>   
      </ScrollView>
    );
  }
}

export default Load;