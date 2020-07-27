import React, { PureComponent } 						from 'react';
import {TouchableOpacity,BackHandler,StatusBar,Alert,StyleSheet,FlatList} 	from 'react-native';
import design                   						from '@config/style/Style';
import {Block,Input,Icon,Text} 							from 'galio-framework';
import Autocomplete 									from '@components/general/AutocompleteComponent';
import AsyncStorage 									from '@react-native-community/async-storage';
import {fetchDataSearch}        						from '@redux/actions/SearchAction';
import {fetchDataHistory}        						from '@redux/actions/HistoryAction';
import {connect}                						from 'react-redux';

class SearchScreen extends PureComponent{
	//inicializar variables
	constructor(props) {super(props)
	    this.state = {
	      search:[],
	      text:'',
	    };
	}

	//ciclos de vida
	componentWillReceiveProps(newProps){
	    if(newProps.search.item.data !== this.props.search.item.data && newProps.search.isFeching == false){
	    	this.setState({search: [newProps.search.item.data]});
	    }
	}

	//verificando historial de busqueda
  	async componentWillMount(){ 
	    try{  
	    	const {navigation} = this.props;
		    const user = navigation.getParam('user', 'NO-ID');
		    this.props.fetchDataHistory(user);
	    }
	    catch(error) {Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)}
  	}

	//buscar datos
	searchapi(text){
		this.setState({text});
	    this.setState({search: []});
	    if (text !== '') {
	      try{
	        this.props.fetchDataSearch(text);
	      }
	      catch(error) {
	        Alert.alert('Algo salió mal', 'Ayúdanos a mejorar esta aplicación, mándanos un email a soporte@wondiapp.com con una captura de pantalla del error. Gracias ... \n\n' + error.toString() ,)
	      }
	    }
	    else{
	      this.setState({search: []});
	    }
	}

	handleGoBack = () => this.props.navigation.goBack();

	searchapip(text){
		this.props.navigation.navigate("Result",{Search:text})
	}

	//seccion render
	renderitem (item) {
	    return (
		    <TouchableOpacity onPress={() => {this.searchapip(item.Texto_Busqueda)}}>
		    	<Text style={design.style.SearchTextH}><Icon name="ios-search" family="ionicon" size={15} /> {item.Texto_Busqueda}</Text>
		    </TouchableOpacity>
	    );
	}

	//seccion wondi
  	Historial(datas){
  		if (datas.item.data && datas.item.data.length) {
	  		return(
	  			<Block style={design.style.list2}>
		  			<FlatList
		                data={datas.item.data}
		                renderItem={({item}) => this.renderitem(item)}
		                keyExtractor={(item, index) => index.toString()}
		                initialNumToRender={9}
		            />
	            </Block>
	  		)
  		}
  	}
	
 	render() {
 		return (
 			<Block style={{marginTop: design.statusbar}} >
 				<Autocomplete
			        autoCapitalize="none"
			        autoCorrect={false}
			        backProps={this.handleGoBack}
			        data={this.state.search}
			        onChangeText={text => this.searchapi(text)}
			        renderItem={({ item, index }) => (
			          <Block style={design.style.list}>
			            {this.state.search && this.state.search.length
			              ?<Block>
			                {
			                  item.Productos && item.Productos.length || item.Marcas && item.Marcas.length || item.Empresas && item.Empresas.length
			                  ?<Block>
			                    {
			                      item.Productos && item.Productos.length
			                      ?item.Productos.map((data, i) => {
			                        return(<TouchableOpacity onPress={() => {this.searchapip(data.N_Producto)}}><Text style={design.style.SearchText} key={i}><Icon name="ios-search" family="ionicon" size={15} />  {data.N_Producto}</Text></TouchableOpacity>)
			                       })
			                      :null
			                    }
			                    {
			                      item.Marcas && item.Marcas.length
			                      ?item.Marcas.map((data, i) => {
			                        return(<TouchableOpacity onPress={() => {this.searchapip(data.N_Marca)}}><Text style={design.style.SearchText} key={i}><Icon name="ios-search" family="ionicon" size={15} />  {data.N_Marca}</Text></TouchableOpacity>)
			                       })
			                      :null
			                    }  
			                    {
			                      item.Empresas && item.Empresas.length
			                      ?item.Empresas.map((data, i) => {
			                        return(<TouchableOpacity onPress={() => {this.searchapip(data.N_Marca)}}><Text style={design.style.SearchText} key={i}><Icon name="ios-search" family="ionicon" size={15} />  {data.N_Empresa}</Text></TouchableOpacity>)
			                       })
			                      :null
			                    }
			                   </Block>
			                  :<TouchableOpacity onPress={() => {this.searchapip(this.state.text)}}><Text style={design.style.SearchTextn}><Icon name="ios-search" family="ionicon" size={15} />  {this.state.text}</Text></TouchableOpacity>
			                }
			              </Block>
			              :
			                <Block style={design.style.list}>
			                  <TouchableOpacity onPress={() => {this.searchapip(this.state.text)}}><Text style={design.style.SearchTextn}><Icon name="ios-search" family="ionicon" size={15} />  {this.state.text}</Text></TouchableOpacity>
			                </Block>
			            }
			          </Block>
			        )}
			    />
			    {/*Seccion Historial*/}  
          		{this.Historial(this.props.history)}

 			</Block>
 		);
 	}

}

const mapStateToProps = state => {
  return {search: state.search,history: state.history}
}

const mapDispatchToProps = dispatch => {
	return {
   		fetchDataSearch:     (text)   => {return dispatch(fetchDataSearch(text))},
   		fetchDataHistory: 	 (id)     => {return dispatch(fetchDataHistory(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)