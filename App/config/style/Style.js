import {StyleSheet,Dimensions,Platform,StatusBar} from 'react-native';
import properties from './theme/Theme';

const { height, width } = Dimensions.get('window');
const statusbar = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

const theme = properties;
const MARGIN_LEFT = '5%';

const style = StyleSheet.create({
	
  flex_container:{flex:1},
  inner: {paddingTop:24,flex: 1,justifyContent: "flex-end",backgroundColor:'white'},
  container: { flex: 1,backgroundColor: theme.COLORS.WHITE,},
  backgroundGradient: {position: 'absolute',top: 0,bottom: 0,right: 0,left: 0,zIndex: 0,},

    //general
    center:{marginLeft: 'auto',marginRight: 'auto',marginTop: 'auto',marginBottom:'auto'},
    input2:{width: width * 0.9 ,borderColor: theme.COLORS.TEXT2},
    input3:{width: '100%' ,borderColor: theme.COLORS.PRIMARY2},
    input4: {alignSelf: 'center',width: width * 0.80,borderBottomColor: theme.COLORS.TEXT2,borderWidth: theme.SIZES.BASE * 0.04,borderRadius: 0,paddingHorizontal: 0,},
    texterror:{color:theme.COLORS.ERROR,marginLeft:width*0.05},
    search:{width:width * 0.9,borderRadius: 20,borderColor: '#DFDFDF'},
    search3:{width:width * 0.9,borderRadius: 20,borderColor: '#DFDFDF',marginRight:10},
    search2:{width:width * 0.9,borderRadius: 20},
    search3:{width:width * 0.85,borderRadius: 20,borderColor: '#DFDFDF',marginRight:20},
    prod_cont5:{width:width /2,flex: 1,marginTop:5,marginBottom: 15,marginRight: 5},
    prod_img5_c:{width:width /2.1,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8,height:height * 0.2},
    prod_img5:{width:width /2.1,height:height * 0.2},
    prod_cont3:{width:width /3,flex: 1,marginTop:5,marginBottom: 15,marginLeft: 5,marginRight: 5},
    prod_img3_c:{width:width /3,borderRadius: 22,alignItems:'center',shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8,height:height * 0.2},
    prod_img3:{width:width /3,alignItems:'center',borderRadius:22,width:'100%',height:height * 0.2},
    prod_cont4:{flex: 1,marginTop:5,marginBottom: 15,marginLeft: 5,marginRight: 5},
    prod_img4_c:{borderRadius: 22,alignItems:'center',shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8,height:height * 0.2},
    prod_img4:{alignItems:'center',borderRadius:22,width:'100%',height:height * 0.2},
    SearchText: {fontSize: 15,margin: 2,paddingLeft:10,paddingRight:10},
    SearchTextH: {width: '100%' ,fontSize: 15,margin: 2,paddingLeft:10,paddingRight:10},
    SearchTextn: {fontSize: 15,margin: 2,paddingLeft:10,paddingRight:10,color:'black'},
    list: {backgroundColor: 'white', borderTopWidth: 0,margin: 10,marginTop: 0,},
    list2: {width: '100%' ,backgroundColor: 'white', borderTopWidth: 0,margin: 10,marginTop: 0,},
    //prod
    //container_pro:{width:width/3 - 10,height: height/5,marginVertical:5,marginHorizontal:5,borderRadius:22,backgroundColor:theme.COLORS.WHITE,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8},
    prod_cont6:{width:width/3 - 10,height: width/3 - 10,backgroundColor:theme.COLORS.WHITE},
    prod_cont:{width:width/3 - 10,height: height / 4.5,borderRadius:22,marginVertical:5,marginHorizontal:5,backgroundColor:theme.COLORS.WHITE},
    container_pro:{width:width/3 - 10,height: height / 4.5,backgroundColor:theme.COLORS.WHITE},  
    img_pro:{width:width/3 - 10,height: height/4.5,borderRadius:22},

    prod_cont2x:{width:width/3 - 10,height: height / 4.5,borderColor: 'transparent',marginVertical: 5,marginHorizontal:5,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8},
    prod_img2x_c:{width:'auto',height: height / 4.5,borderRadius:22,backgroundColor:theme.COLORS.WHITE},
    prod_img2x:{width:'100%',height: height / 4.5,borderRadius:22},
    prod_cont1:{width:width * 0.25,height:width * 0.25,marginRight: 20,borderColor: 'transparent'},
    prod_img1_c:{width:'auto',height:width * 0.21,borderTopLeftRadius: 12,borderTopRightRadius:12,backgroundColor:theme.COLORS.WHITE},
    prod_img1:{width: '100%',height:width * 0.21,borderTopLeftRadius: 12,borderTopRightRadius:12},
    prod_text1_c:{backgroundColor: theme.COLORS.GREY3,width: 'auto',height:width * 0.04,borderBottomLeftRadius: 12,borderBottomRightRadius: 12},
    
    prod_cont2xc:{width:width/3 - 10,height:height * 0.19,borderColor: 'transparent',marginVertical:5,marginHorizontal:5},
    prod_img2_xc:{width:'auto',height:height * 0.16,borderTopLeftRadius: 10,borderTopRightRadius:10,backgroundColor:theme.COLORS.GREY2},
   
    prod_img2xc:{width:'100%',height:width / 2 - height * 0.05,borderTopRightRadius:10,borderTopLeftRadius:10},
   
    btn_next:{width: width * 0.1,height:100,borderColor: 'transparent'},
    btn_next2:{width: width * 0.65,height: 30,marginTop:5},
    //prod_cont2:{width:130,height:130,marginRight: 20,borderColor: 'transparent',marginVertical: 20},
    prod_cont2:{width:width * 0.32,height:height * 0.19,borderColor: 'transparent',marginRight: 20,marginVertical: 20},
    prod_img2_c:{width:'auto',height:height * 0.16,borderTopLeftRadius: 10,borderTopRightRadius:10,backgroundColor:theme.COLORS.GREY2},
    prod_img2:{width:'100%',height:height * 0.16,borderTopRightRadius:10,borderTopLeftRadius:10},
    
    //Screen
      //startingscreen
        btn:{backgroundColor:theme.COLORS.PRIMARY2,width: '80%', borderColor: theme.COLORS.GREY,borderWidth: 0,borderRadius: 20,justifyContent: 'center',alignItems: 'center',alignSelf: 'center'},
        tickTxt:{backgroundColor: theme.COLORS.PRIMARY},
        disabledBtn:{backgroundColor: theme.COLORS.PRIMARY, borderColor: theme.COLORS.GREY},
        card: {backgroundColor: theme.COLORS.WHITE,elevation: theme.SIZES.BASE / 2,},
        full: {position: 'absolute',bottom: 0,right: 0,left: 0,},
      //presentationscreen
        logo:{width: width ,height: height/3.5,resizeMode: 'contain'},
        textpresentation:{marginBottom: theme.SIZES.BASE * 1.875, paddingHorizontal: theme.SIZES.BASE * 2 },
        container1:{paddingHorizontal: theme.SIZES.BASE,},
        container2:{justifyContent: 'flex-end', marginBottom: theme.SIZES.BASE * 2.5 },
      //helpsscreen
        header:{width: '40%',marginLeft: MARGIN_LEFT},
        iconclose:{paddingTop: statusbar,marginLeft: MARGIN_LEFT,marginRight: MARGIN_LEFT},
        container3:{marginVertical: theme.SIZES.BASE * 1.875},
      //loginscreen
        container4:{marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 },
        social: {width: theme.SIZES.BASE * 3.5, height: theme.SIZES.BASE * 3.5,borderRadius: theme.SIZES.BASE * 1.75,borderColor: '#707070',justifyContent: 'center',},
      //signupscreen  
        container5: {backgroundColor: theme.COLORS.WHITE},
        input: {alignSelf: 'center',width: width * 0.89,borderBottomColor: theme.COLORS.TEXT2,borderWidth: theme.SIZES.BASE * 0.04,borderRadius: 0,paddingHorizontal: 0,},
        button: {marginVertical: 10,width: width * 0.89,height:40},
        buttonreset: {marginVertical: 10,width: width * 0.89,height:45},
        buttonText: {fontSize: 16,color: theme.COLORS.WHITE,backgroundColor: 'transparent',marginLeft: 'auto',marginRight: 'auto',marginTop: 'auto',marginBottom:'auto'},
        linearGradient: {paddingLeft: 15, paddingRight: 15,borderRadius: 20,shadowColor: '#30C1DD',shadowRadius: 20,shadowOpacity: 0.6,elevation: 8,},
      //homescreen
        imgbanner:{width:width * 0.9,height: height * 0.20,borderRadius: 10},
        carusel_view:{height: height * 0.20 ,borderRadius: 10},
        container_pagination:{zIndex: 0,marginTop: height* 0.13,width:width * 0.9, position: 'absolute'},
        dotStyle:{width: 10,height: 10,borderRadius: 5,marginHorizontal: 8},
        bannerstyle:{borderBottomRightRadius:height * 0.30 /8,borderBottomLeftRadius:height * 0.30 /8},
        contentbanner:{height: height * 0.20 ,borderRadius: 10 ,marginTop: 5},
        container_wondiselect:{zIndex: -1,height:height / 3.2 + statusbar, marginBottom:width * 0.02},
        wondiselectstyle:{borderRadius: height * 0.30 /8},
        container_wondiselect2:{marginLeft:width * 0.05,marginTop:height * 0.05},
      //categoryscreen
        content_push4:{width:'100%',borderRadius: 15,width:'100%',height:height / 6,backgroundColor:theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5},
        content_prod4:{width:'100%',height:'auto'},
        content_img4:{width:'100%',height: height / 6,borderRadius: 15}, 
      //shopscreen 
        prod_text2_c:{backgroundColor: theme.COLORS.GREY3,width: 'auto',height:'auto',padding:'0.5%',borderBottomLeftRadius: 10,borderBottomRightRadius: 10},
        prod_text2:{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal',marginLeft:5,marginRight:5},
        content_push5:{width:'100%',borderRadius: 15,width:'100%',height:'auto',backgroundColor:theme.COLORS.GREY3,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5},
        content_img5:{width:'100%',height: height / 6,borderTopLeftRadius: 10,borderTopRightRadius: 10},
      //shopdetscreen
        icon_shop:{flexDirection: 'row',justifyContent: 'flex-end',alignItems:'flex-end',position: "absolute",top:height * 0.28,left:width -  100},
        headerpop2:{marginLeft:width * 0.05,marginRight:width * 0.05,flexDirection:'row',justifyContent: 'space-between'},
      //budgetscreen
        containerb: {flex: 1,marginTop: 0,margin:width * 0.05},    
        topbudget:{marginBottom:20,marginLeft:width *0.05,marginTop:statusbar},
        floatingButton:{resizeMode: 'contain',width: 80,height: 80},
        pushfloating:{position: 'absolute',width: 50,height: 50,alignItems: 'center',justifyContent: 'center',right: 30,bottom: 30},
        leftSwipeItem: {flex: 1,alignItems: 'flex-end',justifyContent: 'center',paddingRight: 20,backgroundColor:theme.COLORS.DELETE ,zIndex: -1,borderTopRightRadius:22,borderBottomRightRadius:22},
        iconleftswipe:{width: width * 0.08, height: width * 0.08,overflow: "hidden",justifyContent: 'center'},
        rightSwipeItem:{flex: 1,justifyContent: 'center',paddingLeft: 20,backgroundColor: theme.COLORS.SHARE,zIndex: -1,borderTopLeftRadius:22,borderBottomLeftRadius:22},
        iconrightswipe:{width:width * 0.08, height:width * 0.08,overflow: "hidden",justifyContent: 'center'},
        cardbugdet:{shadowColor: "#000",shadowOffset: {width: 0,height: 3,},shadowOpacity: 0.29,shadowRadius: 4.65,elevation: 7,marginRight:10,marginLeft:10,zIndex: 1 ,flexDirection: 'row', flex:1, borderRadius:10,backgroundColor:'white',height:height * 0.13},
        part1:{height:height * 0.13,width: '25%',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'},
        partimg:{width: width * 0.15, height: width * 0.15,overflow: "hidden"},
        part2:{height: height * 0.13,width: '15%',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'},
        part3:{height:height * 0.13,width: '60%',flexDirection: 'column',justifyContent: 'center'},
        videoconten:{width:width * 0.9,height:height /2.5,marginTop:height /4},
      //budgetdetscreen 
        cardbugdet2:{shadowColor: "#000",shadowOffset: {width: 0,height: 3,},shadowOpacity: 0.29,shadowRadius: 4.65,elevation: 9,marginRight:10,marginLeft:10,zIndex: 1 ,flexDirection: 'row', flex:1, borderRadius:10,backgroundColor:'white',height:height / 5.8},
        part1det:{height:height / 7,width: '70%'},
        part2det:{flex: 1,height:height / 7,width: '30%',borderBottomRightRadius: 10,borderTopRightRadius:10},
        imgbudgetdet:{width:'100%',height:height / 7,borderBottomRightRadius: 10,borderTopRightRadius:10},
        inputStyle:{fontSize: 18,fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',color: '#414A59'},
        containerStyle:{backgroundColor:'#ffffff',shadowColor: "#000",shadowOffset: {width: 0,height: 3,},shadowOpacity: 0.29,shadowRadius: 2,elevation: 2},
        navbardet:{flexDirection: 'row',width:width * 0.9,marginTop:statusbar},
    //Component
      //OfflineComponent
        img_offline:{width:width * 0.8,height:height * 0.30},
        toffline1:{marginTop:width * 0.10,color:theme.COLORS.GREY4},
        loffline:{width:width * 0.8,margin:10,borderWidth: 5,borderColor:theme.COLORS.GREY4,borderBottomWidth: 1,borderBottomColor:theme.COLORS.GREY4},
      //LoaderComponent
        img_loader:{height:height * 0.8,width:width * 0.30},
      //GridComponent
        content_push:{borderRadius: 15,width:width / 3,height:height / 6,backgroundColor:theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 10},
        content_push2:{borderRadius: 15,width:'100%',height:height / 7,backgroundColor:theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5},
        //content_push3:{borderRadius: 15,width:'auto',height:height / 6,backgroundColor:theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5},
        content_push3:{borderRadius: 15,width:'auto',height:'auto',backgroundColor:theme.COLORS.GREY2,flex: 1, flexDirection: 'row', flexWrap: 'wrap',marginVertical: 10,marginHorizontal: 5},
        content_prod:{width:'100%',height: (height / 6) * 0.65,borderTopLeftRadius: 15,borderTopRightRadius:15},
        content_prod2:{width:'100%',height: height / 7},
        //content_prod3:{width:'100%',height: (height / 6) * 0.65,borderTopLeftRadius: 15,borderTopRightRadius:15},
        content_prod3:{width:'100%',borderRadius: 15,borderTopRightRadius:15},
        content_img:{width: '100%',height:(height / 6) * 0.65,marginTop:5}, 
        content_img2:{width:'100%',height: height / 7,borderRadius: 15},  
        //content_img3:{width: '100%',height:(height / 6) * 0.65,marginTop:5,borderTopLeftRadius: 15,borderTopRightRadius:15},
        textprod10p:{marginLeft:2,marginRight:2,fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',color: theme.COLORS.PRIMARY2},
        content_img3:{width: '100%',height:(height / 6) * 0.70,borderTopLeftRadius: 15,borderTopRightRadius:15},
        content_text10p:{width:'100%',margin:0,padding:0},
        content_det10p:{padding:'1%',backgroundColor: theme.COLORS.PRIMARY2,width:'100%',borderBottomLeftRadius: 15,borderBottomRightRadius:15},
        content_text:{width:'100%',height: (height / 6) * 0.15},
        content_det:{backgroundColor: theme.COLORS.PRIMARY2,width:'100%',borderBottomLeftRadius: 15,borderBottomRightRadius:15,height: (height / 6) * 0.20},
        textprod:{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2,color: theme.COLORS.PRIMARY2},
        textdet:{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',fontStyle:'normal',margin:2},
        header1:{fontFamily: "SF-UI-Text-Regular",marginLeft: 5},
      //modalcartcomponent
        headerpop:{backgroundColor:theme.COLORS.PRIMARY2,paddingTop:height * 0.015,paddingBottom:height * 0.010,shadowOffset: { width: 2, height: 2 },shadowOpacity: 0.2,elevation: 8},
        headersub:{marginLeft:width * 0.05,marginRight:width * 0.05,flexDirection:'row',justifyContent: 'space-between'},
        textpop:{marginLeft:10,width:width * 0.7,fontFamily: "SFProText-Semibold"},  
        textpop2:{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal'},
        content_num:{marginTop:20,justifyContent: 'center',alignItems: 'center'},
        detpop:{width: '50%',alignItems: 'flex-end',marginLeft:5},
        content_but:{justifyContent: 'center',alignItems: 'center',marginTop:15},
        button_add:{height:height * 0.06,width:width * 0.4},
        button_new:{fontFamily: "SF-UI-Text-Lights",fontWeight:'bold',backgroundColor:'#909090',paddingTop:5,paddingBottom:5,paddingLeft:20,paddingRight:20,borderRadius:15},
        linenew:{marginTop: 15,borderBottomColor: theme.COLORS.PRIMARY2,borderBottomWidth: theme.SIZES.INPUT_BORDER_WIDTH},
        imgaddcart:{width:width * 0.4,height: height /5,borderRadius: 10,zIndex: 2},
      //productdetcomponent  
        product_det:{width:width,position: 'absolute', zIndex: 0 ,flex:1},
        button_close:{marginLeft:width * 0.02,marginRight:width * 0.02,marginTop:10,position: 'absolute', zIndex: 1},
        textsuc:{fontFamily: "SF-UI-Text-Lights",fontWeight:'normal',fontStyle:'normal'},
        imgadetprod:{width:width,height: height /1.8,zIndex: 2},
})  


export default {
  style,
  theme,
  height,
  width,
  statusbar
};