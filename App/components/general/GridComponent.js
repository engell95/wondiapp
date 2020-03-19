import React, { PureComponent } from 'react';
import {Alert,TouchableOpacity,StatusBar,ScrollView,FlatList,KeyboardAvoidingView,ActivityIndicator,ImageBackground,Modal} from 'react-native';
import {Block,Text,Icon,Switch,Button,Input} from 'galio-framework';
import design from '@config/style/Style';
import ProgressiveImage 		from '@components/image/AsyncImageComponent';
import Popupcart 				from '@components/shoppingcart/modalcartcomponent';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AsyncStorage 		 	from '@react-native-community/async-storage';
import {fetchDataBudget} 	 	from '@redux/actions/BudgetAction';
import {fetchDataSuc} 	 	 	from '@redux/actions/SucAction';
import {newbudget,addbudget} 	from '@redux/actions/MainAction';
import {connect} 			 	from 'react-redux';

const fondo = require('@assets/img/fondo.png');
const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png'); 

class Grid extends PureComponent {

	//inicializar variables
	constructor(props) {super(props)
    	this.state = {
      		OpenCard: false,
      		data:[],
  		}
  	}

  	/****** grid de la app******/

	  	//seccion de diseño de item de productos
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

	  	renderItemcatg(data,index){
		    return(
		      <TouchableOpacity 
		      	key={index} 
		      	style={design.style.content_push2}
		        onPress={() => {this.props.navigation.navigate("Shop_Catg",{user:this.props.user,token:this.props.token,languaje:this.props.languaje,id:data.item.Cod_Cat_Empresa,name:data.item.N_Cat_Empresa})}}
		      >
		        <Block style={design.style.content_prod2}>
		          <ProgressiveImage
		            style={design.style.content_img2}
		            placeholderSource={carga}
		            source={{uri: data.item.Icono}}
		            border={15}
		            placeholderColor={design.theme.COLORS.MUTED}
		          />
		        </Block>
		      </TouchableOpacity>
		    )
  		}

  		renderItemprodV(data,index){
		    var Destacado = data.item.imagenes__prod.filter(obj => obj.Destacado == 1);
		    const precio_det = Number(data.item.Precio).toFixed(2);
		    return(
		      	<TouchableOpacity 
		      		key={index} 
		      		style={design.style.content_push3}
		      	>	
		          <Block style={design.style.content_prod3}>
		           {Destacado && Destacado.length
		            ?<ProgressiveImage
		              style={design.style.content_img3}
		              placeholderSource={carga}
		              source={{uri: Destacado[0].URL_Imagen}}
		              placeholderColor={design.theme.COLORS.MUTED}
		              resizeMode="contain"
		            />
		            :data.Logo && data.Logo.length
		              ?<ProgressiveImage
		                style={design.style.content_img3}
		                placeholderSource={carga}
		                source={{uri: data.Logo}}
		                placeholderColor={design.theme.COLORS.MUTED}
		                resizeMode="contain"
		              />
		              :<ProgressiveImage 
		                style={design.style.content_img3}
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

	  	//flatlist con los escenarios
	  	Getflatlist(datas,horizontal,columns,initial,scroll,header,category) {
		    if (datas.item.data && datas.item.data.length) {
		      return(
		        <Block>
		          {header ? <Text h5 bold color={design.theme.COLORS.HEADER} style={design.style.header1}>{header}</Text> : null}
		          <FlatList
		            data={datas.item.data}
		            renderItem={horizontal ?({ item,index}) => this.renderItemprodH({item,index})  :category? ({ item,index}) => this.renderItemcatg({item,index}) :({ item,index}) => this.renderItemprodV({item,index})}
		            ListEmptyComponent={<Text>No existen productos con estos criterios</Text>}
		            keyExtractor={(item,index) => index.toString()}
		            initialNumToRender={initial}
		            numColumns={columns ? columns : 0}
		            horizontal={horizontal}
		            removeClippedSubviews={true}
		            scrollEnabled={scroll}
		          />
		        </Block>
		      )
		    }
	  	}

	/****** ventanas modal de funciones******/  

		//asignando valores para abrir el modal
		openmodal(Cod_Producto,N_Producto,simbolo,precio,marca,imagenes,destacado,descripcion,empresa,img_empresa,unidad_medida,Cod_sucursal)
		{ 	
	    	this.setState({data:{nombre:N_Producto,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.props.user,languaje:this.props.languaje,token:this.props.token,prod:Cod_Producto,suc:Cod_sucursal,img_empresa:img_empresa,unidad_medida:unidad_medida},modal:true})
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
  		return(
  			<Block flex>
  				{/**realizando renderizado de los datos**/}
  				{this.Getflatlist(this.props.data,this.props.horizontal,this.props.column,this.props.initial,this.props.scroll,this.props.header)}

  				{/**realizando renderizado de los pop-up de producto**/}
				{this.pop_up(this.state.modal)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Grid);