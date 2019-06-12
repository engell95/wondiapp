import React, {Component} from 'react';
import { View, Animated } from 'react-native';
import globals from "../../styles/globals";

let i = 0
const genKey = (): string => {
  return `key:${++i}`
}

class ProgressiveImage extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props)
    this.state ={
      opa: 0.2,
      key: genKey
    };
  }

  thumbnailAnimated = new Animated.Value(1);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    if (this._isMounted){
      this.setState({opa:0.9})
    }
  }

  onImageLoad = () => {
    if (this._isMounted){
      Animated.timing(this.imageAnimated, {
        toValue: 1,
      }).start();

      setTimeout(() => {this.handleThumbnailLoad()},1000)
    }
  }

  componentDidMount() {
    this._isMounted = true;
  } 

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const {
      thumbnailSource,
      style, 
      Content,
      ...props
    } = this.props;

    return (
      <View style={[globals.containerimg,Content,{opacity:this.state.opa}]}>
     
        <Animated.Image
          {...props}
          key={this.state.key} 
          source={thumbnailSource}
          style={[globals.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
          resizeMode = "cover"
        />

      </View>
    );
  }
}

export default ProgressiveImage;