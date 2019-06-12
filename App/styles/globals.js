import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import color from './themes/default';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';

const globals = StyleSheet.create({
	//Global style
		//text
			title:{color:color.PRIMARY,textAlign: 'center',marginBottom:15,fontWeight:'bold'},
			title2:{color:color.GREY},
			title5:{color:color.PRIMARY},
			textdatepicker:{color:color.GREY,width:wp(80)},
			title3:{color:color.PRIMARY,textAlign: 'center'},
			title4:{color:color.PRIMARY,fontWeight:'bold',fontSize:18,marginBottom:10},
			textheader:{color:color.PRIMARY,fontWeight:'bold',fontFamily: "OpenSans-Light",marginBottom: 10,fontSize:18},
			texttitle:{color:color.PRIMARY,fontWeight: 'bold',marginTop:10,fontFamily: "OpenSans-Light",fontSize:19},
			text:{color:color.GREY,fontSize:15,fontWeight:'400'},
			text5:{color:color.GREY,fontSize:20,fontWeight:'400'},
			textoff:{color:color.DANGER3,fontFamily: "OpenSans-Light",fontWeight:'bold'},
			text2:{color:color.DANGER3,fontFamily: "OpenSans-Light"},
			text3:{color:color.PRIMARY,fontFamily: "OpenSans-Light"},
			text4:{color:color.PRIMARY,textAlign:'left',fontWeight: 'bold',fontSize: 20,paddingTop:10},
			texterror:{color:color.DANGER,paddingTop:5},
			focus:{color:color.PRIMARY,fontWeight:'bold'},
			notfocus:{color:color.BORDERD},
			body:{backgroundColor:color.GRISLIGHT2,borderColor:color.GRISLIGHT2,flex:1},
			status:{color:color.STATUS},
			refresh:{color:color.REFRESH,backgroundColor:color.REFRESH2,borderColor:color.REFRESH3},
		//button
			button:{backgroundColor:color.PRIMARY},
			button_line:{borderColor:color.PRIMARY},
		//Nav
			activeTintColor:{color:color.PRIMARY},
			inactiveTintColor:{color:color.GREY},
		//view
			content:{marginLeft:15,marginRight:15},
			contenttop:{marginTop:15},
			center:{justifyContent: 'center',alignItems: 'center',alignSelf: 'center',textAlign: 'center'},
		//Fullimg
			contenedor_full:{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'black'},
			imgfull:{width:wp(100),height:hp(50)},
			pagination_full:{width: 12,height: 12,borderRadius: 4,marginHorizontal: 2},
			cont_full_ico:{alignItems:'flex-end',backgroundColor:'black'},
			full_ico:{color:'white',marginTop:10,marginRight:10},
		//spinner
		 	spinner:{alignSelf: 'center',zIndex:6},
		 	contenedor_spi:{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#000',opacity:0.5},
		 	contenedor_spi2:{justifyContent: 'center',alignItems: 'center',},
		 	contenedor:{justifyContent: 'center',alignItems: 'center'},
		 	spinner2:{justifyContent: 'center',alignItems: 'center'},
		 	img_spinner:{height: 100,width:100,},
		 	img_spinner2:{height:hp(60),width:wp(25)},
		 	img_spinner3:{height:300,width:300},
		//mix
			separador:{borderColor:color.GREY,borderBottomWidth:0.5},	
			object_center:{marginLeft: 'auto',marginRight: 'auto',marginTop: 'auto',marginBottom:'auto'},
			object_center2:{marginTop: 'auto',marginBottom:'auto'},
		//render_img
			renderview:{flex: 1,marginTop:10,marginBottom: 15,marginLeft: 10,marginRight: 10},
			img_rowc:{borderRadius: 8,alignItems:'center',shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8,height:hp(15)},
			img_row:{alignItems:'center',borderRadius:8,width:'100%',height:hp(15)},
			imgresult:{height:wp(30),width:wp(30),backgroundColor:'red'},
			//flex
			separator: {flex: 1,textAlign: 'left'},
	    //img
	    	logo_header_b:{width:'100%',height: '70%'},
	    	logo_header_n:{width:'100%',height: '80%',flex: 1},
	    	img:{width:150,height:40},
	    //search
	    	inp_search:{height:'70%' ,width:'100%',backgroundColor:color.GG},
	    	ico_search:{fontSize: 35, color: color.GREY},
	    	ico_search2:{color:'black',marginRight:5},
	    	ico_close: {marginRight:20,color: color.GREY},
	    	ico_delete:{marginRight:3,color: color.GREY},
	    	ico_back:{marginLeft:3,color: color.GREY},
	    //result
	    	list_resul:{borderBottomWidth: 0,marginRight:20},
	    	ico_resul:{marginRight:10,color:color.GG},
	    	ico_resul2:{color:color.GG},
	    	contenc_full:{width:'100%'},
	    	view_load:{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',paddingTop:'40%',paddingBottom:'10%'},
			view_sech:{justifyContent: 'center',alignItems: 'center',borderBottomColor:color.GREY,borderBottomWidth: 1,marginBottom:2,height:50,marginRight:20,marginLeft:20,marginTop:10},
			img_sech:{width:130, height:40,margin:0,padding:0},
			fix_resul:{marginBottom:'20%'},
			view_histori:{borderBottomColor:color.GREY,borderBottomWidth: 1,height:100,marginLeft:20,marginRight:20,marginTop:10,marginBottom:10},
			fix_resul2:{height:100},
			imgfix:{width:200,height: 200},
			imgfix2:{width:'100%',height: '100%',marginLeft:'-7%'},
		//Modal
		    ListItemh:{height:50},
			h1_title:{alignSelf: 'flex-start',marginLeft:20,marginBottom:10,marginTop:10},
			tex_title_m:{marginLeft:'5%',color:color.PRIMARY,fontWeight:'bold'},
			fix_left:{borderBottomColor: '#bbb',borderColor:'transparent',borderWidth: 0.5,marginRight:0,paddingRight:0},
			tex_title_new:{marginLeft:'5%',color:'white',fontWeight:'bold',fontSize:19},
			view_title:{paddingLeft:0,marginLeft:0},
			view_title2:{paddingLeft:0,marginLeft:0,backgroundColor:color.PRIMARY,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8},
			close_ico: {fontSize: 25, color: 'black'},
			close_ico_new:{fontSize:25,color:'white'},
			fix_header:{flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center",marginLeft:-10,paddingLeft:-10,borderBottomColor:'#DBDBDB',borderBottomWidth: 1,backgroundColor: "#FFFFFF",borderLeftColor:'white',borderLeftWidth:0,borderRightWidth:0},
			accordion:{backgroundColor: '#FFFFFF',marginLeft:0,paddingLeft:0,width:'100%',paddingTop:10},
		//Modal Product
			DialogButton:{borderRadius:8,backgroundColor:color.PRIMARY,marginTop:15},
			DialogButtontext:{color:color.PRIMARY,fontSize:18,fontFamily: "OpenSans-Light"},
			img_prodc:{alignItems:'center',borderRadius:8,width:'90%',height:hp(20)},
			img_prod:{alignItems:'center',borderRadius:8,width:'100%',height:hp(20)},
			img_prod_c:{alignItems:'center',borderRadius:8,width:wp(35),height:hp(20),marginBottom:10},
			fix_carusl:{width:wp(40)},
			view_prod_c:{width:'100%',justifyContent: 'center',alignItems: 'center'},
			view_numeric: {alignItems:'flex-end',marginTop:15},
			pagination: {width: 8,height: 8,borderRadius: 4,marginHorizontal: 8},
			textprec: {color:color.PRIMARY,fontWeight:'bold',fontFamily: "OpenSans-Light",fontSize:22,textAlign:'right'},
			textotal: {color:color.GREY,paddingTop:5,fontWeight:'bold',fontFamily: "OpenSans-Light",fontSize:22,textAlign:'right'},
			inputStyle:{color: color.PRIMARY,fontWeight:'bold',fontSize:22,backgroundColor:'white', borderColor: '#d4d4d4',borderWidth: 1},
			iconStyle:{color: color.PRIMARY,fontSize:25,fontWeight:'bold'},
			det:{marginTop:15,color: color.PRIMARY,fontSize:20,marginTop:15},
			view_prod:{marginTop:10,   justifyContent: 'center',alignItems: 'center'},
			view_prod2:{justifyContent: 'center',alignItems: 'center',marginLeft:40,marginRight:40,marginTop:10,marginBottom:10},
		//Nav header
			nav:{color:color.GREY,flex: 1, textAlign: 'center',justifyContent: 'center'},
			navstyle:{backgroundColor:color.GRISLIGHT2,color:color.GREY},
			navmenu:{backgroundColor:color.GRISLIGHT2,shadowColor: "#000",shadowOffset: {width: 0,height: 12,},shadowOpacity: 0.58,shadowRadius: 16.00,elevation: 24,},
			fix_ico:{marginTop:6},
			view_nav:{flex: 1, alignItems: "center" ,marginLeft: 56},
	//Screen
		//Welcome
			imgwel :{width: 100, height: 100},
			buttonregis:{width: wp(55),height: 40},
			icologin:{fontSize: 50, color: 'white',marginTop:30 },
			viewimgwel:{justifyContent: 'center',alignItems: 'center',marginBottom: 15},
			flexicon:{flexDirection: 'row',justifyContent: 'center',marginTop: 50},
			view_button:{marginRight: 'auto',marginLeft: 'auto',marginTop: 'auto',marginBottom:'auto'},
		//Login
			viewlogin:{marginTop: '10%',marginBottom:'auto',marginLeft: 20,marginRight: 20},
			img_login:{width: 120, height: 120},
			form:{marginRight: 'auto',marginLeft: 'auto'},
			inputbordered:{color:'white',height: 40,fontSize: 16},
			buttonlogin:{backgroundColor:color.SUCCESS,marginTop:20,width:'60%',alignSelf: 'center',marginBottom:10},
			button_login:{backgroundColor: color.PRIMARY,width:'50%',marginTop:20,alignSelf: 'center',justifyContent: 'center',alignItems: 'center'},
		//Singup
			viewsignup:{marginBottom:'auto',marginLeft: 20,marginRight: 20},
			texterror2:{color: color.DANGER,fontWeight:'bold',marginTop:-15,paddingBottom:10},
		//Initialslide
			ico_ini:{backgroundColor: 'transparent' ,color:'white'},
			ico_ini2:{backgroundColor: 'transparent' ,fontSize: 200,color:'white'},
			mainContent: {flex: 1},
			dotStyleslide:{backgroundColor:'rgba(255, 255, 255, .9)'},
			activeDotStyleslide:{backgroundColor:color.PRIMARY},
			text_ini: {color: 'white',backgroundColor: 'transparent',textAlign: 'center',paddingHorizontal: 16},
			title_ini: {fontSize: 22,color: 'white',backgroundColor: 'transparent',textAlign: 'center',marginBottom: 16},
		//Swipe
			view_slide:{flex: 1,flexDirection: 'column',justifyContent: 'center',},
			view_slide2:{width:wp(100),marginTop:5,marginBottom:5},
   			slide_s:{width:'100%',height:'40%',borderBottomLeftRadius:0,borderTopLeftRadius:0,backgroundColor:color.SUCCESS3},
   			slide_d:{width:'100%',height:'40%',borderBottomRightRadius:0,borderTopRightRadius:0,backgroundColor:color.DANGER3},
   			img_swipe:{width:'100%',borderRadius:15,alignItems: 'center',height:wp(25)},
   			view_swipe:{width:'80%',borderRadius:15,marginLeft:15,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8,height:wp(25)},
   			icon1:{fontSize: 18 ,color: color.WARNING3},
  			icon2:{fontSize: 18 ,color: "black"},
  			leftOpenValue:{width:wp(45)},
			rightOpenValue:{width:-wp(45)}, 
			searchtext:{marginLeft:wp(13)},
			Thumbnail:{width:wp(8),height:wp(8),marginBottom:10},
  		//Resetscreen
  			viewiconback:{alignContent: 'stretch',marginLeft: 20,marginTop: 10},
  			imgheader:{width: 120,height: 40},
	//Component
		//imgcompont
			containerimg: {backgroundColor:color.IMGFOND},
			imageOverlay: {position: 'absolute',left: 0,right: 0,bottom: 0,top: 0},
		//Inicategory
			btn:{backgroundColor:color.PRIMARY,width: '80%',height: 45, borderColor: color.GRISLIGHT2,borderWidth: 0,borderRadius: 20,justifyContent: 'center',alignItems: 'center',alignSelf: 'center'},
			btnTxt:{fontFamily: "Roboto",fontSize:15},
			disabledBtn:{backgroundColor: color.PRIMARY, borderColor: color.GRISLIGHT2},
			tickTxt:{backgroundColor: color.PRIMARY,alignItems:'flex-start'},
			activeI:{borderColor: color.PRIMARY},
			itemBox:{borderColor:"transparent"},
		//Budget
			errorimg:{width:wp(80),height:hp(40)},
			viewbudget:{margin:10,backgroundColor:'white',borderWidth: 1,shadowOffset: { width: 1, height: 1 },shadowOpacity: 0.2,elevation: 6,borderColor: 'white',   borderRadius: 8},
			containerbudget:{marginBottom:15,marginLeft:25,marginRight:25,backgroundColor: 'transparent'},
			imgbudget:{width:wp(20),height:hp(10),justifyContent:'flex-start',alignItems:'flex-start'},
			icobudget:{fontSize: 25, color: color.DANGER3},
			icoshare:{fontSize: 25, color: color.GREY,marginRight:15},
			icoheart:{paddingRight:15,paddingTop:5,color: '#ED4A6A',fontSize: 25},
			viewico:{flexDirection: 'row', alignItems: 'center' ,marginTop:5},
			icomore:{backgroundColor: color.PRIMARY},
			iconew:{backgroundColor: color.SUCCESS2},
			icoadd:{backgroundColor: color.WARNING2},
			img_row3: {alignItems: 'center',width:'70%',height:50,borderRadius:10},
			viem_pp:{borderTopWidth: 1,borderTopColor: color.GREY,marginLeft:10,marginRight:10,marginTop:10},
			filter:{alignSelf: 'flex-end',paddingTop:-20},
			grip_top:{marginTop:10,marginLeft:10,marginRight:10,marginBottom:'15%'},
			cont_budget:{marginLeft:15,marginRight:15,marginTop:25},
			ico_deleteb:{color:color.DANGER3},
			ico_notif:{color:color.WARNING3},
			input_date:{borderBottomWidth: 0.5,borderBottomColor: color.GREY,width:'100%'},
			place_date:{width:'100%'},	
			view_det:{margin:10,borderTopColor: color.GG,borderTopWidth: 0.5},	
		//ProductShop
			no_margin:{marginTop:0,marginLeft:0,marginBottom: 15},
			img_d_shop:{marginTop:0,alignItems: 'center',width:'100%',height:150},
			text_top_1:{alignItems: 'center',textAlign: 'center',marginTop:5},
			listitemfix:{marginLeft: 0,paddingLeft: 0},
			iconclose:{color:'black'},
		//Configure
			fixlist:{marginLeft:0,marginRight:0},
			h2config:{fontSize:20,color:color.PRIMARY,fontWeight:'bold',paddingBottom:10},
			iconconfig:{fontSize:30,color:color.PRIMARY},
			viwconfig:{marginLeft:30,marginRight:30,paddingTop:30,paddingBottom:20},
			viewconfig1:{flexDirection: 'row',marginLeft:30,marginRight:30},
			nameconfig:{width: '70%',marginTop:'auto',marginBottom:'auto'},
			photoconfig:{width: '30%',alignItems: 'flex-end'},
			menuconfig:{width: '25%', height: 50,alignItems: 'center'},
		//Productdet
			imgdet:{width:'100%',height:hp(30)},
			caruseldet:{width:wp(100)},
			imgdet2:{width:wp(100),height:hp(30)},
			space:{marginTop:10,marginBottom:10},
			containercarusel:{paddingVertical: 8,flex:1,marginTop:5, zIndex: 1,alignItems:'center'},
		//Shop
			bannerimg:{width:'100%',height:hp(20)},
			containerStyle:{paddingVertical: 8,flex:1,marginTop:5,width: 100,alignItems: 'center' ,alignSelf:  'center'},
			dotColor:{color: color.PRIMARY},
			inactiveDotColor:{color:color.GREY},
})

export default globals