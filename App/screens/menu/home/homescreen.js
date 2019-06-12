import React, {Component} from 'react';
import {Alert,FlatList,BackHandler,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,View,Text} from 'react-native';
import {Button,Icon,H1} from 'native-base';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Modalcart from '../../../components/shoppingcart/modalcartcomponent';
import Empty from "../../../components/general/emptycomponent";
//Redux
import {fetchDataHome} from '../../../redux/actions/homeaction';
import {connect} from 'react-redux';
import globals from "../../../styles/globals";
//idioma
import I18n from '../../../config/LanguageService';
import {loadSettings} from '../../../config/SettingsStorage';

const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class Home extends React.Component {
  _isMounted = false;

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
      openfix:false,
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <View style={globals.view_nav}>
        <Image style={globals.logo_header_b} resizeMode="contain" source={require("../../../src/general/header.png")} />
      </View>
    ),
    headerRight:( 
      <Button transparent style={globals.fix_ico} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>
    ),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      I18n.locale = settings.languaje
      this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
    }
    this.props.fetchDataHome('1');
  }


  componentDidMount() {
    this._isMounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.item.data !== prevProps.product.item.data) {
      if (this.props.product.item.data){
        this.setState({data:this.props.product.item.data,loader:this.props.product.isFeching})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    if (this._isMounted) {
      this.setState({isConnected });
    }
  }

  _onRefresh = () => {
    if (this._isMounted) {
      this.setState({refreshing: true,loader:false});
      this.props.fetchDataHome('1');
      if (this.state.loader = true) {
        this.setState({refreshing: false})
      }
      else{
        this.setState({refreshing: true})
      }
    }
  }

  _renderItem(item,index){
    return(
      <View style={globals.renderview} >
       <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,item.Precio.moneda.Simbolo,item.Precio.Precio_Unitario,item.marcas.N_Marca,item.imagenes__prod,item.Imagen_Destacada.URL_Imagen,item.Descripcion,item.Cod_Empresa);}}>
        <Text numberOfLines={1} style={globals.textheader}>Negocio</Text>
           { item.Imagen_Destacada.URL_Imagen == null 
              ?<ProgressiveImage
                thumbnailSource = {require("../../../src/logo_login.png")}
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
          <Text numberOfLines={2} style={globals.text}>{item.N_Producto}</Text>
        </TouchableOpacity>
      </View>    
    )
  }

  openmodal(id,nombre,simbolo,precio,marca,imagenes,destacado,descripcion,empresa)
  { 
    if (this._isMounted) {
      this.setState({modaldata:{id:id,nombre:nombre,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:1886,suc:399},modal:true,openfix:true})
    }
  }

  closemodal = () =>{
    if (this._isMounted) {
      this.setState({modal:false,openfix:false})
    }
  }

  _rendermodal(modal){
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
          renderItem={({item}) => this._renderItem(item)}
          initialNumToRender={9}
          ListHeaderComponent={<H1 style={[globals.title,globals.contenttop]}>{I18n.t('home.title')}</H1>}
          keyExtractor={(item, index) => index.toString()}
         />
        :<Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
        }
        {this._rendermodal(this.state.modal)}
        
      </View>
    );  
    
  }
}

const mapStateToProps = state => {
  return {
    product: state.home,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataHome: (id) => {return dispatch(fetchDataHome(id))},
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)