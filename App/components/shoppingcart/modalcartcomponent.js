import React, { PureComponent } from 'react';
import {Alert,TouchableOpacity,StatusBar,ScrollView,FlatList,KeyboardAvoidingView,ActivityIndicator,ImageBackground,Modal} from 'react-native';
import {Block,Text,Icon,Switch,Button,Input} from 'galio-framework';
import design from '@config/style/Style';
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
import ProgressiveImage 		from '@components/image/AsyncImageComponent';
import Imgfull 					from '@components/image/FullImgComponent';
import Productdetfull 			from '@components/general/ProductDetComponent.js';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import DatePicker 			    from 'react-native-datepicker';
import NumericInput 		 	from 'react-native-numeric-input';
import AsyncStorage 		 	from '@react-native-community/async-storage';
import {fetchDataBudget} 	 	from '@redux/actions/BudgetAction';
import {fetchDataSuc} 	 	 	from '@redux/actions/SucAction';
import {newbudget,addbudget} 	from '@redux/actions/MainAction';
import {connect} 			 	from 'react-redux';

const fondo = require('@assets/img/fondo.png');
const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png'); 

class Pop_UpCard extends PureComponent {

	//inicializar variables
	constructor(props) {super(props)
    	this.state = {
      		//OpenCard: props.openmodal,
      		OpenCard:false,
      		modaldata: props.data,
      		total:0,
      		amount:1,
      		listbudget:false,
      		loader:false,
      		name_shopping:null,
      		id_shopping:null,
      		newbudget:false,
      		name:'',
      		nameError:null,
      		chosenDate: new Date(),
      		chosenDate1: new Date(),
      		productdet:false,
      		imgfull:false
  		}
  	}

  	componentWillReceiveProps(newProps){
  		if (this.state.OpenCard !== true) {
	  		this.setState({modaldata: newProps.data})
	  		this.setModalVisible(newProps.openmodal);
  		}
  	}

  	setModalVisible(visible) {
  		if (this.state.OpenCard !== true) {
  			this.setState({OpenCard: visible});
  		}
  	}

	//eliminando valores y cerrando el modal
	async Card_Popup_close(){
	  	try {
	  		this.setState({OpenCard: false,modaldata:[],total:0,amount:1,listbudget:false,newbudget:false,name:'',nameError:null,chosenDate: new Date(),loader:false});
	  	}
	  	catch(error) {
	  		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	  	}
	}

	//accion regresar modal
	async BackModal(option){
		try {
			if (option == 1) {
				this.setState({loader:false,listbudget:false})	
			}
			else if (option == 2){
				this.setState({newbudget:false,loader:false,listbudget:true})
			}
		}
		catch(error) {
		   	Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
		}
	}

	//boton regresar modal
	BackButton(option){
		return(
			<TouchableOpacity onPress={() => this.BackModal(option)} style={{marginRight:10,marginTop:3}}>
				<Icon
					family='ionicon'
					color={design.theme.COLORS.GREY2}
					size={design.theme.SIZES.BASE * 1.3}
					name='ios-arrow-back'
				/>
			</TouchableOpacity> 
		)
	}

	//encabezado modal
	header(header){return(<Text p bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={design.style.textpop}>{header}</Text>)}  	

	//seccion de diseño de imagen de productos
	handleSnapToItem(index){this.setState({ activeSlide: index });}

	//Diseño imagen en carusel
	Img({item, index}, parallaxProps) {
		return (
			<TouchableOpacity onPress={() => this.openmodalproductfull()}>
			    <ProgressiveImage
					style={design.style.imgaddcart}
					placeholderSource={carga}
					source={{uri: item.URL_Imagen}}
					placeholderColor={design.theme.COLORS.MUTED}
					resizeMode="stretch"
				/>
			</TouchableOpacity>
		);
	}

	//Diseño imagen de producto
	ImgPro2 (img) {
		return (
			<TouchableOpacity onPress={() => this.openmodalproductfull()}>
			    <Block style={[design.style.imgaddcart,{backgroundColor:design.theme.COLORS.GREY2}]}>
				    <ProgressiveImage
						style={design.style.imgaddcart}
						placeholderSource={carga}
						source={img}
						placeholderColor={design.theme.COLORS.MUTED}
						resizeMode="stretch"
					/>
				</Block>
			</TouchableOpacity>
		);
	}

