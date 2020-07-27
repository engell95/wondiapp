import React, {PureComponent}from 'react';
import {StyleSheet,Alert,TouchableOpacity,ScrollView,FlatList,RefreshControl,Image,ImageBackground} from 'react-native';
import {Block,Input, NavBar, Text,Icon,Switch,Button} from 'galio-framework';
import Autocomplete from '@components/general/AutocompleteComponent';

import Grid                     from '@components/general/GridComponent'; 
import design                   from '@config/style/Style';
import OfflineNotice            from '@components/general/OfflineComponent';
import Load                     from '@components/general/LoaderComponent';
import {loadSettings}           from '@config/SettingsStorage';
import ProgressiveImage         from '@components/image/AsyncImageComponent';
import Popupcart                from '@components/shoppingcart/modalcartcomponent';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {fetchDatabestprice}     from '@redux/actions/BestPriceAction';
import {fetchDatabestsearch}    from '@redux/actions/BestSearchAction';
import {fetchDatamorebudget}    from '@redux/actions/MoreBudgetsAction';
import {fetchDatalistuser}      from '@redux/actions/ListUserAction';
import {fetchDatasimilary}      from '@redux/actions/SimilaryAction';
import {fetchDataPromofull}     from '@redux/actions/PromoFullAction';
import {fetchDataProductShop}   from '@redux/actions/ProductShopAction';
import {fetchDataCategory}      from '@redux/actions/CategoryAction';
import {fetchDataPromox}        from '@redux/actions/PromoProdAction';
import {fetchDataSearch}        from '@redux/actions/SearchAction';
import {connect}                from 'react-redux';

