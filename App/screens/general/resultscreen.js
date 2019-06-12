import React, {Component} from 'react';
import{View,Image,FlatList,RefreshControl,NetInfo,TouchableOpacity,BackHandler,StatusBar} from 'react-native';
import{Thumbnail,ListItem,Body,Right,H3,Container,Content,Header,Tab,Button,Tabs,Icon,TabHeading,Text,ScrollableTab,Spinner,Picker,Left,Item} from 'native-base';
//Redux
import {fetchDataResult} from '../../redux/actions/resultaction';
import {connect} from 'react-redux';
//General
import Load from '../../components/loader/loadercomponent';
import ProgressiveImage from '../../components/image/progressiveimagecomponent';
import OfflineNotice from '../../components/general/offlinecomponent';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';
//Extra
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
import Modalcart from '../../components/shoppingcart/modalcartcomponent';

const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class Result extends React.Component{
  _isMounted = false;

	constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      selected2: undefined,
      user:'',
      filter:false,
      searchtext:'',
      token:'',
      languaje:'',
      openfix:'',
      modal:false,
      modaldata:[],
    };
  }

  componentDidMount() { 
    this._isMounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  } 

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.filter) {
      this.setState({filter:false})
    }
    else{
      this.props.navigation.goBack()
    }
    return true;
  }

  componentWillMount() {
    const {navigation} = this.props;
    const text = navigation.getParam('search', 'NO-SEARCH');
    const user = navigation.getParam('user', 'NO-ID');
    const token = navigation.getParam('token', 'NO-ID');
    const languaje = navigation.getParam('languaje', 'NO-ID');
    if (languaje !== 'NO-ID'){
      I18n.locale = languaje
    }
    this.setState({user:user,token:token,languaje:languaje,searchtext:text})
    const search = text+'/'+user;
    this.props.fetchDataResult(search);
  }

  componentWillReceiveProps(newProps){
    if(newProps.result.item.data !== this.props.result.item.data && newProps.result.isFeching == 'false'){
      if (newProps.result.item.data && newProps.result.item.data.length) {
        var k = newProps.result.item.data.slice(0,1);
        this.onValueChange2(k[0].Cod_Cat_Producto)
      }
    }
  }

  handleConnectionChange = (isConnected) => {this.setState({isConnected });}

  _onRefresh = () => {
    if (this._isMounted) {
  	  this.setState({refreshing: true});
  	  const search = this.state.searchtext+'/'+this.state.user;
  	  this.props.fetchDataResult(search);
  	  if (this.props.result.item.data.length > 0) {
  	    this.setState({refreshing: false})
  	  }
  	  else{
  	    this.setState({refreshing: true})
  	  }
    } 
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
	  headerTitle: (<Image style={globals.logo_header_b} resizeMode="contain" source={require("../../src/general/header.png")} />),
    headerRight:(<Button transparent style={globals.fix_ico}/>),
	  headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  _renderItemcatg(item,index){
    return(
       <ListItem icon style={[globals.view_title,{marginTop:10,marginBottom:10}]}>
        <Left>
          <Thumbnail style={globals.Thumbnail} source={require("../../src/logo_login.png")}/>
        </Left>
        <Body>
          <TouchableOpacity onPress={() => this.setState({selected2:item.Cod_Cat_Producto,filter:false})}>
            <Text numberOfLines={1} {[globals.text,{fontSize:18}]}>{item.N_Cat_Producto}</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    )
  }

  closemodal = () =>{if (this._isMounted) {this.setState({modal:false,openfix:false,modaldata:[]})}}

  _rendermodal(modal){
    if (modal == false) {
      return null
    }
    else{
      return <Modalcart openmodal={this.state.modal} data={this.state.modaldata} closemodal={this.closemodal.bind(this)} /> 
    }
  }

  rendermodal(){
    return(
      <Dialog
        visible={this.state.filter}
        onTouchOutside={() => {this.setState({ filter: false });}}
        onHardwareBackPress={() => {console.log('back')}}
        width={0.9}
        animationDuration={100}
        dialogAnimation={new ScaleAnimation()}
        dialogTitle={
          <ListItem icon style={globals.view_title}>
            <Body>
              <Text numberOfLines={1} style={globals.tex_title_m}>{I18n.t('categories.title')}</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => {this.setState({filter:false})}} style={globals.touch_title}>
                <Icon name='md-close' style={globals.close_ico}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        }
      >
        <DialogContent>
          <View>
          {this.props.result.item.data && this.props.result.item.data.length
            ?<FlatList
              numColumns={1}
              renderItem={({item}) => this._renderItemcatg(item)}
              data={this.props.result.item.data}
              keyExtractor = { (item, index) => index.toString() }
              style={{height:150}}
             />
            :<Text>{I18n.t('global.nodata')}</Text>
          }
          </View>
        </DialogContent>
      </Dialog>
    )
  }

  renderfilter(){
    return(
      <View style={{flex: 1, flexDirection: 'row',justifyContent:'flex-end'}}>
      <View style={{marginTop:15,marginBottom:15,marginLeft:10,marginRight:15}}>
        <TouchableOpacity onPress={() => this.setState({filter:true})}>
          <Text style={[globals.text,{fontSize:20}]}><Icon name="ios-funnel" style={{fontSize:18,color:'#595959'}}/>  {I18n.t('result.filter')}</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }

  openmodal(id,nombre,simbolo,precio,marca,imagenes,destacado,descripcion,empresa)
  { 
    if (this._isMounted) {
      this.setState({modaldata:{id:id,nombre:nombre,simbolo:simbolo,precio:precio,total:precio,marca:marca,imagenes:imagenes,destacado:destacado,descripcion:descripcion,empresa:empresa,user:this.state.user,languaje:this.state.languaje,token:this.state.token,prod:1886,suc:399},modal:true,openfix:true})
    }
  }

  renderresult(item,i){
    var price = item.precios.map((i) => {
      return (i.Precio_Unitario)
    })
    var simbolo = item.precios.map((i) => {
      return (i.moneda.Simbolo)
    })
    return(
      <View style={globals.renderview} key={i} >
        <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,simbolo,price,item.marcas.N_Marca,null,null,null,item.Cod_Empresa);}}>
          <ProgressiveImage
            thumbnailSource = {require("../../src/det.png")}
            style = {globals.img_row}
            Content = {globals.img_rowc}
            resizeMode = "cover"
            key={i}
          />
          <Text numberOfLines={1} style={[globals.text,{marginTop:10}]} key={i}>{item.N_Producto}</Text>
        </TouchableOpacity>
      </View>
    )
  }  

  onValueChange2(value: string) {if (this._isMounted) {this.setState({selected2: value});}}

  render(){
	  if (!this.state.isConnected) {
	    return <OfflineNotice />;
	  }

	  if (this.props.result.isFeching == true ){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }
	    
    return(
			<View style={globals.body}>
        {this.rendermodal()}
        {this._rendermodal(this.state.modal)}
        {this.props.result.item.data && this.props.result.item.data.length 
        ?<Tabs tabBarUnderlineStyle={globals.button}>
          <Tab numberOfLines={1} heading={I18n.t('result.tab')} tabStyle={globals.body} textStyle={globals.title2} activeTabStyle={globals.body} activeTextStyle={globals.title5}>
              <View style={globals.body}>
             {this.props.result.item.data.filter(x => x.Cod_Cat_Producto == this.state.selected2).map((subdata,i) =>(
                <FlatList
                  numColumns={3}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                      colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
                    />
                  }
                  renderItem={({item}) => this.renderresult(item)}
                  viewabilityConfig={viewabilityConfig}
                  ListHeaderComponent={this.renderfilter()}
                  data={subdata.productos}
                  initialNumToRender={6}
                  getItemLayout={(data, index) => ({length: globals.img_row.height, offset: globals.img_row.height * index, index})}
                  keyExtractor = { (item, index) => index.toString() }
                  key={i}
                /> 
              ))}
             </View> 
          </Tab>
          <Tab numberOfLines={1}  heading={I18n.t('result.tab2')} tabStyle={globals.body} textStyle={globals.title2} activeTabStyle={globals.body} activeTextStyle={globals.title5} >
            <View style={globals.body}>
              {this.renderfilter()}
            </View>
          </Tab>
          <Tab numberOfLines={1}  heading={I18n.t('result.tab3')} tabStyle={globals.body} textStyle={globals.title2} activeTabStyle={globals.body} activeTextStyle={globals.title5} >
            <View style={globals.body}>
              {this.renderfilter()}
            </View>
          </Tab>
         </Tabs>
        :<View style={globals.center}>
           <Image style={globals.imgfix} resizeMode="contain" source={require("../../src/general/result.png")} />
           <H3 style={globals.title}>{I18n.t('result.title')}</H3>
           <Text style={globals.text2}>{I18n.t('result.title2')}</Text>
           <Button full rounded
            style={globals.button_login}
            onPress={() => this.props.navigation.goBack()}>
            <Text>{I18n.t('result.bresult')}</Text>
           </Button>
         </View>
        }
      </View>
		)
	}
}

const mapStateToProps = state => {
  return {result: state.result}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataResult: (search) => {return dispatch(fetchDataResult(search))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)