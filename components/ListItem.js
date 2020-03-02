import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  BackgroundImage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

{
  /* <TouchableOpacity style={styles.listItem}>
<View style={styles.listItemView}>
  <Text style={styles.listTitle}>{title}</Text>
  <Image style={{height: 150, width: '100%'}} source={{url}} />
</View>
</TouchableOpacity> */
}

export default ListItem = ({item, onItemClicked}) => {
  const {companyName, image, description} = item;
  return (
    <TouchableOpacity
      onPress={() => onItemClicked(item)}
      style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.content}>
        <Text style={styles.title}>{companyName}</Text>
        <Text style={styles.services}>{description}</Text>
        <View>
          <Text style={{fontSize: 10}}>
            Рейтинг: <Text style={{fontSize: 12}}>4.0</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,

    borderWidth: 2,
    borderColor: 'rgb(112, 172, 177)',

    borderRadius: 8,
  },
  image: {
    width: '25%',
    aspectRatio: 1 / 1,
    borderRadius: 8,
  },
  content: {
    width: '80%',
    aspectRatio: 4 / 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 20,
    fontWeight: '700',
  },
  services: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '400',
    fontSize: 14,
  },
});
