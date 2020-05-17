import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({title, onPress}) => {
  return (
    <View style={styles.header}>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Icon name="arrow-back" size={25} color="#fff" style={styles.back} />
        </TouchableOpacity>
      )}
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 17,
    alignItems: 'center',
    minHeight: 50,

    backgroundColor: '#5CB5EC',
  },
  back: {
    paddingRight: 20,
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Header;
