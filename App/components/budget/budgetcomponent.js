import React, {Component} from 'react';
import {Image,FlatList,RefreshControl,Share,TouchableOpacity,Alert,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,Icon,View,H1,Text,Fab,Button,Col,Item,Grid} from 'native-base';
//Redux
import {fetchDataBudget} from '../../redux/actions/budgetaction';
import {fetchDataSuggestions} from '../../redux/actions/suggestionsaction';
import {destroybudget} from '../../redux/actions/mainaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import ProgressiveImage from '../general/progressiveimagecomponent';
import Orientation from 'react-native-orientation-locker';
import {withNavigation,StackActions,NavigationActions,NavigationEvents } from 'react-navigation';
//Estilos                      
import globals from "../../styles/globals";
//Extra
import ModalBugetNew from '../general/modalnewbugetcomponent';
//idioma
import I18n from '../../config/LanguageService';
    
class BudgetComponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      refreshing: false,
      crear:false,
      flat:{},
      user:null,
      empezar:true,
      cargando:true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });	
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this.verifiuser();
      }),
    ];
  }

  componentWillUnmount () {
    this.subs.forEach(sub => sub.remove());
  }

  componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.budget.item !== prevProps.budget.item) {
      if (this.props.budget.item.data){
        this.setState({cargando:false})
        this.setState({flat:this.props.budget.item.data})
      }
    }
  }

 /* componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.budget)
    if (prevProps.budget.success == true) {
      console.log(this.state.flat.length)
      console.log(prevProps.budget.item.data.length)
      if(prevProps.budget.item.data.length != this.state.flat.length)
      {
        console.log('si')
      }
    }
  }*/

  getInitialState() {    
    if (this.props.budget.item.data){ 
      this.setState({flat:this.props.budget.item.data})
    }
  }


  verifiuser = async () => {
    if (this.state.id_user !=  null) {
      this.props.fetchDataBudget(this.state.user);
    }
    else{
      try {
        const code = await AsyncStorage.getItem('code');
        const id_user = await AsyncStorage.getItem('id_user');
        if (id_user !== null & code !== null) {
          this.setState({user:id_user,code:code});
          this.props.fetchDataBudget(id_user);
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  destroybudget = (id,index) => {
    this.props.destroybudget({id:id,user:this.state.user,code:this.state.code});
    const newIds = this.state.flat.slice();
    newIds.splice(index,1);
    this.setState({flat:newIds})
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  closemodaldet = () =>{
    this.props.fetchDataBudget(this.state.user);
    this.getInitialState();
    this.setState({crear:false});
    this.props.navigation.navigate("Search");
  }

  closemodaldet2 = () =>{
    this.setState({crear:false});
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchDataBudget(this.state.user);
    if (this.props.budget.isFeching = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  onShare = async (N_Presupuesto) => {
    let message = I18n.t('global.sharei')+' '+N_Presupuesto+' '+I18n.t('global.sharel');
    try {
      const result = await Share.share({
       message:  message,
       url: 'http://bam.tech',
       title: I18n.t('global.sharetitle')
      }, {
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

  _renderItem(item,index){

    return(
      <View style={globals.containerbudget}>
        <View style={globals.viewbudget}>
          <Grid style={{margin:10}}>
          <Col>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Budget_det",{id_presupuesto:item.Cod_Presupuesto,code:this.state.code,user:this.state.user})}}>
              <Image  key = {item.Cod_Presupuesto} style={globals.imgbudget} source={require("../../src/general/buget.png")}/>
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
                  <Icon name="trash" style={globals.icobudget}/>
              </TouchableOpacity>
            </View>
          </Col>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("Budget_det",{id_presupuesto:item.Cod_Presupuesto,code:this.state.code,user:this.state.user})}}>
          <Col style={{alignItems:'flex-end'}}>
          <Text numberOfLines={1} style={[globals.textotal,{paddingTop:0}]} >{item.N_Presupuesto}</Text>
           {item.Fecha_Compra
                ?<Text numberOfLines={1} style={globals.text} >{item.Fecha_Compra}</Text>
                :<Text></Text>
              }
              {item.Monto_Total.C$
                ?<Text numberOfLines={1} style={[globals.textprec,{paddingTop:5}]} >{item.Monto_Total.C$.Moneda} {item.Monto_Total.C$.Monto}</Text>
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

  render(){

    if (!this.state.isConnected) {
     	return <OfflineNotice />;
    }
    if (this.state.cargando){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
   }
      
    return(
    	<Container  style={globals.body}>
    		<Content 
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={["#DE0001", "#85D848", "#009DC3"]}
            />
          }
        > 
         {this.state.flat.length > 0 
          ?<View style={[globals.contenttop,{marginBottom:70}]}>
            <H1 style={globals.title}>{I18n.t('budget.title')}</H1>
    	      <FlatList
    	        numColumns={1}
    	        renderItem={({item}) => this._renderItem(item)}
    	        data={this.state.flat}
              keyExtractor = { (item, index) => index.toString() }
    	      />
           </View>
          :<View style={{paddingTop:'20%',alignItems: 'center'}}>
            <Image style={globals.errorimg} resizeMode="contain" source={require("../../src/general/add.png")} />
            <Button rounded style={globals.button_login} onPress={() => this.setState({ crear: true})}><Text style={{textAlign: 'center'}}>{I18n.t('budget.bempty')}</Text></Button>
           </View>
         }
        
         <ModalBugetNew open={this.state.crear} close={this.closemodaldet.bind(this)} close2={this.closemodaldet2.bind(this)} user={this.state.user} code={this.state.code} tipo={2}/>

        </Content> 

        {this.state.flat.length > 0    
          ?<Fab
            direction="up"
            style={globals.iconew}
            position="bottomRight"
            onPress={() => this.setState({ crear: true})}>
            <Icon ios='ios-add' android="md-add"/>
           </Fab>
           :null
        }
    	</Container>
    ) 
  }
}

const mapStateToProps = state => {
  return {budget: state.budget,suggestions: state.suggestions}
}

const mapDispatchToProps = dispatch => {
  return {
    	fetchDataBudget: (id) => {return dispatch(fetchDataBudget(id))},
      fetchDataSuggestions: (id) => {return dispatch(fetchDataSuggestions(id))},
      destroybudget:(data) =>{return dispatch(destroybudget(data))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BudgetComponent))