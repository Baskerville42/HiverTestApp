import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';

import {useTrendingRepositories} from '../../Contexts/TrendingRepositories';
import {EActionKind} from '../../Types/TrendingRepositoriesContext';

const TrendingListHeader: React.FC = () => {
  const [context, dispatchContext] = useTrendingRepositories();
  const [visible, setVisible] = React.useState<boolean>(false);

  const showSearchInput = (): void => setVisible(true);

  const handleSearchInputTyping = (text: string): void => {
    dispatchContext({
      type: EActionKind.searchQuery,
      payload: text,
    });
  };

  React.useEffect(() => {
    if (!context.searchQuery) {
      setVisible(false);
    }
  }, [context.searchQuery]);

  if (context.error) return null;

  if (visible) {
    return (
      <SafeAreaView>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
          lightTheme={true}
          placeholder="Search"
          // @ts-ignore
          onChangeText={handleSearchInputTyping}
          value={context.searchQuery}
        />
      </SafeAreaView>
    );
  }
  return (
    <Header
      backgroundColor={'white'}
      style={styles.container}
      centerComponent={{text: 'Trending', style: styles.title}}
      rightComponent={{icon: 'search', onPress: showSearchInput}}
    />
  );
};

export default TrendingListHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#adadad',
    borderBottomWidth: 1,
  },
  searchContainer: {
    height: 45,
    width: '100%',
    padding: 0,
    backgroundColor: 'white',
    borderTopWidth: 0,
  },
  searchInput: {
    height: 45,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
  },
  title: {
    fontSize: 21,
    color: '#25282B',
    textAlign: 'center',
  },
});
