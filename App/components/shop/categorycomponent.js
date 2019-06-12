import React, {Component} from 'react';
import {FlatList,RefreshControl,TouchableOpacity,NetInfo} from 'react-native';
//import NetInfo from "@react-native-community/netinfo";
import {Container,Content,Button,View,Text,H1} from 'native-base';
//Redux
import {fetchDataCategory} from '../../redux/actions/categoryaction';
import {connect} from 'react-redux';
//General
import OfflineNotice from '../general/offlinecomponent'
import Load from '../general/loadcomponent';
import ProgressiveImage from '../general/progressiveimagecomponent';
import {withNavigation} from 'react-navigation';
//Estilos
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

class CategoryComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  } 

  componentWillMount() {
    this.props.fetchDataCategory();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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

  _renderItem(item,index){
    return(
      <View style={globals.renderview} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Shop_Catg",{id:item.Cod_Cat_Empresa,name:item.N_Cat_Empresa})}}>
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

  render(){
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }
    
    if (this.props.category.isFeching){
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
          <View style={globals.contenttop}>
            <H1 style={globals.title}>{I18n.t('categories.title')}</H1>
            <FlatList
              numColumns={3}
              renderItem={({item}) => this._renderItem(item)}
              data={this.props.category.item.data}
              keyExtractor={(item) => item.Cod_Cat_Empresa}
            />
          </View>
        </Content>
      </Container>   
    );
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CategoryComponent))