	//seccion de diseño producto
	renderprod(){
	  	return(
	  		<Block>
				<Block style={{flexDirection: 'row',marginTop:20}}>
					<Block style={{width: '50%'}}>
						{this.state.modaldata.imagenes && this.state.modaldata.imagenes.length
							?<Block style={[design.style.imgaddcart,{backgroundColor:design.theme.COLORS.BLACK}]}>
							    <Carousel
								    ref={ (c) => { this._carousel = c; } }
								    data={this.state.modaldata.imagenes}
								    renderItem={this.Img.bind(this)}
								    onSnapToItem={this.handleSnapToItem.bind(this)}
								    hasParallaxImages={true}
								    sliderWidth={design.width * 0.4}
					  				itemWidth={design.width * 0.4}
								    activeSlideAlignment={'center'}
						        />
							 </Block>
							:(this.state.modaldata.img_empresa
								?this.ImgPro2({'uri':this.state.modaldata.img_empresa})
						        :this.ImgPro2(logo)
							)
						}
					</Block>
					<Block style={design.style.detpop}>
						<Text numberOfLines={1} p style={design.style.textpop2}>
							{this.state.modaldata.marca
								?this.state.modaldata.marca
								:this.state.modaldata.nombre
							}
						</Text>
						<Text numberOfLines={1} p style={design.style.textpop2}>
							{this.state.modaldata.unidad_medida
								?this.state.modaldata.unidad_medida
								:this.state.modaldata.nombre
							}
						</Text>
						<Text numberOfLines={1} p style={design.style.textpop2}>{this.state.modaldata.simbolo} {this.state.amount * this.state.modaldata.precio}</Text>
						<Block style={design.style.content_num}>
							<NumericInput 
								initValue={this.state.amount}
								value={this.state.amount} 
								onChange={(amount) => {this.setState({amount:amount})}} 
								minValue = {1}
								valueType='real'
								maxValue={9999}
								totalWidth={120} 
								totalHeight={40} 
								rounded
							/>
						</Block>
					</Block>
				</Block>
				<Block center style={design.style.content_but}>
					<Button round size="small" color={design.theme.COLORS.PRIMARY2} style={design.theme.button_add} onPress={() => {this.selectaction();}}>
						Agregar
					</Button>
				</Block>
			</Block>
	  	)
	}

	//lista de presupuesto//	

	  	//aperturando lista de presupuesto
	  	async selectaction(){
		 	this.setState({loader:true,listbudget:true,productdet:false});
		    try {
		    	this.props.fetchDataBudget(this.state.modaldata.user)
				const id_shopping = await AsyncStorage.getItem('id_shopping');
				const name_shopping = await AsyncStorage.getItem('name_shopping');
				this.setState({ id_shopping: id_shopping ,name_shopping:name_shopping});  
		    } 
		    catch(error) {
		    	Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
		    }
	  	}

