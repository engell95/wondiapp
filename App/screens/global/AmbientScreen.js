import React, {PureComponent}from 'react';
import {Animated,TextInput ,Alert,View,Keyboard,NetInfo,TouchableOpacity,Picker,StyleSheet,StatusBar,ScrollView,FlatList,RefreshControl,Image,ImageBackground} from 'react-native';
import {Block,Input, NavBar, Text,Icon,Switch,Button} from 'galio-framework';

import Grid from '@components/general/GridComponent'; 

import design                   from '@config/style/Style';
import OfflineNotice            from '@components/general/OfflineComponent';
import Load                     from '@components/general/LoaderComponent';
import {loadSettings}           from '@config/SettingsStorage';
import ProgressiveImage         from '@components/image/AsyncImageComponent';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {fetchDatabestprice}   from '@redux/actions/BestPriceAction';
import {fetchDatabestsearch}  from '@redux/actions/BestSearchAction';
import {fetchDatamorebudget}  from '@redux/actions/MoreBudgetsAction';
import {fetchDatalistuser}    from '@redux/actions/ListUserAction';
import {fetchDatasimilary}    from '@redux/actions/SimilaryAction';
import {fetchDataPromofull}   from '@redux/actions/PromoFullAction';
import {fetchDataProductShop} from '@redux/actions/ProductShopAction';
import {fetchDataCategory}    from '@redux/actions/CategoryAction';
import {fetchDataPromox}      from '@redux/actions/PromoProdAction';
import {connect}              from 'react-redux';

