import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {TTrendingListItemProps} from '../../Types/TrendingList';
import {useTrendingRepositories} from '../../Contexts/TrendingRepositories';
import {EActionKind} from '../../Types/TrendingRepositoriesContext';

const TrendingListItem: React.FC<TTrendingListItemProps> = ({item}) => {
  const [context, dispatchContext] = useTrendingRepositories();

  const handleItemPress = (): void => {
    const {id} = item;
    dispatchContext({
      type: EActionKind.expandItem,
      payload: Number(id) === Number(context.expandedId) ? null : Number(id),
    });
  };

  return (
    <View>
      <Pressable onPress={handleItemPress}>
        <ListItem>
          <Avatar
            source={{uri: item.owner.avatar_url}}
            rounded
            size={'small'}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              {item.owner.login}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.description}>
              {item.name}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Pressable>
      <Collapsible
        collapsed={Number(item.id) !== Number(context.expandedId)}
        align="center">
        <View style={styles.content}>
          <Text
            style={
              styles.descriptionText
            }>{`${item.description} (${item.html_url})`}</Text>
          <View style={styles.rowInfo}>
            {item.language && (
              <View style={styles.iconContainer}>
                <IconEntypo size={30} name={'dot-single'} color={'red'} />
                <Text style={styles.iconText}>{item.language}</Text>
              </View>
            )}
            {item.forks && (
              <View style={styles.iconContainer}>
                <IconIonicons size={16} name={'git-network'} />
                <Text style={styles.iconText}>{item.forks}</Text>
              </View>
            )}
            {item.stargazers_count && (
              <View style={styles.iconContainer}>
                <IconFontAwesome size={16} name={'star'} color={'orange'} />
                <Text style={styles.iconText}>{item.stargazers_count}</Text>
              </View>
            )}
          </View>
        </View>
      </Collapsible>
      <Divider />
    </View>
  );
};

export default TrendingListItem;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingLeft: 65,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: '#52575C',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#52575C',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  iconText: {
    paddingLeft: 5,
  },
  rowInfo: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: '#52575C',
  },
});
