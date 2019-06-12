import React, {Component} from 'react'
import {TouchableOpacity,Modal,ScrollView,Image,FlatList,Alert,Linking,Platform} from 'react-native';
import {View,Text,Icon,ListItem,Body,Right,Left,Grid,Col,Card,CardItem} from 'native-base';
//Estilos
import globals from "../../styles/globals";
//General
import ProgressiveImage from '../general/progressiveimagecomponent';
import {withNavigation} from 'react-navigation';
//Extra
import Carousel, { ParallaxImage ,Pagination } from 'react-native-snap-carousel';
//idioma
import I18n from '../../config/LanguageService';

class ProductdetComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
     pagination: 0,
     sucursales:[{item:{data:{}}}]
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.languaje !== prevProps.data.languaje) {
      I18n.locale = this.props.data.languaje
    }
  }

  componentWillUnmount(){
    this.setState({pagination:0,sucursales:[{item:{data:{}}}]})
  }
  
  closemodal = () => {
    this.props.close();
  }

  _renderImgdet ({item, index}, parallaxProps) {
    return (
      <View style={{width:'100%',zIndex: 2}}>
        <Image resizeMode={'cover'} style={globals.imgdet} source={{uri: item.URL_Imagen}}/>             
      </View>
    );
  }

  _renderItemsuc2(item,index){
    return(
      <ListItem icon onPress={() => {this.openGps(item.Latitude,item.Longitude)}}>
        <Left>
          <Icon type="FontAwesome" name="map-marker" />
        </Left>
        <Body>
          <Text numberOfLines={1} style={globals.text} key={item.Cod_Sucursal}> {item.N_Sucursal}</Text>
        </Body>
        <Right>
          <Icon name='md-arrow-dropright' />
        </Right>
      </ListItem>
    )
  }

  openGps = (ll,lg) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + ll + ',' + lg
    this.openExternalApp(url)
  }

  openExternalApp = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } 
      else {
        Alert.alert(
          'ERROR',
          'Unable to open: ' + url,
          [
            {text: 'OK'},
          ]
        );
      }
    });
  }
 
  render(){
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.open}
        onRequestClose={() => this.closemodal()}
        onPress={() => this.closemodal()}
      >
        <ListItem icon style={globals.view_title}>
          <Body>
            <Text numberOfLines={1} style={[globals.tex_title_m,{marginLeft:'5%',fontSize:19}]}>{I18n.t('global.det')}</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.closemodal()} style={globals.touch_title}>
              <Icon name='md-close' style={globals.close_ico}/>
            </TouchableOpacity>
          </Right>
        </ListItem>
        <ScrollView>         
          <View>
            <Card style={globals.no_margin}>
              <CardItem cardBody>
                <View >
                  {this.props.data.imagenes && this.props.data.imagenes.length
                    ?
                    <View style={{width:'100%', zIndex: 0}}>
                      <Carousel
                       data={this.props.data.imagenes}
                       renderItem={this._renderImgdet}
                       hasParallaxImages={true}
                       sliderWidth={globals.caruseldet.width}
                       itemWidth={globals.caruseldet.width}
                       activeSlideAlignment={'center'}
                       onSnapToItem={(index) => this.setState({ pagination: index }) }
                      /> 
                      <Pagination
                        dotsLength={this.props.data.imagenes.length}
                        activeDotIndex={this.state.pagination}
                        containerStyle={globals.containercarusel}
                        dotColor={globals.focus.color}
                        dotStyle={globals.pagination}
                        firstItem={1}
                        inactiveDotColor={globals.notfocus.color}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                      />
                    </View>
                    :(this.props.data.destacado
                        ? <ProgressiveImage
                            thumbnailSource = {{uri: this.props.data.destacado}}
                            style = {globals.imgdet2}
                            Content = {globals.imgdet2}
                            resizeMode = "cover"
                          />
                        : <ProgressiveImage
                            thumbnailSource = {require("../../src/det.png")}
                            style = {globals.imgdet2}
                            Content = {globals.imgdet2}
                            resizeMode = "cover"
                          />
                      )
                  }
                 
                </View>
              </CardItem>
            </Card>
            <View style={globals.content}>
              <Grid style={globals.space}>
                <Col>
                   <Text numberOfLines={1} style={globals.title4}>{this.props.data.nombre}</Text>
                   <Text numberOfLines={1} style={globals.text}>{this.props.data.marca}</Text>
                </Col>
                <Col>
                  <Right>
                    <Text numberOfLines={1} style={globals.title4}>{this.props.data.simbolo} {this.props.data.precio}</Text>
                  </Right>
                </Col>
              </Grid>
              <View style={globals.separador}></View>
              {this.props.data.descripcion
                ?<View style={globals.space}>
                    <Text numberOfLines={1} style={globals.title4}>{I18n.t('global.desc')}</Text>
                    <Text style={globals.text}>{this.props.data.descripcion}</Text>
                  </View>
                :null
              }
              <View style={globals.separador}></View>
              <View style={globals.space}>
                {this.props.data.sucursales.item.data && this.props.data.sucursales.item.data.length
                  ?<FlatList
                      numColumns={1}
                      renderItem={({item}) => this._renderItemsuc2(item)}
                      data={this.props.data.sucursales.item.data}
                      keyExtractor={(item, index) => index.toString()}
                      ListHeaderComponent={<Text style={[globals.title4,globals.contenttop]}>{I18n.t('global.suc')}</Text>}
                      initialNumToRender={4}
                    />
                  :null
                }    
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

export default (ProductdetComponent)