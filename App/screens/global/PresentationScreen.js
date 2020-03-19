import React from 'react';
import {StatusBar,Image,NetInfo} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StackActions,NavigationActions} from 'react-navigation';
import {Text, Button, Block, NavBar} from 'galio-framework';
import design from '@config/style/Style';
import {loadSettings} from '@config/SettingsStorage';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'

const iphoneImage = require('@assets/img/iphone.png');
const logo        = require('@assets/img/logo.png');

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

const Home = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Home_ini' }),
});

const resetHome = NavigationActions.navigate({
  routeName: 'Home_Pag',
  params: {},
  index: 0,
  action: [NavigationActions.navigate({ routeName: 'Home_ini' })],
});

class Presentation extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showRealApp: false,
      cargando:false,
      slide:[],
      languaje:null,
      install:null,
      notif:null,
      token:null,
      loader:true
    };
  }

  static navigationOptions = {
    header: null,
  };

  Welcome(languaje,user,notif,token){
    const Welcome = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'}),  
      ],
    });
    this.props.navigation.dispatch(Welcome);
  }

  async componentWillMount(){ 
    try{
      const settings = await loadSettings();
      if (settings !== null) {
        if (settings.user !== null & settings.token !== null){
          this.props.navigation.dispatch(Home);
        }
        else if (settings.install !== null) {
          this.Welcome(settings.languaje,settings.user,settings.notif,settings.token);
        }
        else{
          this.setState({loader:false});
        }
        SplashScreen.hide(); 
      }
    }
    catch(error) {
      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
    }
  }
   
  render() {
    if (!this.state.loader){    
      return (
        <Block flex>
          <StatusBar hidden={false} barStyle="dark-content" translucent backgroundColor={"transparent"}/>
          <LinearGradient
            colors={['#3C5A99', '#002D73']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={design.style.backgroundGradient}
          />
          <Block flex center style={design.style.container1}>
            <Block flex middle style={design.style.container2}>
              <Image source={logo} style={design.style.logo} />
              <Text center size={design.theme.SIZES.FONT * 0.875} color={design.theme.COLORS.WHITE} style={design.style.textpresentation}>
                Los mejores productos al mejor precio en un
                solo lugar.
              </Text>
              <Button size="large" color="transparent" round onPress={() => this.props.navigation.dispatch(resetAction)}>
                Empecemos
              </Button>
            </Block>
            <Block flex style={{ marginBottom: -design.statusbar * 5 }}>
              <Image source={iphoneImage} style={ design.width } />
            </Block>
          </Block>
        </Block>
      )
    }

    return (
      <Block flex>
        <LinearGradient
          colors={['#3C5A99', '#002D73']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={design.style.backgroundGradient}
        />
        <Block flex center>
          <Block flex middle>
            <Image source={logo} style={design.style.logo} />
            <Text h5 color={design.theme.COLORS.WHITE}>Cargando las mejores ofertas...</Text>
          </Block>
        </Block> 
      </Block> 
    )
  }
}

export default Presentation;