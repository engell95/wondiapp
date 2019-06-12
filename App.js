/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from "react-redux";
import {Root,Container} from "native-base";
import Router from "./App/routers/routers";
import configureStore from "./App/redux/configurestore";
import { Sentry } from 'react-native-sentry';
import NavigationService from './App/config/NavigationService';
import { YellowBox } from 'react-native';
import I18n from './App/config/LanguageService';
import {loadSettings} from './App/config/SettingsStorage';

YellowBox.ignoreWarnings(['WebView'])

Sentry.config('https://365684771d084da7ba067bf625a7c07c@sentry.io/1431628').install();
console.disableYellowBox = true;

export default class App extends Component<Props> {

  async componentWillMount(){ 
    const settings = await loadSettings();
    if (settings !== null) {
      I18n.locale = settings.languaje
    }
  }

  render() {
    return (
      <Container>
        <Provider store={configureStore}>
          <Root>
            <Router
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Root>
        </Provider>
       </Container>
    );
  }
}

