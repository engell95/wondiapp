import React from 'react';
import {Alert,View,Keyboard,TouchableOpacity,Picker,StyleSheet,StatusBar,ScrollView,FlatList,RefreshControl,Image,ImageBackground,NetInfo} from 'react-native';
//estilo
import {Block, Button, Input, NavBar, Text,Icon,Switch} from 'galio-framework';
import design from '../../../config/style/Style';
//componentes
import Load from '../../../components/general/LoaderComponent';
import MaterialInitials from '../../../components/image/AvatarComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {loadSettings} from '../../../config/SettingsStorage';
import Dialog, {DialogContent,ScaleAnimation,DialogTitle,DialogButton,DialogFooter} from 'react-native-popup-dialog';
//Redux
import {NavigationActions} from 'react-navigation';
import {fetchDataUser} from '../../../redux/actions/UserAction';
import {fetchDataPass} from '../../../redux/actions/PasswordAction';
import {fetchuseredit} from '../../../redux/actions/UserEditAction';
import {connect} from 'react-redux';

const Welcome = NavigationActions.navigate({
  routeName: 'Login_ini',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Welcome' }),
});

class Configure extends React.Component {
 	_isMounted = false;

  	constructor(props) {
    	super(props);
	    this.state = {
	      refreshing: false,
	      photo:null,
	      data:[],
	      loader:true,
	      genero: "Masculino",
	      modal:false,
	      name:'No name',
	      photo:'https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300',
	      loader2: false,
	      visible: false,
	      password: '',
	      validPassword:false,
	      validName: false,
	      menu:0,
	      pass1:'',
	      pass2:' '
	    };
    	this.handlenameChange   = this.handlenameChange.bind(this);
    	this.handlepassChange   = this.handlepassChange.bind(this);
    	this.handlepass2Change  = this.handlepass2Change.bind(this);
    }

  	static navigationOptions = {header: null};

	componentDidMount() {
	    this._isMounted = true;
	    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
	    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  	}

  	componentWillUnmount() {
	    this._isMounted = false;
  	}

 	async componentWillMount(){ 
	    try{
	      const settings = await loadSettings();
	      if (settings !== null) {
	        if (settings.user !== null & settings.token !== null){
	          this.setState({user:settings.user,languaje:settings.languaje,token:settings.token,notif:settings.notif,photo:settings.photo})
	          this.props.fetchDataUser(settings.user);
	        }
	      }
	    }
	    catch(error) {Alert.alert('Algo salió mal', error.toString())}
  	}

 	componentWillReceiveProps(nextprops){
	    if(this.props.user.item.data !== nextprops.user.item.data && nextprops.user.isFeching == false){
	      this.setState({data: nextprops.user.item.data,genr: nextprops.user.item.data.genero,name: nextprops.user.item.data.Nombre})
	      setTimeout(() => { this.setState({ loader: false});}, 1000);
	    }
	    else if (nextprops.user.isFeching == false) {
	      this.setState({loader:false});
	    }

	    if(nextprops.pass.item.data !== this.props.pass.item.data && nextprops.pass.isFeching == false){
	      this.setState({loader2:false,modal: false,pass1:'',pass2:'',pass1Error:null,pass2Error:null});
	    }

	    if(nextprops.edit.item.data !== this.props.edit.item.data && nextprops.edit.isFeching == false){
	      this.setState({loader2:false});
	    }
  	}

