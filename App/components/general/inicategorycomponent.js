import React, {Component} from 'react'
import {Image,RefreshControl,StatusBar,NetInfo} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//import NetInfo from "@react-native-community/netinfo";
import {Content,Container,View,H3,Text} from 'native-base';
//Redux
import {fetchDataCategory} from '../../redux/actions/categoryaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from './offlinecomponent'
import Load from './loadcomponent';
import ProgressiveImage from './progressiveimagecomponent';
import Orientation from 'react-native-orientation-locker';
import {StackActions, NavigationActions,withNavigation} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//Extra
import ReactNativeItemSelect from 'react-native-item-select';

const resetAction = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});

const Welcome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
});

class IniCategoryComponent extends Component {

	constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      user: null
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.verifiuser();
  }

   verifiuser = async () => {
    try {
      const id_user = await AsyncStorage.getItem('id_user');
      //console.log(id_user);
      if (id_user !== null) {
        this.setState({user:id_user});
        this.props.fetchDataCategory();
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchDataCategory();
    if (this.props.category.isFeching = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  } 

  _renderItem(item){
    const placeholderColor = this.props
    return(
      <View style={{paddingBottom:10}}>
         <ProgressiveImage
          thumbnailSource = {{uri: item.Icono}}
          style = {globals.img_row}
          Content = {globals.img_rowc}
          resizeMode="cover"
        />
        <Text numberOfLines={2} style={[globals.texttitle,{fontSize:16}]}>{item.N_Cat_Empresa}</Text>
      </View>   
    )
  }

  _storeData2 = async () => {
    /*try {
      await AsyncStorage.setItem('install', '1');
    } catch (error) {
      // Error saving data
    }*/
    this.props.navigation.dispatch(resetAction);
  }

  render(){
	  
    if (!this.state.isConnected) {
	    return <OfflineNotice />;
	  }

	  if (this.props.category.isFeching){
	    return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
	  }

	  return(
	    <Container  style={globals.body}>
	    	<StatusBar backgroundColor = {globals.focus.color}/>
	    	<Content
          refreshControl={
			      <RefreshControl
			        refreshing = {this.state.refreshing}
			        onRefresh={this._onRefresh.bind(this)}
              colors={["#DE0001", "#85D848", "#009DC3"]}
			      />
          }
        > 
         {!!this.props.category.item.data && (
          <View style={{marginTop:20}}> 
            <H3 style={globals.title}>Ayúdanos a mostrarte lo que te interesa</H3>
            <Text style={[globals.text,{textAlign: 'center',marginBottom:10,marginTop:5,fontSize:18}]}>Selecciona las categorías de tu preferencia</Text>
            
              <ReactNativeItemSelect
                data={this.props.category.item.data}
                itemComponent={item => this._renderItem(item)}
                onSubmit={item => navigate('Result')}
                onSubmit={() => this._storeData2()}
                multiselect={true}
                countPerRow={2}
                onEndReachedThreshold={1200}
                floatSubmitBtn={true}
                submitBtnTitle={'Empezemos'}
                submitBtnWidth={80}
                minSelectCount={1}
                tickPosition={'middle'}
                styles={
                  {
                    btn: globals.btn,
                    btnTxt:globals.btnTxt,
                    disabledBtn: globals.disabledBtn,
                    tickTxt: globals.tickTxt,
                    activeItemBoxHighlight: {borderColor: 'white' ,backgroundColor: 'white'},
                    itemBoxHighlight:globals.body,
                  }
                }
              />   
          </View>
         )}	
        </Content>
	    </Container>
	  )
	}
}

const mapStateToProps = state => {
	return {category: state.category}
}

const mapDispatchToProps = dispatch => {
	return {
    fetchDataCategory: () => {return dispatch(fetchDataCategory())}
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(IniCategoryComponent))