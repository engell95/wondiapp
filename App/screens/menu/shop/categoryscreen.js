import React, { PureComponent } from 'react';
import {FlatList,TouchableOpacity,BackHandler,RefreshControl,StatusBar,NetInfo,Alert,ScrollView} from 'react-native';
import {Block, Button,Input,NavBar,Icon,Card,theme,Text} from 'galio-framework';
import design from '@config/style/Style';
import {loadSettings} from '@config/SettingsStorage';
import Load   from '@components/general/LoaderComponent';
import ProgressiveImage from '@components/image/AsyncImageComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchDataCategory} from '@redux/actions/CategoryAction';
import {connect} from 'react-redux';

const carga = require('@assets/img/carga.png');
const logo  = require('@assets/img/logo3.png');

class Category extends PureComponent{

 	//inicializar variables
  	constructor(props) {super(props)
	    this.state = {
	      refreshing: false,
	      languaje:'',
	      user:'',
	      token:'',
	    };
  	}

 	//verificando datos del usuario y llamando apis
  	async componentWillMount(){ 
	    try{
	      const settings = await loadSettings();
	      if (settings !== null) {
	        if (settings.user !== null & settings.token !== null){
	          this.setState({user:settings.user,languaje:settings.languaje,token:settings.token})
	          this.props.fetchDataCategory();
	        }
	      }
	    }
	    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  	}

  	//buscador
  	searchbutton(){
	    return(
	      <Input 
	        placeholder="  Búsqueda" 
	        icon="ios-search"
	        family="ionicon"
	        left
	        placeholderTextColor={design.theme.COLORS.TEXT2}
	        iconColor={design.theme.COLORS.TEXT2}
	        color={design.theme.COLORS.TEXT}
	        style={design.style.search}
	      />
	    )
  	}

  	//refrescando apis
  	async _onRefresh() {
	    try{
	      this.props.fetchDataCategory();
	    }
	    catch(error) {
	      Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	    }
	    finally{
	      this.setState( { refreshing: false } );
	    }
	}

	//seccion de diseño de categorias
  	_renderItemCatg(item,index){
	    return(
	    	<TouchableOpacity 
	    		style={design.style.content_push4} 
	    		onPress={() => {this.props.navigation.navigate("Shop_Catg",{user:this.state.user,token:this.state.token,notif:this.state.notif,languaje:this.state.languaje,id:item.Cod_Cat_Empresa,name:item.N_Cat_Empresa})}}
	    	>	
			   <Block style={design.style.content_prod4}>
		          <ProgressiveImage
		            style={design.style.content_img4}
		            placeholderSource={carga}
		            source={{uri: item.Icono}}
		            border={15}
		            placeholderColor={design.theme.COLORS.MUTED}
		          />
		        </Block>
		    </TouchableOpacity> 
	    )
  	}

  	//flatlist
  	Getflatlist(datas){
  		if (datas.item.data && datas.item.data.length) {
  			return(
  				<FlatList
		            data={datas.item.data}
		            numColumns={3}
              		renderItem={({item}) => this._renderItemCatg(item)}
			        initialNumToRender={9}
			        keyExtractor={(item, index) => index.toString()}
			        ListHeaderComponent={
			            <Block center>
	    					<Text h4 bold color={design.theme.COLORS.HEADER} style={{marginBottom:design.width * 0.02,marginTop:design.width * 0.05,textAlign: 'center',fontFamily: "SFProText-Semibold"}}>
	    						¿En que podemos ayudarte?
	    					</Text>
			        	</Block>
			        }
            	/>
  			)
  		}
  	}

	render() {

		if (this.props.category.isFeching) {
      		return <Load/>
    	}

    	return(
    		<Block style={{flex: 1}}>  
		        <ScrollView
		          refreshControl={
		            <RefreshControl
		              refreshing={this.state.refreshing}
		              onRefresh={this._onRefresh.bind(this)}
		              colors={[design.theme.COLORS.PRIMARY2,design.theme.COLORS.PRIMARY,design.theme.COLORS.ERROR]}
		            />
		          }
		        >  
		        	{/*Categorias disponibles*/}
          			{this.Getflatlist(this.props.category)}
            	</ScrollView>	
    		</Block>
    	)

	}    

}

const mapStateToProps = state => {
  return {category: state.category}
}

const mapDispatchToProps = dispatch => {
  return {
   fetchDataCategory: () => {return dispatch(fetchDataCategory())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)