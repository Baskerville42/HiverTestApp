import * as React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import TrendingListScreen from './Screens/TrendingList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TrendingListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
