import React, { PureComponent } from 'react';
import {View,Keyboard,BackHandler,TouchableOpacity,Image,Dimensions,FlatList} from 'react-native';
import {ListItem,Body,Right,Left,Text,Icon,Button,ActionSheet,Form,Item,Label,Input,DatePicker} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
//Style
import globals from "../../styles/globals";
import I18n from '../../config/LanguageService';
//Redux
import {fetchDataBudget} from '../../redux/actions/budgetaction';
import {fetchDataShopD} from '../../redux/actions/dshopaction';
import {newbudget,addbudget} from '../../redux/actions/mainaction';
import {connect} from 'react-redux';
//Accessories
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
import ProgressiveImage from '../image/progressiveimagecomponent';
import NumericInput from 'react-native-numeric-input';
import Imgfull from '../image/fullimgcomponent';
import Productdetfull from '../general/productdetcomponent';
import Loader from '../loader/loader2component';

const { width, height } = Dimensions.get('window')

class Modalcart extends PureComponent {
	 _isMounted = false;

	constructor(props) {
	  	super(props)
	  	this.state = {
      		visibleproductinfo: props.openmodal,
      		total:props.data.precio,
      		pagination: 0,
      		amount:1,
      		color:  globals.focus.notfocus,
      		chosenDate: new Date(),
      		imgfull:false,
      		productdet:false,
      		loader:false,
      		selectaction:false,
      		id_shopping:null,
      		name_shopping:null,
      		visiblenewbudget:false,
      		nameError:null,
      		name:'',
      		visibleaddbudget:false,
      		productdata:[],
      		data: [],
      	};
      	this.setDate = this.setDate.bind(this);
  	}

  	setDate(newDate) {if (this._isMounted) {this.setState({ chosenDate: newDate });}}

  	onFocus() {if (this._isMounted) {this.setState({color: globals.focus.color});}}

  	onBlur() {if (this._isMounted) {this.setState({color: globals.focus.notfocus});}}

  	componentDidMount() { 
  		this._isMounted = true;
    	BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    	Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    	Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  	}

  	componentWillReceiveProps(newProps){
		if (newProps.sucursales !== this.props.sucursales && newProps.sucursales.isFeching == 'false') 
	    {
			this.setState({productdata:{
	    		languaje:this.props.data.languaje,
	    		imagenes:this.props.data.imagenes,
	    		destacado:this.props.data.destacado,
	    		nombre:this.props.data.nombre,
	    		simbolo:this.props.data.simbolo,
	    		precio:this.props.data.precio,
	    		descripcion:this.props.data.descripcion,
	    		marca:this.props.data.marca,
	    		sucursales:newProps.sucursales}
	    		,loader:false
	    		,productdet:true}
	    	);	
	    }
	    if (newProps.budget !== this.props.budget && newProps.budget.isFeching == false) {
	    	if (newProps.budget.item.data){
				this.setState({data:newProps.budget.item.data,visibleaddbudget:true,loader:false});
	    	}
	    	else{
	    		this.setState({visiblenewbudget:true,loader:false})
	    	}
	    	
	    }
  	}

  	componentWillUnmount() {
    	BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    	this._isMounted = false;
    }

    handleBackPress = () => {
    	console.log('fix')
    	return true
  	}

    exitcomponent = async () => {
    	if (this._isMounted) {
	    	try {
	    		await this.setState({visibleproductinfo:false,selectaction:false,visiblenewbudget:false,visibleaddbudget:false});
	    		await this.props.closemodal();
	    	}
	    	catch (error) {
	    	}
    	}
    }

    handleSnapToItem(index){if (this._isMounted) {this.setState({ activeSlide: index });}}

  	_renderImg ({item, index}, parallaxProps) {
	    return (
	      <TouchableOpacity onPress={() => this.setState({imgfull:true})}>
	        <View style={globals.view_prod}> 
	          <Image resizeMode={'cover'} style={globals.img_prod_c} source={{uri: item.URL_Imagen}}/> 
	        </View>
	      </TouchableOpacity>
	    );
  	}

  	add_amount = (amount) => {
  		if (this._isMounted) {
    		var add = amount * this.props.data.precio.toString();
    		this.setState({ total: add });
    	}
  	}

