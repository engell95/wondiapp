import React, {PureComponent} from 'react';
import {ScrollView,Share,FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,Alert,Picker,StyleSheet,View,WebView,ActivityIndicator} from 'react-native';
import {Block, Button,Input,NavBar,Icon,Card,theme,Text} from 'galio-framework';
import design from '@config/style/Style';
import {loadSettings} from '@config/SettingsStorage';
import Load from '@components/general/LoaderComponent';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import Modalcartnew from '@components/shoppingcart/modalnewcartcomponent';
import Swipeable from '@components/general/SwipeableComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchDataBudget} from '@redux/actions/BudgetAction';
import {destroybudget} from '@redux/actions/MainAction';
import {connect} from 'react-redux';

const fondo   = require('@assets/img/fondo.png');
const carga   = require('@assets/img/carga.png');
const logo    = require('@assets/img/logo3.png');
const sharei  = require('@assets/img/iconos/share.png');
const deletei = require('@assets/img/iconos/basura.png');
const presui  = [
  require('@assets/img/iconos/Writing.png'),
  require('@assets/img/iconos/Baby.png'),
  require('@assets/img/iconos/Box.png'),
  require('@assets/img/iconos/Car.png'),
  require('@assets/img/iconos/Cashier.png'),
  require('@assets/img/iconos/Credit_Cart.png'),
  require('@assets/img/iconos/Gift_2.png'),
  require('@assets/img/iconos/Gift.png'),
  require('@assets/img/iconos/Groceries.png'),
  require('@assets/img/iconos/Porcent.png'),
  require('@assets/img/iconos/Saving.png'),
  require('@assets/img/iconos/Serving_Dish.png'),
  require('@assets/img/iconos/Shopping.png'),
  require('@assets/img/iconos/Tools.png'),
  require('@assets/img/iconos/Wallet.png')
];

const ICON_PLUS_BASE64 = 'https://ibb.co/gDhQ554'

class Budget extends PureComponent {

  swipeable = null;

  //inicializar variables
  constructor(props) {super(props)
    this.state = {
      refreshing: false,
      languaje:'',
      user:'',
      token:'',
      notif:'',
      currentlyOpenSwipeable: null,
      newmodalbug:false
    };
  }

  //ciclos de vida
  componentWillMount(){this.verifiuser();}

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this.verifiuser();
      }),
    ];
  }

  componentWillUnmount() {this.subs.forEach(sub => sub.remove());}

  componentWillReceiveProps(newProps){
    if(newProps.budget.item.data !== this.props.budget.item.data){
      this.setState({data: newProps.budget.item.data});
    }
  }

  //verificando datos del usuario y llamando apis
  async verifiuser(){ 
    try{
      const settings = await loadSettings();
      if (settings !== null) {
        if (settings.user !== null & settings.token !== null){
          this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
          this.props.fetchDataBudget(settings.user);
        }
      }
    }
    catch(error) {
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
  }

  //refrescando apis
  async _onRefresh() {
    try{
      this.props.fetchDataBudget(this.state.user);
    }
    catch(error) {
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
    finally{
      this.setState( { refreshing: false } );
    }
  }  

  //eliminar presupuesto
  destroybudget = (id,index) => {
    this.props.destroybudget({id:id,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
    const newIds = this.state.data.slice();
    newIds.splice(index,1);
    this.setState({data:newIds})
    this.swipeable.recenter();
    this.state.currentlyOpenSwipeable.recenter();
  }

  //compartir presupuesto
  onShare = async (N_Presupuesto,und) => {
    let message = 'Hola mira todo lo que puedes ahorrar con esta app mi presupuesto'+' '+N_Presupuesto+' '+'tiene mas de'+' '+und+' '+'productos con muchos ahorros no esperes mas descarga la app en en Google Play';
    try {
      const result = await Share.share({
       message:message + ICON_PLUS_BASE64,
       url: message + ICON_PLUS_BASE64,
       title: "Ahorremos enserio"
      }, 
      {
        type: 'image/png',
        // Android only:
        dialogTitle: "Comparte tu ahorro",
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      });
    } catch (error) {0
      alert(error.message);
    }
    this.swipeable.recenter();
    this.state.currentlyOpenSwipeable.recenter();
  };

  //funcion Swipeable
  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  imgnum(index){
    if (index > 16) {
      return presui[1]
    }
    else{
      return presui[index]
    }
  }

  handleUserBeganScrollingParentView() {this.swipeable.recenter();}

  //funcion video de la app
  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1) 
    {
      return true;
    } else {
      this.videoPlayer.stopLoading();
      return false;
    }    
  }

  //diseño de los item de prespuesto
  renderBudget(item,index,itemProps){
    return( 
      <Block style={{marginBottom:20}} key={index}>
        <Swipeable
          key={index}
          onRef={ref => this.swipeable = ref}
          leftButtons={[
            <TouchableOpacity 
              key={index}
              onPress={()=>{
                Alert.alert(
                  '¿Estas seguro de borrar el presupuesto?',
                  item.N_Presupuesto,
                  [
                    {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Eiminar', onPress: () => this.destroybudget(item.Cod_Presupuesto,index), style: 'destructive'},
                  ],
                  { cancelable: false }
                )
              }} 
              style={design.style.leftSwipeItem}
            >
              <Image
                key={index}
                style={design.style.iconleftswipe}
                source={deletei}
              />
            </TouchableOpacity>
          ]}
          rightButtons={[
            <TouchableOpacity key={index} onPress={()=>{this.onShare(item.N_Presupuesto,item.Total_Productos)}} style={design.style.rightSwipeItem}>
              <Image
                key={index}
                style={design.style.iconrightswipe}
                source={sharei}
              />
            </TouchableOpacity>
          ]}
          onRightButtonsOpenRelease={itemProps.onOpen}
          onRightButtonsCloseRelease={itemProps.onClose}
          onLeftButtonsOpenRelease={itemProps.onOpen}
          onLeftButtonsCloseRelease={itemProps.onClose}
          swipeStartMinLeftEdgeClearance={10}
          swipeStartMinRightEdgeClearance={10}
          onSwipeStart={()   => this.setState({isSwiping: true})}
          onSwipeRelease={() => this.setState({isSwiping: false})}
        >
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("Budget_det",{name_shopping:item.N_Presupuesto,id_budget:item.Cod_Presupuesto,token:this.state.token,user:this.state.user,languaje:this.state.languaje})}}>
            <Block key={index} style={design.style.cardbugdet}>
              <Block center style={design.style.part1}>
                <Image
                  style={design.style.partimg}
                  source={this.imgnum(index)}
                />
              </Block>
              <Block style={design.style.part3}>
                <Text color={design.theme.COLORS.BLACK} h4 style={design.style.textpop2}>
                 {item.N_Presupuesto}
                </Text>
                <Text color={design.theme.COLORS.MUTED} h5 style={design.style.textpop2}>
                 {item.Total_Productos} artículos en lista
                </Text>
                {item.Monto_Total.C$ && item.Monto_Total.U$
                  ?<Block style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                     <Text color={design.theme.COLORS.MUTED} h5 style={design.style.textpop2}>{item.Monto_Total.C$.Moneda} {item.Monto_Total.C$.Monto.toFixed(2)}</Text>
                     <Text color={design.theme.COLORS.MUTED} h5 style={design.style.textpop2}>{item.Monto_Total.U$.Moneda} {item.Monto_Total.U$.Monto.toFixed(2)}</Text>
                   </Block>
                  :(item.Monto_Total.C$
                    ?<Text color={design.theme.COLORS.MUTED} h5 style={design.style.textpop2}>{item.Monto_Total.C$.Moneda} {item.Monto_Total.C$.Monto.toFixed(2)}</Text>
                    :(item.Monto_Total.U$
                      ?<Text color={design.theme.COLORS.MUTED} h5 style={design.style.textpop2}>{item.Monto_Total.U$.Moneda} {item.Monto_Total.U$.Monto.toFixed(2)}</Text>
                      :null
                    )
                  )
                }
              </Block>
              <Block style={design.style.part2}>
                <TouchableOpacity  onPress={() => {this.props.navigation.navigate("Budget_det",{name_shopping:item.N_Presupuesto,id_budget:item.Cod_Presupuesto,token:this.state.token,user:this.state.user,languaje:this.state.languaje})}}>
                  <Icon name="angle-right" family="font-awesome" color={design.theme.COLORS.MUTED} size={40} />
                </TouchableOpacity>
              </Block>
            </Block>
          </TouchableOpacity>
        </Swipeable>
      </Block>
    )
  }

  //demostracion de la app
  renderError() {
    return (
      <Block flex center>
        <Block flex middle>
          <Text>Ups. a ocurrido un error</Text>
        </Block>
      </Block>
    );
  }

  renderLoadingView() {
    return (
      <Block flex center>
        <Block flex middle>
          <ActivityIndicator size="large" color="#0000ff"/>
        </Block>
      </Block>
    );
  }

  closemodal = () =>{ this.setState({newmodalbug:false})}

  closemodalupdate = () =>{
    this.props.fetchDataBudget(this.state.user);
    this.setState({newmodalbug:false})
  }

  async closemodal2(){
    try {
      await this.setState({newmodalbug:false})
      await this.props.navigation.navigate("Search");
    }
    catch(error) {
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
  }

  openmodal = () => {
    this.setState({datamodal:{languaje:this.state.languaje,user:this.state.user,token:this.state.token},newmodalbug:true})
  }

  rendermodal(active){
    if (active == true) {
      return <Modalcartnew newmodal2={active} data={this.state.datamodal} closemodalupdate={this.closemodalupdate.bind(this)} closemodal={this.closemodal.bind(this)} closemodal2={this.closemodal2.bind(this)}/> 
    }
    else{
      return null
    }
  }

  render() {

    const {currentlyOpenSwipeable} = this.state;

    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }
        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    if (this.props.budget.isFeching) {
      return <Load/>
    }

    return(
      <Block style={{flex: 1}}> 
        {this.rendermodal(this.state.newmodalbug)}
        {this.state.data && this.state.data.length 
          ?<FlatList
            style={design.style.containerb}
            scrollEnabled={!this.state.isSwiping}
            data={this.state.data}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
              />
            }
            ListHeaderComponent={<Text h4 style={design.style.topbudget}>Mis presupuestos</Text>}
            numColumns={1}
            renderItem={({item, index}) => this.renderBudget(item,index,itemProps)}
            initialNumToRender={9}
            keyExtractor={(item,index)=>index.toString()}
          /> 
          :<ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
              />
            }
           >
            <Block center style={design.style.videoconten}>
              <Block  flex>
                <WebView 
                  ref={(ref) => { this.videoPlayer = ref;}}
                  scalesPageToFit={true} 
                  source={{ html: '<html><iframe width="'+design.width * 0.9+'" height="'+design.height /2.5+'" src="https://www.youtube.com/embed/lqyEfqwGCMI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></html>'}} 
                  onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                  onNavigationStateChange ={this.onShouldStartLoadWithRequest} //for Android
                  renderLoading={this.renderLoadingView}
                  renderError={this.renderError}
                  style={{width:design.width * 0.9,height:design.height /2.5}}
                />
              </Block>
            </Block>
          </ScrollView>
        }
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.openmodal()}
          style={design.style.pushfloating}
        >
          <Image
            source={require('@assets/img/iconos/Writing.png')}
            style={design.style.floatingButton}
          />
        </TouchableOpacity>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {budget: state.budget}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataBudget: (id) => {return dispatch(fetchDataBudget(id))},
    destroybudget:(data) =>{return dispatch(destroybudget(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)