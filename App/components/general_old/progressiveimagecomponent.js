import React, {Component} from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
    
  },
});

let i = 0
const genKey = (): string => {
  return `key:${++i}`
}

class ProgressiveImage extends React.Component {
  

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
    this.setState({opa:0.9})
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();

    setTimeout(() => {this.handleThumbnailLoad()},1000)
  }

  render() {
    const {
      thumbnailSource,
      style, 
      Content,
      ...props
    } = this.props;

    return (
      <View style={[styles.container,Content,{opacity:this.state.opa}]}>
     
        <Animated.Image
          {...props}
          key={this.state.key} 
          source={thumbnailSource}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
        

      </View>
    );
  }
}

export default ProgressiveImage;