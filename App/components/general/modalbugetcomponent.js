import React, { PureComponent } from 'react';
import {TouchableOpacity,Modal,ScrollView,Image,StatusBar,BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {View,Text,Icon,ListItem,Body,Right,Left,Input,Button,Grid,Col,ActionSheet,Container,Content} from 'native-base';
//Redux
import {fetchDataBudget} from '../../redux/actions/budgetaction';
import {fetchDataShopD} from '../../redux/actions/dshopaction';
import {addbudget} from '../../redux/actions/mainaction';
import {connect} from 'react-redux';
//Estilos
import globals from "../../styles/globals";
//General
import ProgressiveImage from '../general/progressiveimagecomponent';
import {withNavigation} from 'react-navigation';
//Extra
import Dialog, { ScaleAnimation,DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import NumericInput from 'react-native-numeric-input'
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
//complemento
import Detalles from "./productdetcomponent";
import ModalBugetNew from './modalnewbugetcomponent';
import Fullimg from './fullimgcomponent';
import Load from './loader2component';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';

class ModalBuget extends PureComponent {

	constructor(props) {super(props)
	  this.state = {
      total: props.data.precio,
      cantidad:1,
      pagination: 0,
      pdetalle:false,
      data:[],
      currentimg:false,
      currentdest:false,
      cargando:false,
      crear:false,
      full:false,
      name_shopping: null,
      id_shopping:null,
      visible:props.openmodal,
	  };
  }

  componentDidMount() { 
    this.props.fetchDataBudget(this.props.user);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.precio !== prevProps.data.precio) {
      this.setState({total:this.props.data.precio})
    }
  }

  closemodal = () => {
  	this.props.closemodal();
  }

  openmodaldet = () =>{
    this.setState({cargando:true});
    this.props.fetchDataShopD(this.props.data.empresa);
    if (this.props.data.imagenes.length > 0) {
      this.setState({currentimg:true});
    }
    else{
      this.setState({currentimg:false});
    }
    if (this.props.data.destacado.length > 0) {
      this.setState({currentdest:true});
    }
    else{
      this.setState({currentdest:false});
    }
    setTimeout(() => {this.setState({data:{currentimg:this.state.currentimg,currentdest:this.state.currentdest,sucursales:this.props.shopd,imagenes:this.props.data.imagenes,destacado:this.props.data.destacado,nombre:this.props.data.nombre,simbolo:this.props.data.simbolo,precio:this.props.data.precio,descripcion:this.props.data.descripcion,marca:this.props.data.marca,empresa:this.props.data.empresa},cargando:false,pdetalle:true});},200)
  }

  closemodaldet = () =>{
    this.setState({pdetalle:false});
  }
  
  closemodalfull = () =>{
    this.setState({full:false});
  }

  closemodalnew = () =>{
    this.setState({ crear: false})
    this.closemodal();
  }

  closemodalnew2 = () =>{
    this.setState({ crear: false})
  }

  closemodalload = () =>{
    this.setState({cargando:false});
  }

  sumar = (cantidad) => {
    var sum = cantidad * this.props.data.precio.toString();
    this.setState({ total: sum });
  }

  add = (user,prod,suc,cant,presp,code) => {
    this.closemodal();
    this.props.add({user:user,prod:prod,suc:suc,cant:cant,id_card:presp,code:code});
    ActionSheet.hide();
  }

  _renderImg ({item, index}, parallaxProps) {
    return (
      <TouchableOpacity onPress={() => this.setState({ full: true })}>
        <View style={globals.view_prod}> 
          <Image resizeMode={'cover'} style={globals.img_prod_c} source={{uri: item.URL_Imagen}}/> 
        </View>
      </TouchableOpacity>
    );
  }

  handleSnapToItem(index){
    this.setState({ activeSlide: index });
  }

  selectaction = async () => {
    this.setState({cargando:true});
    try {
      const id_shopping = await AsyncStorage.getItem('id_shopping');
      const name_shopping = await AsyncStorage.getItem('name_shopping');
      this.setState({ id_shopping: id_shopping });
      this.setState({ name_shopping: name_shopping });
      if (name_shopping != null) {
        ActionSheet.show(
          {
            options:[
              { text: <Text style={{color:'black'}}>{this.state.name_shopping.split('"')}</Text>, icon: "cart",iconColor:'black'},
              { text: <Text style={globals.title3}>Nuevo presupuesto</Text>, icon: "add",iconColor:globals.title3.color},
              { text: <Text style={globals.title3}>Añadir</Text>, icon: "open",iconColor:globals.title3.color},
              { text: <Text style={globals.title3}>Cancelar</Text>, icon: "close",iconColor:globals.title3.color}
            ],
          },
            buttonIndex => {this.actions(buttonIndex);}
        )
      }
      else{
        ActionSheet.show(
          {
             options:[
              { text: <Text style={globals.title3}>Nuevo presupuesto</Text>, icon: "add",iconColor:globals.title3.color},
              { text: <Text style={globals.title3}>Añadir</Text>, icon: "open",iconColor:globals.title3.color},
              { text: <Text style={globals.title3}>Cancelar</Text>, icon: "close",iconColor:globals.title3.color}
            ],
          },
          buttonIndex => {this.actions2(buttonIndex);}
        )
      }
    } 
    catch (error) {
      console.log(error)
      ActionSheet.show(
        {
          options:[
            { text: <Text style={globals.title3}>Nuevo presupuesto</Text>, icon: "add",iconColor:globals.title3.color},
            { text: <Text style={globals.title3}>Añadir</Text>, icon: "open",iconColor:globals.title3.color},
            { text: <Text style={globals.title3}>Cancelar</Text>, icon: "close",iconColor:globals.title3.color}
          ],
        },
        buttonIndex => {this.actions2(buttonIndex);}
      )
    }
    this.setState({cargando:false});
  }

  actions = (index) => {
    ActionSheet.hide();
    if (index == 0) {
      this.add(this.props.user,'1886','399',this.state.cantidad,this.state.id_shopping,this.props.code)
    }
    else if (index == 1)
    {
      this.setState({crear:true});
    }
    else if (index == 2)
    {
      if (undefined == this.props.budget) {
        this.setState({crear:true});
      }
      else{
        this.setState({cargando:true});
        setTimeout(() => {this.selectbudget();},200)
      }
    }
  }

  actions2 = (index) => {
    ActionSheet.hide();
    if (index == 0) {
      this.setState({crear:true});
    }
    else if (index == 1)
    {
      if (undefined == this.props.budget) {
        this.setState({crear:true});
      }
      else{
        this.setState({cargando:true});
        setTimeout(() => {this.selectbudget();},200)
      }
    }
  }

  selectbudget = () =>
  { 
    ActionSheet.show(
      {
        options: this.props.budget.map((data) => {return ({text: <Text onPress={()=>{this.add(this.props.user,'1886','399',this.state.cantidad,data.Cod_Presupuesto,this.props.code)}}>{data.N_Presupuesto}</Text>, icon: "cart"})}),
        title: <Text onPress={()=>{ActionSheet.hide();}} style={globals.title}>Mis presupuesto</Text>      
      },
      buttonIndex => {}
    )
    this.setState({cargando:false}); 
  }

	render() {
		return (
      <Container>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Content>
          <Dialog
            visible={this.props.openmodal}
            onTouchOutside={() => {
              this.closemodal();
            }} 
            onHardwareBackPress={() => {
              this.closemodal();
            }}
            width={0.9}
            rounded
            dialogTitle={
              <ListItem icon style={globals.view_title}>
                <Body>
                  <Text numberOfLines={1} style={globals.tex_title_m}>{this.props.data.nombre}</Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => {this.closemodal();}} style={globals.touch_title}>
                    <Icon name='md-close' style={globals.close_ico}/>
                  </TouchableOpacity>
                </Right>
              </ListItem>
            }
            dialogAnimation={new ScaleAnimation()}
          >
            <DialogContent>
              <ScrollView>
                <Grid style={{marginTop:10}}>
                  <Col>
                    <View style={globals.view_prod_c}>
                    <Text numberOfLines={1} style={globals.text}>{this.props.data.marca}</Text>
                    <Text numberOfLines={1} style={globals.text}>Unidad de medida</Text>
                    </View>
                     {this.props.data.imagenes != '' 
                      ?<View style={globals.view_prod_c}>
                        <Carousel
                          ref={ (c) => { this._carousel = c; } }
                          data={this.props.data.imagenes}
                          renderItem={this._renderImg.bind(this)}
                          onSnapToItem={this.handleSnapToItem.bind(this)}
                          hasParallaxImages={true}
                          sliderWidth={globals.fix_carusl.width}
                          itemWidth={globals.fix_carusl.width}
                          activeSlideAlignment={'center'}
                          onSnapToItem={(index) => this.setState({ pagination: index }) }
                        />
                        <Pagination
                          dotsLength={this.props.data.imagenes.length}
                          activeDotIndex={this.state.pagination}
                          containerStyle={{paddingVertical: 8}}
                          dotColor={globals.activeTintColor.color}
                          dotStyle={globals.pagination}
                          firstItem={1}
                          inactiveDotColor={globals.inactiveTintColor.color}
                          inactiveDotOpacity={0.4}
                          inactiveDotScale={0.6}
                        />
                       </View>
                      :<TouchableOpacity onPress={() => this.setState({ full: true })}>
                        <View style={globals.view_prod}>
                        <ProgressiveImage
                          thumbnailSource = {{uri: this.props.data.destacado}}
                          style = {globals.img_prod_c}
                          Content = {globals.img_prod_c}
                          resizeMode = "cover"
                        />
                        </View>
                       </TouchableOpacity>
                     }
                  </Col>
                  <Col>
                    <View style={[globals.view_prod_c,{marginTop:10}]}>
                      <Text numberOfLines={1} style ={globals.textprec}>{this.props.data.simbolo} {this.props.data.precio}</Text>
                      <Text numberOfLines={1} style ={globals.textotal}>{this.props.data.simbolo} {this.state.total}</Text>
                      <View style={globals.view_numeric}>
                        <NumericInput rounded 
                          initValue={this.state.cantidad}
                          value={this.state.cantidad} 
                          onChange={(cantidad) => this.setState({cantidad},this.sumar(cantidad))}  
                          minValue = {1}
                          valueType='real'
                          maxValue={9999}
                          totalWidth={130} 
                          totalHeight={50} 
                          inputStyle={globals.inputStyle}
                          iconStyle={globals.iconStyle}
                        />
                      </View>
                      <TouchableOpacity onPress={() => this.openmodaldet()}>
                        <Text numberOfLines={1} style={globals.det}>Detalles</Text>  
                      </TouchableOpacity>
                      <View style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Button style={globals.DialogButton} onPress={() => {this.selectaction(),this.props.fetchDataBudget(this.props.user);}}>
                          <Text>Agregar</Text>
                        </Button>
                      </View>  
                    </View>
                  </Col>
                </Grid>
              </ScrollView>
            </DialogContent>
          </Dialog>  
         <Load open={this.state.cargando} close={this.closemodalload.bind(this)}/>
         <Fullimg open={this.state.full} imagenes={this.props.data.imagenes} destacado={this.props.data.destacado} close={this.closemodalfull.bind(this)}/>
         <Detalles open={this.state.pdetalle} data={this.state.data} close={this.closemodaldet.bind(this)}/>
         <ModalBugetNew open={this.state.crear} user={this.props.data.user} code={this.props.code} prod={1886} suc={399} cant={this.state.cantidad} tipo={1} close={this.closemodalnew.bind(this)} close2={this.closemodalnew2.bind(this)}/>
        </Content>
      </Container>
		)
	}
}

const mapStateToProps = state => {
  return {
    budget: state.budget.item.data,
    main: state.main,
    shopd: state.shopd.item.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataBudget: (id) => {return dispatch(fetchDataBudget(id))},    
    fetchDataShopD: (id) => {return dispatch(fetchDataShopD(id))},
    add:(data) =>{return dispatch(addbudget(data))},
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ModalBuget))