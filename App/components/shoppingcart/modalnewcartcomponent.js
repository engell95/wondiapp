import React, { PureComponent } from 'react';
import {View,Keyboard,BackHandler,TouchableOpacity,ScrollView,Image,Dimensions,FlatList,StatusBar,Alert,KeyboardAvoidingView} from 'react-native';
import {Block, Button, Input, NavBar, Text,Icon,theme} from 'galio-framework';
import design from '@config/style/Style';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import DatePicker from 'react-native-datepicker'
import {newbudgetacces} from '@redux/actions/MainAction';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

//const { width, height } = Dimensions.get('window')

class Modalcartcomponent extends PureComponent {
	
	//inicializar variables
  	constructor(props) {super(props)
	    this.state = {
	      	name:'',
	   		nameError: null,
	   		chosenDate: new Date(),
	   		chosenDate1: new Date(),
      		modalnewacces:props.newmodal2,
	    };
	    this.setDate  = this.setDate.bind(this);
  	}

  	setDate(newDate) {this.setState({ chosenDate: newDate });}

  	//formateando fecha
	formatDate(date) {
		var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
		if (month.length < 2) 
		    month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
		return [year, month, day].join('-');
	}

  	async exitmodalnewacces(){
		try {
		    await this.setState({modalnewacces:false,nameError: null,name:''});
		    await this.props.closemodal();
		}
	    catch(error) {
	  		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	  	}
  	}

  	async exitmodalnewacces2(){
	    try {
	        await this.setState({modalnewacces:false,nameError: null,name:''});
	    	await this.props.closemodal2();
	    }
	    catch(error) {
	  		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	  	}
  	}

  	//validacion de nuevo presupuesto
	async validate(){
		this.setState(() => ({ nameError: null}));
		if (this.state.name.trim() == '') {
		  this.setState({ nameError:'El nombre es requerido'});
		} 
		else if (this.state.name.length < 3) {
		    this.setState({ nameError: 'El Nombre debe contener al menos 3 caracteres'});
		}
		else{
			try{
			 	if (this.state.chosenDate.toString() == this.state.chosenDate1.toString()) 
	        	{	
		        	var date = this.formatDate(this.state.chosenDate);
	        	}
		       else
		       {
		        	var date = this.state.chosenDate.split("-").reverse().join("-");
		       }
			}
			catch(error) {
				Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,);
			}
			finally {
			    var userfix = Number(this.props.data.user)
	        	const tokenfix = this.props.data.token.split('"').toString()
			    try{
			    	this.props.newbudgetacces({name:this.state.name,user:userfix,date:date,token:tokenfix,languaje:this.props.data.languaje});
			    }
				catch(error) {
					Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,);
				}
				finally {
				    this.exitmodalnewacces2();
				}
			}
		}
	}

  	_rendermodal3(){
    	return(
    		<Dialog
				visible={this.state.modalnewacces}
				onTouchOutside={() => {this.exitmodalnewacces()}}
        		onHardwareBackPress={() => {this.exitmodalnewacces()}}
				width={0.9}
				dialogStyle={this.state.dialogStyle}
				dialogAnimation={new ScaleAnimation()}
				dialogTitle={
					<Block style={design.style.headerpop}>
						<Block style={design.style.headersub}>
						  	<Text p bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={design.style.textpop}>Nuevo Presupuesto</Text>
					        <TouchableOpacity onPress={() => this.exitmodalnewacces()}>
								<Icon
									family='antdesign'
									color={design.theme.COLORS.GREY2}
									size={design.theme.SIZES.BASE * 1.3}
									name='closecircle'
								/>
							</TouchableOpacity> 
						</Block>
				    </Block>
	            }
			>
				<DialogContent>
					<Block style={{marginTop: 10}}>
						<Input
							rounded 
							placeholder="Presupuesto"
							style={design.style.input3}
							placeholderTextColor={design.theme.COLORS.PLACEHOLDER}
							onChangeText={(text) => this.setState({ name: text })}
						/>
						{!!this.state.nameError && (
				            <Text style={design.style.texterror}>{this.state.nameError}</Text>
				        )}
						<DatePicker
							style={{width: '100%',marginTop:10,marginBottom:10}}
							date={this.state.chosenDate}
							mode="date"
							placeholder="Seleccione una fecha"
							format="DD-MM-YYYY"
							minDate={this.state.chosenDate1}
							confirmBtnText="Confirmar"
							cancelBtnText="Cancelar"
							customStyles={{
								dateIcon: {
								    position: 'absolute',
								    left: 10,
								    top: 4,
								    marginLeft: 10
								},
								dateInput: {
								    borderColor: design.theme.COLORS.PRIMARY2,
								    borderRadius:22,
								    height:design.theme.SIZES.INPUT_HEIGHT,
								    borderWidth: design.theme.SIZES.INPUT_BORDER_WIDTH,
								}
							}}
							onDateChange={(date) => {this.setState({chosenDate: date})}}
						/>
						<Block style={design.theme.linenew}/>
						<Block center style={{justifyContent: 'center',alignItems: 'center',marginTop:15}}>
						 	<Button round size="small" color={design.theme.COLORS.PRIMARY2} onPress={()=> {this.validate()}}>
							    Guardar
							</Button>
					    </Block>  
					</Block>
				</DialogContent>
			</Dialog>
    	)
  	}

  	render(){
		return(
      		<Block>
        		{this._rendermodal3()}
      		</Block>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return {
    newbudgetacces:(data) =>{return dispatch(newbudgetacces(data))},
  }
}

export default withNavigation(connect(null, mapDispatchToProps)(Modalcartcomponent))