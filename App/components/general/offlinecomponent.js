import React, { PureComponent } from 'react';
import {Image,StatusBar,KeyboardAvoidingView,ScrollView} from 'react-native';
import {Block,Button,Text} from 'galio-framework';
import design from '../../config/style/Style';

function MiniOfflineSign() {
  	return (
		<Block safe flex>
			<StatusBar hidden={false} barStyle="dark-content" translucent backgroundColor={"transparent"}/>
			<Block flex={1}/>
			<ScrollView keyboardShouldPersistTaps="handled">
			    <KeyboardAvoidingView
			        behavior="position"
			        keyboardVerticalOffset={5}
			    >
					<Block flex={3} center space="between"> 
						<Image style={design.style.img_offline} resizeMode="contain" source={require("@assets/img/error.png")} />
						<Text h3 style={design.style.toffline1} bold>Oops!</Text>
						<Block style={design.style.loffline}/>
						<Text h5 muted>Parece que te quedaste</Text>
						<Text h5 style={{color: design.theme.COLORS.GREY4}} bold>Sin Conexión</Text>
						{/* <Button size="large" color={design.theme.COLORS.PRIMARY} round onPress={this.handleConnectionChange}>Reconectar</Button>*/}
					</Block>   
				</KeyboardAvoidingView>
			</ScrollView>
		</Block>
  	);
}

class OfflineNotice extends PureComponent {
  render() {
      return <MiniOfflineSign />;
  }
}

export default OfflineNotice;