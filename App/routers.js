import React, {Component} from 'react';
import {Image} from 'react-native';
import { createStackNavigator,createBottomTabNavigator,createAppContainer,TabBarBottom,createSwitchNavigator} from 'react-navigation';
//estilo
import {Text,Icon} from 'galio-framework';
import design from '@config/style/Style';
//global
import Presentation from '@screens/global/PresentationScreen';
import Help from '@screens/global/HelpScreen';
//screen de prueba
import Prueba from '@screens/global/AmbientScreen';
//authentication
import Login from '@screens/authentication/LoginScreen';
import Signup from '@screens/authentication/SignupScreen';
import Reset from '@screens/authentication/ResetScreen';
import Beforestarting from '@screens/authentication/StartingScreen';
//Home
import Home from '@screens/menu/HomeScreen';
//Explorer
import Category from '@screens/menu/Shop/CategoryScreen';
import Shop_Catg from '@screens/menu/Shop/ShopScreen';
import Store_det from '@screens/menu/Shop/ShopdetScreen';
//Budget
import Budget from '@screens/menu/Budget/BudgetScreen';
import Budget_det from '@screens/menu/Budget/BudgetdetScreen';
//Configure
import Configure from '@screens/menu/Configure/ConfigureScreen';
//Search
import Search from '@screens/menu/Search/SearchScreen';
import Result from '@screens/menu/Search/ResultScreen';

const Login_ini  = createStackNavigator(
  {
    //Initialslide: Initialslide,
    Welcome:Presentation,
    Login: Login,
    Signup: Signup,
    Resetpassword:Reset,
    Help: Help,
    Beforestarting: Beforestarting,
    Prueba:Prueba
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
    header: null,
    statusBarHidden: true,
  }
);

//Home
const Home_Pag = createStackNavigator(
  {
    Home_ini: Home,
    Search:Search,
    Result:Result,
  },
  {
    headerMode: 'none',
    header: null,
    statusBarHidden: true,
  }
);

//Explorer
const Shop_Pag = createStackNavigator(
  {
    Category: Category,
    Shop_Catg: Shop_Catg,
    Store_det: Store_det,
    Search:Search,
    Result:Result,
  },
  {
    headerMode: 'none',
    header: null,
    statusBarHidden: true,
  }
);

//Presupuesto
const Budget_Pag = createStackNavigator(
  {
    Budget_ini: Budget,
    Budget_det: Budget_det,
    Search:Search,
    Result:Result,
  },
  {
    headerMode: 'none',
    header: null,
    statusBarHidden: true,
  }
)

//Configuracion
const Confi_Pag = createStackNavigator(
  {
    Confi_ini: Configure
  },
  {
    headerMode: 'none',
    header: null,
    statusBarHidden: true,
  }
)

const TabNavigator = createBottomTabNavigator(
  { 
    Home: Home_Pag,
    Shop: Shop_Pag,
    Budget: Budget_Pag,
    Configure: Confi_Pag,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = require('./assets/img/menu/Inicio.png');
        } 
        else if (routeName === 'Shop') {
          iconName = require('./assets/img/menu/Explorar.png');
        } 
        else if (routeName === 'Budget') {
          iconName = require('./assets/img/menu/Presupuesto.png');
        }
        else if (routeName === 'Configure') {
          iconName = require('./assets/img/menu/Cuenta.png');
        }
        return(<Image style={{width: design.theme.SIZES.BASE * 4, height: design.theme.SIZES.BASE * 3,tintColor:tintColor}} source={iconName}/>)
        //return(<Icon family={family} color={tintColor} size={design.theme.SIZES.BASE * 1.7} name={iconName}/>);
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let label;
        return null
        //return  <Text numberOfLines={1} style={{fontSize: 10,textAlign: 'center', color: tintColor,fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal'}}>{label}</Text>; 
      },

    }),
    resetOnBlur:true,
    backBehavior:'initialRoute',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#002976',
      inactiveTintColor: '#9FA5AA',
      showIcon: true,
      showLabel: true,
    }, 
    
  }
)

export default createAppContainer(createSwitchNavigator
  (
  {
    Login_ini: Login_ini,
    Home_Pag: TabNavigator,
  },
  {
    initialRouteName: 'Login_ini',
  }
));