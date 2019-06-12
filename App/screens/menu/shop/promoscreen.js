import React, {Component} from 'react';
import {FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,View,Text,ScrollView} from 'react-native';
import {Button,Icon,H1,Card,CardItem} from 'native-base';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Modalcart from '../../../components/shoppingcart/modalcartcomponent';
//Redux
import {fetchDataProductShop} from '../../../redux/actions/productshopaction';
import {connect} from 'react-redux';
import globals from "../../../styles/globals";
//idioma
import I18n from '../../../config/LanguageService';

const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class Promo extends React.Component {

  constructor(props) {super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      modal:false,
      modaldata:[],
      data: [], 
      user:'',
      token:'',
      loader:true,
      languaje:'',
      promo_img:'',
      promo_id:'',
      openfix:false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <Image style={globals.logo_header_n} resizeMode="contain" source={require("../../../src/general/header.png")} />
    ),
    headerRight:(
      <Button transparent style={{marginTop:6}} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillMount() {
    const {navigation} = this.props;
    const promo_id = navigation.getParam('id', 'NO-ID');
    const promo_img = navigation.getParam('img', 'NO-IMG');
    const promo_name = navigation.getParam('name', 'NO-IMG');
    const user = navigation.getParam('user', 'NO-ID');
    const token = navigation.getParam('token', 'NO-ID');
    const notif = navigation.getParam('notif', 'NO-ID');
    const languaje = navigation.getParam('languaje', 'NO-ID');
    if (languaje !== 'NO-ID'){
      I18n.locale = languaje
    }
    this.setState({promo_name:promo_name,promo_id:promo_id,promo_img:promo_img,user:user,token:token,notif:notif,languaje:languaje})
    this.props.fetchDataProductShop(promo_id);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.item.data !== prevProps.product.item.data) {
      if (this.props.product.item.data){
        this.setState({data:this.props.product.item.data,loader:this.props.product.isFeching})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  _renderItempromo(item,index){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,item.Precio.moneda.Simbolo,item.Precio.Precio_Unitario,item.marcas.N_Marca,item.imagenes__prod,item.Imagen_Destacada.URL_Imagen,item.Descripcion,item.Cod_Empresa);}}>
          { item.Imagen_Destacada.URL_Imagen === null 
            ? <ProgressiveImage
                thumbnailSource = {{uri: this.state.promo_img}}
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

  openmodal(id,nombre,simbolo,precio,marca,imagenes,destacado,descripcion,empresa)
  { 
    this.setState({modaldata:{id:id,nombre:nombre,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:1886,suc:399},modal:true,openfix:true})
  }

  closemodal = () =>{
    this.setState({modal:false,openfix:false})
  }

  _onRefresh = () => {
    this.setState({refreshing: true,loader:false});
    this.props.fetchDataProductShop(this.state.promo_id);
    if (this.state.loader = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  _header(){
    return(
      <View>
        <Card style={globals.no_margin}>
          <CardItem cardBody>
            <Image style={globals.img_d_shop} source={{uri: this.state.promo_img}} />
          </CardItem>
        </Card>
        <H1 style={[globals.title,globals.contenttop]}>{this.state.promo_name}</H1>
      </View>
    )
  }
  _renderfuntion(modal){
    if (modal == false) {
      return null
    }
    else{
       return <Modalcart openmodal={this.state.modal} data={this.state.modaldata} closemodal={this.closemodal.bind(this)} /> 
    }
  }
  
  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    if (this.state.loader == true & this.state.refreshing == false){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    return(
      <View style={globals.body}>
        <StatusBar backgroundColor={globals.status.color} barStyle="light-content"/>
        {this.state.data && this.state.data.length
         ?<FlatList
          data={this.state.data}
          numColumns={3}
          viewabilityConfig={viewabilityConfig}
          getItemLayout={(data, index) => (
            {length: globals.img_row.height, offset: globals.img_row.height * index, index}
          )}
          renderItem={({item}) => this._renderItempromo(item)}
          initialNumToRender={9}
          ListHeaderComponent={this._header()}
          keyExtractor={(item, index) => index.toString()}
         />
         :<Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
        }
        {this._renderfuntion(this.state.modal)}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.productSp,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataProductShop: (id) => {return dispatch(fetchDataProductShop(id))},
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promo)