import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{height: 100, width: 100}}
          source={require('../assets/images/logo.jpg')}
        />
        <ActivityIndicator
          style={{marginVertical: 30}}
          size="large"
          color="#fff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BCE2DF',
  },
  logo: {
    height: 200,
    width: 200,
  },
});
