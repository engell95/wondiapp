import React, {Component} from 'react';
import{Image,TouchableOpacity,NetInfo,FlatList,ActivityIndicator,Alert} from 'react-native';
import{View,Icon,Text,Right,Left,Input,InputGroup,Item,ListItem} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import globals from "../../styles/globals";
import {fetchDataSearch} from '../../redux/actions/searchaction';
import {fetchDataResult} from '../../redux/actions/resultaction';
import {connect} from 'react-redux';
import OfflineNotice from '../../components/general/offlinecomponent';
//idioma
import I18n from '../../config/LanguageService';
import {loadSettings} from '../../config/SettingsStorage';

class Search extends React.Component{

	constructor(props){
		super(props)
		this.state ={
			searchText: "",
			data: "",
      isConnected: true,
      refreshing: false,
      search:[],
      datafull:[],
      cargando:false,
      hist:true,
      user:'',
      languaje:'',
      token:'',
      notif:''
		};
	}

	componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
	  this.props.navigation.setParams({
      searchText: this.state.searchText,
      onChangeSearch:this.onChangeSearch,
      deleteData:this.deleteData,
      upsearchhistory:this.upsearchhistory,
    });
  }

	async componentWillMount() {
    const settings = await loadSettings();
    if (settings !== null) {
      I18n.locale = settings.languaje
      this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
    }
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.props.fetchDataSearch();
    this.searchhistory(); 
  }

  componentDidUpdate(prevProps) {
    if (this.props.search.item.data !== prevProps.search.item.data) {
      if (this.props.search.item.data){
        this.setState({datafull:this.props.search.item.data})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{marginLeft:10,marginRight:10}}>
          <InputGroup searchBar rounded style={globals.inp_search}>
            <Item style={{borderColor:'transparent'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='md-arrow-round-back' style={globals.ico_back}/>
              </TouchableOpacity>
              <Input 
                placeholder={I18n.t('result.textsearch')}
                returnKeyType='go' 
                value={params.searchText}
                onChangeText={(value) => params.onChangeSearch(value)}
                keyboardAppearance="dark"
                autoFocus={true}
                onSubmitEditing={(event) => params.upsearchhistory(params.searchText)}
              />
              {params.searchText 
                ?<TouchableOpacity onPress={() => params.deleteData()}>
                  <Icon name='md-close-circle' style={globals.ico_delete}/>
                 </TouchableOpacity>
                :null
              }
            </Item>
          </InputGroup>
        </View>
      ),
      headerLeft: null,
      headerTitleStyle: (globals.nav),
      headerStyle: (globals.navstyle),
      headerTintColor: (globals.navstyle.color),
    }
  }

  deleteData = () =>{
    this.searchhistory();
    this.setState({searchText:'',data: ''})
    this.props.navigation.setParams({searchText: ''});
  }

  onChangeSearch = (value) => {
    this.setState({cargando:true,data:[],hist:false})
    const NewData =  this.state.datafull.filter(function(item){
    const itemData = item.N_Producto.toLowerCase();
    const textData = value.toLowerCase();
     return itemData.indexOf(textData) > -1;
    });   
    this.setState({searchText:value,data: NewData,cargando:false})
    this.props.navigation.setParams({searchText: value});
  }

  searchhistory = async () =>{
    try {
      const search = await AsyncStorage.getItem('search');
      if (search != null) {
        AsyncStorage.getItem('search', (error, result) => {this.setState({ search: JSON.parse(result) }, function () {   });});
      }
    }
    catch(error) {
      console.log("fetch Error: ", error)
    }
  }

  upsearchhistory =  (text) => {
    var verificar = this.state.search.indexOf(text);
    if (verificar == -1) {
      var searchold = this.state.search.concat(text);
      var searchnew = searchold.reverse().slice(0,10);
      AsyncStorage.setItem('search', JSON.stringify(searchnew));
      this.props.navigation.navigate("Result",{search:text,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
    }
    else{
      this.props.navigation.navigate("Result",{search:text,user:this.state.user,token:this.state.token,languaje:this.state.languaje});
    }  
  }

  _renderhis(item){
    return(
      <ListItem>
        <TouchableOpacity onPress={() => this.upsearchhistory(item)}>
        <Left>
          <Icon name='md-time' style={{color: '#595959'}}/>
          <Text numberOfLines={1}>  {item}</Text>
        </Left>
        </TouchableOpacity>
      </ListItem>
    ) 
  }

  _renderdata(item){
    const name = item.N_Producto;
    return(
      <ListItem style={globals.list_resul}>
        <Left>
          <TouchableOpacity onPress={() => this.upsearchhistory(name)}>
            <Text numberOfLines={1}><Icon name='ios-search' style={{fontSize:25,color: '#595959'}}/> {name}</Text>
          </TouchableOpacity>
        </Left>
        <Right>
          <TouchableOpacity onPress={() => this.upsearchhistory(name)}>
            <Icon name="arrow-forward" style={{color: '#595959'}}/>
          </TouchableOpacity>
        </Right>
      </ListItem>
    )
  }

  deletehist = async () => {
    Alert.alert(
      I18n.t('configure.mexit'),
      I18n.t('configure.medelete2'),
      [
        {text: I18n.t('global.cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('global.exit'), onPress: () => {this.clear()}, style: 'destructive'},
      ],
      { cancelable: false }
    )
  }

  clear = async () =>{
    try {
      await AsyncStorage.removeItem('search')
    }
    catch (error) {
      console.log(error)
    }
    this.setState({search:[]})
  }

	render(){
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

		return(
			<View style={globals.body}>
        {this.state.search != '' && this.state.hist == true
          ?<View>
              <FlatList 
                numColumns={1}
                data={this.state.search}
                renderItem={({item}) => this._renderhis(item)}
                keyExtractor = { (item, index) => index.toString() }
                ListHeaderComponent={
                  <ListItem noBorder style={{marginLeft:10,marginRight:10}}>
                    <Left>
                      <Text style={globals.text5}>{I18n.t('result.search')}</Text>
                    </Left>
                    <Right>
                      <TouchableOpacity onPress={() => this.deletehist()}>
                        <Icon name='md-trash' style={{fontSize: 25, color: '#595959'}}/>
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                }
              />
            </View>
          :null
        }
        {this.state.cargando
          ?<View style={globals.view_load}>
              <ActivityIndicator size="small" color='blue'/>
            </View>
          : <FlatList 
              data={this.state.data}
              numColumns={1}
              renderItem={({item}) => this._renderdata(item)}
              style={globals.fix_resul}
              initialNumToRender={5}
              keyExtractor = { (item, index) => index.toString() }
            />
        }    
      </View>
		)
	}
}

const mapStateToProps = state => {
  return {search: state.search,result: state.result}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataSearch: () => {return dispatch(fetchDataSearch())},
    fetchDataResult: (search) => {return dispatch(fetchDataResult(search))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)