	  	//agregando a un presupuesto
	  	async storeadd(id_shopping){
		  	const userfix  = Number(this.props.data.user)
		    const tokenfix = this.props.data.token.split('"').toString()
		  	try{
			  	this.props.add({user:userfix,prod:this.props.data.prod,suc:this.props.data.suc,cant:this.state.amount,id_card:id_shopping,token:tokenfix,languaje:this.props.data.languaje});
			}
			catch(error) {
				Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,);
			}
			finally {
			    this.Card_Popup_close();
			}
		}

		//spinner de carga
		loader(){
		  	return(
		  		<Block style={{flex: 1,justifyContent: 'center',marginTop:design.width * 0.12,marginBottom:design.width * 0.10}}>
		  			<ActivityIndicator size="large" color="#0000ff"/>
		  		</Block>
		  	)
		}

	  	//seccion de diseño de lista de presupuestos
	  	Itembudget = (item) => {
		   	return (
		   		<TouchableOpacity onPress={() => {this.storeadd(item.Cod_Presupuesto)}}>
		   			<Block style={{flexDirection: 'row'}}>
						<Icon
							family='antdesign'
							color={design.theme.COLORS.MUTED}
							size={design.theme.SIZES.BASE * 1.5}
							name='shoppingcart'
						/>
			   			<Text numberOfLines={1} p>  {item.N_Presupuesto}</Text> 
					</Block>	
				</TouchableOpacity>
			)
		} 

		//seccion de diseño lista de presupuestos
		renderbudgetlist(){
			return(
				<ScrollView>
					<Block center style={{marginTop:20}}>
						<TouchableOpacity onPress={() => {this.setState({ newbudget: !this.state.newbudget })}}>
							<Text numberOfLines={1} color={design.theme.COLORS.WHITE} style={design.style.button_new}>Nuevo Presupuesto</Text>
						</TouchableOpacity>
					</Block> 
						{this.state.id_shopping
					    	?<TouchableOpacity onPress={() => {this.storeadd(this.state.id_shopping)}}>
								<Block style={{flexDirection: 'row'}}>
								   	<Icon
										family='material-community'
										color={design.theme.COLORS.BLACK}
										size={design.theme.SIZES.BASE * 1.5}
										name='cart-plus'
									/>
									<Text numberOfLines={1} p color={design.theme.COLORS.BLACK}>  {this.state.name_shopping.split('"')}</Text> 
							    </Block>
							 </TouchableOpacity>
							:null
				    	}
				    {this.props.budget && this.props.budget.item.data.length
				    	?<Block style={{marginTop:10}}>
							<FlatList
								data={this.props.budget.item.data}
								renderItem={({item}) => this.Itembudget(item)}
								keyExtractor={(item, index) => index.toString()}
							/>
						 </Block>
				    	:null
				    }
				</ScrollView>
			)
		}

	//crear presupuesto//		

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
			        const userfix  = Number(this.state.modaldata.user)
			        const tokenfix = this.state.modaldata.token.split('"').toString()
			        try{
			        	this.props.newbudget({name:this.state.name,user:userfix,prod:this.state.modaldata.prod,suc:this.state.modaldata.suc,cant:this.state.amount,date:date,token:tokenfix,languaje:this.props.languaje});
			        }
				    catch(error) {
						Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,);
				    }
				    finally {
				        this.Card_Popup_close();
				    }
			    }
			}
	  	}

		//seccion de diseño crear presupuesto
		rendernewbudget(){
			return(
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
			)
		}	

	/******detalles de producto******/ 

		//accion abrir detalle de productos
  		async openmodalproductfull(){
			try {
				this.props.fetchDataSuc(this.state.modaldata.empresa)
			}
			catch(error) {
		  		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
		  	}
		  	finally{
		  		this.setState({productdet:true});	
		  	}
  		}	

  		//funcion para cerrar componente
  		closemodalproductfull = () =>{this.setState({productdet:false});}
		
		//seccion detalle de producto
		ModalProductfull(open){
			if (open == true) {
				return <Productdetfull open={this.state.productdet} data={this.state.modaldata} close={this.closemodalproductfull.bind(this)} add={this.selectaction.bind(this)}/>
			}
			else{
				return null
			} 
		}

  	render() {
  		return(
  			<Block>
  				{/**pop up de funcionalidades**/}
	  			<Dialog
					visible={this.state.OpenCard}
					onTouchOutside={() => {this.Card_Popup_close()}}
					onHardwareBackPress={() => {this.Card_Popup_close()}}
					width={0.9}
					dialogTitle={
					   	<Block style={design.style.headerpop}>
						    <Block style={design.style.headersub}>
						    	{/*botton regresar*/}
						    	{this.state.loader && this.props.budget.isFeching
						    		?null
						    		:!this.props.budget.isFeching && this.state.listbudget && !this.state.newbudget
						    		 ?this.BackButton(1)
						    		 :this.state.newbudget
						    		 	?this.BackButton(2)
						    		 	:null
					          	}
					          	{/*encabezado*/}
						    	{this.state.loader && this.props.budget.isFeching
								   	?this.header('Espere un momento')
								   	:!this.props.budget.isFeching && this.state.listbudget && !this.state.newbudget
								   		?this.header('Mis presupuestos')
								   		:this.state.newbudget
								   		 ?this.header('Nuevo Presupuesto')
								   		 :this.header(this.state.modaldata.nombre)
								}
								<TouchableOpacity onPress={() => this.Card_Popup_close()}>
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
					   	{this.state.loader && this.props.budget.isFeching
					   	?this.loader()
					   	:!this.props.budget.isFeching && this.state.listbudget && !this.state.newbudget
					   		?this.renderbudgetlist()
					   		:this.state.newbudget
					   		 ?this.rendernewbudget()
					   		 :this.renderprod()
						}    
					</DialogContent>   
				</Dialog>
				{/**realizando renderizado de los detalles del producto**/}
				{this.ModalProductfull(this.state.productdet)}
			</Block>
  		)
  	}
}

const mapStateToProps = state => {
  return {
    budget: 	state.budget,
    sucursales: state.suc,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataBudget: (id) 	=> {return dispatch(fetchDataBudget(id))},    
    fetchDataSuc: 	 (id) 	=> {return dispatch(fetchDataSuc(id))},
    add: 			 (data) => {return dispatch(addbudget(data))},
    newbudget: 		 (data) => {return dispatch(newbudget(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pop_UpCard);