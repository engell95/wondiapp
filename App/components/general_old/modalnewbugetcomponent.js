import React, {Component} from 'react'
import {TouchableOpacity,Modal,StatusBar} from 'react-native';
import {View,Text,Icon,List,ListItem,Body,Right,Label,Item,Input,DatePicker,Button,Form,Content} from 'native-base';
import {connect} from 'react-redux';
import {newbudget,newbudgetacces} from '../../redux/actions/mainaction';
import globals from "../../styles/globals";
//idioma
import I18n from '../../config/LanguageService';

class modalnewbugetcomponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	name:'',
	   	nameError: null,
      color:  globals.focus.notfocus,
	   	chosenDate: new Date(),
      languaje:'es',
      user:null,
      token:null,
      suc:null,
      prodc:null,
		}
		this.setDate = this.setDate.bind(this);
  }

  componentWillMount() {  
    const {navigation} = this.props;
    const user = navigation.getParam('user', 'NO-ID');
    const languaje = navigation.getParam('languaje', 'es');
    const token = navigation.getParam('token', 'NO-ID');
    const suc = navigation.getParam('suc', 'NO-ID');
    const prodc = navigation.getParam('prodc', 'NO-ID');
    const cant = navigation.getParam('cant', '1');
    if (languaje !== 'NO-ID'){
      I18n.locale = 'languaje'
    }
    this.setState({user:user,token:token,languaje:languaje,token:token,suc:suc,prodc:prodc,cant:cant})
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  validate(){
    this.setState(() => ({ nameError: null}));
     let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudget({name:this.state.name,user:this.state.user,prod:this.state.prod,suc:this.state.suc,cant:this.state.cant,date:date,code:this.state.token});
          this.props.navigation.goBack()
    /*if (this.state.name.trim() == '') {
      this.setState(() => ({ nameError: I18n.t('global.name1')}));
      this.setState({color:'red'});
    } 
    else {
      if (this.state.name.length < 3) {
        this.setState(() => ({ nameError: I18n.t('global.name2')}));
        this.setState({color:'red'});
      } 
      else{
        if (this.props.tipo == 1) {
          let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudget({name:this.state.name,user:this.state.user,prod:this.state.prod,suc:this.state.suc,cant:this.state.cant,date:date,code:this.state.token});
          this.props.navigation.goBack()
        }
        else{
          let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudgetacces({name:this.state.name,user:this.state.user,date:date,code:this.state.token});
          this.closemodal();
          this.props.navigation.navigate("Search");
        }

      }
      this.setState(() => ({ nameError: null}));
    }*/
  }

  onFocus() {
    this.setState({
      color: globals.focus.color
    });
  }

  onBlur() {
    this.setState({
      color: globals.focus.notfocus
    });
  }

	render(){
		return(
		  <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => this.props.navigation.goBack()}
      >
        <StatusBar backgroundColor = {globals.focus.color}/>
        <List style={globals.view_title2}>
          <ListItem noBorder style = {globals.ListItemh}>
            <Body>
              <Text numberOfLines={1} style={globals.tex_title_new}>{I18n.t('budget.newbudget')}</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name='md-close' style={globals.close_ico_new}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        </List>
        <Content style={globals.content}>
          <Form>
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
        </Content>
      </Modal>
		)
	}

}

const mapDispatchToProps = dispatch => {
  return {
    newbudget:(data) =>{return dispatch(newbudget(data))},
    newbudgetacces:(data) =>{return dispatch(newbudgetacces(data))},
  }
}

export default connect(null, mapDispatchToProps)(modalnewbugetcomponent)