  	Modalproductinfo() {
	  return (
	  	<Dialog
		    visible={this.state.visibleproductinfo}
		    onTouchOutside={() => {this.exitcomponent()}}
		    onHardwareBackPress={() => {this.exitcomponent()}}
		    width={0.9}
		    //animationDuration={100}
		    dialogTitle={
	            <ListItem icon style={globals.view_title}>
			        <Body>
			            <Text numberOfLines={1} style={globals.tex_title_m}>{this.props.data.nombre}</Text>
			        </Body>
			        <Right>
			            <TouchableOpacity onPress={() => {this.exitcomponent()}} style={globals.touch_title}>
			                <Icon name='md-close' style={globals.close_ico}/>
			            </TouchableOpacity>
			        </Right>
	            </ListItem>
	        }
		    //dialogAnimation={new ScaleAnimation()}
		>
		   	<DialogContent>
		   		<View style={{flexDirection: 'row'}}>
	    			<View style={{width: '50%',marginTop:10}}>
	    				<View style={globals.view_prod_c}>
		    				<Text numberOfLines={1} style={globals.text}>{this.props.data.marca}</Text>
		                    <Text numberOfLines={1} style={globals.text}>Unidad de medida</Text>
		                    {this.props.data.imagenes && this.props.data.imagenes.length
		                    	?<View style={globals.view_prod_c}>
			                        <Carousel
			                          ref={ (c) => { this._carousel = c; } }
			                          data={this.props.data.imagenes}
			                          renderItem={this._renderImg.bind(this)}
			                          onSnapToItem={this.handleSnapToItem.bind(this)}
			                          hasParallaxImages={true}
			                          sliderWidth={globals.fix_carusl.width}
			                          itemWidth={globals.fix_carusl.width}
			                          activeSlideAlignment={'center'}
			                          onSnapToItem={(index) => this.setState({ pagination: index }) }
			                        />
			                        <Pagination
			                          dotsLength={this.props.data.imagenes.length}
			                          activeDotIndex={this.state.pagination}
			                          containerStyle={{paddingVertical: 8}}
			                          dotColor={globals.activeTintColor.color}
			                          dotStyle={globals.pagination}
			                          firstItem={1}
			                          inactiveDotColor={globals.inactiveTintColor.color}
			                          inactiveDotOpacity={0.4}
			                          inactiveDotScale={0.6}
			                        />
	                       		 </View>
	                       		:(this.props.data.destacado
	                       		 	?<TouchableOpacity>
				                        <View style={[globals.view_prod,{marginTop:25}]}>
					                        <ProgressiveImage
					                          thumbnailSource = {{uri: this.props.data.destacado}}
					                          style = {globals.img_prod_c}
					                          Content = {globals.img_prod_c}
					                          resizeMode = "cover"
					                        />
				                        </View>
	                       		 	 </TouchableOpacity>
	                       		 	:<TouchableOpacity>
			                        	<View style={[globals.view_prod,{marginTop:25}]}>
				                        <ProgressiveImage
				                          thumbnailSource = {require("../../src/logo_login.png")}
				                          style = {globals.img_prod_c}
				                          Content = {globals.img_prod_c}
				                          resizeMode = "cover"
				                        />
			                        	</View>
	                       		 	 </TouchableOpacity>
	                       		 )
		                    }
		                </View>
		            </View>
		            <View style={{width: '50%'}}>
	        			<View style={[globals.view_prod_c,{marginTop:10}]}>
		        			<Text numberOfLines={1} style ={globals.textprec}>{this.props.data.simbolo} {this.props.data.precio}</Text>
		                    <Text numberOfLines={1} style ={globals.textotal}>{this.props.data.simbolo} {this.state.total}</Text>
		                    <View style={globals.view_numeric}>
			                    <NumericInput rounded 
			                        initValue={this.state.amount}
			                        value={this.state.amount} 
			                        onChange={(amount) => {this.setState({amount:amount}),this.add_amount(amount)}} 
			                        minValue = {1}
			                        valueType='real'
			                        maxValue={9999}
			                        totalWidth={130} 
			                        totalHeight={50} 
			                        inputStyle={globals.inputStyle}
			                        iconStyle={globals.iconStyle}
			                    />
		                    </View>
		                    <TouchableOpacity onPress={() => this.openmodalproductfull()}>
		                        <Text numberOfLines={1} style={globals.det}>{I18n.t('global.det')}</Text>  
		                    </TouchableOpacity>
		                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
			                    <Button style={globals.DialogButton} onPress={() => {this.selectaction();}}>
			                        <Text>{I18n.t('global.add')}</Text>
			                    </Button>
		                    </View>
	                    </View>
	                </View>
		        </View>
		    </DialogContent>
		</Dialog>
	  );
	}