  	_onRefresh = () => {
	    if (this._isMounted) {
	      this.setState({refreshing: true,loader:false});
	      this.props.fetchDataUser(this.state.user);
	      if (this.state.loader = true) {
	        this.setState({refreshing: false})
	      }
	      else{
	        this.setState({refreshing: true})
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
	    } catch(error) {Alert.alert('Algo salió mal', error.toString())}
  	}

	handlenameChange(name) {
	    const { validName } = this.state;
	    this.setState({ name });
	    if (!validName) {
	      if (name.length > 4) {
	        this.setState({ validName: true ,nameError:null});
	      }
	      else{
	        this.setState(() => ({ nameError: 'Nombre debe contener al menos 3 caracteres'}));
	      }
	    } else if (name.length <= 4) {
	      this.setState({ validName: false ,nameError:null});
	    }
	}

  	handlepassChange(pass) {
	    this.setState({pass1: pass });
	    if (pass.length > 6) {
	      this.setState({pass1Error:null});
	    }
	    else{
	      this.setState(() => ({ pass1Error: 'La contraseña debe contener al menos 6 caracteres'}));
	    }
  	}

  	handlepass2Change(pass) {
	    this.setState({pass1Error:null,pass2Error:null});
	    this.setState({pass2: pass });
	    if (pass.length < 6) {
	      this.setState(() => ({ pass2Error: 'La contraseña debe contener al menos 6 caracteres'}));
	    }
	    else if (pass != this.state.pass1) {
	      this.setState(() => ({ pass2Error: 'Las contraseñas no coinciden'}));
	    }
	    else{
	      this.setState({pass2Error:null});
	    }
  	}

  	update = (index) =>{
	    if (index == 2) {
	      this.setState({ pass2Error: null ,pass1Error:null});
	      if (this.state.pass1.trim() == '') {
	        this.setState(() => ({ pass1Error: 'La contraseña debe contener al menos 6 caracteres1'}));
	      }
	      else if(this.state.pass2.trim() == ''){
	        this.setState(() => ({ pass2Error: 'La contraseña debe contener al menos 6 caracteres2'}));
	      }
	      else if(this.state.pass2.length < 6){
	        this.setState(() => ({ pass2Error: 'La contraseña debe contener al menos 6 caracteres3'}));
	      }
	      else if(this.state.pass1.length < 6){
	        this.setState(() => ({ pass1Error: 'La contraseña debe contener al menos 6 caracteres4'}));
	      }
	      else if(this.state.pass2 != this.state.pass1){
	        this.setState(() => ({ pass2Error: 'Las contraseñas no coinciden'}));
	      }
	      else{
	        this.setState({visible: false });
	        this.props.fetchDataPass({Cod_usuario:this.state.user,Password:this.state.pass1})
	      }
	    }
	    else{
	      this.setState({ generoError: null ,nameError:null});
	      if (this.state.name.trim() == '') {
	        this.setState(() => ({ nameError: 'Nombre debe contener al menos 3 caracteres'}));
	      }
	      else if(this.state.name.length <= 4){
	         this.setState(() => ({ nameError: 'Nombre debe contener al menos 3 caracteres'}));
	      }
	      else if (this.state.genero.trim() == '') {
	        this.setState(() => ({ generoError: 'Seleccione el genero'}));
	      }
	      else{
	        this.setState({visible: false });
	        this.props.fetchuseredit({Cod_usuario:this.state.user,Nombre:this.state.name,genero:this.state.genero,email:this.state.data.email})
	      }
	    }
    }

    _keyboardDidShow = () => {
        this.setState({
          dialogStyle: {
              //top: -1 * (width / 4),
              //borderRadius: 20,
              //padding: 10,
              position: 'absolute', 
              top: 0
          },
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            dialogStyle: {
              //borderRadius: 20,
              //padding: 10,
              overflow: 'hidden',
            },
      })
    }

    editinfo(){
	    return(
	      <Block>
	        <StatusBar hidden={this.state.visible} />
	        <Dialog
	          visible={this.state.visible}
	          onTouchOutside={() => {this.setState({ visible: false });}}
	          onHardwareBackPress={() => {this.setState({ visible: false });}}
	          width={0.9}
	          rounded
	          dialogStyle={this.state.dialogStyle}
	          dialogTitle={
	            <Block style={{backgroundColor:design.theme.COLORS.PRIMARY2,paddingTop:design.height * 0.015,paddingBottom:design.height * 0.010,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8}}>
	              <Block style={{marginLeft:design.width * 0.05,marginRight:design.width * 0.05,flexDirection:'row',justifyContent: 'space-between'}}>
	                {this.state.menu == 1
	                ?<Text p bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={{marginLeft:10,width:design.width * 0.7,fontFamily: "SFProText-Semibold"}}>Perfil</Text>
	                :<Text p bold numberOfLines={1} color={design.theme.COLORS.WHITE} style={{marginLeft:10,width:design.width * 0.7,fontFamily: "SFProText-Semibold"}}>Contraseña</Text>
	                }
	                <TouchableOpacity onPress={() =>this.setState({ visible: false })}>
	                  <Icon
	                    family='antdesign'
	                    color={design.theme.COLORS.GREY2}
	                    size={design.theme.SIZES.BASE * 1.3}
	                    name='closecircle'
	                  />
	                </TouchableOpacity>  
	              </Block>
	            </Block>
	          } 
	        >
	          <DialogContent>
	            {this.state.menu == 1
	            ?<Block>
	              <Input
	                borderless
	                placeholder="Nombre"
	                style={design.style.input4}
	                placeholderTextColor={design.theme.COLORS.TEXT2}
	                color={design.theme.COLORS.TEXT}
	                value={this.state.name || "Nombre"}
	                onChangeText={this.handlenameChange}
	              />
	              {!!this.state.nameError && (
	                <Text style={design.style.texterror}>{this.state.nameError}</Text>
	              )}
	              <Text muted size={design.theme.SIZES.FONT * 1}>Genero</Text>
	              <Picker
	                //iosHeader="Start Year"
	                selectedValue={this.state.genero}
	                style={{width: design.width * 0.8}} 
	                itemStyle={{height: design.width * 0.30}}         
	                onValueChange={(itemValue, itemIndex) =>{this.setState({'genero': itemValue})}}
	              >
	                <Picker.Item label="Seleccione" value="" />
	                <Picker.Item label="Masculino" value="Masculino" />
	                <Picker.Item label="Femenino" value="Femenino" />
	              </Picker>
	              {!!this.state.generoError && (
	                <Text style={design.style.texterror}>{this.state.generoError}</Text>
	              )}
	              <Block center style={{justifyContent: 'center',alignItems: 'center',marginTop:15}}>
	                <Button round size="small" color={design.theme.COLORS.PRIMARY2} style={{height:design.height * 0.06,width:design.width * 0.4}} onPress={() => {this.update()}}>
	                  Actualizar
	                </Button>
	              </Block>
	             </Block>
	            :<Block>
	              <Input
	                borderless
	                placeholder="Contraseña nueva"
	                style={design.style.input4}
	                placeholderTextColor={design.theme.COLORS.TEXT2}
	                color={design.theme.COLORS.TEXT}
	                onChangeText={this.handlepassChange}
	              />
	              {!!this.state.pass1Error && (
	                <Text style={design.style.texterror}>{this.state.pass1Error}</Text>
	              )}
	              <Input
	                borderless
	                placeholder="Repetir contraseña"
	                style={design.style.input4}
	                placeholderTextColor={design.theme.COLORS.TEXT2}
	                color={design.theme.COLORS.TEXT}
	                onChangeText={this.handlepass2Change}
	              />
	              {!!this.state.pass2Error && (
	                <Text style={design.style.texterror}>{this.state.pass2Error}</Text>
	              )}
	              <Block center style={{justifyContent: 'center',alignItems: 'center',marginTop:15}}>
	                <Button round size="small" color={design.theme.COLORS.PRIMARY2} style={{height:design.height * 0.06,width:design.width * 0.4}} onPress={() => {this.update(2)}}>
	                  Actualizar
	                </Button>
	              </Block>
	             </Block>
	            }
	          </DialogContent>
	        </Dialog>
	      </Block>
	    )
    }


  	render() {

	    if (this.state.loader == true & this.state.refreshing == false){
	      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
	    }

	   	return ( 
	    	<Block>
	      		<ScrollView>
			        <Block style={{marginTop:design.statusbar,marginLeft:design.width * 0.05,marginRight:design.width * 0.05}}>
			          <Block>
			            <MaterialInitials
			              style={{alignSelf: 'center',marginTop:design.statusbar}}
			              backgroundColor={'#002976'}
			              color={'white'}
			              size={design.width / 3}
			              text={this.state.name}
			              single={false}
			              src={this.state.photo}
			            />
			            <Text center h4 style={{marginTop:10}} bold color={'#323643'}>{this.state.data.Nombre}</Text>
			            <Text center h5>{this.state.data.email}</Text>
			          </Block>
			          <Block style={{marginTop:20}}>  
			            <Text h4 color={'#002976'}>Perfil</Text>
			            <Block row space="between" style={{alignItems: 'flex-end', marginTop:10,marginBottom:10}}>
			              <Block>
			                <Text gray2 style={{ marginBottom: 10 }}>Usuario</Text>
			                <Text bold>{this.state.data.User}</Text>
			              </Block>
			            </Block>
			            <Block row space="between" style={{alignItems: 'flex-end', marginTop:10,marginBottom:10}}>
			              <Block>
			                <Text gray2 style={{ marginBottom: 10 }}>Correo</Text>
			                <Text bold>{this.state.data.email}</Text>
			              </Block>
			            </Block>
			            <Block row space="between" style={{alignItems: 'flex-end', marginTop:10,marginBottom:10}}>
			              <Block>
			                <Text gray2 style={{ marginBottom: 10 }}>Nombre</Text>
			                <Text bold>{this.state.name}</Text>
			              </Block>
			              <TouchableOpacity onPress={()=>{this.setState({ visible: true , menu: 1})}}>
			                <Text medium secondary>Edit</Text>
			              </TouchableOpacity>
			            </Block>
			            <Block row space="between" style={{alignItems: 'flex-end', marginTop:10,marginBottom:10}}>
			              <Block>
			                <Text gray2 style={{ marginBottom: 10 }}>Genero</Text>
			                <Text bold>{this.state.genero}</Text>
			              </Block>
			              <TouchableOpacity onPress={()=>{this.setState({ visible: true , menu: 1})}}>
			                <Text medium secondary>Edit</Text>
			              </TouchableOpacity>
			            </Block>
			            <Block
			              row
			              middle
			              space="between"
			              style={{ marginBottom: 10,marginTop:10 }}
			            >
			              <Text size={14}>Contraseña</Text>
			              <TouchableOpacity onPress={()=>{this.setState({ visible: true , menu: 2})}}>
			                <Text medium secondary>Edit</Text>
			              </TouchableOpacity>
			            </Block>
			          </Block>
			          <Block style={{marginTop:20}}>    
			            <Text h4 color={'#002976'}>Preferencias</Text><Text p>(Experimental)</Text>
			            <Block
			              row
			              middle
			              space="between"
			              style={{ marginBottom: 10,marginTop:10 }}
			            >
			              <Text size={14}>Notifiaciones</Text>
			              <Switch
			                value={this.state.notif}
			                color={'#002976'}
			                trackColor={'#002976'}
			                onChange={() => this.setState({notif: !this.state.notif})}
			              />
			            </Block>
			          </Block>
			          <Button round uppercase color={'#002976'} style={{marginTop:design.width * 0.05,marginBottom:design.width * 0.05}} onPress={()=>{this.off()}}>Cerrar Sesion</Button>
			        </Block>
		        	{this.editinfo()}
	      		</ScrollView>
			</Block>
    	)	
	}
}

const mapStateToProps = state => {
  return {user: state.user,pass: state.pass,edit:state.useredit}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataUser: (id) => {return dispatch(fetchDataUser(id))},
    fetchDataPass: (data) => {return dispatch(fetchDataPass(data))},
    fetchuseredit: (data) => {return dispatch(fetchuseredit(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configure)