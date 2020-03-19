import React, { PureComponent } from 'react';
import {TouchableOpacity,Modal,ScrollView,View,Image,FlatList,Alert,Linking,Platform,StatusBar,ActivityIndicator} from 'react-native';
import {Block, Button, Input, NavBar, Text,Icon} from 'galio-framework';
import design from '@config/style/Style';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import Imgfull from '@components/image/FullImgComponent';
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
import {fetchDataSuc} 	 	 	from '@redux/actions/SucAction';
import {connect} 			 	from 'react-redux';

const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png'); 

class ProductdetComponent extends PureComponent {
	
	//inicializar variables
	constructor(props) {
    	super(props);
    	this.state = {
     		imgfull:false,
     		open:props.open,
    	}
  	}

  	_isMounted = false;

  	//ciclos de vida
  	componentDidMount() {this._isMounted = true;}

  	componentWillUnmount() {this._isMounted = false;}

  	/****** detalles de un producto******/

  		//funcion para cerrar componente
		closemodal = () => {this.props.close();}

		//Diseño imagen en carusel full
		renderImg({item, index}, parallaxProps) {
			return (
			    <TouchableOpacity onPress={() => this.setState({open:false,imgfull:true})}>
			        <Block style={[design.style.imgadetprod,{backgroundColor:'black'}]}>
			        	<ProgressiveImage
					        style={design.style.imgadetprod}
					        placeholderSource={carga}
					        source={{uri: item.URL_Imagen}}
					        placeholderColor={design.theme.COLORS.MUTED}
					        resizeMode="stretch"
					    />
			    	</Block>
			    </TouchableOpacity>
			);
	  	}

	  	//Diseño imagen de producto
	  	renderImg2(img) {
			return (
			    <TouchableOpacity onPress={() => this.setState({open:false,imgfull:true})}>
			        <Block style={[design.style.imgadetprod,{backgroundColor:design.theme.COLORS.GREY2}]}>
			        	<ProgressiveImage
					        style={design.style.imgadetprod}
					        placeholderSource={carga}
					        source={img}
					        placeholderColor={design.theme.COLORS.MUTED}
					        resizeMode="stretch"
					    />
			    	</Block>
			    </TouchableOpacity>
			);
	  	}

	  	//seccion de diseño lista de sucursales
	  	renderSuc(item,index){
		    return(
		    	<Block>
		    		<TouchableOpacity onPress={() => {this.openGps(item.Latitude,item.Longitude)}} style={{flexDirection:'row'}}>
		    			<Icon
							family='font-awesome'
							color={design.theme.COLORS.MUTED}
							size={design.theme.SIZES.BASE * 1.3}
							name='map-marker'
						/>
						  <Text numberOfLines={1} style={design.style.textsuc} muted color={design.theme.COLORS.BLACK}> {item.N_Sucursal}</Text>
		    		</TouchableOpacity>
		    	</Block>
		    )
  		}

  		//funcion mapeo datos gps
	  	openGps = (ll,lg) => {
		    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
		    var url = scheme + ll + ',' + lg
		    if (ll != null && lg != null) {
		      this.openExternalApp(url)
		    }
		}

		//funcion abrir mapa
		openExternalApp = (url) => {
		    Linking.canOpenURL(url).then(supported => {
		      if (supported) {
		        Linking.openURL(url);
		      } 
		      else {
		        Alert.alert(
		          'ERROR',
		          'Unable to open: ' + url,
		          [
		            {text: 'OK'},
		          ]
		        );
		      }
		    });
		}

		//spinner de carga
		loader(){
		  	return(
		  		<Block style={{flex: 1,justifyContent: 'center',marginTop:design.width * 0.12,marginBottom:design.width * 0.10}}>
		  			<ActivityIndicator size="large" color="#0000ff"/>
		  		</Block>
		  	)
		}

