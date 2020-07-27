import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  ViewPropTypes as RNViewPropTypes
} from 'react-native';
import design from '@config/style/Style';
import {Input,Text,Block,Icon,Button} from 'galio-framework';
const { height, width } = Dimensions.get('window');
// Keep this line for downwards compatibility with RN.
// eslint-disable-next-line react/forbid-foreign-prop-types
const ViewPropTypes = RNViewPropTypes || View.propTypes; 

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.resultList = null;
    this.textInput = null;

    this.onRefListView  = this.onRefListView.bind(this);
    this.onRefTextInput = this.onRefTextInput.bind(this);
    this.onEndEditing   = this.onEndEditing.bind(this);

  }

  static propTypes = {
    ...TextInput.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ViewPropTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func,
    flatListProps: PropTypes.object,
  };

  static defaultProps = {
    data: [],
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: ({ item }) => <Text>{item}</Text>,
    renderSeparator: null,
    renderTextInput: props => 
    <Block style={{flexDirection:'row',alignSelf: 'flex-start',alignItems: 'center'}}>
      <TouchableOpacity onPress={props.backProps}>
        <Icon
          family="evilicons"
          name="chevron-left"
          size={50}
        />
      </TouchableOpacity>
      <Input
        icon="ios-search"
        family="ionicon"
        left 
        placeholderTextColor={design.theme.COLORS.TEXT2}
        iconColor={design.theme.COLORS.TEXT2}
        color={design.theme.COLORS.TEXT}
        style={design.style.search3}
        placeholder=" Búsqueda"
        autoFocus={true} 
        {...props} 
      />
    </Block>,
    flatListProps: {}
  };

  onEndEditing(e) {
    this.props.onEndEditing && this.props.onEndEditing(e);
  }

  onRefListView(resultList) {
    this.resultList = resultList;
  }

  onRefTextInput(textInput) {
    this.textInput = textInput;
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
  }

  /**
   * Proxy `isFocused()` to autocomplete's text input.
   */
  isFocused() {
    const { textInput } = this;
    return textInput && textInput.isFocused();
  }

  renderResultList() {
    const {
      data,
      listStyle,
      renderItem,
      keyExtractor,
      renderSeparator,
      keyboardShouldPersistTaps,
      flatListProps,
      onEndReached,
      onEndReachedThreshold,
    } = this.props;

    return (
      <FlatList
        ref={this.onRefListView}
        data={data}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderSeparator={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        {...flatListProps}
      />
    );
  }

  renderTextInput() {
    const { renderTextInput, style,back } = this.props;
    const props = {
      ref: this.onRefTextInput,
      onEndEditing: this.onEndEditing,
      ...this.props
    };

    return renderTextInput(props);
  }

  render() {
    const {
      data,
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture,
    } = this.props;
    const showResults = data.length > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View >
        <View >
          {this.renderTextInput()}
        </View>
        {!hideResults && (
          <View
            style={listContainerStyle}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}



export default Autocomplete;