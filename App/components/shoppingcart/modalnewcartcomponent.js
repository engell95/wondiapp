import React, {PureComponent} from 'react'
import {TouchableOpacity,BackHandler,Dimensions,View,Keyboard} from 'react-native';
import {ListItem,Body,Right,Left,Text,Icon,Button,ActionSheet,Form,Item,Label,Input,DatePicker} from 'native-base';
import {connect} from 'react-redux';
import {newbudgetacces} from '../../redux/actions/mainaction';
import globals from "../../styles/globals";
import Dialog, { ScaleAnimation,DialogContent } from 'react-native-popup-dialog';
//idioma
import I18n from '../../config/LanguageService';
import {withNavigation} from 'react-navigation';
const { width, height } = Dimensions.get('window')

class Modalcartcomponent extends PureComponent {
   _isMounted = false;

	constructor(props) {
    super(props);
    this.state = {
    	name:'',
	   	nameError: null,
      color:  globals.focus.notfocus,
	   	chosenDate: new Date(),
      modalnewacces:props.newmodal2,
		}
  }

  componentDidMount() {
    this._isMounted = true; 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this._isMounted = false;
  }

  handleBackPress = () => {
    console.log('fix')
    return true
  }

  _keyboardDidShow = () => {
    if (this._isMounted) {
      this.setState({
          dialogStyle: {
              top: -1 * (width / 2),
              padding: 10,
              overflow: 'hidden',
          },
      })
    }
  }

  _keyboardDidHide = () => {
    if (this._isMounted) {
      this.setState({
          dialogStyle: {
              padding: 10,
              overflow: 'hidden',
          },
      })
    }
  }

  exitmodalnewacces = async () => {
    if (this._isMounted) {
      try {
        await this.setState({modalnewacces:false,nameError: null,name:''});
        await this.props.closemodal();
      }
      catch (error) {
      }
    }
  }

  exitmodalnewacces2 = async () => {
    if (this._isMounted) {
      try {
        await this.setState({modalnewacces:false,nameError: null,name:''});
        await this.props.closemodal2();
      }
      catch (error) {
      }
    }
  }

  setDate(newDate) {if (this._isMounted) {this.setState({ chosenDate: newDate });}}

  validate(){
    if (this._isMounted) {
      this.setState(() => ({ nameError: null}));
      if (this.state.name.trim() == '') {
        this.setState({ nameError: I18n.t('validate.name1'),color:'red'});
      } 
      else if (this.state.name.length < 3) {
        this.setState({ nameError: I18n.t('validate.name2'),color:'red'});
      } 
      else{
        let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
        var userfix = Number(this.props.data.user)
        const tokenfix = this.props.data.token.split('"').toString()
        this.props.newbudgetacces({name:this.state.name,user:userfix,date:date,token:tokenfix,languaje:this.props.data.languaje});
        this.exitmodalnewacces2();
      }
    }
  }

  onFocus() {
    if (this._isMounted) {
      this.setState({
        color: globals.focus.color
      });
    }
  }

  onBlur() {
    if (this._isMounted) {
      this.setState({
        color: globals.focus.notfocus
      });
    }
  }

  _rendermodal3(){
    return(
      <Dialog
        visible={this.state.modalnewacces}
        onTouchOutside={() => {this.exitmodalnewacces()}}
        onHardwareBackPress={() => {this.exitmodalnewacces()}}
        width={0.9}
        animationDuration={100}
        dialogStyle={this.state.dialogStyle}
        dialogTitle={
          <ListItem icon style={globals.view_title}>
            <Body>
              <Text numberOfLines={1} style={globals.tex_title_m}>{I18n.t('budget.newbudget')}</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => {this.exitmodalnewacces()}} style={globals.touch_title}>
                <Icon name='md-close' style={globals.close_ico}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        }
        dialogAnimation={new ScaleAnimation()}
      >
        <DialogContent>
            <Form style={{marginTop:10,marginBottom:20}}>
              <Item floatingLabel style={[globals.listitemfix,{borderColor:this.state.color}]}>
                <Label>{I18n.t('input.ipname')}</Label>
                    <Input  
                      returnKeyType = { "next" }
                      onSubmitEditing={() => {this.refs.datePicker.showDatePicker()}}
                      autoCorrect = {true} 
                      autoFocus = {true}
                      value={this.state.name}                  
                      onChangeText={(text) => this.setState({ name: text })}
                      onFocus={ () => this.onFocus() } 
                      onBlur={ () => this.onBlur() }
                    />
                  </Item>
                  {!!this.state.nameError && (
                      <Text style={globals.texterror}>{this.state.nameError}</Text>
                  )}
                  <Item style={[globals.listitemfix,{paddingTop:30}]}>
                      <Icon active name='md-calendar' />
                    <DatePicker
                      ref="datePicker"
                      defaultDate={Date.now()}
                      minimumDate={Date.now()}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText={I18n.t('input.date')}
                      textStyle={{ color: "black"}}
                      placeHolderTextStyle={globals.textdatepicker}
                      onDateChange={this.setDate}
                      disabled={false}
                    />
                  </Item>
                  <Button rounded  
                    style={[globals.button_login,{marginTop:30}]}
                    onPress={()=> {this.validate()}}               
                >
                    <Text>{I18n.t('global.save')}</Text>
                </Button>
            </Form>
        </DialogContent>
      </Dialog>
    )
  }

	render(){
		return(
      <View>
        {this._rendermodal3()}
      </View>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return {
    newbudgetacces:(data) =>{return dispatch(newbudgetacces(data))},
  }
}

export default withNavigation(connect(null, mapDispatchToProps)(Modalcartcomponent))