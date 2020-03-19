import React, { PureComponent } from 'react';
import {FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,Modal,ImageBackground,ScrollView,BackHandler,Linking,Alert} from 'react-native';
import {Block, Button,Input,NavBar,Text,Icon,Card,theme,Accordion} from 'galio-framework';
import design from '@config/style/Style';
import Load from '@components/general/LoaderComponent';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import Popupcart    from '@components/shoppingcart/modalcartcomponent';
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
import Dialog, {DialogContent,ScaleAnimation,DialogTitle,DialogButton,DialogFooter} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchDataProductShop} from '@redux/actions/ProductShopAction';
import {fetchDataShopD,fecthPostfavemp,fecthdeletefavemp} from '@redux/actions/DShopAction';
import {PostDataprod} from '@redux/actions/UserAction';
import {fetchDataPromox} from '@redux/actions/PromoProdAction';
import {connect} from 'react-redux';

const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class Shop_details extends PureComponent{

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
      		heart:'heart',
	      	heart1:'heart-o',
	      	heartfull:'heart',
	      	modalVisible:false,
	      	modal:false,
	      	visible:false
	    };
	    this.currentStepIndex = 0;
  	}

  	//verificando datos del usuario y llamando apis
  	async componentWillMount(){ 
	    try{
	      	const {navigation} = this.props;
		    const img_shop = navigation.getParam('img', 'NO-ID');
		    const id_shop = navigation.getParam('id', 'NO-ID');
		    const name_shop = navigation.getParam('name', 'NO-NAME');
		    const user  = navigation.getParam('user', 'NO-ID');
		    const token = navigation.getParam('token', 'NO-ID');
		    const notif = navigation.getParam('notif', 'NO-ID');
		    const languaje = navigation.getParam('languaje', 'NO-ID');
		    this.setState({id_shop:id_shop,name_shop:name_shop,img_shop:img_shop,user:user,token:token,notif:notif,languaje:languaje})
		    this.props.fetchDataShopD({id_shop:id_shop,id_user:user});
		    this.props.fetchDataProductShop(id_shop);
	    }
	    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  	}

  	//refrescando apis
  	async _onRefresh() {
	    try{
	    	this.props.fetchDataProductShop(this.state.id_shop);
	    	this.props.fetchDataShopD({id_shop:this.state.id_shop,id_user:this.state.user});
	    }
	    catch(error) {
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
	    finally{
	      this.setState( { refreshing: false } );
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

	handleSnapToItem(index){this.setState({ activeSlide: index });}

  	//render carusel de promo 
  	rendercarusel(){
	    return(
	      <Block center style={design.style.contentbanner}> 
	        <Carousel
	          ref={c => this._slider1Ref = c}
	          data={this.props.det.item.data.Promociones}
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

  	setModalVisible(visible) {this.setState({modalVisible: visible});}

  	//funcion agregar a empresas favoritas
  	async savefavorite(action){
      	try{
	      	if (action == 1) {
		        if (this.state.heart == 'heart-o') {
		          this.setState({heart:'heart','heartfull':'heart',modalVisible: true})
		          setTimeout(() => {this.setState({modalVisible: false})}, 1000);
		          this.props.fecthPostfavemp({'Cod_Empresa':this.state.id_shop,'user_id':this.state.user});
		        }
		        else{
		          this.setState({heart:'heart-o','heartfull':'heart-o',modalVisible: true})
		          setTimeout(() => {this.setState({modalVisible: false})}, 1000);
		          this.props.fecthdeletefavemp({'user_id':this.state.user,'Cod_Empresa':this.state.id_shop});
		        }
	      	}
	      	else{
		        if (this.state.heart1 == 'heart-o') {
		          this.setState({heart1:'heart','heartfull':'heart',modalVisible: true})
		          setTimeout(() => {this.setState({modalVisible: false})}, 1000);
		          this.props.fecthPostfavemp({'Cod_Empresa':this.state.id_shop,'user_id':this.state.user});
		        }
		        else{
		          this.setState({heart1:'heart-o','heartfull':'heart-o',modalVisible: true})
		          setTimeout(() => {this.setState({modalVisible: false})}, 1000);
		          this.props.fecthdeletefavemp({'user_id':this.state.user,'Cod_Empresa':this.state.id_shop});
		        }
	      	}
  		}
  		catch(error) { 
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
    }

  	//encabezado
  	Header(promo){
	    return(
	        <Block>
	        	<ImageBackground
		            style={{zIndex: -1,height:design.height / 3 }}
					imageStyle={design.style.bannerstyle}
					source={this.state.img_shop && this.state.img_shop.length ? {uri: this.state.img_shop } : logo}
					blurRadius={promo.item.data.Promociones && promo.item.data.Promociones.length ?10 :0}
	          	>
	            	<Block center style={{marginTop: design.statusbar}} >
		              	{this.searchbutton()}
	              		{promo.item.data.Promociones && promo.item.data.Promociones.length
	              			?this.rendercarusel()
	              			:null
	              		}
	            	</Block>
	            	<Block style={design.style.icon_shop}>
						{promo.item.data.usuarios && promo.item.data.usuarios.length
					    	?<Button onlyIcon onPress={() => {this.savefavorite(1)}} icon={this.state.heart} iconFamily="font-awesome" iconSize={25} color={design.theme.COLORS.LIKE} iconColor="#fff" style={{ width: 40, height: 40 }}>favorito</Button>
					    	:<Button onlyIcon onPress={() => {this.savefavorite()}} icon={this.state.heart1} iconFamily="font-awesome" iconSize={25} color={design.theme.COLORS.LIKE} iconColor="#fff" style={{ width: 40, height: 40 }}>favorito</Button>
						}
						<Button onPress={() => this.setState({visible:true})} style={{marginRight:10}} onlyIcon icon="map-marked" iconFamily="font-awesome-5" iconSize={25} color={design.theme.COLORS.GREY} iconColor="#fff" style={{ width: 40, height: 40 }}>sucursales</Button>
					</Block>
	          </ImageBackground>   
	        </Block>
	    )
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
    	this.setState({data:{nombre:N_Producto,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:Cod_Producto,suc:Cod_sucursal,img_empresa:img_empresa,unidad_medida:unidad_medida},modal:true})
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

  	//seccion de diseño de item de productos
  	renderItemprodV(data,index){
	    var Destacado = data.item.imagenes__prod.filter(obj => obj.Destacado == 1);
	    const precio_det = Number(data.item.Precio).toFixed(2);
	    return(
	      <TouchableOpacity 
	        key={index} 
	        style={design.style.content_push3}
	        onPress={() => {this.openmodal(data.item.Cod_Producto,data.item.N_Producto,data.item.Moneda,precio_det,data.item.N_Marca,data.item.imagenes__prod,Destacado,data.item.Descripcion,data.item.Cod_Empresa,data.item.Logo,data.item.N_Unidad_Medida,data.item.Sucursal);}}
	      > 
	        <Block style={design.style.content_prod3}>
	          {Destacado && Destacado.length
	            ?<ProgressiveImage
	              style={design.style.content_img3}
	              placeholderSource={carga}
	              source={{uri: Destacado[0].URL_Imagen}}
	              placeholderColor={design.theme.COLORS.MUTED}
	              //resizeMode="contain"
	            />
	            :data.Logo && data.Logo.length
	              ?<ProgressiveImage
	                style={design.style.content_img3}
	                placeholderSource={carga}
	                source={{uri: data.Logo}}
	                placeholderColor={design.theme.COLORS.MUTED}
	                //resizeMode="contain"
	              />
	              :<ProgressiveImage 
	                style={design.style.content_img3}
	                placeholderSource={carga}
	                source={logo}
	                placeholderColor={design.theme.COLORS.MUTED}
	                //resizeMode="contain"
	              />
	          }
	        </Block>
	        <Block style={design.style.content_text}>
	          <Text numberOfLines={1} center style={design.style.textprod}>{data.item.N_Producto}</Text>
	        </Block>  
	        <Block style={design.style.content_det}>
	          <Text numberOfLines={1} center style={design.style.textdet} color={design.theme.COLORS.WHITE}>1Und {data.item.Moneda} {precio_det}</Text>
	        </Block>
	      </TouchableOpacity>
	    )
  	}

  	//flatlist con los escenarios
 	Getflatlist(datas) {
 		console.log(datas.item.data.Productos)
	    if (datas.item.data.Productos && datas.item.data.Productos.length) {
	      return(
	        <Block>
		        <FlatList
		            data={datas.item.data.Productos}
		            renderItem={({ item,index}) => this.renderItemprodV({item,index})}
		            ListEmptyComponent={<Text>No existen productos</Text>}
		            keyExtractor={(item,index) => index.toString()}
		            initialNumToRender={6}
		            numColumns={2}
		            removeClippedSubviews={true}
		        />
	        </Block>
	      )
	    }
  	}

  	listsuc(datas) {
		return(
		    <Dialog
		        onTouchOutside={() => {this.setState({ visible: false})}}
		        visible={this.state.visible}
		        onHardwareBackPress={() => {this.setState({ visible: false})}}
		        width={0.9}
		        rounded
		        dialogTitle={
		        	<Block style={design.style.headerpop}>
				    	<Block style={design.style.headerpop2}>
					    	<Text h5 bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={{marginLeft:10,fontFamily: "SFProText-Semibold"}}>Sucursales</Text>
					    	<TouchableOpacity onPress={() => {this.setState({ visible: false})}}>
							    <Icon
							    	family='antdesign'
							    	color={design.theme.COLORS.GREY2}
							    	size={design.theme.SIZES.BASE * 1.5}
							    	name='closecircle'
							    />
				          	</TouchableOpacity>  
			          	</Block>
		          	</Block>
		        }
		        dialogAnimation={new ScaleAnimation()}
		      >
		        <DialogContent>
		        {datas.item.data.sucursales && datas.item.data.sucursales.length
		          ?<ScrollView>
		           	<Accordion 
		          		dataArray={datas.item.data.sucursales} 
		          	/>
		           </ScrollView>
		           :<Text center h5 style={{marginTop:15}}>Sucursales no disponibles</Text>
		        }
		        </DialogContent>
		    </Dialog>    
		)
  	}

  	render() { 

  		if (this.props.product.isFeching || this.props.det.isFeching) {
      		return <Load/>
    	}

	    return (
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
          			{this.Header(this.props.det)}
          			{/*productos*/}
          			{this.Getflatlist(this.props.product)}
          			{/**realizando renderizado de los pop-up de producto**/}
          			{this.pop_up(this.state.modal)}
          			{/*efecto me gusta*/}
          			{this.listsuc(this.props.det)}
          			{/*efecto me gusta*/}
          			<Modal
			          animationType="fade"
			          transparent={true}
			          visible={this.state.modalVisible}
			          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible);}}
         			>
           				<Block center style={design.style.center}> 
            				<TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
            					<Icon
				                  family="font-awesome"
				                  name={this.state.heartfull}
				                  size={100}
				                  color={'#ED4A6A'}
                				/>
            				</TouchableOpacity>    
          				</Block>
        			</Modal>
		        </ScrollView>	
    		</Block>  
	    );  

	}

}

const mapStateToProps = state => {
  return {product: state.productSp,det:state.shopd,promodet: state.promoprod}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataProductShop: (id)   =>{return dispatch(fetchDataProductShop(id))},
    fetchDataShopD: 	  (data) =>{return dispatch(fetchDataShopD(data))},
    fecthPostfavemp: 	  (data) =>{return dispatch(fecthPostfavemp(data))},
    fecthdeletefavemp: 	  (data) =>{return dispatch(fecthdeletefavemp(data))},
    visprod:  			  (data) =>{return dispatch(PostDataprod(data))},
    fetchDataPromox: 	  (id)   =>{return dispatch(fetchDataPromox(id))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop_details)