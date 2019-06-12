import React, {Component} from 'react'
import {TouchableOpacity,Modal,StatusBar} from 'react-native';
import {View,Text,Icon,List,ListItem,Body,Right,Label,Item,Input,DatePicker,Button,Form,Content} from 'native-base';
import {connect} from 'react-redux';
import {newbudget,newbudgetacces} from '../../redux/actions/mainaction';
import globals from "../../styles/globals";
import {withNavigation} from 'react-navigation';

class modalnewbugetcomponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	name:'',
	   	nameError: null,
      color:  globals.focus.notfocus,
	   	chosenDate: new Date(),
		}
		this.setDate = this.setDate.bind(this);
  }

  closemodal = () => {
  	this.props.close();
  	this.setState({nameError: null,name:''})
  }

  closemodal2 = () => {
    this.props.close2();
    this.setState({nameError: null,name:''})
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  validate(){
    this.setState(() => ({ nameError: null}));

    if (this.state.name.trim() == '') {
      this.setState(() => ({ nameError: "El nombre es requerido"}));
      this.setState({color:'red'});
    } 
    else {
      if (this.state.name.length < 3) {
        this.setState(() => ({ nameError: "Nombre debe contener al menos 3 caracteres"}));
        this.setState({color:'red'});
      } 
      else{
        if (this.props.tipo == 1) {
          let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudget({name:this.state.name,user:this.props.user,prod:this.props.prod,suc:this.props.suc,cant:this.props.cant,date:date,code:this.props.code});
          this.setState({crear:false});
          this.closemodal();
        }
        else{
          let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudgetacces({name:this.state.name,user:this.props.user,date:date,code:this.props.code});
          this.closemodal();
          this.props.navigation.navigate("Search");
        }

      }
      this.setState(() => ({ nameError: null}));
    }
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
        visible={this.props.open}
        onRequestClose={() => this.closemodal()}
      >
        <StatusBar backgroundColor = {globals.focus.color}/>
        <List style={globals.view_title2}>
          <ListItem noBorder style = {globals.ListItemh}>
            <Body>
              <Text numberOfLines={1} style={globals.tex_title_new}>Nuevo Presupuestos</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.closemodal2()}>
                <Icon name='md-close' style={globals.close_ico_new}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        </List>
        <Content style={globals.content}>
          <Form>
            <Item floatingLabel style={[globals.listitemfix,{borderColor:this.state.color}]}>
              <Label>Nombre</Label>
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
                placeHolderText='Fecha de compra'
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
                <Text>Guardar</Text>
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

export default withNavigation(connect(null, mapDispatchToProps)(modalnewbugetcomponent))