import React from 'react';
import {Alert, Dimensions, KeyboardAvoidingView,ScrollView, Platform,Linking,NetInfo,StatusBar,TouchableOpacity} from 'react-native';
import {Block, Button, Input, NavBar, Text,} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
//import NetInfo from "@react-native-community/netinfo";
import design from '../../config/style/Style';

const MARGIN_LEFT = '5%';

class Reset extends React.Component {

	static navigationOptions = {header: null};

	constructor(props) {
    	super(props);
    	this.state = {
        	email:'',
      	}
    };


  	handleConnectionChange = (isConnected) => {this.setState({isConnected });}

    //alerta de cambio de pass
  	send = () => {
	    Alert.alert(
	      'Recupera tu cuenta',
	      'Se ha enviado un correo electrónico indicando los pasos para restablecer su contraseña',
		    [
		      {text: 'Ok', onPress:() => this.handleGoBack()},
		    ],
		    { cancelable: false }
	    )
  	}

  	handleGoBack = () => this.props.navigation.goBack();

	render() {

		return (
			<Block safe flex style={{ backgroundColor: design.theme.COLORS.WHITE }}>
				<StatusBar barStyle="dark-content" backgroundColor="white"/>
				<NavBar
		          transparent
		          back
		          leftStyle={{marginLeft:5,paddingLeft:5}}
		          leftIconColor={design.theme.COLORS.TEXT2}
		          onLeftPress={this.handleGoBack}
        		/>
				<Block left flex={1} style={design.style.header}><Text h4 color={design.theme.COLORS.HEADER1}>Restablecer Contraseña</Text></Block>
				<ScrollView keyboardShouldPersistTaps="handled">
			        <KeyboardAvoidingView
			        	behavior="position"
			        	keyboardVerticalOffset={5}
			        >
						<Block flex={3} center space="between">
							<Block flex={3}>
								<Input
							      borderless
							      type="email-address"
							      placeholder="Correo"
							      autoCapitalize="none"
							      style={[design.style.input,{fontSize:18,borderColor:'#FFFFFF'}]}
							      //placeholderTextColor='red'
							      value={this.state.email} 
                  				  onChangeText={(text) => this.setState({ email: text })} 
							    />
							</Block>
							<Block flex middle style={{marginTop: 20}}>
								
								<Button
			                    radius={20}
			                    shadowColor={design.theme.COLORS.BLOCK}
			                    color={design.theme.COLORS.PRIMARY2}
			                    onPress={this.send}
			                  >
			                    <Text 
			                      center 
			                      color={design.theme.COLORS.WHITE} 
			                      size={design.theme.SIZES.FONT * 1} 
			                      //bold
			                      size={16}
			                    >
			                      RESTABLECER
			                    </Text>
			                  </Button>
				              
		            		</Block>
						</Block>   
					</KeyboardAvoidingView>
				</ScrollView>
				<Block left space="between" style={{marginLeft: MARGIN_LEFT}}>
					<Text color={'#1A9CE8'} size={design.theme.SIZES.FONT * 1} style={{marginBottom: 10,fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',fontSize: 18}}>{"Servicio de ayuda"}</Text>
					<Text color={'#707070'} onPress={() => this.props.navigation.navigate("Help")}
						style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',fontSize: 15}}
					>
						Ayuda de nuestra App
					</Text>
					<Text 
						color={'#707070'}
			        	onPress={() => Linking.openURL('https://www.termsfeed.com/privacy-policy/05fb15b13682cf96b87b0c0d2ea9ae95') }
			        	style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',fontSize: 15}}
			        >
			        	Políticas y condiciones
			        </Text>
			        <Text 
			        	color={'#707070'}
			        	onPress={() => Linking.openURL('mailto:soporte@wondiapp.com') }
			        	style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',fontSize: 15}}
			        >
			        	Contáctanos
			        </Text>
				</Block>
			</Block>
		)
	}

}


export default Reset;