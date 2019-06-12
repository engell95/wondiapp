import React, {Component} from 'react';
import {Image,FlatList,RefreshControl,Alert,TouchableOpacity,NetInfo} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,View,Text,Button,Icon,Thumbnail,Right,Item,Input,DatePicker,Grid,Col,SwipeRow,Fab} from 'native-base';
//Redux
import {fetchDataBudgetDet} from '../../redux/actions/dbudgetaction';
import {delbudget,destroybudget,editbudget,amountbudget} from '../../redux/actions/mainaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import ProgressiveImage from '../general/progressiveimagecomponent';
import Orientation from 'react-native-orientation-locker';
import {withNavigation} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//Component_Extra
import NumericInput from 'react-native-numeric-input'
//idioma
import I18n from '../../config/LanguageService';

class BudgetDetComponent extends Component {

	constructor(props) {
    super(props)
    this.state = { 
    	fecha: '',
    	isConnected: true,
      refreshing: false,
      presupuesto: '',
      id:'',
      code:'',
      user:'',
      color:  globals.focus.notfocus,
      fix: '',
      cantidad:0,
      nameError:null,
      datos:{data:[]},
      flat:{productos:[]},
      active: false
    }
    this.component = [];
    this.selectedRow;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
    const {navigation} = this.props;
    const id = navigation.getParam('id_presupuesto', 'NO-DATA');
    const user = navigation.getParam('user', 'NO-DATA');
    const code = navigation.getParam('code', 'NO-DATA');
    this.setState({id:id,user:user,code:code});
    this.props.fetchDataBudgetDet(id);
    setInterval (() =>{this.updateset()}, 60000);//Actualiza automatico cada minuto 
  }

  componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    AsyncStorage.setItem('id_shopping', this.state.user); //para agregar a acceso carrito      
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.budgetd.item.data !== this.props.budgetd.item.data)
    {
      this.getInitialState();
    }
  }

  getInitialState() {    
    if (this.props.budgetd.item.data) {
      this.setState({flat:this.props.budgetd.item.data,presupuesto:this.props.budgetd.item.data.N_Presupuesto,fix:this.props.budgetd.item.data.Fecha_Compra})
      AsyncStorage.setItem('id_shopping', this.state.id);
      AsyncStorage.setItem('name_shopping', this.props.budgetd.item.data.N_Presupuesto);
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  setDate(date) {
    this.setState({ fecha: new Date(date) ,fix:''});
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchDataBudgetDet(this.state.id);
    if (this.props.budgetd.isFeching = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  delete = (prod,suc,index) => {
    this.props.delete({prod:prod,suc:suc,id_card:this.state.id,user:this.state.user,code:this.state.code});
    //const objIndex = this.state.flat.productos.findIndex(obj => obj.Cod_Producto === prod);
    const newIds = this.state.flat.productos.slice();
    //newIds.splice(objIndex,1);
    newIds.splice(index,1);
    console.log(newIds)    
    this.setState({flat:{productos:newIds}})
  }

  update = (newcantidad,oldcantidad,prod,suc) =>{
    const objIndex = this.state.datos.data.findIndex(obj => obj.prod === prod);
    if (objIndex != -1) {
      const newIds = this.state.datos.data.slice()
      if (newcantidad != oldcantidad) {
        newIds[objIndex] = {prod:prod,cant:newcantidad};
      }
      else{
        newIds.splice(objIndex,1);
      }
      this.setState({datos: {data:newIds}})
    }
    else{
      this.setState({ datos: {data:  this.state.datos.data.concat([{prod:prod,cant:newcantidad,suc:suc}])}})
    }
  }

  updateset = () =>{
    this.state.datos.data.map((item) =>{
      this.props.amountbudget({suc:item.suc,prod:item.prod,cant:item.cant,id:this.state.id,user:this.state.user,code:this.state.code});
    })
    this.setState({datos: {data:[]}})
  }

  _renderItem(item,index){
	  return( 
	    <View style={globals.body}>
        <SwipeRow
          ref={(c) => { this.component[index] = c }}
          leftOpenValue={globals.leftOpenValue.width}
          rightOpenValue={globals.rightOpenValue.width}
          style={globals.body}
          onRowOpen={() => {
            if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
              this.selectedRow = this.component[index]
            }
          }
          left={
            <View style={globals.view_slide}>
              <Button rounded onPress={() => this.props.navigation.navigate("Result",{search:item.N_Producto})} style={globals.slide_s}>
                <Text style={globals.searchtext}>Buscar</Text>
                <Icon active name="ios-search"/>
              </Button>
            </View>
          }
          body={
            <View style={globals.view_slide2}>
              <Grid>
                <Col>
                  {item.Imagen_Destacada.length > 0
                    ? <ProgressiveImage
                        thumbnailSource = {{uri: item.Imagen_Destacada.URL_Imagen}}
                        style={globals.img_swipe}
                        Content={globals.view_swipe}
                        resizeMode="cover"
                      />
                    :<ProgressiveImage
                        thumbnailSource = {{uri: item.Logo_empresa.Logo}}
                        style={globals.img_swipe}
                        Content={globals.view_swipe}
                        resizeMode="cover"
                      />
                  }
                </Col>
                <Col>
                  <Text numberOfLines={2} style={globals.text}>{item.N_Producto}</Text>
                  <Text numberOfLines={1} style={globals.text}>{item.Marca.N_Marca}</Text>
                  <Text numberOfLines={1} style={globals.text}>{item.Precio.moneda.Simbolo} {item.Precio.Precio_Unitario}</Text>
                </Col>
                <Col>
                  <Right style={{marginBottom:5}}>
                    <Thumbnail style={globals.Thumbnail} source={{uri: item.Logo_empresa.Logo}}/>
                    <NumericInput rounded 
                      initValue={Math.floor(item.pivot.Cantidad)}
                      value={this.state.cantidad} 
                      onChange={(cantidad) => {this.setState({cantidad});this.update(cantidad,item.pivot.Cantidad,item.Cod_Producto,item.pivot.Cod_Sucursal)}}  
                      minValue = {1}
                      maxValue={9999}
                      inputStyle={globals.inputStyle}
                      iconStyle={globals.iconStyle}
                    />
                  </Right>
                </Col>
              </Grid>
            </View>             
          }
          right={
            <View style={globals.view_slide}>
              {index == 0
                ?<Button rounded 
                  onPress={()=>{
                    Alert.alert(
                      I18n.t('budget.mdelete'),
                      item.N_Producto,
                      [
                        {text: I18n.t('global.cancel'), onPress: () => this.component[index]._root.closeRow(), style: 'cancel'},
                        {text: I18n.t('global.delete'), onPress: () => this.delete(item.Cod_Producto,item.Precio.Cod_Sucursal,index), style: 'destructive'},
                      ],
                        { cancelable: false }
                    )
                  }}
                  style={globals.slide_d}
                 >
                  <Icon active name="trash" />
                  <Text>{I18n.t('global.delete')}</Text>
                 </Button>
                :<Button rounded 
                  onPress={()=>{
                    Alert.alert(
                      I18n.t('budget.mdelete'),
                      item.N_Producto,
                      [
                        {text: I18n.t('global.cancel'), onPress: () => this.component[index]._root.closeRow(), style: 'cancel'},
                        {text: I18n.t('global.delete'), onPress: () => {this.delete(item.Cod_Producto,item.Precio.Cod_Sucursal,index),this.component[index]._root.closeRow()}, style: 'destructive'},
                      ],
                        { cancelable: false }
                    )
                  }}
                  style={globals.slide_d}
                 >
                  <Icon active name="trash" />
                  <Text>{I18n.t('global.delete')}</Text>
                 </Button>
              }  
            </View>
          }
        />
	   	</View>
	  )
  }

  destroybudget = () => {
    this.props.destroybudget({id:this.state.id,user:this.state.user,code:this.state.code});
    this.props.navigation.goBack();
  }

  add = () => {
    //guardandolo como variable global
    AsyncStorage.setItem('id_shopping', this.state.id);
    AsyncStorage.setItem('name_shopping', this.state.presupuesto);
    this.props.navigation.navigate("Search");
    this.setState({ active: false})
  }

  validate(){
	  if (this.state.presupuesto.trim() == '') {
			this.setState(() => ({ nameError: I18n.t('validate.name1')}));
			this.setState({color:'red'});
	  } 
    else {
	    if (this.state.presupuesto.length <= 3) {
        console.log('si')
	      this.setState(() => ({ nameError: I18n.t('validate.name12')}));
	      this.setState({color:'red'});
      } 
      else{
      	if (this.state.fix != '') 
      	{
      		var datefor = this.state.fix.split("/");
      		var date = datefor[2]+"-"+datefor[1]+"-"+datefor[0];
      	}
        else
      	{
      		var date =this.state.fecha.getFullYear()+"-"+this.state.fecha.getMonth()+1+"-"+this.state.fecha.getDate();	
      	}
        this.setState({ active: false})
        this.props.editbudget({name:this.state.presupuesto,date:date,id:this.state.id,user:this.state.user,code:this.state.code});
        this.updateset()
      	}	
    	}
      this.setState(() => ({ nameError: null}));
  	}

    onFocus() {
      this.setState({
          color: globals.focus.color
      });
    }

    onBlur() {
      this.setState({
          color: globals.focus.notfocus
      });
    }

  render(){
  	if (!this.state.isConnected) {
     	return <OfflineNotice />;
    }
    if (this.props.budgetd.isFeching){
    	return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }
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
			    <View style={globals.cont_budget}>
			      <Item  style={{borderColor:this.state.color}}>
    						<Input 
                  Placeholder = {I18n.t('input.ipname')}
    						  value ={this.state.presupuesto} 
    							onChangeText={(text) => this.setState({ presupuesto: text })}
    							style={{paddingLeft:0}}
    							onFocus={ () => this.onFocus() } onBlur={ () => this.onBlur() }
    						/>
                <TouchableOpacity onPress={()=>{
                    Alert.alert(
                      I18n.t('budget.mdelete'),
                      this.state.presupuesto,
                      [
                        {text: I18n.t('global.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: I18n.t('global.delete'), onPress: () => this.destroybudget(), style: 'destructive'},
                      ],
                      { cancelable: false }
                    )
                  }}
                >
  	        		 <Icon name='trash' style={globals.ico_deleteb}/>
                </TouchableOpacity>
						</Item>
            {!!this.state.nameError && (
              <Text style={{color: 'red'}}>{this.state.nameError}</Text>
            )}
						<Item style={{marginTop:10}}>
				      <Icon active name='md-calendar' />
				      <DatePicker
		          	locale={"en"}
		          	timeZoneOffsetInMinutes={undefined}
		          	modalTransparent={true}
		          	animationType={"fade"}
		          	androidMode={"default"}
		          	placeHolderText={this.state.fix}
		          	textStyle={globals.input_date}
		            placeHolderTextStyle={globals.place_date}
		            onDateChange={(date) => this.setDate(date)}
		            style={{width:150}}
	          	/>
          	</Item>
          </View>        
          {this.state.flat.productos.length > 0
          	?<View style={{marginBottom:70}}>
              <FlatList
        				data={this.state.flat.productos}
        				renderItem={({item,index}) => this._renderItem(item,index)}
        				keyExtractor={(item, index) => index.toString()}
        			 />
             </View>
          	:<View>
                <View style={globals.center}>
          		    <Image style={globals.errorimg} resizeMode="contain" source={require("../../src/general/add.png")} />
          		  </View>
                <Button rounded style={globals.button_login} onPress={() => this.props.navigation.navigate("Search")}><Text style={[globals.center]}>{I18n.t('budget.bempty2')}</Text></Button>
             </View>
          }	
		    </Content>
        {this.state.flat.productos.length > 0
        ? <Fab
            active={this.state.active}
            direction="up"
            style={globals.icomore}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-more" />
            <Button style={globals.iconew} onPress={()=> {this.validate()}}>
              <Icon type="FontAwesome" name="save" />
            </Button>
            <Button style={globals.icoadd} onPress={()=> {this.add()}}>
              <Icon ios='ios-add' android="md-add"/>
            </Button>
         </Fab>
         :null
       }
		  </Container>
    )
  }
}

const mapStateToProps = state => {
  return {budgetd: state.budgetd}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataBudgetDet: (id) => {return dispatch(fetchDataBudgetDet(id))},
    delete:(data) =>{return dispatch(delbudget(data))},
    destroybudget:(data) =>{return dispatch(destroybudget(data))},
    editbudget:(data) =>{return dispatch(editbudget(data))},
    amountbudget:(data) =>{return dispatch(amountbudget(data))}
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BudgetDetComponent))