	closemodalimgfull = () =>{if (this._isMounted) {this.setState({imgfull:false});}}

	ModalFullimg(open){
		if (open == true) {
			return <Imgfull open={this.state.imgfull} imagenes={this.props.data.imagenes} destacado={this.props.data.destacado} close={this.closemodalimgfull.bind(this)}/>
		}else{
			return null
		}	
	}

	closemodalproductfull = () =>{if (this._isMounted) {this.setState({productdet:false});}}

	openmodalproductfull = async () => {
		if (this._isMounted) {
			try {
				await this.setState({loader:true})
				this.props.fetchDataShopD(this.props.data.empresa)
			}
			catch (error) {
	    	}
    	}
  	}

	ModalProductfull(open){
		if (open == true) {
			return <Productdetfull open={this.state.productdet} data={this.state.productdata} close={this.closemodalproductfull.bind(this)}/>
		}
		else{
			return null
		} 
	}

	closeLoadView = () =>{if (this._isMounted) {this.setState({loader:false});}}

	LoadView(open){
		if (open == true) {
			return <Loader open={this.state.loader} close={this.closeLoadView.bind(this)}/>
		}
		else{
			return null
		}
	}

	selectaction = async () => {
		if (this._isMounted) {
	 		this.setState({visibleproductinfo:false,loader:true});
	    	try {
		      const id_shopping = await AsyncStorage.getItem('id_shopping');
		      const name_shopping = await AsyncStorage.getItem('name_shopping');
		      this.setState({ id_shopping: id_shopping ,name_shopping:name_shopping});
	    	} 
	    	catch (error) {
	    	}
	    	this.setState({loader:false,selectaction:true});
    	}
  	}

  	BackModalselect = async () => {
  		if (this._isMounted) {
	  		try {
	  			await this.setState({selectaction:false});
	  		} 
	    	catch (error) {
	    	}
	    	this.setState({visibleproductinfo:true});
    	}
    }

    storeadd = (id_shopping) =>{
    	if (this._isMounted) {
	  		var userfix = Number(this.props.data.user);
	  		const tokenfix = this.props.data.token.split('"').toString();
	  		this.props.add({user:userfix,prod:this.props.data.prod,suc:this.props.data.suc,cant:this.state.amount,id_card:id_shopping,token:tokenfix,languaje:this.props.data.languaje});
	  		this.exitcomponent();
  		}
  	}

  	ExitModalselect = async () => {
  		if (this._isMounted) {
	  		try {
	  			await this.setState({selectaction:false});
	  		} 
	    	catch (error) {
	    	}
	    	this.setState({visibleproductinfo:true});
    	}
    }

