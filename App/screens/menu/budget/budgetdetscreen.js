import React, {PureComponent} from 'react';
import {Image,FlatList,RefreshControl,Alert,KeyboardAvoidingView,ScrollView,TouchableOpacity,NetInfo,StatusBar,StyleSheet,Keyboard,BackHandler,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Block, Button,Input,NavBar,Icon,Card,theme,Text} from 'galio-framework';
import design from '@config/style/Style';
import Load from '@components/general/LoaderComponent';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import NumericInput from 'react-native-numeric-input';
import Swipeable from '@components/general/SwipeableComponent';
import DatePicker from 'react-native-datepicker';
import Dialog, {DialogContent,ScaleAnimation,DialogTitle,DialogButton,DialogFooter} from 'react-native-popup-dialog';

import Productdetfull from '../../../components/general/ProductDetComponent.js';

import {fetchDataBudgetDet} from '@redux/actions/DBudgetAction';
import {delbudget,destroybudget,editbudget,amountbudget} from '@redux/actions/MainAction';
import {fetchDataproddet} from '@redux/actions/ProddetAction';
import {connect} from 'react-redux';

const fondo   = require('@assets/img/fondo.png');
const carga   = require('@assets/img/carga.png');
const logo    = require('@assets/img/logo3.png');
const deletei = require('@assets/img/iconos/basura.png');
const MARGIN_LEFT = '5%';

class Budget_det extends PureComponent {

	swipeable = null;

	//inicializar variables
	constructor(props) {super(props)
	    this.state = {
	      refreshing: false,
	      languaje:'',
	      user:'',
	      token:'',
	      notif:'',
	      currentlyOpenSwipeable: null,
	      data:{productos:[]},
	      editmodal:false,
	      fix: new Date(),
	      chosenDate: new Date(),
	   	  chosenDate1: new Date(),
	   	  fecha: '',
	   	  textInputs: [],
	    };
	}

	//ciclos de vida
	async componentWillMount() {
		try{
		    const {navigation} 	= this.props;
		    const id_budget 	= navigation.getParam('id_budget', 'NO-ID');
		    const name_shopping = navigation.getParam('name_shopping', 'NO-ID');
		    const user 			= navigation.getParam('user', 'NO-ID');
		    const token 		= navigation.getParam('token', 'NO-ID');
		    const languaje 		= navigation.getParam('languaje', 'NO-ID');
		    this.setState({presupuesto:name_shopping,id_budget:id_budget,user:user,token:token,languaje:languaje})
		    this.props.fetchDataBudgetDet(id_budget);
		    AsyncStorage.setItem('id_shopping', JSON.stringify(id_budget));
		    AsyncStorage.setItem('name_shopping', name_shopping);  
		}
		catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}

  	componentWillReceiveProps(newProps){
		if(newProps.budgetd.item.data !== this.props.budgetd.item.data){
			if (newProps.budgetd.item.data) {
				var datefor = newProps.budgetd.item.data.Fecha_Compra.split("/");
            	var date = datefor[0]+"-"+datefor[1]+"-"+datefor[2];
            	this.setState({fix:date,fix2:date});
			}
			this.setState({data: newProps.budgetd.item.data});
	    }
  	}

