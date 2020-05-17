import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

const PrimaryButton = ({onPress, children}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#199EF3',
    borderRadius: 5,
    padding: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
