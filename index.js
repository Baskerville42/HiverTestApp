/**
 * @format
 */

import {AppRegistry} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import App from './src/App';
import {name as appName} from './app.json';

IconEntypo.loadFont();
IconIonicons.loadFont();
IconFontAwesome.loadFont();
IconMaterialIcons.loadFont();

AppRegistry.registerComponent(appName, () => App);
