import React, {Component} from 'react';
import {Image,FlatList,RefreshControl,TouchableOpacity,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,Button,View,Text,H1,Card,CardItem,Left,H3} from 'native-base';
//Redux
import {fetchDataProductShop} from '../../redux/actions/productshopaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import ProgressiveImage from '../general/progressiveimagecomponent';
import {withNavigation,StackActions,NavigationActions} from 'react-navigation';
import ModalBuget from '../general/modalbugetcomponent';
//Estilos
import globals from "../../styles/globals";

const Welcome = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});

class PromoComponent extends Component {

	constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
     	refreshing: false,
      modal:false,//modal visible
      data: [], //data modal
      show:false,//fix modal
      visible:false,//fix modal
      user:null,
      code:null
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  async componentWillMount() {  
    try {
      const id_user = await AsyncStorage.getItem('id_user');
      const code = await AsyncStorage.getItem('code');
      if (id_user !== null & code !== null) {
        this.setState({user:id_user,code:code});
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        this.props.fetchDataProductShop(id);
      }
      else{
        this.props.navigation.dispatch(Welcome);
      }
    }
    catch(e) {
      console.warn("fetch Error: ", error)
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  openmodal(id,nombre,simbolo,precio,marca,imagenes,destacado,descripcion,empresa)
  { 
    this.setState({data:{id:id,nombre:nombre,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user},modal:true,show:true})
  }

  closemodal = () =>{
    this.setState({modal:false})
  }

   _renderItem(item,index){
    const {navigation} = this.props;
    const img = navigation.getParam('img', 'NO-IMG');
	  return(
	    <View style={globals.renderview} >
	      <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,item.Precio.moneda.Simbolo,item.Precio.Precio_Unitario,item.marcas.N_Marca,item.imagenes__prod,item.Imagen_Destacada.URL_Imagen,item.Descripcion,item.Cod_Empresa);}}>
  	      { item.Imagen_Destacada.URL_Imagen === null 
  	        ? <ProgressiveImage
  	            thumbnailSource = {{uri: img}}
  	            style = {globals.img_row}
  	            Content = {globals.img_rowc}
  	            resizeMode = "cover"
  	          />
  	        :<ProgressiveImage
  	            thumbnailSource = {{uri: item.Imagen_Destacada.URL_Imagen}}
  	            style = {globals.img_row}
  	            Content = {globals.img_rowc}
  	            resizeMode = "cover"
  	          />
  	      }
  	        <Text numberOfLines={1} style={globals.texttitle}>{item.Precio.moneda.Simbolo} {item.Precio.Precio_Unitario}</Text>
  	        <Text numberOfLines={1} style={globals.text}>{item.N_Producto}</Text>
  	        <Text numberOfLines={1} style={globals.text}>{item.marcas.N_Marca}</Text>
	        </TouchableOpacity>
        </View> 
	    )
  	}

  _onRefresh = () => {
    this.setState({refreshing: true});
	  const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.props.fetchDataProductShop(id);
	  if (this.props.product.isFeching = true) {
	    this.setState({refreshing: false})
	  }
	  else{
	    this.setState({refreshing: true})
	  }
  }

  render(){
    	
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    if (this.props.product.isFeching){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }
      	
  	const {navigation} = this.props;
    const img = navigation.getParam('img', 'NO-IMG');
    const name = navigation.getParam('name', 'NO-NAME');
    return(
  		<Container style={globals.body}>
	  		<Content 
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={["#DE0001", "#85D848", "#009DC3"]}
            />
          }
        > 
  	  		<Card style={globals.no_margin}>
  	  			<CardItem cardBody>
  	  				<Image style={globals.img_d_shop} source={{uri: img}} />
  	  			</CardItem>
  	  		</Card>
  	  		<View style={globals.contenttop}>
            <H1 numberOfLines={1} style={globals.title}>{name}</H1>
  	  				<FlatList
              	numColumns={3}
              	renderItem={({item}) => this._renderItem(item)}
              	data={this.props.product.item.data}
              	keyExtractor={(item) => item.Cod_Producto}
            	/>
          </View>
          {this.state.show
            ?<ModalBuget 
              openmodal={this.state.modal} 
              data={this.state.data}
              closemodal={this.closemodal.bind(this)} 
              user={this.state.user}
              code={this.state.code}
             />
            :null
          }
	  		</Content>
	  	</Container> 
	  )
  }
}

const mapStateToProps = state => {
  return {product: state.productSp}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataProductShop: (id) => {return dispatch(fetchDataProductShop(id))},
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PromoComponent))