		//seccion detalle de producto
		Modaldet(open){
			if (open == true) {
				return(
					<Modal
				        animationType="fade"
				        transparent={false}
				        visible={this.state.open}
				        onRequestClose={() => this.closemodal()}
				        onPress={() => this.closemodal()}
				        presentationStyle='fullScreen '
				    >
				     	<StatusBar backgroundColor="rgba(0,0,0,0.5)"/>
				    	<Block style={design.style.product_det}>
				    		<Block style={design.style.button_close}>
								<TouchableOpacity onPress={() => this.closemodal()}>
									<Icon
										family='antdesign'
										color={design.theme.COLORS.MUTED}
										size={design.theme.SIZES.BASE * 2}
										name='closecircle'
									/>
								</TouchableOpacity>  
							</Block>
							{this.props.data.imagenes && this.props.data.imagenes.length
								?<Block style={{width:'100%',backgroundColor:design.theme.COLORS.BLACK}}>
					                <Carousel
					                	ref={ (c) => { this._carousel = c; } }
					                    data={this.props.data.imagenes}
					                    renderItem={this.renderImg.bind(this)}
					                    hasParallaxImages={true}
					                    sliderWidth={design.width}
		          						itemWidth={design.width}
					                    activeSlideAlignment={'center'}
					                /> 
		                     	 </Block>
		                     	:(this.props.data.destacado && this.props.data.destacado.length
									?this.renderImg2({'uri':this.props.data.destacado})
							        :this.props.data.img
							         ?this._renderImgdet2({'uri':this.props.data.img})
							    	 :this.renderImg2(logo)
							    )
	                    	}
	                    	<Block style={{margin:10}}>
							    <ScrollView>
							        <Block space="between">
							          	<Block style={{flexDirection: 'row',justifyContent: 'space-between',}}>
							          		<Text numberOfLines={1} h5 bold color={design.theme.COLORS.BLACK} style={{fontFamily: "SFProText-Semibold"}}>{this.props.data.simbolo} {this.props.data.precio}</Text>
											<Icon
												family='font-awesome'
												color={design.theme.COLORS.BLACK}
												size={design.theme.SIZES.BASE * 1.3}
												name='shopping-basket'
											/>
							          	</Block>
							          	<Text numberOfLines={1} style={design.style.textsuc} muted color={design.theme.COLORS.BLACK} >{this.props.data.nombre}</Text>
				                   		<Text numberOfLines={1} style={design.style.textsuc} muted color={design.theme.COLORS.BLACK} >{this.props.data.marca}</Text>
							        </Block> 
							        {this.props.data.descripcion
								        ?<Block space="between" style={{marginTop:10}}>
								            <Text bold h5 style={{fontFamily: "SFProText-Semibold"}} color={design.theme.COLORS.BLACK} >Descripción</Text>
								            <Text muted style={design.style.textsuc}color={design.theme.COLORS.BLACK}>{this.props.data.descripcion}</Text>
								          </Block>
								        :null
								    }
								    {this.props.sucursales.isFeching
								    	?this.loader()
								    	:<Block space="between" style={{marginTop:10}}>
						          		 	<FlatList
						                      numColumns={1}
						                      renderItem={({item}) => this.renderSuc(item)}
						                      data={this.props.sucursales.item.data}
						                      keyExtractor={(item, index) => index.toString()}
						                      ListHeaderComponent={<Text bold h5 color={design.theme.COLORS.BLACK} style={{marginBottom:5,fontFamily: "SFProText-Semibold"}}>Sucursales</Text>}
						                      initialNumToRender={4}
					                   	 	/>
					                    </Block>
								    }
						        </ScrollView>
				        	</Block>
					    </Block>			    
					    <Block flex style={{position: 'absolute', left: 0, right: 0, bottom: 0,paddingTop:design.height}}>
					 		<Button onPress={() => this.props.add()} color={design.theme.COLORS.PRIMARY2} style={{width:design.width,borderRadius: 0}} shadowless size="small">Agregar</Button>
					 	</Block>
				    </Modal>
				) 
			}else{
				return null
			}	
		}

	/******imagen de producto full******/ 

		//funcion para cerrar componente full img
		closemodalimgfull = () =>{if (this._isMounted) {this.setState({imgfull:false,open:true});}}

		//seccion imagen de producto
		ModalFullimg(open){
			if (open == true) {
				return <Imgfull open={this.state.imgfull} imagenes={this.props.data.imagenes} destacado={this.props.data.destacado} close={this.closemodalimgfull.bind(this)}/>
			}else{
				return null
			}	
		}

	render(){
    	return(
    		<Block flex style={{ backgroundColor: design.theme.COLORS.WHITE }}>
	    		{this.ModalFullimg(this.state.imgfull)}
	    		{this.Modaldet(this.state.open)}
		    </Block>
    	)
	}

}

const mapStateToProps = state => {
  return {
    sucursales: state.suc,
  }
}

const mapDispatchToProps = dispatch => {
  return {   
    fetchDataSuc:(id) 	=> {return dispatch(fetchDataSuc(id))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductdetComponent);