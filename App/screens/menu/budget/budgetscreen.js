import React, {Component} from 'react';
import {Share,FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,Alert,Picker} from 'react-native';
import {Button,Icon,H1,Fab,Col,Item,Grid,Text,View,ActionSheet,Right} from 'native-base';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Modalcartnew from '../../../components/shoppingcart/modalnewcartcomponent';
//Redux
import {fetchDataBudget} from '../../../redux/actions/budgetaction';
import {destroybudget} from '../../../redux/actions/mainaction';
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

const ICON_PLUS_BASE64 = 'https://ibb.co/gDhQ554'

function filter1(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function filter2(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

class Budget extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      data: [], 
      user:'',
      token:'',
      loader:true,
      languaje:'',
      newmodalbug:false,
      datamodal:[],
      openfix:false,
      selected: "1"
    };
  }

   onValueChange(value: string) {
    if (this._isMounted){
      if (value == '2') {
        var dataold = this.props.budget.item.data;
        this.setState({data: dataold.sort(filter1("Cod_Presupuesto"))});
      }
      else if (value == '3') {
        var dataold = this.props.budget.item.data;
        this.setState({data: dataold.sort(filter2("Cod_Presupuesto"))});
      }
      this.setState({selected: value});
    }
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

  componentDidMount() {
    this._isMounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
         this.verifiuser();
      }),
    ];
  } 

  componentWillUnmount() {
    this._isMounted = false;
    this.subs.forEach(sub => sub.remove());
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillMount(){ 
    this.verifiuser();
  }

  async verifiuser() { 
    const settings = await loadSettings();
    if (settings !== null) {
      if (settings.languaje !== null){
        I18n.locale = settings.languaje
      }
      this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
      this.props.fetchDataBudget(settings.user);
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.budget.isFeching == false) {
      if(newProps.budget.item.data !== this.props.budget.item.data){
        this.setState({data: newProps.budget.item.data,loader:false});
      }
      else if (newProps.budget.isFeching == false) {
        this.setState({loader:false});
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    if (this._isMounted){
      this.setState({isConnected });
    }
  }

  destroybudget = (id,index) => {
    if (this._isMounted){
      this.props.destroybudget({id:id,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
      const newIds = this.state.data.slice();
      newIds.splice(index,1);
      this.setState({data:newIds})
    }
  }

  _onRefresh = () => {
    if (this._isMounted){
      this.setState({refreshing: true,loader:true});
      this.props.fetchDataBudget(this.state.user);
      if (this.state.loader = true) {
        this.setState({refreshing: false})
      }
      else{
        this.setState({refreshing: true})
      }
    }
  }

  _renderBudget(item,index){
    return(
      <View style={globals.containerbudget}>
        <View style={globals.viewbudget}>
          <Grid style={{margin:10}}>
            <Col>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate("Budget_det",{name_shopping:item.N_Presupuesto,id_budget:item.Cod_Presupuesto,token:this.state.token,user:this.state.user,languaje:this.state.languaje})}}>
                <Image  key = {item.Cod_Presupuesto} style={globals.imgbudget} source={require("../../../src/general/buget.png")}/>
              </TouchableOpacity> 
              <View style={globals.viewico}>
                <TouchableOpacity 
                    onPress={()=>{this.onShare(item.N_Presupuesto)}}>
                    <Icon name="ios-share-alt" style={globals.icoshare}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{
                      Alert.alert(
                          I18n.t('budget.mdelete'),
                          item.N_Presupuesto,
                          [
                            {text: I18n.t('global.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: I18n.t('global.delete'), onPress: () => this.destroybudget(item.Cod_Presupuesto,index), style: 'destructive'},
                          ],
                          { cancelable: false }
                      )
                    }}>
                    <Icon name="trash" style={globals.icoshare}/>
                </TouchableOpacity>
              </View>
            </Col>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Budget_det",{name_shopping:item.N_Presupuesto,id_budget:item.Cod_Presupuesto,token:this.state.token,user:this.state.user,languaje:this.state.languaje})}}>
            <Col style={{alignItems:'flex-end'}}>
            <Text numberOfLines={1} style={[globals.textotal,{paddingTop:0}]} >{item.N_Presupuesto}</Text>
             {item.Fecha_Compra
                  ?<Text numberOfLines={1} style={globals.text} >{item.Fecha_Compra}</Text>
                  :<Text></Text>
                }
                {item.Monto_Total.C$
                  ?<Text numberOfLines={1} style={[globals.textprec,{paddingTop:5,width:'100%'}]} >{item.Monto_Total.C$.Moneda} {item.Monto_Total.C$.Monto.toFixed(2)}</Text>
                  :<Text style={[globals.textprec,{paddingTop:5}]}></Text>
                }
                {item.Total_Productos
                  ?<Text numberOfLines={1} style={globals.text} >U {item.Total_Productos}</Text>
                  :<Text></Text>
                }
            </Col>
            </TouchableOpacity>
          </Grid>
        </View>
      </View>
    )
  }

  onShare = async (N_Presupuesto) => {
    let message = I18n.t('global.sharei')+' '+N_Presupuesto+' '+I18n.t('global.sharel');
    try {
      const result = await Share.share({
       message:message + ICON_PLUS_BASE64,
       url: message + ICON_PLUS_BASE64,
       title: I18n.t('global.sharetitle')
      }, 
      {
        type: 'image/png',
        // Android only:
        dialogTitle: I18n.t('global.sharetitledialog'),
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      });
    } catch (error) {
      alert(error.message);
    }
  };

  openmodal = () => {
    if (this._isMounted){
      this.setState({datamodal:{languaje:this.state.languaje,user:this.state.user,token:this.state.token},newmodalbug:true,openfix:true})
    }
  }

  closemodal = () =>{
    if (this._isMounted){
      this.setState({newmodalbug:false,openfix:false})
    }
  }

  closemodal2 = async () => {
    if (this._isMounted) {
      try {
        await this.setState({newmodalbug:false,openfix:false})
        await this.props.navigation.navigate("Search");
      }
      catch (error) {
      }
    }
  }

  _rendermodal(modal){
    if (modal == false) {
      return null
    }
    else{
      return <Modalcartnew newmodal2={this.state.newmodalbug} data={this.state.datamodal} closemodal={this.closemodal.bind(this)} closemodal2={this.closemodal2.bind(this)}/>
    }
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice/>;
    } 

    if (this.state.loader == true & this.state.refreshing == false){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    return(
      <View style={globals.body}>
        {this.state.data && this.state.data.length 
           ?<View style={globals.contenttop}>
            <FlatList
              data={this.state.data}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
                />
              }
              numColumns={1}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => (
                {length: globals.img_row.height, offset: globals.img_row.height * index, index}
              )}
              renderItem={({item}) => this._renderBudget(item)}
              initialNumToRender={9}
              ListHeaderComponent={ 
                <View>
                  <H1 style={globals.title}>{I18n.t('budget.title')}</H1>
                  <View style={{alignItems:'flex-end',marginRight:10}}>
                    <Picker
                    selectedValue={this.state.selected}
                    style={{height: 50, width: 150}}
                    onValueChange={this.onValueChange.bind(this)}
                    itemStyle={globals.title}
                    >
                    <Picker.Item label={I18n.t('global.filter')} value="1" />
                    <Picker.Item label={I18n.t('global.filter1')} value="2" />
                    <Picker.Item label={I18n.t('global.filter2')} value="3" />
                  </Picker>
                </View>
                </View>
              }
              ListFooterComponent={ <View style={{paddingBottom: 60}} /> }
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
           :<View style={{paddingTop:'20%',alignItems: 'center'}}>
              <Image style={globals.errorimg} resizeMode="contain" source={require("../../../src/general/add.png")} />
              <Button rounded style={globals.button_login} onPress={() => this.openmodal()}><Text style={{textAlign: 'center'}}>{I18n.t('budget.bempty')}</Text></Button>
            </View>
        }
        {this.state.data && this.state.data.length   
          ?<Fab
            direction="up"
            style={globals.iconew}
            position="bottomRight"
            onPress={() => this.openmodal()}>
            <Icon ios='ios-add' android="md-add"/>
           </Fab>
          :null
        }
        {this._rendermodal(this.state.openfix)}
        
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {budget: state.budget,
    //suggestions: state.suggestions
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchDataBudget: (id) => {return dispatch(fetchDataBudget(id))},
      //fetchDataSuggestions: (id) => {return dispatch(fetchDataSuggestions(id))},
      destroybudget:(data) =>{return dispatch(destroybudget(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)