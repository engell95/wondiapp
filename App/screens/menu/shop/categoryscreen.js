import React, {Component} from 'react';
import {FlatList,TouchableOpacity,BackHandler,RefreshControl,StatusBar,NetInfo,Image,View,Text} from 'react-native';
import {Button,Icon,H1} from 'native-base';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Empty from "../../../components/general/emptycomponent";
//Redux
import {fetchDataCategory} from '../../../redux/actions/categoryaction';
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

class Category extends React.Component {
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
      languaje:''
    };
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
  })

  componentDidMount() {
    this._isMounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillUnmount() {
    console.log('salio cat')
    this._isMounted = false;
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      if (settings.languaje !== null){
        I18n.locale = settings.languaje
      }
      this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif})
    }
    this.props.fetchDataCategory();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category.item.data !== prevProps.category.item.data) {
      if (this.props.category.item.data){
        this.setState({data:this.props.category.item.data,loader:this.props.category.isFeching})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    if (this._isMounted){
      this.setState({isConnected });
    }
  }

  _renderItemCatg(item,index){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Shop_Catg",{user:this.state.user,token:this.state.token,notif:this.state.notif,languaje:this.state.languaje,id:item.Cod_Cat_Empresa,name:item.N_Cat_Empresa})}}>
          <Text numberOfLines={1} style={globals.textheader}>{item.N_Cat_Empresa}</Text>
          <ProgressiveImage
            thumbnailSource = {{uri: item.Icono}}
            style = {globals.img_row}
            Content = {globals.img_rowc}
            resizeMode = "cover"
          />
        </TouchableOpacity>
      </View>   
    )
  }

  _onRefresh = () => {
    if (this._isMounted){
      this.setState({refreshing: true,loader:false});
      this.props.fetchDataCategory();
      if (this.state.loader = true) {
        this.setState({refreshing: false})
      }
      else{
        this.setState({refreshing: true})
      }
    }
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    if (this.state.loader == true & this.state.refreshing == false){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    return(
      <View style={globals.body}>
        <StatusBar backgroundColor={globals.status.color} barStyle="light-content"/>
        {this.state.data && this.state.data.length
          ? <FlatList
              data={this.state.data}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
                />
              }
              numColumns={3}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => (
                {length: globals.img_row.height, offset: globals.img_row.height * index, index}
              )}
              renderItem={({item}) => this._renderItemCatg(item)}
              initialNumToRender={9}
              ListHeaderComponent={<H1 style={[globals.title,globals.contenttop]}>{I18n.t('categories.title')}</H1>}
              keyExtractor={(item, index) => index.toString()}
            />
          :<Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
        }
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category)