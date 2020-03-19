import React, { PureComponent } from 'react';
import {FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,ImageBackground,ScrollView,Dimensions,Alert} from 'react-native';
import {Block, Button,Input,NavBar,Text,Icon,Card,theme} from 'galio-framework';
import design from '@config/style/Style';
import Load from '@components/general/LoaderComponent';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
import Popupcart    from '@components/shoppingcart/modalcartcomponent';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchDataShop}   from '@redux/actions/ShopAction';
import {fetchDataPromo}  from '@redux/actions/PromoAction';
import {fetchDataPromox} from '@redux/actions/PromoProdAction';
import {connect} from 'react-redux';

const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class Shop extends PureComponent{

	//inicializar variables
  	constructor(props) {super(props)
	    this.state = {
	      	refreshing: false,
	      	languaje:'',
	      	user:'',
	      	token:'',
	      	notif:'',
	      	catg_name:'',
		  	catg_id:'',
		  	slider1ActiveSlide: 1,
		  	stepIndex: 0,
			data7: [],
      		data:[],
      		modal:false 
	    };
	    this.currentStepIndex = 0;
  	}

  	//verificando datos del usuario y llamando apis
  	async componentWillMount(){ 
	    try{
	      	const {navigation} = this.props;
		    const catg_id = navigation.getParam('id', 'NO-ID');
		    const catg_name = navigation.getParam('name', 'NO-ID');
		    const user = navigation.getParam('user', 'NO-ID');
		    const token = navigation.getParam('token', 'NO-ID');
		    const notif = navigation.getParam('notif', 'NO-ID');
		    const languaje = navigation.getParam('languaje', 'NO-ID');	
		    this.setState({catg_id:catg_id,catg_name:catg_name,user:user,token:token,notif:notif,languaje:languaje})
	    	this.props.fetchDataShop(catg_id);
	    	this.props.fetchDataPromo(catg_id);
	    }
	    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  	}

  	//refrescando apis
  	async _onRefresh() {
	    try{
	    	this.props.fetchDataShop(this.state.catg_id);
	    	this.props.fetchDataPromo(this.state.catg_id);
	    }
	    catch(error) {
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
	    finally{
	      this.setState( { refreshing: false } );
	    }
	}

	//ciclos de vida
	componentWillReceiveProps(newProps){
	    if(newProps.promodet.item.data !== this.props.promodet.item.data && newProps.promodet.isFeching == false){
	      this.setState({data7: newProps.promodet.item.data,loader7:false});
	    }
	}

  	componentDidUpdate(prevProps, prevState){
	    if (prevState.data7 !== this.state.data7) {
	    	if (this.state.modal == false) {
	      		this.openpromodet();
	      	}
	    }
  	}

  	//funcion cargar_promo
  	async openpromo(promo_id){
	    try{
	      this.props.fetchDataPromox(promo_id);
	    }
	    catch(error) { 
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
  	}

  	//aperturando modal
  	openpromodet(){
	    const precio_det = Number(this.state.data7[0].Precio).toFixed(2);
	    var Destacado = this.state.data7[0].imagenes__prod.filter(obj => obj.Destacado == 1);
	    if (this.state.modal !== true) {
	    	this.openmodal(this.state.data7[0].Cod_Producto,this.state.data7[0].N_Producto,this.state.data7[0].Moneda,precio_det,this.state.data7[0].N_Producto,this.state.data7[0].imagenes__prod,Destacado,this.state.data7[0].Descripcion,this.state.data7[0].Cod_Empresa,null,this.state.data7[0].unidad__medida.N_Unidad_Medida,this.state.data7[0].Sucursal);
  		}
  	}
  
  	//asignando valores para abrir el modal
  	openmodal(Cod_Producto,N_Producto,simbolo,precio,marca,imagenes,destacado,descripcion,empresa,img_empresa,unidad_medida,Cod_sucursal)
  	{  
  	 	if (this.state.modal !== true) {
    		this.setState({data:{nombre:N_Producto,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:Cod_Producto,suc:Cod_sucursal,img_empresa:img_empresa,unidad_medida:unidad_medida},modal:true})
  		}
  	}

  	//pop-up producto
 	pop_up(active){
	    if (active == true) {
	      	return <Popupcart openmodal={this.state.modal} data={this.state.data} /> 
	    }
	    else{
	      return null
	    }
  	}

  	handleGoBack = () => this.props.navigation.goBack();

  	//buscador
	searchbutton(){
	    return(
	    	<Block style={{flexDirection:'row',alignSelf: 'center',alignItems: 'center',marginLeft: 10,marginRight: 10}}>
	    	  	<TouchableOpacity onPress={this.handleGoBack}>
		    		<Icon
	                	family="evilicons"
	                	name="chevron-left"
	                	size={50}
	              	/>
              	</TouchableOpacity>
			    <Input 
			    	placeholder="  Búsqueda" 
			        icon="ios-search"
			        family="ionicon"
			        left
			        placeholderTextColor={design.theme.COLORS.TEXT2}
			        iconColor={design.theme.COLORS.TEXT2}
			        color={design.theme.COLORS.TEXT}
			        style={design.style.search3}
			    />
	    	</Block>
	    )
	}

	handleSnapToItem(index){this.setState({ activeSlide: index });}

	//seccion img de promo
	renderPromo ({item, index}) {
	    return (
	      <TouchableOpacity onPress={() => {this.openpromo(item.Cod_Promocion)}}>
	        <ProgressiveImage
	          style={design.style.imgbanner}
	          placeholderSource={carga}
	          source={{uri:item.Imagen}}
	          placeholderColor={design.theme.COLORS.MUTED}
	        />
	      </TouchableOpacity>
	    );
	}

  	//render carusel de promo 
  	rendercarusel(){
	    return(
	      <Block center style={design.style.contentbanner}> 
	        <Carousel
	          ref={c => this._slider1Ref = c}
	          data={this.props.promo.item.data}
	          renderItem={this.renderPromo.bind(this)}
	          onSnapToItem={this.handleSnapToItem.bind(this)}
	          sliderWidth={design.width * 0.9}
	          itemWidth={design.width * 0.9}
	          hasParallaxImages={true}
	          firstItem={1}
	          inactiveSlideScale={0.94}
	          inactiveSlideOpacity={0.7}
	          containerCustomStyle={{borderRadius: 10}}
	          loop={true}
	          loopClonesPerSide={2}
	          autoplay={true}
	          autoplayDelay={1000}
	          autoplayInterval={5000}
	          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
	        />
	      </Block>
	    )
  	}

	//encabezado
  	Header(promo){
	    if (promo.item.data && promo.item.data.length) {
	      var data = promo.item.data.filter((obj,index) => index == this.state.slider1ActiveSlide);
	      var img = data.map((data) => {return data.Imagen});
	      return(
	        <Block>
	          <ImageBackground
	            style={{height:design.height / 3 }}
	            imageStyle={design.style.bannerstyle}
	            source={{uri:img.toString()}}
	            blurRadius={5}
	          >
	            <Block center style={{marginTop: design.statusbar}} >
	              	{this.searchbutton()}
              		{this.rendercarusel()}
	            </Block>
	          </ImageBackground>   
	        </Block>
	      )
	    }else{
	      return(<Block center style={{marginTop: design.statusbar}} >{this.searchbutton()}</Block>)
	    }
  	}

  	//seccion de diseño de item de empresas
  	renderItemShop ({item, index}) {
	    return(
	    	<TouchableOpacity 
		        key={index} 
		        style={design.style.content_push5}
		        onPress={() => {this.props.navigation.navigate("Store_det",{id:item.Cod_Empresa,name:item.N_Empresa,img:item.Logo,languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user})}}
      		> 
        		<Block style={design.style.content_prod4}>
        			{item.Logo
			        	?<ProgressiveImage
			              style={design.style.content_img5}
			              placeholderSource={carga}
			              source={{uri: item.Logo}}
			              placeholderColor={design.theme.COLORS.MUTED}
			              //resizeMode="cover"
			            />
			            :<ProgressiveImage
			              style={design.style.content_img5}
			              placeholderSource={carga}
			              source={logo}
			              placeholderColor={design.theme.COLORS.MUTED}
			              //resizeMode="cover"
			            />
		        	}
		        	<Block style={design.style.prod_text2_c}>
		            	<Text 
		            		numberOfLines={1} 
		            		center 
		            		p
		            		style={design.style.prod_text2} >
		            		{item.N_Empresa}
		            	</Text>
		          	</Block>
        		</Block>
        	</TouchableOpacity>
	    )
  	}

  	//flatlist con los escenarios
 	Getflatlist(datas) {
	    if (datas.item.data && datas.item.data.length) {
	      return(
	        <Block style={{marginTop:20}}>
	         	<Text h5 bold color={design.theme.COLORS.HEADER} style={design.style.header1}>{this.state.catg_name}</Text>
		        <FlatList
		            data={datas.item.data}
		            renderItem={({ item,index}) => this.renderItemShop({item,index})}
		            ListEmptyComponent={<Text>No existen empresas con estos criterios</Text>}
		            keyExtractor={(item,index) => index.toString()}
		            initialNumToRender={6}
		            numColumns={3}
		            removeClippedSubviews={true}
		        />
	        </Block>
	      )
	    }
  	}

	render() {

	    if (this.props.shop.isFeching || this.props.promo.isFeching) {
      		return <Load/>
    	}

    	return(
    		<Block style={{flex: 1}}>  
		        <ScrollView
		          refreshControl={
		            <RefreshControl
		              refreshing={this.state.refreshing}
		              onRefresh={this._onRefresh.bind(this)}
		              colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
		            />
		          }
		        >  
		        	{/*Encabezado*/}
          			{this.Header(this.props.promo)}
          			{/**realizando renderizado de los pop-up de producto**/}
          			{this.pop_up(this.state.modal)}
		        	{/*tiendas que pertenecen a la solicitud*/}
          			{this.Getflatlist(this.props.shop)}
            	</ScrollView>	
    		</Block>
    	)
	}

}

const mapStateToProps = state => {
  return {shop: state.shop,promo:state.promo,promodet: state.promoprod}
}

const mapDispatchToProps = dispatch => {
  return {
      fetchDataShop:   (id) => {return dispatch(fetchDataShop(id))},
      fetchDataPromo:  (id) => {return dispatch(fetchDataPromo(id))},
      fetchDataPromox: (id) => {return dispatch(fetchDataPromox(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)