	Modalselect(){
		return (
			<Dialog
	    		visible={this.state.selectaction}
	    		onTouchOutside={() => {this.exitcomponent()}}
	    		onHardwareBackPress={() => {this.BackModalselect()}}
	    		width={0.9}
	    		dialogTitle={
	              	<ListItem icon style={globals.view_title}>
	              		<Left style={globals.fix_left}>
			               	<TouchableOpacity onPress={() => {this.BackModalselect()}} style={{paddingLeft: 17}}>
			                	<Icon name='md-arrow-back' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Left>
			            <Body>
			                <Text numberOfLines={1} style={globals.tex_title_m}>{this.props.data.nombre}</Text>
			            </Body>
			            <Right>
			                <TouchableOpacity onPress={() => {this.exitcomponent()}} style={globals.touch_title}>
			                    <Icon name='md-close' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Right>
	              	</ListItem>
	            }
	  		>
		    	<DialogContent>
		    		<View style={globals.view_prod2}>
		    			<View>
				     		{this.state.id_shopping
				     			?<TouchableOpacity onPress={() => this.storeadd(this.state.id_shopping)}>
				     				<Text style={[globals.title3,{textAlign:'left',fontWeight: 'bold',fontSize: 20,color:'black'}]}><Icon name='md-cart' style={{color:'black'}}/> {this.state.name_shopping.split('"')}</Text> 
				     			 </TouchableOpacity>
				     			:null
				     		}
				     		<TouchableOpacity onPress={() => this.OpenModalNewBudget()}>
				     			<Text style={globals.text4}><Icon name='add' style={globals.title3}/>   {I18n.t('budget.newbudget')}</Text> 
					        </TouchableOpacity>
					        <TouchableOpacity onPress={() => {this.setState({selectaction:false,loader:true}),this.props.fetchDataBudget(this.props.data.user)}}>
					            <Text style={globals.text4}><Icon name='open' style={globals.title3}/>  {I18n.t('budget.addbudget')}</Text>
					        </TouchableOpacity>
		    			</View>
		    		</View>
		    	</DialogContent>
	  		</Dialog>
		)
	}

	OpenModalNewBudget = async () => {
		if (this._isMounted) {
	  		try {
	  			await this.setState({selectaction:false,visiblenewbudget:true});
	  		} 
	    	catch (error) {
	    	}
    	}
    }

    _keyboardDidShow = () => {
	    if (this._isMounted) {
		    this.setState({
		          dialogStyle: {
		              top: -1 * (width / 2),
		              padding: 10,
		              overflow: 'hidden',
		          },
		      })
		}
	}

	_keyboardDidHide = () => {
	  	if (this._isMounted) {
		    this.setState({
		        dialogStyle: {
		            padding: 10,
		            overflow: 'hidden',
		        },
		    })
		}
	}

	BackModalNewBudget = async () => {
		if (this._isMounted) {
	  		try {
	  			await this.setState({visiblenewbudget:false});
	  		} 
	    	catch (error) {
	    	}
	    	this.setState({selectaction:true});
	    }
    }

    validate(){
    	if (this._isMounted) {
	    	this.setState(() => ({ nameError: null}));
		    if (this.state.name.trim() == '') {
		      this.setState({ nameError: I18n.t('validate.name1'),color:'red'});
		    } 
		    else if (this.state.name.length < 3) {
		    	this.setState({ nameError: I18n.t('validate.name2'),color:'red'});
		    }
		    else{
		    	 let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
		         var userfix = Number(this.props.data.user)
		         const tokenfix = this.props.data.token.split('"').toString()
		         this.props.newbudget({name:this.state.name,user:userfix,prod:this.props.data.prod,suc:this.props.data.suc,cant:this.state.amount,date:date,token:tokenfix,languaje:this.props.data.languaje});
		         this.exitcomponent();
		    }
		}
  	}

