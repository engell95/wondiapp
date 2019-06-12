import React, {Component} from 'react';
import {Linking,Image,NetInfo,StatusBar,TouchableOpacity,Modal,TouchableHighlight} from 'react-native';
import {Container,Content,Grid,Row,Text,View,Icon,H3,List,ListItem,Left,Body,Right} from "native-base";
//Estilo
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

class Help extends React.Component {

	static navigationOptions = {
    	header: null,
  	};

  	constructor(props) {
    	super(props)
    	this.state = {
      		isConnected: true,
      		modalVisible: false,
      		datatitle:'',
      		dataencab:'',
      		textlits:[],
      		title:''
    	};
  	}

  	componentDidMount() {
	    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
	    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); }); 
  	}

	componentWillMount() {
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
	}

	handleConnectionChange = (isConnected) => {
    	this.setState({isConnected });
  	}

  	setModalVisible(visible,pr) {
  		if (pr == 1) {
  			this.setState({
  			    title: I18n.t('help.title'),
  				datatitle: I18n.t('help.datatitle'),
  				dataencab: I18n.t('help.dataencab'),
  				textlits:[ '1. Abre la aplicación y haz presiona el icono iniciar  que se encuentra en la parte superior de la ventana de inicio de wondi.',
  						   '2. Dentro de iniciar busca el botón iniciar debajo de él se encuentra la opción ¿Olvidé mi contraseña?',
  						   '3. Introduzca el correo electrónico asociado a tu cuenta.',
  						   '4. Un correo electrónico será enviado a tu bandeja de entrada - asegúrese de comprobar su carpeta de correo no deseado y las Promociones y pestañas sociales, si utiliza Gmail.',
  						   '5. Haz clic (o clic izquierdo, y luego copiar y pegar en la barra de direcciones de su navegador) en el enlace del correo electrónico. Cuando lo hayas hecho, por favor sigue las instrucciones para crear una nueva contraseña.']
  			});
  		}
  		else if(pr == 2){
  			this.setState({
  			    title: I18n.t('help.title2'),
  				datatitle: I18n.t('help.datatitle2'),
  				dataencab: I18n.t('help.dataencab'),
  				textlits:[ '1. Verifica que te encuentras conectado a una red wifi o acceso a datos móviles.',
  						   '2. Poseer la última versión de Wondi App.',
  						   '3. Esperar a que la ventana de acceso a Facebook o Gmail termine de cargar.',
  						   '4. Digitar correctamente sus credenciales para obtener acceso.',
  						   '5. Dar autorización a wondi para acceder a sus datos para registrarse.']
  			});
  		}
  		else if(pr == 3){
  			this.setState({
  			    title: I18n.t('help.title2'),
  				datatitle: I18n.t('help.title2'),
  				dataencab: I18n.t('help.dataencab'),
  				textlits:[ '1. Verifica que te encuentras conectado a una red wifi o acceso a datos móviles.',
  						   '2. Poseer la última versión de Wondi App.',
  						   '3. Borrar datos de la aplicación (Android).',]
  			});
  		}
    	this.setState({modalVisible: visible});
  	}

  	render() {
  		return (
  			<Container style={globals.body}>
  			    <StatusBar backgroundColor={globals.focus.color} barStyle="light-content"/>
  				<Content>
  					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
			            <View style={[globals.viewiconback,{marginTop: '10%'}]}>
			              <Icon ios='ios-arrow-back' android="md-arrow-round-back" style={globals.title2}/>
			            </View>
			        </TouchableOpacity>
			        <View style={globals.center}>
            			<Image style={globals.imgheader} resizeMode="contain" source={require("../../src/general/header.png")} />
          			</View>
	          		<View style={globals.viewlogin}>
	          			<H3 style={globals.title}>{I18n.t('help.title4')}</H3>
		          		<List>
		                    <ListItem icon noBorder>
		                      <Left>
		                        <Icon ios='ios-help-circle' android='md-help-circle'/>
		                      </Left>
		                      <Body>
		                      	<TouchableOpacity onPress={() => {this.setModalVisible(true,1);}}>
		                        	<Text>{I18n.t('help.title')}</Text>
		                        </TouchableOpacity>
		                      </Body>
		                    </ListItem>
		                    <ListItem icon noBorder>
		                      <Left>
		                        <Icon ios='ios-help-circle' android='md-help-circle'/>
		                      </Left>
		                      <Body>
		                      	<TouchableOpacity onPress={() => {this.setModalVisible(true,2);}}>
		                        	<Text>{I18n.t('help.title2')}</Text>
		                        </TouchableOpacity>
		                      </Body>
		                    </ListItem>
		                    <ListItem icon noBorder>
		                      <Left>
		                        <Icon ios='ios-help-circle' android='md-help-circle'/>
		                      </Left>
		                      <Body>
		                      	<TouchableOpacity onPress={() => {this.setModalVisible(true,3);}}>
		                        	<Text>{I18n.t('help.title3')}</Text>
		                        </TouchableOpacity>
		                      </Body>
		                    </ListItem>
	                    </List>
	          		</View>
  				</Content>
  				<View style={[globals.form,{width: '90%',marginBottom: 10}]}>
            		<H3 style={[globals.title,{textAlign: 'left'}]}>{I18n.t('help.help')}</H3>
                	<View style={globals.separador}/>
	                <Text 
			            onPress={() => Linking.openURL('mailto:engel.lopez@wondiapp.com') }
            			title="engel.lopez@wondiapp.com"
		          	>
                  	{I18n.t('reset.contac')}
                	</Text>
              	</View>
              	<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            Alert.alert('Modal has been closed.');
		          }}>
		          	<StatusBar backgroundColor = {globals.focus.color}/>
		          	<List style={globals.view_title2}>
			          <ListItem noBorder style = {globals.ListItemh}>
			            <Body>
			              <Text numberOfLines={1} style={globals.tex_title_new}>{this.state.title}</Text>
			            </Body>
			            <Right>
			              <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
			                <Icon name='md-close' style={globals.close_ico_new}/>
			              </TouchableOpacity>
			            </Right>
			          </ListItem>
			        </List>
			        <Content style={[globals.content,{paddingTop:10}]}>
			        	<H3 style={{paddingTop:20}}>{this.state.datatitle}</H3>
			        	<Text style={{paddingTop:10}}>{this.state.dataencab}</Text>
			        	{this.state.textlits.map(item => (
				        	<Text style={{paddingTop:10}} key={item}>{item}</Text>
				        ))}
			        </Content>
		        </Modal>
  			</Container>
  		)
  	}
}

export default  Help