  	//refrescando apis
  	async _onRefresh() {
	    try{
	      this.setState({refreshing: true});
	      this.props.fetchDataBudgetDet(this.state.id_budget);
	    }
	    catch(error) {
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
	    finally{
	      this.setState( { refreshing: false } );
	    }
  	}

  	handleGoBack = () => this.props.navigation.goBack();

  	setDate(date) {this.setState({ fecha: new Date(date)});}

  	//encabezado
  	navbar(){
	    return(
	    	<Block center style={design.style.navbardet}>
		      	<Block style={{width:design.width * 0.1}}>
			      	<TouchableOpacity onPress={() => {this.handleGoBack()}}>
			      		<Icon name="angle-left" family="font-awesome" color={design.theme.COLORS.MUTED} size={40} />
					</TouchableOpacity>
				</Block>

				<Block style={{width:design.width * 0.7}}>
					<Text h4 style={{fontFamily: "SFProText-Semibold"}} numberOfLines={1} color={design.theme.COLORS.HEADER1}>{this.state.presupuesto}</Text>	
		      	</Block>
		      	
		      	<Block  style={{flexDirection: 'row',width:design.width * 0.2}}>
		      		<TouchableOpacity onPress={() => {this.setState({editmodal:true})}} style={{marginRight:10}}>
						<Icon
							name="edit" 
							family="antdesign"
							color={design.theme.COLORS.HEADER1}
							size={design.theme.SIZES.BASE * 1.6}
						/>
					</TouchableOpacity>
		      		<TouchableOpacity 
		      			onPress={()=>{
		                    Alert.alert(
		                      '¿Estás seguro de eliminar?',
		                      this.state.presupuesto,
		                      [
		                        {text: 'Cancelar', style: 'cancel'},
		                        {text: 'Eliminar', onPress: () => this.destroybudget(), style: 'destructive'},
		                      ],
		                        { cancelable: false }
		                    )
                  		}}
                  	>
						<Icon
							name="delete" 
							family="antdesign"
							color={design.theme.COLORS.HEADER1}
							size={design.theme.SIZES.BASE * 1.6}
						/>
					</TouchableOpacity>
				</Block>
	      	</Block>
	    )
  	}

  	//eliminar presupuesto
  	async destroybudget(){
	    try{
	      this.props.destroybudget({id:this.state.id_budget,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
	    }
	    catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}

  	//funciones swipe
  	async delete(prod,suc,index){
  		try{
	      	this.props.delete({prod:prod,suc:suc,id_card:this.state.id_budget,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
	      	const newIds = this.state.data.productos.slice();
	      	newIds.splice(index,1);
	      	this.setState({data:{productos:newIds}})
	      	this.swipeable.recenter();
    		this.state.currentlyOpenSwipeable.recenter();
	    }
	    catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
    	finally{
    		this.setState({data:{productos:newIds}})	
    	}
  	}

  	async update(newcantidad,oldcantidad,prod,suc){
	    try{
	      	const objIndex = this.state.datos.data.findIndex(obj => obj.prod === prod);
	      	if (objIndex != -1) {
	        	const newIds = this.state.datos.data.slice()
	        	if (newcantidad != oldcantidad) {
	          		newIds[objIndex] = {prod:prod,cant:newcantidad};
	        	}
	        	else{
	          		newIds.splice(objIndex,1);
	        	}
	        	this.setState({datos: {data:newIds}})
	      	}
	      	else{
	        	this.setState({ datos: {data:  this.state.datos.data.concat([{prod:prod,cant:newcantidad,suc:suc}])}})
	      	}
	    }
	    catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}

  	async updateset(){
	    try{
	      this.state.datos.data.map((item) =>{
	        this.props.amountbudget({suc:item.suc,prod:item.prod,cant:item.cant,id:this.state.id,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
	      })
	      this.setState({datos: {data:[]}})
	    }
	    catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
	}

	async updatex(value,prod,suc,index) { 
	    try{
	    	this.props.amountbudget({suc:suc,prod:prod,cant:value,id:this.state.id_budget,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
	    }
    	catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}

  	async opendet(id) { 
	    try{
	    	this.props.fetchDataproddet({id:id});
	    }
    	catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}
  
  	Getflatlist(datas,itemProps) {
	    if (datas.productos && datas.productos.length) {
	      	return(
	      		<FlatList
		            style={design.style.containerb}
		            scrollEnabled={!this.state.isSwiping}
		            data={datas.productos}
		            refreshControl={
		              <RefreshControl
		                refreshing={this.state.refreshing}
		                onRefresh={this._onRefresh.bind(this)}
		                colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
		              />
		            }
		            ListHeaderComponent={<Text></Text>}
		            ListEmptyComponent={<Text>No existen productos con estos criterios</Text>}
		            numColumns={1}
		            renderItem={({item, index}) =>  
                       	<Block style={{marginBottom:30}} key={index}>
		        			<Swipeable
			        			key={index}
			          			onRef={ref => this.swipeable = ref}
			          			leftButtons={[
						            <TouchableOpacity 
						            	key={index}
						              	onPress={()=>{
					                    Alert.alert(
					                      '¿Estás seguro de eliminar?',
					                      item.N_Producto,
					                      [
					                        {text: 'Cancelar', onPress: () => this.component[index]._root.closeRow(), style: 'cancel'},
					                        {text: 'Eliminar', onPress: () => this.delete(item.Cod_Producto,item.Precio.Cod_Sucursal,index), style: 'destructive'},
					                      ],
					                        { cancelable: false }
					                    )
			                  		  }}
						              style={design.style.leftSwipeItem}
						            >
						              	<Image
			                				key={index}
			                				style={design.style.iconleftswipe}
			                				source={deletei}
			              				/>
						            </TouchableOpacity>
					            ]}
					            rightButtons={[
			            			<TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("Result",{search:item.N_Producto})} style={design.style.rightSwipeItem}>
						               <Icon name="md-swap" family="ionicon" color={design.theme.COLORS.WHITE} size={40} />
			            			</TouchableOpacity>
			          			]}
						        onRightButtonsOpenRelease={itemProps.onOpen}
						        onRightButtonsCloseRelease={itemProps.onClose}
						        onLeftButtonsOpenRelease={itemProps.onOpen}
						        onLeftButtonsCloseRelease={itemProps.onClose}
						        swipeStartMinLeftEdgeClearance={10}
						        swipeStartMinRightEdgeClearance={10}
						        onSwipeStart={() => this.setState({isSwiping: true})}
						        onSwipeRelease={() => this.setState({isSwiping: false})}
		        			>
			          			<Block key={index} style={design.style.cardbugdet2}>
				          		    <Block style={design.style.part1det}>
				          		    	<Block style={{flex: 1,  flexDirection: 'column',justifyContent: 'space-between',}}>
				          		    		<Block  style={{marginHorizontal: 10,marginVertical: 10}}>
				          		    			<Text numberOfLines={1} h5 style={design.style.textpop2} color={design.theme.COLORS.BLACK}>{item.N_Producto}</Text>
								        		<Text numberOfLines={1} h5 style={design.style.textpop2} color={design.theme.COLORS.GREY}>{item.Marca.N_Marca}</Text>
							            		<Text numberOfLines={1} h5 style={design.style.textpop2} color={design.theme.COLORS.GREY}>
							            			{item.Precio.moneda.Simbolo} 
							            			{this.state[index]? this.state[index] * Number(item.Precio.Precio_Unitario): Math.floor(item.pivot.Cantidad) * Number(item.Precio.Precio_Unitario)}
							            		</Text>
				          		    	 	</Block>
				          		    	 	<Block style={{marginHorizontal: 10}}>
				          		    	 		<NumericInput 
				          		    	 			key={index}
										            //initValue={Math.floor(item.pivot.Cantidad)}
							                    	value={this.state[index] ? this.state[index] : Math.floor(item.pivot.Cantidad)}
							                    	onChange={value => { const { textInputs } = this.state; textInputs[index] = value; this.setState({[index]:value}); this.updatex(value,item.Cod_Producto,item.pivot.Cod_Sucursal)}}
											        valueType='integer'
											        minValue = {1}	
											        maxValue={9999}
											        totalWidth={design.width * 0.22}
											        totalHeight={design.height * 0.04}
											        borderColor='#DFDFDF'
											        textColor='#414A59'
											        separatorWidth={0.5}
											        inputStyle={design.style.inputStyle}
											        containerStyle={design.style.containerStyle}
													rounded
									        	/>
				          		    	 	</Block>
				          		    	</Block>
				          		    </Block>
				          		    <Block style={design.style.part2det}>
				          		    	<TouchableOpacity onPress={() => {this.opendet(item.Cod_Producto)}}>
					          		    	<ProgressiveImage
												style={design.style.imgbudgetdet}
												placeholderSource={carga}
												source={item.Imagen_Destacada ?{uri: item.Imagen_Destacada.URL_Imagen}: item.Logo_empresa.Logo ?item.Logo_empresa.Logo :logo}
												placeholderColor={design.theme.COLORS.MUTED}
											/>
										</TouchableOpacity>
				          		    </Block>
			          			</Block>
	        				</Swipeable>
	    				</Block>
                    }  
		            initialNumToRender={4}
		            keyExtractor={(item,index)=>index.toString()}
		        /> 
	      	)
	    }
	    else{
	    	return(
	    		<Block safe flex>
					<Block flex={1}/>
					<ScrollView keyboardShouldPersistTaps="handled">
					    <KeyboardAvoidingView
					        behavior="position"
					        keyboardVerticalOffset={5}
					    >
							<Block flex={3} center space="between"> 
								<Image style={design.style.img_offline} resizeMode="contain" source={require("@assets/img/Emoji.png")} />
								<Text h3 style={design.style.toffline1} bold>Oops!</Text>
								<Block style={design.style.loffline}/>
								<Text h4 muted bold>Presupuesto vacio</Text>
								<Block style={{marginTop: 20}}/>
								<Button size="large" color={design.theme.COLORS.PRIMARY} round onPress={() =>{this.props.navigation.navigate("Search")}}>Agregar Productos</Button>
							</Block>   
						</KeyboardAvoidingView>
					</ScrollView>
				</Block>
	    	)
	    }
  	}

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

  	//actualizar presupuesto
  	async validate(){
	    try{ 
	    	this.setState(() => ({ nameError: null}));
		    if (this.state.presupuesto.trim() == '') {
		    	this.setState({ nameError:'El nombre es requerido'});
		    } 
	      	else if (this.state.presupuesto.length < 3) {
	        	this.setState({ nameError: 'El Nombre debe contener al menos 3 caracteres'});
	      	} 
	      	else{
		      	if (this.state.fix.toString() == this.state.fix2.toString()) 
	          	{	
	          		var date = this.formatDate(this.state.fix);
	          	}
	          	else
	          	{
	            	var date = this.state.fix.split("-").reverse().join("-");
	          	}
		        this.props.editbudget({name:this.state.presupuesto,date:date,id:this.state.id_budget,user:this.state.user,token:this.state.token});
		        this.setState({editmodal:false});
	      	}
	  	}
	  	catch(error) {
      		Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    	}
  	}

  	editmodal(){
	    return(
			<Dialog
				visible={this.state.editmodal}
				onTouchOutside={() => {this.setState({editmodal:false})}}
        		onHardwareBackPress={() => {this.setState({editmodal:false})}}
				width={0.9}
				dialogStyle={this.state.dialogStyle}
				dialogAnimation={new ScaleAnimation()}
				dialogTitle={
					<Block style={design.style.headerpop}>
						<Block style={design.style.headersub}>
						  	<Text p bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={design.style.textpop}>Editar Presupuesto</Text>
					        <TouchableOpacity onPress={() => {this.setState({editmodal:false})}}>
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
							value ={this.state.presupuesto} 
							onChangeText={(text) => this.setState({ presupuesto: text })}
						/>
						{!!this.state.nameError && (
				            <Text style={design.style.texterror}>{this.state.nameError}</Text>
				        )}
				        <DatePicker
							style={{width: '100%',marginTop:10,marginBottom:10}}
							date={this.state.fix}
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
							onDateChange={(date) => {this.setState({fix: date})}}
						/>
			        </Block>  
			        <Block style={design.theme.linenew}/>
			        <Block center style={{justifyContent: 'center',alignItems: 'center',marginTop:15}}>
						<Button round size="small" color={design.theme.COLORS.PRIMARY2} onPress={()=> {this.validate()}}>
							Actualizar
						</Button>
					</Block> 
				</DialogContent>
			</Dialog>   
	    )
  	}

  	render() {

  		const {currentlyOpenSwipeable} = this.state;

	    const itemProps = {
	      onOpen: (event, gestureState, swipeable) => {
	        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
	          currentlyOpenSwipeable.recenter();
	        }
	        this.setState({currentlyOpenSwipeable: swipeable});
	      },
	      onClose: () => this.setState({currentlyOpenSwipeable: null})
	    };

  		if (this.props.budgetd.isFeching) {
      		return <Load/>
    	}

 		return(
      		<Block style={{flex: 1}}> 
      			{this.navbar()}
      			{this.editmodal()}
      			{this.Getflatlist(this.state.data,itemProps)}
      		</Block>
      	)
  	}
}

const mapStateToProps = state => {
  return {budgetd: state.budgetd,proddet: state.proddet}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataproddet: (id) 		=> {return dispatch(fetchDataproddet(id))},
    fetchDataBudgetDet: (id) 	=> {return dispatch(fetchDataBudgetDet(id))},
    delete:(data) 				=>{return dispatch(delbudget(data))},
    destroybudget:(data) 		=>{return dispatch(destroybudget(data))},
    editbudget:(data) 			=>{return dispatch(editbudget(data))},
    amountbudget:(data) 		=>{return dispatch(amountbudget(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget_det)