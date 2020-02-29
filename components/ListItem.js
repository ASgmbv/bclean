import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

{
  /* <TouchableOpacity style={styles.listItem}>
<View style={styles.listItemView}>
  <Text style={styles.listTitle}>{title}</Text>
  <Image style={{height: 150, width: '100%'}} source={{url}} />
</View>
</TouchableOpacity> */
}

export default ListItem = item => {
  const {companyName, image} = item.item;
  return (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.listTitle}>{companyName}</Text>
      <Image
        style={{width: '100%', height: 150, borderRadius: 10}}
        source={{uri: image}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listItemView: {},
  listTitle: {
    color: '#000',
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 20,
  },
});
