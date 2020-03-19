import React, {Component} from 'react'
import {TouchableOpacity,Modal,Image,StatusBar,ScrollView,Animated,StyleSheet,View} from 'react-native';
import {Icon,Text,Block} from 'galio-framework';
import design from '@config/style/Style';
import ImageViewer from './zoom/image-viewer.component';

const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10
const logo = require('@assets/img/logo3.png');

class Fullimgcomponent extends Component {

  //inicializar variables
  constructor(props) {super(props)
    this.state = {
      pagination: 0,
      img: props.imagenes
    };
  }

  numItems    = this.props.imagenes.length
  itemWidth   = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  itemWidth2  = (FIXED_BAR_WIDTH / 1) - ((1 - 1) * BAR_SPACE)
  animVal     = new Animated.Value(0)

  //ciclos de vida
  componentDidUpdate(prevProps) {
    if (this.props.imagenes !== prevProps.imagenes) {
      this.setState({img:this.props.imagenes})
    }
  }

  //funcion para cerrar componente
  closemodal = () => {this.props.close();}

	render() {

    
    let imageArray = []
    let barArray = []
    if (this.props.imagenes && this.props.imagenes.length) {
      this.state.img.forEach((image, i) => {
        const thisImage = (
          <Image
            key={`image${i}`}
            source={{uri: image.URL_Imagen}}
            style={{ width: design.width }}
          />
        )
        imageArray.push(thisImage)
        const scrollBarVal = this.animVal.interpolate({
          inputRange: [design.width * (i - 1), design.width * (i + 1)],
          outputRange: [-this.itemWidth, this.itemWidth],
          extrapolate: 'clamp',
        })
        const thisBar = (
          <View key={`bar${i}`} style={[styles.track,{width: this.itemWidth,marginLeft: i === 0 ? 0 : BAR_SPACE,},]}>
           <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
         </View>
        )
        barArray.push(thisBar)
      })  
    }
    else if (this.props.destacado && this.props.destacado.length){
      const thisImage = (
        <Image
          key={'image0'}
          source={{uri: this.props.destacado}}
          style={{ width: design.width }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [design.width * (0 - 1), design.width * (0 + 1)],
        outputRange: [-this.itemWidth2, this.itemWidth2],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={'bar0'}
          style={[
            styles.track,
            {
              width: this.itemWidth2,
              marginLeft: 0 === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth2,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    }
    else{
      const thisImage = (
        <Image
          key={'image0'}
          source={logo}
          style={{ width: design.width }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [design.width * (0 - 1), design.width * (0 + 1)],
        outputRange: [-this.itemWidth2, this.itemWidth2],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={'bar0'}
          style={[
            styles.track,
            {
              width: this.itemWidth2,
              marginLeft: 0 === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth2,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    }

		return (
			<Modal
	      animationType='fade'
	      transparent={true}
	      visible={this.props.open}
	      onRequestClose={() => this.closemodal()}
        onPress={() => this.closemodal()}
      >
		    <StatusBar backgroundColor="black" barStyle="light-content" />
		    {this.props.imagenes && this.props.imagenes.length
          ?<ImageViewer 
            imageUrls={this.state.img}
            failImageSource={logo}
            loadingRender={() => <Text>Cargando</Text>}
            onCancel={() =>this.props.close()}
            renderHeader={() => 
              <Block style={{marginLeft:design.width * 0.02,marginRight:design.width * 0.02,marginTop:10,position: 'absolute', zIndex: 1}}>
                <TouchableOpacity onPress={() => this.closemodal()}>
                  <Icon
                    family='antdesign'
                    color={design.theme.COLORS.MUTED}
                    size={design.theme.SIZES.BASE * 2}
                    name='closecircle'
                  />
                </TouchableOpacity>  
              </Block>
            }
           />
          :<View style={{flex: 1,backgroundColor:'black'}}>
          <Block style={{marginLeft:design.width * 0.02,marginRight:design.width * 0.02,marginTop:10,position: 'absolute', zIndex: 1}}>
              <TouchableOpacity onPress={() => this.props.close()}>
                <Icon
                  family='antdesign'
                  color={design.theme.COLORS.MUTED}
                  size={design.theme.SIZES.BASE * 2}
                  name='closecircle'
                />
              </TouchableOpacity>  
          </Block>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',flexDirection:'column'}}>       
            <View style={{marginTop:design.height * 0.20}}>          
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                  )
                }
              >
                {imageArray}
              </ScrollView>
            </View>
            <View style={styles.barContainer}>
              {barArray}
            </View>
          </View>
          </View>
        }
      </Modal>
		)
	}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row'
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})

export default Fullimgcomponent