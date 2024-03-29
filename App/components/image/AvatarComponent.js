import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NativeIniticon extends Component {

  _getFontSize() {
    return this.props.single ? (this.props.size)/1.7 : (this.props.size-5)/2
  }

  _getInitials(props) {
    let {text, single} = props;
    if ((typeof text !== 'string') || (text === '')) {
      return text;
    } else {
      let normalized = (typeof (text.normalize) === 'function') ? text.normalize().trim() : text.trim();
      let symbols = [...normalized];
      let indexOfSpace = symbols.indexOf(' ');
      if ((indexOfSpace > 0) && (indexOfSpace < symbols.length) && !single) {
        return (symbols[0] + symbols[indexOfSpace+1]).toUpperCase();
      } else {
        return symbols[0].toUpperCase();
      }
    }
  }

  render() {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <View 
          style={[styles.icon, {
            backgroundColor: this.props.backgroundColor,
            height: this.props.size,
            width: this.props.size,
            borderRadius: this.props.size/2
          },
          this.props.style]}
        >
        {this.props.src
          ?<Image style={{ height: this.props.size,width: this.props.size,borderRadius:this.props.size * 0.5,borderWidth: 1,borderColor: 'transparent'}} source={{uri:this.props.src}}/>
          :<Text allowFontScaling={false} style={[styles.text, {fontSize: this._getFontSize(this.props), color: this.props.color, backgroundColor: 'transparent'}]}>{this._getInitials(this.props)}</Text>
        }
        </View>
      </View>
    );
  }
};

NativeIniticon.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.any.isRequired,
  color: PropTypes.any,
  backgroundColor: PropTypes.any,
  single: PropTypes.bool,
  src: PropTypes.any
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff'
  }
});


export default NativeIniticon;