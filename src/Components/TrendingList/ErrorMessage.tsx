import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {useTrendingRepositories} from '../../Contexts/TrendingRepositories';
import {EActionKind} from '../../Types/TrendingRepositoriesContext';

const ErrorMessage: React.FC = () => {
  const [context, dispatchContext] = useTrendingRepositories();

  const handleRetry = (): void => {
    dispatchContext({
      type: EActionKind.retry,
    });
  };

  if (!context.error) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../Assets/Images/aliensSpaceShuttle.png')}
          style={styles.aliensSpaceShuttle}
        />
        <Text style={styles.header}>Something went wrong...</Text>
        <Text style={styles.text}>An alien probably blocking your signal</Text>
      </View>
      <Pressable onPress={handleRetry} style={styles.button}>
        <Text style={styles.buttonText}>RETRY</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  aliensSpaceShuttle: {
    width: 200,
    height: 200,
  },
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
  },
  buttonText: {
    color: 'green',
    fontSize: 15,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 24,
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  text: {
    marginTop: 8,
    fontSize: 15,
    color: '#929292',
    textAlign: 'center',
  },
});

export default ErrorMessage;