const fondo = require('@assets/img/fondo.png');
const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class AmbientClass extends PureComponent {
 
  constructor(props) {super(props)
    this.state = {
      refreshing: false,
      slider1ActiveSlide: 0,
      stepIndex: 0,
      pagination: 0,
      languaje:'',
      user:'',
      token:'',
    };
    this.currentStepIndex = 0;
    this.nextStep = this.nextStep.bind(this);
  }

  async componentWillMount(){ 
       this.props.fetchDatabestprice();
          this.props.fetchDatabestsearch();
          this.props.fetchDatamorebudget();
          this.props.fetchDatalistuser(24);
          this.props.fetchDatasimilary(24);
          this.props.fetchDataPromofull();
          this.props.fetchDataCategory();
    try{
      const settings = await loadSettings();
      if (settings !== null) {
        if (settings.user !== null & settings.token !== null){
          this.setState({user:settings.user,languaje:settings.languaje,token:settings.token})
       
        }
      }
    }
    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  }

  renderItemprodV(data,index){
    var Destacado = data.item.imagenes__prod.filter(obj => obj.Destacado == 1);
    const precio_det = Number(data.item.Precio).toFixed(2);
    return(
      <TouchableOpacity key={index} style={{borderRadius: 15,width:'auto',height: design.height / 6,backgroundColor:design.theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5}}>
          <Block style={{width:'100%',height: (design.height / 6) * 0.65,borderTopLeftRadius: 15,borderTopRightRadius:15,}}>
            <ProgressiveImage
              style={{width: '100%',height:(design.height / 6) * 0.65,marginTop:5}}
              placeholderSource={carga}
              source={{uri: Destacado[0].URL_Imagen}}
              placeholderColor={design.theme.COLORS.MUTED}
              resizeMode="contain"
            />
          </Block>
          <Block style={{width:'100%',height: (design.height / 6) * 0.15}}>
            <Text numberOfLines={1} center style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2,color: '#1A9CE8'}}>{data.item.N_Producto}</Text>
          </Block>  
          <Block style={{backgroundColor: '#1A9CE8',width:'100%',borderBottomLeftRadius: 15,borderBottomRightRadius:15,height: (design.height / 6) * 0.20}}>
            <Text numberOfLines={1} center style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2}} color={design.theme.COLORS.WHITE}>1Und {data.item.Moneda} {precio_det}</Text>
          </Block>
      </TouchableOpacity>
    )
  }

  renderItemprodH(data,index){
    var Destacado = data.item.imagenes__prod.filter(obj => obj.Destacado == 1);
    const precio_det = Number(data.item.Precio).toFixed(2);
    return(
      <TouchableOpacity key={index} style={{borderRadius: 15,width:design.width / 3,height:design.height / 6,backgroundColor:design.theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 10}}>
        <Block style={{width:'100%',height: (design.height / 6) * 0.65,borderTopLeftRadius: 15,borderTopRightRadius:15,}}>
            <ProgressiveImage
              style={{width: '100%',height:(design.height / 6) * 0.65,marginTop:5}}
              placeholderSource={carga}
              source={{uri: Destacado[0].URL_Imagen}}
              placeholderColor={design.theme.COLORS.MUTED}
              resizeMode="contain"
            />
          </Block>
          <Block style={{width:'100%',height: (design.height / 6) * 0.15}}>
            <Text numberOfLines={1} center style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2,color: '#1A9CE8'}}>{data.item.N_Producto}</Text>
          </Block>  
          <Block style={{backgroundColor: '#1A9CE8',width:'100%',borderBottomLeftRadius: 15,borderBottomRightRadius:15,height: (design.height / 6) * 0.20}}>
            <Text numberOfLines={1} center style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2}} color={design.theme.COLORS.WHITE}>1Und {data.item.Moneda} {precio_det}</Text>
          </Block>
      </TouchableOpacity>
    )
  }

  renderItemcatg(data,index){
    return(
      <TouchableOpacity key={index} style={{borderRadius: 15,width:'100%',height: design.height / 7,backgroundColor:design.theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5}}
        onPress={() => {this.props.navigation.navigate("Shop_Catg",{user:this.state.user,token:this.state.token,languaje:this.state.languaje,id:data.item.Cod_Cat_Empresa,name:data.item.N_Cat_Empresa})}}
      >
        <Block style={{width:'100%',height: design.height / 7}}>
          <ProgressiveImage
            style={{width:'100%',height: design.height / 7,borderRadius: 15}}
            placeholderSource={carga}
            source={{uri: data.item.Icono}}
            border={15}
            placeholderColor={design.theme.COLORS.MUTED}
          />
        </Block>
      </TouchableOpacity>
    )
  }

  Getflatlist(datas,horizontal,columns,initial,scroll,header,category) {
    if (datas.item.data && datas.item.data.length) {
      return(
        <Block>
          {header ? <Text h5 bold color={'rgba(24, 46, 134, 1)'} style={{fontFamily: "SF-UI-Text-Regular",marginLeft: 5}}>{header}</Text> : null}
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

  searchbutton(){
    return(
      <Input 
        placeholder="  Búsqueda" 
        icon="ios-search"
        family="ionicon"
        left
        placeholderTextColor={design.theme.COLORS.TEXT2}
        iconColor={design.theme.COLORS.TEXT2}
        color={design.theme.COLORS.TEXT}
        style={design.style.search}
      />
    )
  }

  handleSnapToItem(index){this.setState({ activeSlide: index });}

  renderPromo ({item, index}) {
    //<TouchableOpacity onPress={() => {this.props.navigation.navigate("Promo",{id_promo:item.Cod_Promocion,id_shop:item.Empresa.Cod_Empresa,name:item.Empresa.N_Empresa,img_Shop:item.Empresa.Logo,img_promo:item.Imagen,languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user})}}>
    return (
      <TouchableOpacity onPress={() => {this.openpromo(item.Cod_Promocion)}}>
        <ProgressiveImage
          //style={design.style.imgbanner}
          style={{width:design.width * 0.9,height: design.height * 0.20,borderRadius: 10}}
          placeholderSource={carga}
          source={{uri:item.Imagen}}
          placeholderColor={design.theme.COLORS.MUTED}
          //resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  rendercarusel(){
    {/*<Block center style={design.style.carusel_view}>*/}
    return(
      <Block center style={{height: design.height * 0.20 ,borderRadius: 10 ,marginTop: 5}}> 
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

  Header(promo,bestprice){
    if (promo.item.data && promo.item.data.length) {
      var data = promo.item.data.filter((obj,index) => index == this.state.slider1ActiveSlide);
      var img = data.map((data) => {return data.Imagen});
      return(
        <Block>
          <ImageBackground
            style={bestprice.item.data && bestprice.item.data.length?{height:design.height / 4 + design.statusbar}:{height:design.height / 3 }}
            imageStyle={{borderBottomRightRadius:design.height * 0.30 /8,borderBottomLeftRadius:design.height * 0.30 /8}}
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
             <Text center style={{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal'}} color={design.theme.COLORS.TEXT3} size={11}>{item.Moneda} {precio_det}</Text>
          </Block>
        </TouchableOpacity>
      </Block>  
    )
  }

  nextStep() {
    if (this.currentStepIndex < this.props.bestprice.item.data.length - 2) {
      this.currentStepIndex = this.currentStepIndex + 1;
      this.flatListRef.scrollToIndex({index: this.currentStepIndex, animated: true});
      this.setState ({stepIndex: this.currentStepIndex})
    } else {
      console.log('yes')
      this.flatListRef.scrollToIndex({index: 0, animated: true});
      this.currentStepIndex = 0;
      this.setState ({stepIndex: 0})
    }
  }

  Wondi(bestprice){
    if (bestprice.item.data && bestprice.item.data.length) {
      return(
        <Block>
          <ImageBackground
            style={{zIndex: -1,height:design.height / 3.2 + design.statusbar, marginBottom:design.width * 0.02}}
            imageStyle={{ borderRadius: design.height * 0.30 /8}}
            source={fondo}
          >
            {/*Productos con el mejor precio*/}
            <Block flex left style={{marginLeft:design.width * 0.05,marginTop:design.height * 0.05}}>
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
                <Button 
                  round
                  color={'transparent'}
                  onPress={() => this.nextStep()}
                  style={design.style.btn_next}
                >
                  <Block><Icon name="chevron-right" family="font-awesome" color={design.theme.COLORS.WHITE} size={25} /></Block>
                </Button>
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

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.fetchDatabestprice();
    this.props.fetchDatabestsearch();
    this.props.fetchDatamorebudget();
    this.props.fetchDatalistuser(24);
    this.props.fetchDatasimilary(24);
    this.props.fetchDataPromofull();
    this.props.fetchDataCategory();
    this.setState( { refreshing: false } );
  }

  render() {
      if (this.props.bestprice.isFeching || this.props.similary.isFeching || this.props.morebudget.isFeching || this.props.morebudget.listxuser || this.props.morebudget.bestsearch || this.props.morebudget.category) {
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
            
            <Grid 
              data={this.props.listxuser} 
              horizontal={true} 
              column={1}
              initial={6}
              scroll={true}
              header={'Recomendados para ti'} 
              user={2} 
              token={'555'} 
              languaje={null}
            />
            
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
      );
  }
}

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbientClass);
//export default Ambient;