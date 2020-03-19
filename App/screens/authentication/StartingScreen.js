import React from 'react';
import {Platform,TouchableOpacity,ScrollView,RefreshControl,TouchableWithoutFeedback,Image,Alert,ActivityIndicator,NetInfo,StatusBar} from 'react-native';
//import NetInfo from "@react-native-community/netinfo";
//estilo
import {Block, Button, Input, NavBar, Text,theme,Card} from 'galio-framework';
import design from '../../config/style/Style';
//componentes
import Load from '../../components/general/LoaderComponent';
import ReactNativeItemSelect from 'react-native-item-select';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveImage from '../../components/image/AsyncImageComponent';
import {fetchDataCategory} from '../../redux/actions/CategoryAction';
//navegacion
import {NavigationActions} from 'react-navigation';
//configuracion global
import {loadSettings} from '../../config/SettingsStorage';
import {connect} from 'react-redux';

const carga = require('../../assets/img/carga.png');

class Starting extends React.Component {
	
  	constructor(props) {super(props)
	  	this.state = {
		    refreshing: false,
		    data: [], 
		    user:'',
		    token:'',
		    loader:true,
		    languaje:'',
		    loader2:false
	  	};
  	}

	static navigationOptions = {header: null,};

	async componentWillMount(){ 
	  	try{
		  	const settings = await loadSettings();
		  	if (settings !== null) {
		    /*if (settings.languaje !== null){
		      I18n.locale = settings.languaje
		    }*/
		    this.setState({user:settings.user})
		    this.props.fetchDataCategory();
	    	}
	  	}
	  	catch(error) {Alert.alert('Algo salió mal', error.toString())}
	}

  	componentDidUpdate(prevProps) {
	    if (this.props.category.item.data !== prevProps.category.item.data) {
	      if (this.props.category.item.data){
	        this.setState({data:this.props.category.item.data,loader:this.props.category.isFeching})
	      }
	    }

	    if (this.props.preferencias.item.data !== prevProps.preferencias.item.data) {
	      if (this.props.preferencias.item.data){
	        this.setState({loader2:false});
	        setTimeout(() => {this.next()}, 1000);
	      }
	    }
 	}

  	_onRefresh = () => {
		this.setState({refreshing: true,loader:false});
		this.props.fetchDataCategory();
		if (this.state.loader = true) {
			this.setState({refreshing: false})
		}
		else{
		    this.setState({refreshing: true})
		}
  	}

  	next = () => {
	    const resetAction = NavigationActions.navigate({
	      routeName: 'Home_Pag',
	      params: {},
	      action: NavigationActions.navigate({ routeName: 'Welcome' }),
	    });
    	this.props.navigation.dispatch(resetAction);
  	}

  	onSubmit = (item) => {
  		this.setState({loader2:true})
		this.props.Postcatg({user_id:this.state.user,cat_empresa:item})
  	}
  	
    _renderItemcatg(item){
		return(
			<Block center style={{width:design.width/3.8,height: design.width/3 - 25,borderRadius:10}}>
				<ProgressiveImage
			        style={{width:design.width/3.8,height: design.width/3 - 25,borderRadius:10}}
			        placeholderSource={carga}
			        source={{uri: item.Icono}}
			        //source={{uri:"https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300"}}
			        //source={logo}
			        border={22}
			        placeholderColor={design.theme.COLORS.GREY}
			        resizeMode="stretch"
			    />
			</Block>
	  	)
  	}

	loadpop = () =>{
		return(
	    	<Dialog
				visible={this.state.loader2}
          		width={0.5}
          		height={100}
			>
			    <DialogContent style={{marginLeft: 'auto',marginRight: 'auto',marginTop: 'auto',marginBottom:'auto',alignItems: 'center',textAlign:  'center' }}>
              	    <Block center style={{marginTop: 15}}>  
	                	<ActivityIndicator size="small" color='black'/>
				        <Text style={{marginTop: 5}}>cargando...</Text>
              		</Block>  
			    </DialogContent>
			</Dialog> 
		)
	}
	
	render() {

    	if (this.state.loader == true & this.state.refreshing == false){
      		return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    	}

		return (
			<Block flex style={{ backgroundColor: design.theme.COLORS.WHITE}}>
				<StatusBar barStyle="dark-content" backgroundColor="white"/>
				{this.loadpop()}
				<NavBar
					rightStyle={{alignItems: "flex-end",padding:0,margin:0}}
				  	right={(<TouchableOpacity onPress={ () => this.next()}><Text bold color={design.theme.COLORS.PRIMARY}>Saltar</Text></TouchableOpacity>)}
	      		/>
	      		<Text h5 center bold color={design.theme.COLORS.PRIMARY} style={{textAlign: 'center',fontFamily: "SFProText-Semibold"}}>Bienvenido</Text>
	    		<Text h5 center p color={design.theme.COLORS.PRIMARY} style={{marginBottom:design.width * 0.06,textAlign: 'center',fontFamily: "SFProText-Semibold"}}>¿En que podemos ayudarte?</Text>
        		<Block flex>
	            	<ReactNativeItemSelect
			          data={this.state.data}
			          itemComponent={item=> this._renderItemcatg(item)}
			          onSubmit={item => this.onSubmit(item)}
			          multiselect={true}
			          countPerRow={3}
			          //lastRowMargin={10}
			          //onEndReachedThreshold={1200}
			          floatSubmitBtn={true}
			          submitBtnTitle='Enviar'
			          submitBtnWidth={80}
			          minSelectCount={1}
			          styles={
			            {
			              btn: design.style.btn,
			              btnTxt:{fontSize:15},
			              disabledBtn: design.style.disabledBtn,
			              tickTxt: design.style.tickTxt,
			              activeItemBoxHighlight: { borderColor: '#002D73' },
			              itemBoxHighlight:{borderColor:'#FFF'},
			              rowWrapper:{marginTop:15},
			              itemComponentWrapper:{marginTop:0,paddingHorizontal:0,marginHorizontal:0,padding:0}
			            }
			          }
		          	/>
          		</Block>     
			</Block>	
		)
	}
	
}

const mapStateToProps = state => {
  return {category: state.category,preferencias:state.preferences}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataCategory: () => {return dispatch(fetchDataCategory())},
    Postcatg: (data) => {return dispatch(fetchDataPreferences(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Starting)