import React, {Component} from 'react';
import {Platform,Linking,Alert,Image,FlatList,RefreshControl,TouchableOpacity,ScrollView,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,View,Text,H3,CardItem,Card,Left,ListItem,Body,Right,Icon,Grid,Col,Accordion} from 'native-base';
//Redux
import {fetchDataProductShop} from '../../redux/actions/productshopaction';
import {fetchDataShopD} from '../../redux/actions/dshopaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import Orientation from 'react-native-orientation-locker';
import ProgressiveImage from '../general/progressiveimagecomponent';
import {withNavigation,NavigationActions,StackActions} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
import color from "../../styles/themes/default";
//Extra
import ModalBuget from '../general/modalbugetcomponent';
import Dialog, {DialogContent,ScaleAnimation,DialogTitle,DialogButton,DialogFooter} from 'react-native-popup-dialog';

const Welcome = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});

class ProductShopComponent extends Component {

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

  componentWillMount() {
    this.verifiuser();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  verifiuser = async () => {
    try {
      const id_user = await AsyncStorage.getItem('id_user');
      const code = await AsyncStorage.getItem('code');
      if (id_user !== null & code !== null) {
        this.setState({user:id_user,code:code});
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        this.props.fetchDataProductShop(id);
        this.props.fetchDataShopD(id);
      }
      else{
        this.props.navigation.dispatch(Welcome);
      }
    } 
    catch (error) {
      console.log(error)
    }
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
                Content = {globals.img_row}
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

  _renderHeader(dataArray, expanded) {
    return (
      <View style={globals.fix_header}>
        <Text>{dataArray.N_Sucursal}</Text>
          {expanded
            ? <Icon style={globals.icon1} name="md-arrow-dropup" />
            : <Icon style={globals.icon2} name="md-arrow-dropdown" />}
      </View>
    );
  }

  openGps = (ll,lg) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + ll + ',' + lg
    this.openExternalApp(url)
  }

  openExternalApp = (url) => {
    console.log(url);
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

  _renderContent = (dataArray) => {
    let img;
    if (Platform.OS === "ios") {
      img = <Image style={globals.img} resizeMode="contain" source={require('../../src/maps_ios.png')} /> ;
    } else {
      img = <Image style={globals.img} resizeMode="contain" source={require('../../src/google_maps.png')} /> ;
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.verifiuser();
    if (this.props.product.isFeching == true && this.props.shopd.isFechingh == true) {
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
    
    if (this.props.product.isFeching && this.props.shopd.isFeching){
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
  	  				<Image style={globals.img_d_shop}  source={{uri: img}} />
  	  			</CardItem>
  	  			<CardItem>
  	  				<Left>
                <H3 numberOfLines={1} style={globals.text_top_1}>{name}</H3>
              </Left>
              <Right>
              {this.props.shopd 
                ?<TouchableOpacity onPress={() => {this.setState({ visible: true });}}>
                    <Icon type="FontAwesome" name="map-marker" style={globals.ico_search}/>
                 </TouchableOpacity>
                :null
              }
              </Right>
  	  			</CardItem>
  	  		</Card>
          <FlatList
            numColumns={3}
            renderItem={({item}) => this._renderItem(item)}
            data={this.props.product.item.data}
            keyExtractor={(item) => item.Cod_Producto}
          />
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
          <Dialog
            visible={this.state.visible}
            onHardwareBackPress={() => {
              this.setState({ visible: false });
            }}
            width={0.9}
            rounded
            dialogTitle={
              <ListItem icon style={globals.view_title}>
                <Body>
                  <Text style={globals.tex_title_m}>Sucursales</Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => {this.setState({ visible: false });}} style={globals.touch_title}>
                    <Icon name='md-close' style={globals.close_ico}/>
                  </TouchableOpacity>
                </Right>
              </ListItem>
            }
            dialogAnimation={new ScaleAnimation()}
          >
            <DialogContent>
              <ScrollView>
                <Accordion 
                  headerStyle={globals.fix_header}
                  dataArray={this.props.shopd.item.data} 
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  style={globals.accordion}
                />
              </ScrollView>
            </DialogContent>
          </Dialog>
	  		</Content>
	  	</Container> 
	  )
  }
}

const mapStateToProps = state => {
  return {product: state.productSp,shopd:state.shopd}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataProductShop: (id) => {return dispatch(fetchDataProductShop(id))},
    fetchDataShopD:(id) =>{return dispatch(fetchDataShopD(id))}
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProductShopComponent))