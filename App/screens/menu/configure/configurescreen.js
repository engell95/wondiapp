import React, {Component} from 'react';
import {Image,Alert,View,NetInfo,TouchableOpacity,ScrollView,Keyboard,Dimensions} from 'react-native';
import {Button,Icon,H3,H2,H1,Thumbnail,Form,Input,Label,Item,Text,ListItem,Body,Right,Switch,ActionSheet} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import globals from "../../../styles/globals";
import {NavigationActions} from 'react-navigation';
import {fetchDataUser} from '../../../redux/actions/useraction';
import {connect} from 'react-redux';
//idioma
import I18n from '../../../config/LanguageService';
import {loadSettings} from '../../../config/SettingsStorage';

const { width, height } = Dimensions.get('window')

var BUTTONS = [
  { text: "Español (Nicaragua)", icon: "globe", iconColor: "#002D73" },
  { text: "English (United States of America)", icon: "globe", iconColor: "#002D73" }
];

const Welcome = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});

const Initialslide = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Initialslide' }),
});

class Configure extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      refreshing: false,
      notificacionios: 'ios-notifications',
      notificacion: 'md-notifications',
      photo:null,
      name:'Eloísa Junieth Quintanilla',
      email:'eloisa.quintanilla@wondiapp.com',
      user:'gatitoenarbol',
      pass1:'arbolllll',
      pass2:'arbolllll',
      security1:true,
      security2:true,
      eye1:'eye',
      eye2:'eye',
      touch1:globals.focus.color,
      touch2:globals.text.color,
      touch3:globals.text.color,
      touch4:globals.text.color,
      coloruser:globals.notfocus.color,
      colorname:globals.notfocus.color,
      colorpass1:globals.notfocus.color,
      colorpass2:globals.notfocus.color,
      perfil:true,
      Switch1:true,
      Switch2:true,
      Switch3:true,
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <View style={globals.view_nav}>
        <Image style={globals.logo_header_b} resizeMode="contain" source={require("../../../src/general/header.png")} />
      </View>
    ),
    headerRight:( 
      <Button transparent style={globals.fix_ico} onPress={() => navigation.navigate("Search")}>
        <Icon name='search' style={globals.ico_search} />
      </Button>
    ),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    headerTintColor: (globals.navstyle.color),
  })

  componentDidMount() {
    this._isMounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); }); 
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount() {
    this._isMounted = false;
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  async componentWillMount() {
    const settings = await loadSettings();
    if (settings.photo !== null) {
      this.setState({photo:settings.photo});
    }
    if (settings.language !== null) {
      I18n.locale = settings.languaje
    }
    if (settings.notif == 2) {
      this.setState({notificacionios:'ios-notifications-off',notificacion:'md-notifications-off',Switch1:false}); 
    }
    if (settings.vibr == 2) {
      this.setState({Switch2:false});
    }
    if (settings.tono == 2) {
      this.setState({Switch3:false});
    }
  }

  _keyboardDidShow = () => {
    if (this._isMounted) {
      this.setState({
          dialogStyle: {
              top: -1 * (width / 2),
              overflow: 'hidden',
          },
      })
    }
  }

  _keyboardDidHide = () => {
    if (this._isMounted) {
      this.setState({
          dialogStyle: {
              overflow: 'hidden',
          },
      })
    }
  }

  handleConnectionChange = (isConnected) => {
    if (this._isMounted) {
      this.setState({isConnected });
    }
  }

  onSecurity= (index) =>{
    if (this._isMounted) {
      if (index == 1) {
        if (this.state.security1 == true) {
          this.setState({security1: false,eye1:'eye-off'});
        }
        else{
          this.setState({security1: true,eye1:'eye'});
        }
      }
      else{
        if (this.state.security2 == true) {
          this.setState({security2: false,eye2:'eye-off'});
        }
        else{
          this.setState({security2: true,eye2:'eye'});
        }
      }
    }
  }

  onFocus(index) {
    if (this._isMounted) {
      if (index == 1) {
        this.setState({colorname: globals.focus.color});
      }
      else if(index == 2){
        this.setState({coloruser: globals.focus.color});  
      }
      else if(index == 3){
       this.setState({colorpass1: globals.focus.color});  
      }
      else{
       this.setState({colorpass2: globals.focus.color});  
      }
    }
  }

  onBlur() {
    if (this._isMounted) {
      this.setState({
        colorname: globals.notfocus.color,colorpass2:globals.notfocus.color,colorpass1:globals.notfocus.color,coloruser:globals.notfocus.color
      });
    }
  }

  notif = async (index) =>{
    if (this._isMounted) {
      if (index == 1) {
        if (this.state.notificacionios == 'ios-notifications-off') {
          this.setState({notificacionios:'ios-notifications',notificacion:'md-notifications',Switch1:true});
          AsyncStorage.setItem('notif', '1'); 
        }
        else{
          this.setState({notificacionios:'ios-notifications-off',notificacion:'md-notifications-off',Switch1:false}); 
          AsyncStorage.setItem('notif', '2'); 
        }
      }
      else if (index == 2) {
        if (this.state.Switch2 = true) {
          this.setState({Switch2:false})
          AsyncStorage.setItem('vibr', '2'); 
        }
        else{
          this.setState({Switch2:true})
          AsyncStorage.setItem('vibr', '1'); 
        }
      }
      else {
        if (this.state.Switch3 = true) {
          this.setState({Switch3:false})
          AsyncStorage.setItem('tono', '2'); 
        }
        else{
          this.setState({Switch3:true})
          AsyncStorage.setItem('tono', '1'); 
        }
      }
    }
  }

  menu(index) {
    if (this._isMounted) {
      if (index == 1) {
        this.setState({touch1: globals.focus.color,touch2:globals.text.color,touch3:globals.text.color,touch3:globals.text.color,perfil:true});
      }
      else if(index == 2){
       this.setState({touch2: globals.focus.color,touch1:globals.text.color,touch3:globals.text.color,touch3:globals.text.color,perfil:false}); 
      }
      else if (index == 3) {
        this.updatelangu()
      }
      else{
        Alert.alert(
          I18n.t('configure.mexit'),
          I18n.t('configure.mexit1'),
          [
            {text: I18n.t('global.cancel'), onPress: () => {}, style: 'cancel'},
            {text: 'Ok', onPress: () => {this.off()}, style: 'destructive'},
          ],
          { cancelable: false }
        )
      }
    }
  }

  updatelangu = () =>{
    ActionSheet.show(
      {
        options: BUTTONS,
        title: I18n.t('welcome.mwelcome4')
      },
      buttonIndex => {this.actions(buttonIndex);}
    )
  }

  actions = (index) => {
    if (this._isMounted) {
      ActionSheet.hide();
      if (index == 0) {
        AsyncStorage.setItem('languaje', 'es');
        this.props.navigation.dispatch(Initialslide);
      }
      else if (index == 1){
        AsyncStorage.setItem('languaje', 'en');
        this.props.navigation.dispatch(Initialslide);
      }
    }
  }

  off = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('id_shopping');
      await AsyncStorage.removeItem('name_shopping');
      await AsyncStorage.removeItem('photo');
      await AsyncStorage.removeItem('notif');
      await AsyncStorage.removeItem('vibr');
      await AsyncStorage.removeItem('tono');
      await AsyncStorage.removeItem('search');
      this.props.navigation.dispatch(Welcome);
    } catch (error) {
      console.log(error);
    }
  }

  _perfil(){
    return(
      <View style={globals.viwconfig}>
        <Text style={globals.h2config}><Icon ios='ios-person' android="md-person" style={globals.iconconfig}/> {I18n.t('configure.perfil')}</Text>
          <Item disabled floatingLabel style={{marginTop:20,borderColor:'#002D73'}}>
            <Label>{I18n.t('input.email')}</Label>
            <Input
              disabled 
              value={this.state.email}
              style={globals.activeTintColor} 
            />
          </Item>
          <Item floatingLabel style={{marginTop:15,borderColor: this.state.colorname}}>
              <Label>{I18n.t('input.ipname')}</Label>
              <Input 
                value={this.state.name}
                style={globals.activeTintColor} 
                returnKeyType = { "next" } 
                onSubmitEditing={(event) => {this.user._root.focus();}}
                onFocus={ () => this.onFocus(1)} 
                onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.setState({ name: text })} 
              />
          </Item>
          <Item floatingLabel style={{marginTop:15,borderColor: this.state.coloruser}}>
              <Label>{I18n.t('input.user')}</Label>
              <Input
                ref={(input) => { this.user= input; }}
                onSubmitEditing={(event) => {this.pass1._root.focus();}}  
                value={this.state.user}
                style={globals.activeTintColor} 
                returnKeyType = { "next" } 
                onFocus={ () => this.onFocus(2)} 
                onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.setState({ user: text })}
              />
          </Item>
          <Item floatingLabel style={{marginTop:15,borderColor: this.state.colorpass1}}>
              <Label>{I18n.t('input.pass')}</Label>
              <Input 
                ref={(input) => { this.pass1= input; }}
                onSubmitEditing={(event) => {this.pass2._root.focus();}}  
                value={this.state.pass1}
                secureTextEntry={this.state.security1}
                style={globals.activeTintColor} 
                returnKeyType = { "next" } 
                onFocus={ () => this.onFocus(3)} 
                onBlur={ () => this.onBlur() }
                autoCorrect={false}
                maxLength={20}
                onChangeText={(text) => this.setState({ pass1: text })}
              />
              <Icon active name={this.state.eye1} onPress={()=>{this.onSecurity(1)}} style={globals.title2}/>
          </Item>
          <Item floatingLabel style={{marginTop:15,borderColor: this.state.colorpass2}}>
              <Label>{I18n.t('input.passr')}</Label>
              <Input
                ref={(input) => { this.pass2= input; }} 
                value={this.state.pass2}
                secureTextEntry={this.state.security2}
                style={globals.activeTintColor} 
                returnKeyType = { "next" } 
                onFocus={ () => this.onFocus(4)} 
                onBlur={ () => this.onBlur() }
                autoCorrect={false}
                maxLength={20}
                onChangeText={(text) => this.setState({ pass2: text })}
              />
              <Icon active name={this.state.eye2} onPress={()=>{this.onSecurity(2)}} style={globals.title2}/>
          </Item>
          <Button full rounded style={globals.button_login}>
            <Text>{I18n.t('input.update')}</Text>
          </Button>
      </View>
    )
  }

  _notif(){
    return(
      <View style={globals.viwconfig}>
        <H2 style={globals.h2config}><Icon ios={this.state.notificacionios} android={this.state.notificacion} style={globals.iconconfig}/> {I18n.t('configure.notif')}</H2>
        <ListItem icon style={globals.fixlist}>
          <Body>
            <Text>{I18n.t('configure.onnotif')}</Text>
          </Body>
          <Right>
            <Switch value={this.state.Switch1} trackColor={{true:"#002D73",false:'#595959'}} thumbColor={"#E4E5E6"} onValueChange={(value) => this.notif(1)}/>
          </Right>
        </ListItem>
        <ListItem icon style={globals.fixlist}>
          <Body>
            <Text>{I18n.t('configure.tono')}</Text>
          </Body>
          <Right>
            <Switch value={this.state.Switch2} trackColor={{true:"#002D73",false:'#595959'}} thumbColor={"#E4E5E6"} onValueChange={(value) => this.notif(2)}/>
          </Right>
        </ListItem>
        <ListItem icon style={globals.fixlist}>
          <Body>
            <Text>{I18n.t('configure.vib')}</Text>
          </Body>
          <Right>
            <Switch value={this.state.Switch3} trackColor={{true:"#002D73",false:'#595959'}} thumbColor={"#E4E5E6"} onValueChange={(value) => this.notif(3)}/>
          </Right>
        </ListItem>
      </View>
    )
  }
  
  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    return (
      <View style={globals.body}>
        <View style={this.state.dialogStyle}>
          <ScrollView>
            <View style={globals.contenttop}>
              <H3 style={globals.title}>{I18n.t('navigation.configuration')}</H3>
            </View>
            <View style={globals.viewconfig1}>
              <View style={globals.nameconfig}>
                <H1 numberOfLines={2} style={globals.focus}>Eloísa Junieth Quintanilla</H1>
              </View>
              <View style={globals.photoconfig}>
                {this.state.photo != null
                  ?<Thumbnail large source={{uri:this.state.photo}} />
                  :<Thumbnail large source={require("../../../src/general/avatar.png")} />
                }
              </View>
            </View> 
            <View style={{marginLeft:20,marginRight:20,marginTop:15}}>
              <View style={[globals.viewbudget,{marginBottom:0}]}>
                <View style={{flexDirection: 'row'}}>
                  <View style={globals.menuconfig}>
                    <TouchableOpacity style={globals.object_center2} onPress={ ()=>{this.menu(1)}}>
                      <Icon ios='ios-person' android="md-person" style={{fontSize:40,color:this.state.touch1}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={globals.menuconfig}>
                    <TouchableOpacity style={globals.object_center2} onPress={ ()=>{this.menu(2)}}>
                      <Icon ios={this.state.notificacionios} android={this.state.notificacion} style={{fontSize:40,color:this.state.touch2}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={globals.menuconfig}>
                    <TouchableOpacity style={globals.object_center2} onPress={ ()=>{this.menu(3)}}>
                      <Icon type="FontAwesome" ios="language" android="language" style={{fontSize:40,color:this.state.touch3}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={globals.menuconfig}>
                    <TouchableOpacity style={globals.object_center2} onPress={ ()=>{this.menu(4)}}>
                      <Icon ios='ios-power' android="md-power" style={{fontSize:40,color:this.state.touch4}}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {this.state.perfil
              ?this._perfil()
              :this._notif()
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataUser: () => {return dispatch(fetchDataUser())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configure)