const fondo = require('@assets/img/fondo.png');
const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class Home extends PureComponent {  
  //inicializar variables
  constructor(props) {super(props)
    this.state = {
      refreshing: false,
      slider1ActiveSlide: 0,
      stepIndex: 0,
      pagination: 0,
      languaje:'',
      user:'',
      token:'',
      data7: [],
      data:[],
      search:[]
    };
    this.currentStepIndex = 0;
    this.nextStep = this.nextStep.bind(this);
  }

  //verificando datos del usuario y llamando apis
  async componentWillMount(){ 
    try{
      const settings = await loadSettings();
      if (settings !== null) {
        if (settings.user !== null & settings.token !== null){
          this.setState({user:settings.user,languaje:settings.languaje,token:settings.token})
          this.props.fetchDatabestprice();
          this.props.fetchDatabestsearch();
          this.props.fetchDatamorebudget();
          this.props.fetchDatalistuser(settings.user);
          this.props.fetchDatasimilary(settings.user);
          this.props.fetchDataPromofull();
          this.props.fetchDataCategory();
        }
      }
    }
    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  }

  //ciclos de vida
  componentWillReceiveProps(newProps){
    if(newProps.promodet.item.data !== this.props.promodet.item.data && newProps.promodet.isFeching == false){
      this.setState({data7: newProps.promodet.item.data,loader7:false});
    }

    if(newProps.search.item.data !== this.props.search.item.data && newProps.search.isFeching == false){
      this.setState({search: [newProps.search.item.data]});
     
    }
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

  //refrescando apis
  async _onRefresh() {
    try{
      const settings = await loadSettings();
      this.setState({refreshing: true});
      if (settings !== null) {
        if (settings.user !== null & settings.token !== null){
          this.props.fetchDatabestprice();
          this.props.fetchDatabestsearch();
          this.props.fetchDatamorebudget();
          this.props.fetchDatalistuser(settings.user);
          this.props.fetchDatasimilary(settings.user);
          this.props.fetchDataPromofull();
          this.props.fetchDataCategory();
        }
      }
    }
    catch(error) {
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
    finally{
      this.setState( { refreshing: false } );
    }
  }

  //buscar datos
  searchapi(text){
    this.setState({search: []})
    if (text !== '') {
      try{
        this.props.fetchDataSearch(text);
      }
      catch(error) {
        Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
      }
    }
    else{
      this.setState({search: []});
    }
  }

  //buscador
  searchbutton(){
    return(
       <Input 
          placeholder="  Búsqueda" 
          icon="ios-search"
          family="ionicon"
          left
          pointerEvents="none"
          onTouchStart={()=>  this.props.navigation.navigate("Search",{user:this.state.user})}
          placeholderTextColor={design.theme.COLORS.TEXT2}
          iconColor={design.theme.COLORS.TEXT2}
          color={design.theme.COLORS.TEXT}
          style={design.style.search}
        />
    )
  }

  nextStep() {
    if (this.currentStepIndex < this.props.bestprice.item.data.length - 2) {
      this.currentStepIndex = this.currentStepIndex + 1;
      this.flatListRef.scrollToIndex({index: this.currentStepIndex, animated: true});
      this.setState ({stepIndex: this.currentStepIndex})
    } else {
      this.flatListRef.scrollToIndex({index: 0, animated: true});
      this.currentStepIndex = 0;
      this.setState ({stepIndex: 0})
    }
  }

  handleSnapToItem(index){this.setState({ activeSlide: index });}

  //funcion cargar_promo
  async openpromo(promo_id){
    try{
      this.props.fetchDataPromox(promo_id);
    }
    catch(error) { 
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
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

  //render carusel de promo 
  rendercarusel(){
    return(
      <Block center style={design.style.contentbanner}> 
        <Carousel
          ref={c => this._slider1Ref = c}
          data={this.props.promofull.item.data}
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

  //encabezado home
  Header(promo,bestprice){
    if (promo.item.data && promo.item.data.length) {
      var data = promo.item.data.filter((obj,index) => index == this.state.slider1ActiveSlide);
      var img = data.map((data) => {return data.Imagen});
      return(
        <Block>
          <ImageBackground
            style={bestprice.item.data && bestprice.item.data.length?{height:design.height / 4 + design.statusbar}:{height:design.height / 3 }}
            imageStyle={design.style.bannerstyle}
            source={{uri:img.toString()}}
            blurRadius={5}
          >
            <Block center style={{marginTop: design.statusbar}} >
              {this.searchbutton()}
              {this.rendercarusel()}
            </Block>
          </ImageBackground>   
        </Block>
      )
    }else{
      return(<Block center style={{marginTop: design.statusbar}} >{this.searchbutton()}</Block>)
    }
  }

  //producto wondi
  renderWondiProd(item,index){
    var Destacado = item.imagenes__prod.filter(obj => obj.Destacado == 1);
    const precio_det = Number(item.Precio).toFixed(2);
    return(
      <Block style={design.style.prod_cont1}>
        <TouchableOpacity onPress={() => {this.openmodal(item.Cod_Producto,item.N_Producto,item.Moneda,precio_det,item.N_Marca,item.imagenes__prod,Destacado,item.Descripcion,item.Cod_Empresa,item.Logo,item.N_Unidad_Medida,item.Sucursal);}}>
          <Block style={design.style.prod_img1_c}>
            {Destacado && Destacado.length
              ?<ProgressiveImage
                  style={design.style.prod_img1}
                  placeholderSource={carga}
                  source={{uri: Destacado[0].URL_Imagen}}
                  placeholderColor={design.theme.COLORS.MUTED}
                  resizeMode="contain"
                  border={22}
                />
              :item.Logo && item.Logo.length
                ?<ProgressiveImage
                  style={design.style.prod_img1}
                  placeholderSource={carga}
                  source={{uri: item.Logo}}
                  placeholderColor={design.theme.COLORS.MUTED}
                  resizeMode="contain"
                  border={22}
                />
                :<ProgressiveImage
                  style={design.style.prod_img1}
                  placeholderSource={carga}
                  source={logo}
                  placeholderColor={design.theme.COLORS.MUTED}
                  resizeMode="contain"
                  border={22}
                />
            }
          </Block>
          <Block style={design.style.prod_text1_c}>
            <Text center style={design.style.textsuc} color={design.theme.COLORS.TEXT3} size={11}>{item.Moneda} {precio_det}</Text>
          </Block>
        </TouchableOpacity>
      </Block>  
    )
  }

  //seccion wondi
  Wondi(bestprice){
    if (bestprice.item.data && bestprice.item.data.length) {
      return(
        <Block>
          <ImageBackground
            style={design.style.container_wondiselect}
            imageStyle={design.style.wondiselectstyle}
            source={fondo}
          >
            {/*Productos con el mejor precio*/}
            <Block flex left style={design.style.container_wondiselect2}>
              <Text p bold numberOfLines={1} style={{fontFamily: "SFProText-Semibold"}} color={design.theme.COLORS.WHITE}>Bienvenido a Wondi!</Text>
              <Text color={design.theme.COLORS.WHITE} style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',marginBottom: 10,width:design.width}}>Disfruta de precios especiales y descuentos</Text>
              <Block style={{alignItems: 'flex-start',flexDirection:'row',height:design.width * 0.26,width:design.width * 0.70}}>
                <FlatList
                  ref={(ref) => { this.flatListRef = ref; }}
                  data={bestprice.item.data}
                  initialNumToRender={3}
                  showsHorizontalScrollIndicator = { false }
                  horizontal={true}
                  renderItem={({item}) => this.renderWondiProd(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
                {bestprice.item.data.length > 3
                  ?<Button 
                    round
                    color={'transparent'}
                    onPress={() => this.nextStep()}
                    style={design.style.btn_next}
                  >
                    <Block><Icon name="chevron-right" family="font-awesome" color={design.theme.COLORS.WHITE} size={25} /></Block>
                  </Button>
                  :null
                }
              </Block>
              <Button 
                round
                color={design.theme.COLORS.WHITE}
                style={design.style.btn_next2}
                onPress={() => this.props.navigation.navigate("Category")}
              >
                <Text left numberOfLines={1} color={design.theme.COLORS.BORDE}  style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',marginLeft:5}}>
                  Descubre todos tus beneficios   <Icon name="chevron-right" family="font-awesome" color={design.theme.COLORS.PRIMARY2} size={13} />
                </Text>
              </Button>
              </Block>
          </ImageBackground>
        </Block>
      )
    }
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
            source={data.item.Icono ?{uri: data.item.Icono}:logo}
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
        onPress={() => {this.openmodal(data.item.Cod_Producto,data.item.N_Producto,data.item.Moneda,precio_det,data.item.N_Marca,data.item.imagenes__prod,Destacado,data.item.Descripcion,data.item.Cod_Empresa,data.item.Logo,data.item.N_Unidad_Medida,data.item.Sucursal);}}
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

  render() {
    if (this.props.bestprice.isFeching || this.props.similary.isFeching || this.props.morebudget.isFeching) {
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
          {/*Encabezado con las promociones*/}  
          {this.Header(this.props.promofull,this.props.bestprice)}
          {/*Seccion wondi*/}  
          {this.Wondi(this.props.bestprice)}
          {/**realizando renderizado de los pop-up de producto**/}
          {this.pop_up(this.state.modal)}
          {/*Productos similares a tus busquedas*/}
          {this.Getflatlist(this.props.similary,false,3,6,false,'Productos destacados')}
          {/*Productos presupuestados*/}
          {this.Getflatlist(this.props.morebudget,true,1,6,true,'Ofertas que necesitas')}
          {/*Productos de categorias que le interesan al usuario*/}
          {this.Getflatlist(this.props.listxuser,true,1,6,true,'Recomendados para ti')}
          {/*Productos mas buscados*/}
          {this.Getflatlist(this.props.bestsearch,true,1,6,true,'Esto te puede interesar')}
          {/*Categorias disponibles*/}
          {this.Getflatlist(this.props.category,false,3,4,false,'Presupuesta por Categoría',true)}
        </ScrollView> 
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2,
    paddingLeft:10,
    paddingRight:10,
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
   list: {
    borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1,
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0,
  }
});

const mapStateToProps = state => {
  return {
    bestprice : state.bestprice,
    bestsearch: state.bestsearch,
    morebudget: state.morebudget,
    listxuser : state.listxuser,
    similary  : state.similary,
    promofull : state.promofull,
    category  : state.category,
    promodet  : state.promoprod,
    search    : state.search,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDatabestprice:  ()     => {return dispatch(fetchDatabestprice())},
    fetchDatasimilary:   (id)   => {return dispatch(fetchDatasimilary(id))},
    fetchDatamorebudget: ()     => {return dispatch(fetchDatamorebudget())},
    fetchDatabestsearch: ()     => {return dispatch(fetchDatabestsearch())},
    fetchDatalistuser:   (id)   => {return dispatch(fetchDatalistuser(id))},
    fetchDataPromofull:  ()     => {return dispatch(fetchDataPromofull())},
    fetchDataCategory:   ()     => {return dispatch(fetchDataCategory())},
    fetchDataPromox:     (id)   => {return dispatch(fetchDataPromox(id))},
    fetchDataSearch:     (text)   => {return dispatch(fetchDataSearch(text))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)