import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { createStackNavigator,createBottomTabNavigator,createAppContainer,TabBarBottom,createSwitchNavigator} from 'react-navigation';
import {Icon,Item,Text,View} from "native-base";
import globals from "../styles/globals";
//idioma
import I18n from '../config/LanguageService';
//Login
	import Welcome from '../screens/login/welcomescreen';
	import Login from '../screens/login/loginscreen';
	import Resetpassword from '../screens/login/resetscreen';
	import Signup from '../screens/login/signupscreen';
//Main menus
  import Home from '../screens/menu/home/homescreen';
//Budget
  import Budget from '../screens/menu/budget/budgetscreen';
  import Budget_det from '../screens/menu/budget/budgetdetscreen';
//Shop
  import Category from '../screens/menu/shop/categoryscreen';
  import Shop_Catg from '../screens/menu/shop/shopscreen';
  import Store_det from '../screens/menu/shop/shopdetscreen';
  import Promo from '../screens/menu/shop/promoscreen';
//Configure
  import Configure from '../screens/menu/configure/configurescreen';
//Start screens
	import Beforestarting from '../screens/initial/beforestartingscreen';
  import Initialslide from '../screens/initial/initialslidescreen';
//Global 
	import Help from '../screens/general/helpscreen';
  import Search from '../screens/general/searchscreen';
  import Result from '../screens/general/resultscreen';

const Login_ini  = createStackNavigator(
  {
    Initialslide: Initialslide,
    Welcome:Welcome,
    Login: Login,
    Signup: Signup,
    Resetpassword:Resetpassword,
    Help: Help,
    Beforestarting: Beforestarting,
  },
  {
    initialRouteName: 'Initialslide',
    //initialRouteName: 'Signup',
  }
);

//Inicio
const Home_Pag = createStackNavigator({
  
  Home_ini: {
    screen: Home
  },
   Search:{
    screen:Search,
  },
   Result:{
    screen:Result
  },
})

//Tiendas
const Shop_Pag = createStackNavigator({
  Category: {
    screen: Category
  },
  Shop_Catg:{
    screen: Shop_Catg
  },
  Store_det:{
    screen: Store_det
  },
  Promo:{
    screen: Promo
  },
   Search:{
    screen:Search,
  },
   Result:{
    screen:Result
  },
});

//Presupuesto
const Budget_Pag = createStackNavigator({
  Budget_ini:{
    screen: Budget
  },
  Budget_det:{
    screen:Budget_det
  },
  Search:{
    screen:Search,
  },
   Result:{
    screen:Result
  },
})

//Configuracion
const Confi_Pag = createStackNavigator({
  Confi_ini: {
    screen: Configure
  }, 
   Search:{
    screen:Search,
  },
   Result:{
    screen:Result
  },
})

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
          iconName = `home${focused ? '' : ''}`;
        } 
        else if (routeName === 'Budget') {
          iconName = `bookmarks${focused ? '' : ''}`;
        }
        else if (routeName === 'Shop') {
          iconName = `basket${focused ? '' : ''}`;
        } 
        else if (routeName === 'Configure') {
          iconName = `construct${focused ? '' : ''}`;
        }
        return(<Icon name={iconName} style={{fontSize: 25, color: tintColor,marginBottom:0,paddingBottom:0}}/>);
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let label;
        if (routeName === 'Home') {
          label = I18n.t('navigation.home');
        } 
        else if (routeName === 'Budget') {
          label = I18n.t('navigation.budget');
        }
        else if (routeName === 'Shop') {
          label = I18n.t('navigation.explorer');
        } 
        else if (routeName === 'Configure') {
          label = I18n.t('navigation.configuration');
        }
        return  <Text numberOfLines={1} style={{fontSize: 10,textAlign: 'center', color: tintColor}}>{label}</Text>; 
      },
    }),
    resetOnBlur:true,
    backBehavior:'initialRoute',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: globals.activeTintColor.color,
      inactiveTintColor: globals.inactiveTintColor.color,
      showIcon: true,
      showLabel: true,
      style:globals.navmenu
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
