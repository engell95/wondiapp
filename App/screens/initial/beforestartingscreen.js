import React, {Component} from 'react';
import {TouchableOpacity,View,NetInfo,RefreshControl,ScrollView} from 'react-native';
import {Text,Icon,ListItem,Right,Body,H3,Content} from 'native-base';
//Redux
import {fetchDataCategory} from '../../redux/actions/categoryaction';
import {Postcatg} from '../../redux/actions/useraction';
import {connect} from 'react-redux';
//General
import OfflineNotice from "../../components/general/offlinecomponent";
import Empty from "../../components/general/emptycomponent";
import ProgressiveImage from '../../components/image/progressiveimagecomponent';
import Load from '../../components/loader/loadercomponent';
import {NavigationActions} from 'react-navigation';
import globals from "../../styles/globals";
//Extra
import ReactNativeItemSelect from 'react-native-item-select';
//idioma
import I18n from '../../config/LanguageService';
//fix reloader
import {loadSettings} from '../../config/SettingsStorage';

class Beforestarting extends React.Component {

  constructor(props) {super(props)
    this.state = {
      isConnected: true,
      refreshing: false,
      data: [], 
      user:'',
      token:'',
      loader:true,
      languaje:'',
    };
  }

  static navigationOptions = ({ navigation, screenProps}) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (<Text style={[globals.title2,{marginLeft:15}]}>{I18n.t('global.initcateg4')}</Text>),
      headerRight:(
        <ListItem icon> 
          <Body style={{ borderBottomColor: 'transparent' }}>
            <TouchableOpacity onPress={ () => params.handleRefresh()}> 
              <Text style={globals.title2}>{I18n.t('global.next')}</Text>
            </TouchableOpacity>          
          </Body>
          <Right style={{ borderBottomColor: 'transparent' }}>
            <TouchableOpacity onPress={ () => params.handleRefresh()}>
              <Icon name="ios-arrow-dropright" style={{fontSize:30}}/>
            </TouchableOpacity>
          </Right>
        </ListItem>
      ),
    headerTitleStyle: (globals.nav),
    headerStyle: (globals.navstyle),
    }
  };

  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      if (settings.languaje !== null){
        I18n.locale = settings.languaje
      }
      this.setState({user:settings.user})
    }
    this.props.fetchDataCategory();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidMount(){
    this.props.navigation.setParams({
      handleRefresh: this.confi
    });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected}); });
  }

  componentDidUpdate(prevProps) {
    if (this.props.category.item.data !== prevProps.category.item.data) {
      if (this.props.category.item.data){
        this.setState({data:this.props.category.item.data,loader:this.props.category.isFeching})
      }
    }
  }

  handleConnectionChange = (isConnected) => {
    this.setState({isConnected });
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

  _renderItemcatg(item){
    return(
      <View style={{paddingBottom:10}}>
         <ProgressiveImage
          thumbnailSource = {{uri: item.Icono}}
          style = {globals.img_row}
          Content = {globals.img_rowc}
          resizeMode="cover"
        />
        <Text numberOfLines={2} style={[globals.texttitle,{fontSize:16}]}>{item.N_Cat_Empresa}</Text>
      </View>   
    )
  }

  confi = () => {
    const resetAction = NavigationActions.navigate({
      routeName: 'Home_Pag',
      params: {},
      action: NavigationActions.navigate({ routeName: 'Welcome' }),
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }

    if (this.state.loader == true & this.state.refreshing == false){
      return <Load refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>;
    }

    return (
      <View style={globals.body}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={["#DE0001", "#85D848", "#009DC3"]}
            />
          }
        > 
        {this.state.data && this.state.data.length
         ? <View style={{marginTop:20}}> 
            <H3 style={globals.title}>{I18n.t('global.initcateg')}</H3>
            <Text style={[globals.text,{textAlign: 'center',marginBottom:10,marginTop:5,fontSize:18}]}>{I18n.t('global.initcateg2')}</Text>
              <ReactNativeItemSelect
                data={this.state.data}
                itemComponent={item => this._renderItemcatg(item)}
                onSubmit={item => navigate('Result')}
                onSubmit={() => this.confi()}
                multiselect={true}
                countPerRow={2}
                onEndReachedThreshold={1200}
                floatSubmitBtn={true}
                submitBtnTitle={I18n.t('global.initcateg3')}
                submitBtnWidth={80}
                minSelectCount={1}
                styles={
                  {
                    btn: globals.btn,
                    btnTxt:globals.btnTxt,
                    disabledBtn: globals.disabledBtn,
                    tickTxt: globals.tickTxt,
                    activeItemBoxHighlight: { borderColor: '#002D73' },
                    itemBoxHighlight:{borderColor:'#F8F8F8'}
                  }
                }
              />   
           </View>
         : <Empty refreshing={this.state.refreshing} _onRefresh={this._onRefresh.bind(this)}/>
        }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {category: state.category}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataCategory: () => {return dispatch(fetchDataCategory())},
    Postcatg: () => {return dispatch(Postcatg())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beforestarting)