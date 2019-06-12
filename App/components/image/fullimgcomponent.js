import React, {Component} from 'react'
import {TouchableOpacity,Modal,Image,StatusBar,ScrollView,Animated,Dimensions,StyleSheet,View} from 'react-native';
import {Icon} from 'native-base';
//Estilos
import globals from "../../styles/globals";

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

class Fullimgcomponent extends Component {

  numItems = this.props.imagenes.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  itemWidth2 = (FIXED_BAR_WIDTH / 1) - ((1 - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

	constructor(props) {super(props)
		this.state = {
      pagination: 0,
      img: props.imagenes
	  };
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagenes !== prevProps.imagenes) {
      this.setState({img:this.props.imagenes})
    }
  }

  closemodal = () => {
  	this.props.close();
  }

	render() {
    let imageArray = []
    let barArray = []

    if (this.props.imagenes && this.props.imagenes.length) {
      this.state.img.forEach((image, i) => {
        const thisImage = (
          <Image
            key={`image${i}`}
            source={{uri: image.URL_Imagen}}
            style={{ width: deviceWidth }}
          />
        )
        imageArray.push(thisImage)
        const scrollBarVal = this.animVal.interpolate({
          inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
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
    else{
      const thisImage = (
        <Image
          key={'image0'}
          source={{uri: this.props.destacado}}
          style={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (0 - 1), deviceWidth * (0 + 1)],
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
		    <TouchableOpacity onPress={() => {this.props.close();}} style={globals.cont_full_ico}>
		      <Icon name='md-close' style={globals.full_ico}/>
		    </TouchableOpacity>
        <View style={globals.contenedor_full}>       
          <View style={globals.imgfull}>          
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