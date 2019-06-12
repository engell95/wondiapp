import React, {Component} from 'react'
import {TouchableOpacity,Modal,ScrollView} from 'react-native';
import {View,Text,Icon,ListItem,Body,Right,Left,Label,Card,CardItem,H3,Item,Input,DatePicker,Button} from 'native-base';
import {connect} from 'react-redux';
import {newbudget,newbudgetacces} from '../../redux/actions/mainaction';
import globals from "../../styles/globals";
import {withNavigation} from 'react-navigation';

class modalnewbugetcomponent extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		name:null,
	   		nameError: null,
	   		chosenDate: new Date(),
		}
		this.setDate = this.setDate.bind(this);
  	}

  	closemodal = () => {
  		this.props.close();
  		this.setState({nameError: null})
  	}

  	setDate(newDate) {
    	this.setState({ chosenDate: newDate });
  	}

  validate(){
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
          this.props.newbudget({name:this.state.name,user:this.props.user,prod:this.props.prod,suc:this.props.suc,cant:this.props.cant,date:date});
          this.setState({crear:false});
          this.closemodal();
        }
        else{
          let date =this.state.chosenDate.getFullYear()+"-"+(this.state.chosenDate.getMonth() + 1)+"-"+this.state.chosenDate.getDate();
          this.props.newbudgetacces({name:this.state.name,user:1,date:date});
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
          <ScrollView>
            <View>
              <ListItem icon style={globals.view_title2}>
                <Body>
                  <Text numberOfLines={1} style={[globals.tex_title_m,{marginLeft:'5%',fontSize:19}]}>Nuevo Presupuestos</Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => this.closemodal()} style={globals.touch_title}>
                    <Icon name='md-close' style={globals.close_ico}/>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <View style={[globals.content,{marginTop:15}]}>
                <Item floatingLabel style={{borderColor:this.state.color}}>
                  <Label>Nombre</Label>
                  <Input  
                    autoFocus = {true}
                    value={this.state.name}                  
                    onChangeText={(text) => this.setState({ name: text })}
                    onFocus={ () => this.onFocus() } onBlur={ () => this.onBlur() }
                  />
                </Item>
                {!!this.state.nameError && (
                  <Text style={{color: 'red'}}>{this.state.nameError}</Text>
                )}
                <Item style={{marginTop:15}}>
                  <Icon active name='md-calendar' />
                  <DatePicker
                    defaultDate={Date.now()}
                    minimumDate={Date.now()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText='Fecha de compra'
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#595959" }}
                    onDateChange={this.setDate}
                    disabled={false}
                  />
                </Item>
                <Button full rounded 
                  style={globals.button_login}
                  onPress={()=> {this.validate()}}               
                >
                  <Text>Guardar</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
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