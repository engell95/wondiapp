import React, {Component} from 'react';
import {Image,FlatList,TouchableOpacity,RefreshControl,ActivityIndicator,NetInfo} from 'react-native';
//import NetInfo from "@react-native-community/netinfo";
import {View, H1,Container,Content,Text,Card,CardItem,Button,Left} from 'native-base';
//Redux
import {fetchDataShop} from '../../redux/actions/shopaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import ProgressiveImage from '../general/progressiveimagecomponent';
import SliderEntry from './sliderentry';
import {withNavigation} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//Extra
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';

class ShopComponent extends Component {

	constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      slider1ActiveSlide: 0,
    };
  }

	componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });	
  } 

	componentWillMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.props.fetchDataShop(id);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
  }
  	 
  _onRefresh = () => {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.setState({refreshing: true});
    this.props.fetchDataShop(id);
    if (this.props.shop.isFeching = true) {
      this.setState({refreshing: false})
    }
    else{
      this.setState({refreshing: true})
    }
  }

  _renderItem(item,index){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Store_det",{id:item.Cod_Empresa,name:item.N_Empresa,img:item.Logo})}}>
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
      <SliderEntry
        data={item}
        navigation={this.props.navigation}
      />
    );
  }

  render(){
    if (!this.state.isConnected) {
     return <OfflineNotice />;
    }
    if (this.props.shop.isFeching){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    const {navigation} = this.props;
    const name = navigation.getParam('name', 'NO-NAME');
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
         
            { this.props.shop.item.data != null 
              ?<View style={{width:'100%'}}>
                <Carousel
                  data={this.props.shop.item.data}
                  renderItem={this._renderItem2.bind(this)}
                  autoplay={true}
                  hasParallaxImages={true}
                  sliderWidth={globals.caruseldet.width}
                  itemWidth={globals.caruseldet.width}
                  activeSlideAlignment={'center'}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={this.props.shop.item.data.length}
                  activeDotIndex={this.state.slider1ActiveSlide}
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
          <View style={globals.contenttop}>
            <H1 style={globals.title}>{name}</H1>
            <FlatList
              numColumns={3}
              renderItem={({item}) => this._renderItem(item)}
              data={this.props.shop.item.data}
              keyExtractor={(item) => item.Cod_Empresa}
            />
          </View>
	  		</Content>
  		</Container>
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ShopComponent))