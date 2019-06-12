import React, {Component} from 'react';
import {Platform,BackHandler,Linking,Alert,FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,View,Text,ScrollView} from 'react-native';
import {Button,Icon,H3,Card,CardItem,Right,Left,ListItem,Body,Accordion} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Modalcart from '../../../components/shoppingcart/modalcartcomponent';
import Empty from "../../../components/general/emptycomponent";
//Redux
import {fetchDataProductShop} from '../../../redux/actions/productshopaction';
import {fetchDataShopD} from '../../../redux/actions/dshopaction';
import {connect} from 'react-redux';
import globals from "../../../styles/globals";
//idioma
import I18n from '../../../config/LanguageService';
//extra
import Dialog, {DialogContent,ScaleAnimation,DialogTitle,DialogButton,DialogFooter} from 'react-native-popup-dialog';

const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class Shop_details extends React.Component {

  constructor(props) {super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      modal:false,
      modaldata:[],
      data: [],
      data2: [], 
      user:'',
      token:'',
      loader:true,
      loader2:true,
      languaje:'',
      name_shop:'',
      id_shop:'',
      img_shop:'',
      visible:false,
      heart:'heart-o',
      favorite:[],
      openfix:false,
      active:false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <Image style={globals.logo_header_b} resizeMode="contain" source={require("../../../src/general/header.png")} />
    ),
    headerRight:( 
      <Button transparent style={{marginTop:6}} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  //se invoca antes del componente
  componentWillMount() {  
    const {navigation} = this.props;
    const img_shop = navigation.getParam('img', 'NO-ID');
    const id_shop = navigation.getParam('id', 'NO-ID');
    const name_shop = navigation.getParam('name', 'NO-NAME');
    const user = navigation.getParam('user', 'NO-ID');
    const token = navigation.getParam('token', 'NO-ID');
    const notif = navigation.getParam('notif', 'NO-ID');
    const languaje = navigation.getParam('languaje', 'NO-ID');
    if (languaje !== 'NO-ID'){
      I18n.locale = languaje
    }
    this.setState({id_shop:id_shop,name_shop:name_shop,img_shop:img_shop,user:user,token:token,notif:notif,languaje:languaje})
    this.props.fetchDataProductShop(id_shop);
    this.props.fetchDataShopD(id_shop)
    this.loaderfavorite(id_shop);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }
 
 //se invoca cuando el componente finalizo
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  //se invoca cuando desmontas el componente
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.visible) {
      this.setState({visible:false})
    }
    else{
      this.props.navigation.goBack()
    }
    return true;
  }

  componentWillReceiveProps(newProps){
    if(newProps.product.item.data !== this.props.product.item.data && newProps.product.isFeching == 'false'){
      this.setState({data: newProps.product.item.data,loader:false});
    }
    else if (newProps.product.isFeching == 'false') {
      this.setState({loader:false});
    }
    if(newProps.sucur.item.data !== this.props.sucur.item.data && newProps.sucur.isFeching == 'false'){
      this.setState({data2: newProps.sucur.item.data});
    }
  }

  componentDidUpdate(prevProps, prevState) {
   
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  _onRefresh = () => {
    this.setState({refreshing: true,loader:false});
    this.props.fetchDataProductShop(this.state.id_shop);
    //this.props.fetchDataShopD(this.state.id_shop);
    if (this.state.loader = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  _renderItemshopd(item){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,item.Precio.moneda.Simbolo,item.Precio.Precio_Unitario,item.marcas.N_Marca,item.imagenes__prod,item.Imagen_Destacada.URL_Imagen,item.Descripcion,item.Cod_Empresa);}}>
          { item.Imagen_Destacada.URL_Imagen === null 
            ? <ProgressiveImage
                thumbnailSource = {{uri: this.state.img_shop}}
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

  _renderContent = (dataArray) => {
    let img;
    if (Platform.OS === "ios") {
      img = <Image style={globals.img} resizeMode="contain" source={require('../../../src/maps_ios.png')} /> ;
    } else {
      img = <Image style={globals.img} resizeMode="contain" source={require('../../../src/google_maps.png')} /> ;
    }
    return (
      <View>
        <Text>{dataArray.Direccion}</Text>
        <TouchableOpacity onPress={() => {this.openGps(dataArray.Latitude,dataArray.Longitude)}} style={{alignSelf: 'center'}}>
          {img}
        </TouchableOpacity>
      </View>
    );
  }

  _renderHeader(dataArray, expanded) {
    return (
      <View style={globals.fix_header}>
        <Text>{dataArray.N_Sucursal}</Text>
          {expanded
            ? <Icon style={globals.icon1} name="md-arrow-dropup" />
            : <Icon style={globals.icon2} name="md-arrow-dropdown" />
          }
      </View>
    );
  }

  openGps = (ll,lg) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + ll + ',' + lg
    this.openExternalApp(url)
  }

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

  openmodal(id,nombre,simbolo,precio,marca,imagenes,destacado,descripcion,empresa)
  { 
    this.setState({modaldata:{id:id,nombre:nombre,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:this.state.id_shop,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:1886,suc:399},modal:true,openfix:true})
  }

  closemodal = () =>{
    this.setState({modal:false,openfix:false})
  }

  _rendermodal(){
    return(
      <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {this.setState({ visible: false});}}
        onHardwareBackPress={() => {console.log('back')}}
        width={0.9}
        rounded
        dialogTitle={
          <ListItem icon style={globals.view_title}>
            <Body>
              <Text style={globals.tex_title_m}>{I18n.t('global.suc')}</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => {this.setState({ visible: false});}} style={globals.touch_title}>
                <Icon name='md-close' style={globals.close_ico}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        }
        dialogAnimation={new ScaleAnimation()}
      >
        <DialogContent>
        {this.state.data2 && this.state.data2.length
          ?<ScrollView>
            <Accordion 
              headerStyle={globals.fix_header}
              dataArray={this.state.data2} 
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              style={globals.accordion}
            />
           </ScrollView>
           :<Text>{I18n.t('global.suc2')}</Text>
        }
        </DialogContent>
      </Dialog>    
    )
  }

  savefavorite = () => {
    console.log('yes')
    if (this.state.heart == 'heart-o') {
      var joined = this.state.favorite.concat(this.state.id_shop);
      AsyncStorage.setItem('favorite', JSON.stringify(joined));
      this.setState({heart:'heart'})
    }
    else{
      var array = this.state.favorite
      var index = this.state.favorite.indexOf(this.state.id_shop)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({favorite: array});
        AsyncStorage.setItem('favorite', JSON.stringify(array));
      }
      this.setState({heart:'heart-o'})
    }
    console.log(this.state.favorite)
  }

  loaderfavorite = async (id_shop) =>{
    try {
      const shop = await AsyncStorage.getItem('favorite');
      if (shop != null) {
        AsyncStorage.getItem('favorite', (error, result) => {
          this.setState({ favorite: JSON.parse(result) }, function () {   });});
        var index = shop.indexOf(id_shop)
        if (index != -1) {
          this.setState({heart:'heart'})
        }
      }
    }
    catch(error) {
      console.log("fetch Error: ", error)
    }
  }

  _renderHeaderp(){
    return(
      <Card style={globals.no_margin}>
        <CardItem cardBody>
          <Image style={globals.img_d_shop}  source={{uri: this.state.img_shop}} />
        </CardItem>
        <CardItem>
          <Left>
            <H3 numberOfLines={1} style={globals.text_top_1}>{this.state.name_shop}</H3>
          </Left>
          <Right >
            <View style={{flex: 1,flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {this.savefavorite()}}>
                <Icon type="FontAwesome" name={this.state.heart} style={globals.icoheart}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({visible:true})}>
                <Icon type="FontAwesome" name="map-marker" style={globals.ico_search}/>
              </TouchableOpacity>
            </View>         
          </Right>
        </CardItem>
      </Card>
    )
  }

  _renderflat(){
    return(
      <View>
      {this.state.data && this.state.data.length
      ?<FlatList
        data={this.state.data}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
          />
        }
        numColumns={3}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => (
          {length: globals.img_row.height, offset: globals.img_row.height * index, index}
        )}
        renderItem={({item}) => this._renderItemshopd(item)}
        initialNumToRender={9}
        ListHeaderComponent={this._renderHeaderp()}
        keyExtractor={(item, index) => index.toString()}
       />
      :<Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
     }
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
      return <OfflineNotice/>;
    } 

    if (this.state.loader == true & this.state.refreshing == false){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    return (
      <View style={globals.body}>
        <StatusBar backgroundColor={globals.status.color} barStyle="light-content"/>
        {this._renderflat()}
        {this._rendermodal()}
        {this._renderfuntion(this.state.modal)}
      </View>
    );  
  }
}

const mapStateToProps = state => {
  return {product: state.productSp,sucur:state.shopd}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataProductShop: (id) => {return dispatch(fetchDataProductShop(id))},
    fetchDataShopD:(id) =>{return dispatch(fetchDataShopD(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop_details)