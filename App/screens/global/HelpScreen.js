import React from 'react';
import {KeyboardAvoidingView,ScrollView,Linking,TouchableOpacity,Modal,NetInfo,StatusBar} from 'react-native';
import {Block, Button, Input, NavBar, Text,Icon} from 'galio-framework';
//import NetInfo from "@react-native-community/netinfo";
import design from '../../config/style/Style';
import PushNotification from 'react-native-push-notification';

const MARGIN_LEFT = '5%';

class Help extends React.Component {

	static navigationOptions = {header: null};

 	constructor(props) {
    	super(props)
    	this.state = {
      		modalVisible: false,
      		datatitle:'',
      		dataencab:'',
      		textlits:[],
      		title:''
    	};
  	}
	
	handleGoBack = () => this.props.navigation.goBack();

	setModalVisible(visible,pr) {
  		if (pr == 1) {
  			this.setState({
  			    title: 'Olvide mi contraseña',
  				datatitle: 'Para los usuarios que han olvidado su contraseña',
  				dataencab: 'aquí tienen las siguientes instrucciones Para Aplicaciones iOS y Android',
  				textlits:[ '1. Abre la aplicación y haz presiona el icono iniciar  que se encuentra en la parte superior de la ventana de inicio de wondi.',
  						   '2. Dentro de iniciar busca el botón iniciar debajo de él se encuentra la opción ¿Olvidé mi contraseña?',
  						   '3. Introduzca el correo electrónico asociado a tu cuenta.',
  						   '4. Un correo electrónico será enviado a tu bandeja de entrada - asegúrese de comprobar su carpeta de correo no deseado y las Promociones y pestañas sociales, si utiliza Gmail.',
  						   '5. Haz clic (o clic izquierdo, y luego copiar y pegar en la barra de direcciones de su navegador) en el enlace del correo electrónico. Cuando lo hayas hecho, por favor sigue las instrucciones para crear una nueva contraseña.']
  			});
  		}
  		else if(pr == 2){
  			this.setState({
  			    title: 'No puedo registrarme (Facebook o Gmail)',
  				datatitle: 'Para los usuarios que no pueden registrarse con sus redes (Gmail y Facebook)',
  				dataencab: 'aquí tienen las siguientes instrucciones Para Aplicaciones iOS y Android',
  				textlits:[ '1. Verifica que te encuentras conectado a una red wifi o acceso a datos móviles.',
  						   '2. Poseer la última versión de Wondi App.',
  						   '3. Esperar a que la ventana de acceso a Facebook o Gmail termine de cargar.',
  						   '4. Digitar correctamente sus credenciales para obtener acceso.',
  						   '5. Dar autorización a wondi para acceder a sus datos para registrarse.']
  			});
  		}
  		else if(pr == 3){
  			this.setState({
  			    title: 'La aplicación se cierra forzadamente',
  				datatitle: 'La aplicación se cierra forzadamente',
  				dataencab: 'aquí tienen las siguientes instrucciones Para Aplicaciones iOS y Android',
  				textlits:[ '1. Verifica que te encuentras conectado a una red wifi o acceso a datos móviles.',
  						   '2. Poseer la última versión de Wondi App.',
  						   '3. Borrar datos de la aplicación (Android).',]
  			});
  		}
    	this.setState({modalVisible: visible});
  	}

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
        		<ScrollView keyboardShouldPersistTaps="handled">
			        <KeyboardAvoidingView
			        	behavior="position"
			        	keyboardVerticalOffset={5}
			        >
			          	<Block left flex={2} style={design.style.header}><Text h4>Preguntas Frecuentes</Text></Block>
			          	<Block row flex={3} space="between" style={design.style.container3}>
				        	<Block left flex={3} style={{marginLeft: MARGIN_LEFT}}>
					        	<TouchableOpacity onPress={() => {this.setModalVisible(true,1);}} style={{marginTop:10}}>
				                    <Text>Olvide mi contraseña</Text>
				                </TouchableOpacity>
				                <TouchableOpacity onPress={() => {this.setModalVisible(true,2);}} style={{marginTop:10}}>
				                    <Text>No puedo registrarme (Facebook o Gmail)</Text>
				                </TouchableOpacity>
				                <TouchableOpacity onPress={() => {this.setModalVisible(true,3);}} style={{marginTop:10}}>
				                    <Text>La aplicación se cierra forzadamente</Text>
				                </TouchableOpacity>
			                </Block>
		                </Block>
			        </KeyboardAvoidingView>
			    </ScrollView>    
			    <Block left space="between" style={{marginLeft: MARGIN_LEFT}}>
					<Text color={design.theme.COLORS.PRIMARY} size={design.theme.SIZES.FONT * 1} style={{marginBottom: 10}}>{"Servicio de ayuda"}</Text>
					<Text 
			        	onPress={() => Linking.openURL('https://www.termsfeed.com/privacy-policy/05fb15b13682cf96b87b0c0d2ea9ae95') }
			        >
			        	Políticas y condiciones
			        </Text>
			        <Text 
			        	onPress={() => Linking.openURL('mailto:soporte@wondiapp.com') }
			        >
			        	Contáctanos
			        </Text>
				</Block>
			    <Modal
		          animationType="slide"
		          transparent={true}
		          visible={this.state.modalVisible}
		        >
		        	<StatusBar barStyle="dark-content" backgroundColor="white"/>
		        	<Block style={{backgroundColor:'white',width:design.width,height:design.height}}>
		        	<Block style={design.style.iconclose}>
	          			<TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{marginLeft:-10,marginBottom:10}}>
				            <Icon
				              family='evilicons'
				              color={design.theme.COLORS.GREY}
				              size={design.theme.SIZES.BASE * 1.7}
				              name='close'
				            />
	          			</TouchableOpacity>
	          			<Text muted size={design.theme.SIZES.FONT * 1} color={design.theme.COLORS.PRIMARY}>{this.state.datatitle}</Text>
				        <Text style={{paddingTop:10}}>{this.state.dataencab}</Text>
				        {this.state.textlits.map(item => (
					        <Text style={{paddingTop:10}} key={item}>{item}</Text>
					    ))}
					</Block>
					</Block> 
		        </Modal>
			</Block>	
		)
	}
}

export default Help;