    ModalNewBudget(){
    	return(
			<Dialog
				visible={this.state.visiblenewbudget}
				onTouchOutside={() => {this.exitcomponent()}}
				onHardwareBackPress={() => {this.BackModalNewBudget()}}
				width={0.9}
				dialogStyle={this.state.dialogStyle}
				dialogTitle={
	              	<ListItem icon style={globals.view_title}>
			            <Left style={globals.fix_left}>
			               	<TouchableOpacity onPress={() => {this.BackModalNewBudget()}} style={{paddingLeft: 17}}>
			                	<Icon name='md-arrow-back' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Left>
			            <Body>
			                <Text numberOfLines={1} style={globals.tex_title_m}>{I18n.t('budget.newbudget')}</Text>
			            </Body>
			            <Right>
			                <TouchableOpacity onPress={() => {this.exitcomponent()}} style={globals.touch_title}>
			                	<Icon name='md-close' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Right>
	              	</ListItem>
	            }
			>
				<DialogContent>
				    <Form style={{marginTop:10,marginBottom:20}}>
				    	<Item floatingLabel style={[globals.listitemfix,{borderColor:this.state.color}]}>
					    	<Label>{I18n.t('input.ipname')}</Label>
				            <Input  
					            returnKeyType = { "next" }
					            onSubmitEditing={() => {this.refs.datePicker.showDatePicker()}}
					            autoCorrect = {true} 
					            autoFocus = {true}
					            value={this.state.name}                  
					            onChangeText={(text) => this.setState({ name: text })}
					            onFocus={ () => this.onFocus() } 
					            onBlur={ () => this.onBlur() }
				            />
			            </Item>
			            {!!this.state.nameError && (
	              			<Text style={globals.texterror}>{this.state.nameError}</Text>
	            		)}
			            <Item style={[globals.listitemfix,{paddingTop:30}]}>
	              			<Icon active name='md-calendar' />
				            <DatePicker
					            ref="datePicker"
					            defaultDate={Date.now()}
					            minimumDate={Date.now()}
					            locale={"en"}
					            timeZoneOffsetInMinutes={undefined}
					            modalTransparent={false}
					            animationType={"fade"}
					            androidMode={"default"}
					            placeHolderText={I18n.t('input.date')}
					            textStyle={{ color: "black"}}
					            placeHolderTextStyle={globals.textdatepicker}
					            onDateChange={this.setDate}
					            disabled={false}
				            />
	            		</Item>
	            		<Button rounded  
				            style={[globals.button_login,{marginTop:30}]}
				            onPress={()=> {this.validate()}}               
				        >
				           	<Text>{I18n.t('global.save')}</Text>
				        </Button>
				    </Form>
				</DialogContent>
			</Dialog>
		)
    }

    BackModalAddBudget = async () => {
		if (this._isMounted) {
	  		try {
	  			await this.setState({visibleaddbudget:false});
	  		} 
	    	catch (error) {
	    	}
	    	this.setState({selectaction:true});
	    }
    }

    _renderItembudget = (item) => {
   		return (
   			<TouchableOpacity onPress={() => {this.storeadd(item.Cod_Presupuesto)}}>
				<Text style={[globals.text,{textAlign:'left',fontSize: 20,marginTop:15}]}><Icon name='md-cart' style={{color:'#595959'}}/> {item.N_Presupuesto}</Text> 
			</TouchableOpacity>
		)
	} 

    ModalAddBudget(){
    	return(
			<Dialog
				visible={this.state.visibleaddbudget}
				onTouchOutside={() => {this.exitcomponent()}}
				onHardwareBackPress={() => {this.BackModalAddBudget()}}
				width={0.9}
				dialogTitle={
	              	<ListItem icon style={globals.view_title}>
			            <Left style={globals.fix_left}>
			                <TouchableOpacity onPress={() => {this.BackModalAddBudget()}} style={{paddingLeft: 17}}>
			                    <Icon name='md-arrow-back' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Left>
			            <Body>
			                <Text numberOfLines={1} style={globals.tex_title_m}>{I18n.t('budget.title')}</Text>
			            </Body>
			            <Right>
			                <TouchableOpacity onPress={() => {this.exitcomponent()}} style={globals.touch_title}>
			                   <Icon name='md-close' style={globals.close_ico}/>
			                </TouchableOpacity>
			            </Right>
	              	</ListItem>
	            }
			>
				<DialogContent>
		    		<FlatList
					    data={this.state.data}
					    renderItem={({item}) => this._renderItembudget(item)}
					    keyExtractor={(item, index) => index.toString()}
					/>
				</DialogContent>
			</Dialog>
		)
    }

	render() {
      return (
      	<View>
      		{this.LoadView(this.state.loader)}
	      	{this.ModalFullimg(this.state.imgfull)}
	      	{this.ModalProductfull(this.state.productdet)}
	      	{this.Modalselect()}
	      	{this.ModalNewBudget()}
	      	{this.ModalAddBudget()}
	      	{this.Modalproductinfo()}
      	</View>
      );
  	}
}

const mapStateToProps = state => {
  return {
    budget: state.budget,
    sucursales: state.shopd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataBudget: (id) => {return dispatch(fetchDataBudget(id))},    
    fetchDataShopD: (id) => {return dispatch(fetchDataShopD(id))},
    add:(data) =>{return dispatch(addbudget(data))},
    newbudget:(data) =>{return dispatch(newbudget(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modalcart)