import React, {Component} from 'react';
import {FlatList,TouchableOpacity,RefreshControl,StatusBar,NetInfo,Image,View,Text} from 'react-native';
import {Button,Icon,H1} from 'native-base';
//General
import OfflineNotice from "../../../components/general/offlinecomponent";
import Load from '../../../components/loader/loadercomponent';
import ProgressiveImage from '../../../components/image/progressiveimagecomponent';
import Empty from "../../../components/general/emptycomponent";
//Redux
import {fetchDataShop} from '../../../redux/actions/shopaction';
import {connect} from 'react-redux';
import globals from "../../../styles/globals";
//idioma
import I18n from '../../../config/LanguageService';
//Extra
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';

const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class Shop extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      pagination: 0,
      user:'',
      token:'',
      notif:'',
      languaje:'',
      loader:true,
      data: [], 
      catg_name:'',
      catg_id:'',
      active:false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <Image style={globals.logo_header_b} resizeMode="contain" source={require("../../../src/general/header.png")} />
    ),
    headerRight:( 
      <Button transparent style={{marginTop:6}} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); }); 
  } 

  componentWillMount() {
    const {navigation} = this.props;
    const catg_id = navigation.getParam('id', 'NO-ID');
    const catg_name = navigation.getParam('name', 'NO-ID');
    const user = navigation.getParam('user', 'NO-ID');
    const token = navigation.getParam('token', 'NO-ID');
    const notif = navigation.getParam('notif', 'NO-ID');
    const languaje = navigation.getParam('languaje', 'NO-ID');
    if (languaje !== 'NO-ID'){
      I18n.locale = languaje
    }
    this.setState({catg_id:catg_id,catg_name:catg_name,user:user,token:token,notif:notif,languaje:languaje})
    this.props.fetchDataShop(catg_id);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.props.shop.item.data !== prevProps.shop.item.data) {
      if (this.props.shop.item.data){
        this.setState({data:this.props.shop.item.data,loader:this.props.shop.isFeching})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }

  _onRefresh = () => {
    this.setState({refreshing: true,loader:false});
    this.props.fetchDataShop(this.state.catg_id);
    if (this.props.shop.isFeching = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  _renderItemshop(item,index){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Store_det",{id:item.Cod_Empresa,name:item.N_Empresa,img:item.Logo,languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user})}}>
          <Text numberOfLines={1} style={globals.textheader}>{item.N_Empresa}</Text>
          <ProgressiveImage
            thumbnailSource = {{uri: item.Logo}}
            style = {globals.img_row}
            Content = {globals.img_rowc}
            resizeMode = "cover"
          />
        </TouchableOpacity>
      </View> 
    )
  }

  _renderItem2 ({item, index}) {
    return (
      <TouchableOpacity onPress={() => {this.props.navigation.navigate("Promo",{languaje:this.state.languaje,notif:this.state.notif,token:this.state.token,user:this.state.user,id:item.Cod_Empresa,name:item.N_Empresa,img:item.Logo})}}>
        <View style={{width:'100%'}}>
          <Image resizeMode={'cover'} style={globals.bannerimg} source={{uri: item.Logo}}/>        
        </View>
      </TouchableOpacity>
    );
  }

  handleSnapToItem(index){
      this.setState({ activeSlide: index });
  }

  _rendercarusel(){
    return(
      <View>
        {this.state.data && this.state.data.length
          ?<View style={{width:'100%'}}>
            <Carousel
              ref={ (c) => { this._carousel = c; } }
              data={this.state.data}
              renderItem={this._renderItem2.bind(this)}
              onSnapToItem={this.handleSnapToItem.bind(this)}
              hasParallaxImages={true}
              autoplay={true}
              sliderWidth={globals.caruseldet.width}
              itemWidth={globals.caruseldet.width}
              activeSlideAlignment={'center'}
              onSnapToItem={(index) => this.setState({ pagination: index }) }
            />
            <Pagination
              dotsLength={this.state.data.length}
              activeDotIndex={this.state.pagination}
              containerStyle={globals.containerStyle}
              dotContainerStyle={{width: 10}}
              dotColor={globals.dotColor.color}
              dotStyle={globals.pagination}
              firstItem={1}
              inactiveDotColor={globals.inactiveDotColor.color}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
           </View>
          :null
        }
        <H1 style={[globals.title,globals.contenttop]}>{this.state.catg_name}</H1>
      </View>
    )
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
        ?<FlatList
          data={this.state.data}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={[globals.refresh.color,globals.refresh.backgroundColor,globals.refresh.borderColor]}
            />
          }
          viewabilityConfig={viewabilityConfig}
          getItemLayout={(data, index) => (
          {length: globals.img_row.height, offset: globals.img_row.height * index, index})}
          renderItem={({item}) => this._renderItemshop(item)}
          initialNumToRender={9}
          ListHeaderComponent={this._rendercarusel()}
          keyExtractor={(item, index) => index.toString()}
         />
        :<Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {shop: state.shop}
}

const mapDispatchToProps = dispatch => {
  return {
      fetchDataShop: (id) => {return dispatch(fetchDataShop(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)