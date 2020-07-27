import React, { PureComponent } 						from 'react';
import {TouchableOpacity,BackHandler,StatusBar,Alert,StyleSheet,FlatList,ScrollView,RefreshControl} 	from 'react-native';
import design                   						from '@config/style/Style';
import {Block,Input,Icon,Text} 							from 'galio-framework';
import AsyncStorage 									from '@react-native-community/async-storage';
import {fetchDataResult}        						from '@redux/actions/ResultAction';
import Autocomplete from '@components/general/AutocompleteComponent';

import Grid                     from '@components/general/GridComponent'; 
import OfflineNotice            from '@components/general/OfflineComponent';
import Load                     from '@components/general/LoaderComponent';
import {loadSettings}           from '@config/SettingsStorage';
import ProgressiveImage         from '@components/image/AsyncImageComponent';
import Popupcart                from '@components/shoppingcart/modalcartcomponent';
import {connect}                						from 'react-redux';

const fondo = require('@assets/img/fondo.png');
const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class SearchScreen extends PureComponent{

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
			Search:'',
      		data:[],
      		modal:false 
	    };
	    this.currentStepIndex = 0;
  	}

  	//verificando datos del usuario y llamando apis
  	async componentWillMount(){ 
	    try{
	      	const {navigation} = this.props;
		    const Search = navigation.getParam('Search', 'NO-ID');
		    const settings = await loadSettings();
		    if (settings !== null) {
		        if (settings.user !== null & settings.token !== null){
		        	this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,Search:Search});
		        	this.props.fetchDataResult({search:Search,user:settings.user});

		        }
		    }
	    }
	    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  	}

  	//refrescando apis
  	async _onRefresh() {
	    try{
	    	this.props.fetchDataResult({search:this.state.Search,user:this.state.user});
	    }
	    catch(error) {
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
	    finally{
	      this.setState( { refreshing: false } );
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
			        pointerEvents="none"
			        onTouchStart={()=>  this.props.navigation.navigate("Search")}
			        placeholderTextColor={design.theme.COLORS.TEXT2}
			        iconColor={design.theme.COLORS.TEXT2}
			        color={design.theme.COLORS.TEXT}
			        style={design.style.search3}
			    />
	    	</Block>
    	)
    }

   
    //seccion de diseño de productos
  	renderItemprodH(data,index){
  		var Destacado = data.item.imagenes__prod.filter(obj => obj.Destacado == 1);
    	const precio_det = Number(data.item.Precio).toFixed(2);
  		return(
  			<TouchableOpacity 
		        key={index} 
		        style={design.style.content_push}
		        onPress={() => {this.openmodal(data.item.Cod_Producto,data.item.N_Producto,data.item.Moneda,precio_det,data.item.N_Marca,data.item.imagenes__prod,Destacado,data.item.Descripcion,data.item.Cod_Empresa,data.item.Logo,data.item.N_Unidad_Medida,data.item.Sucursal);}}
		    >
			    <Block style={design.style.content_prod}>
			    {Destacado && Destacado.length
		            ?<ProgressiveImage
		              style={design.style.content_img}
		              placeholderSource={carga}
		              source={{uri: Destacado[0].URL_Imagen}}
		              placeholderColor={design.theme.COLORS.MUTED}
		              resizeMode="contain"
		            />
		            :data.Logo && data.Logo.length
		              ?<ProgressiveImage
		                style={design.style.content_img}
		                placeholderSource={carga}
		                source={{uri: data.Logo}}
		                placeholderColor={design.theme.COLORS.MUTED}
		                resizeMode="contain"
		              />
		              :<ProgressiveImage 
		                style={design.style.content_img}
		                placeholderSource={carga}
		                source={logo}
		                placeholderColor={design.theme.COLORS.MUTED}
		                resizeMode="contain"
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

  	//seccion de diseño de Marcas
  	renderItemMarcas(data,index){
  		return(
	    	<TouchableOpacity 
		        key={index} 
		        style={design.style.content_push5}
		        onPress={() => {this.props.navigation.navigate("Store_det",{id:data.item.Cod_Marca,languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user})}}
      		> 
        		<Block style={design.style.content_prod4}>
			        <ProgressiveImage
			            style={design.style.content_img5}
			            placeholderSource={carga}
			            source={logo}
			            placeholderColor={design.theme.COLORS.MUTED}
			            resizeMode="cover"
			        />
		        	<Block style={design.style.prod_text2_c}>
		            	<Text 
		            		numberOfLines={1} 
		            		center 
		            		p
		            		style={design.style.prod_text2} >
		            		{data.item.N_Marca}
		            	</Text>
		          	</Block>
        		</Block>
        	</TouchableOpacity>
	    )
  	}

  	//seccion de empresas de Marcas
  	renderItemEmpresas(data,index){
  		return(
	    	<TouchableOpacity 
		        key={index} 
		        style={design.style.content_push5}
		       	onPress={() => {this.props.navigation.navigate("Store_det",{id:data.item.Cod_Empresa,name:data.item.N_Empresa,img:logo,languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user})}}
      		> 
        		<Block style={design.style.content_prod4}>
			        <ProgressiveImage
			            style={design.style.content_img5}
			            placeholderSource={carga}
			            source={logo}
			            placeholderColor={design.theme.COLORS.MUTED}
			            resizeMode="cover"
			        />
		        	<Block style={design.style.prod_text2_c}>
		            	<Text 
		            		numberOfLines={1} 
		            		center 
		            		p
		            		style={design.style.prod_text2} >
		            		{data.item.N_Empresa}
		            	</Text>
		          	</Block>
        		</Block>
        	</TouchableOpacity>
	    )
  	}

	//flatlist con los escenarios
	Getflatlist(datas) {
	    return(
	        <Block>
		        {datas.item.data.Resultados.Productos && datas.item.data.Resultados.Productos.length
		        	?<FlatList
			            data={datas.item.data.Resultados.Productos}
			            renderItem={({ item,index}) => this.renderItemprodH({item,index}) }
			            ListEmptyComponent={<Text>No existen productos con estos criterios</Text>}
			            ListHeaderComponent={<Text h5 bold color={design.theme.COLORS.HEADER} style={design.style.header1}>Productos</Text>}
			            keyExtractor={(item,index) => index.toString()}
			            removeClippedSubviews={true}
			          />
			        :null  
		        }
		        {datas.item.data.Resultados.Marcas && datas.item.data.Resultados.Marcas.length
		        	?<FlatList
			            data={datas.item.data.Resultados.Marcas}
			            renderItem={({ item,index}) => this.renderItemMarcas({item,index}) }
			            ListEmptyComponent={<Text>No existen Marcas con estos criterios</Text>}
			            ListHeaderComponent={<Text h5 bold color={design.theme.COLORS.HEADER} style={design.style.header1}>Marcas</Text>}
			            keyExtractor={(item,index) => index.toString()}
			            removeClippedSubviews={true}
			          />
			        :null  
		        }
		        {datas.item.data.Resultados.Empresas && datas.item.data.Resultados.Empresas.length
		        	?<FlatList
			            data={datas.item.data.Resultados.Empresas}
			            renderItem={({ item,index}) => this.renderItemEmpresas({item,index}) }
			            ListEmptyComponent={<Text>No existen Empresas con estos criterios</Text>}
			            ListHeaderComponent={<Text h5 bold color={design.theme.COLORS.HEADER} style={design.style.header1}>Empresas</Text>}
			            keyExtractor={(item,index) => index.toString()}
			            removeClippedSubviews={true}
			          />
			        :null  
		        }
	        </Block>
	    )
	}

	componentDidUpdate(prevPrps, prevState){
	    if (prevState.data7 !== this.state.data7) {
	      this.openpromodet();
	    }
	}

  	//aperturando modal
  	openpromodet(){
	    if (this.state.data7 != []) {
	      const precio_det = Number(this.state.data7[0].Precio).toFixed(2);
	      var Destacado = this.state.data7[0].imagenes__prod.filter(obj => obj.Destacado == 1);
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

	render() {
		
		if (this.props.result.isFeching) {
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
		        	<Block center style={{marginTop: design.statusbar}} >
		        		{this.searchbutton()}
		        	</Block>
		        	{/*Resultados de busqueda*/}
		        	{this.Getflatlist(this.props.result)}
		        	{/**realizando renderizado de los pop-up de producto**/}
          			{this.pop_up(this.state.modal)}
            	</ScrollView>	
    		</Block>
	  );
	}
}

const mapStateToProps = state => {
  return {result: state.result}
}

const mapDispatchToProps = dispatch => {
	return {
   		fetchDataResult:(data)   => {return dispatch(fetchDataResult(data))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)