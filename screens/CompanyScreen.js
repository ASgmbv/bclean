import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  YellowBox,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {ScrollView} from 'react-native-gesture-handler';

export default class CompanyScreen extends React.Component {
  state = {};

  componentDidMount() {
    // this.requestCameraPermission();
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  render() {
    const {
      companyName,
      companyPhone,
      companyEmail,
      description,
      image,
    } = this.props.route.params;

    return (
      <>
        {/* Header */}
        <View style={styles.header}>
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" size={22} color="rgb(112, 172, 177)"></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.form}>
            {/* Company Image */}
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.image} source={{uri: image}} />
            </View>

            <View style={styles.informaionContainer}>
              {/* COMPANY NAME */}
              <Text style={styles.title}>{companyName}</Text>

              {/* COMPANY PHONE */}
              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="email"
                  size={25}
                  color={'#555'}
                />
                <Text style={styles.text}>{companyEmail}</Text>
              </View>

              {/* DESCRIPTION */}
              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="phone"
                  size={25}
                  color={'#555'}
                />
                <Text style={styles.text}>{companyPhone}</Text>
              </View>

              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="info-outline"
                  size={25}
                  color={'#555'}
                />
                <Text style={styles.text}>{description}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201, 230, 225)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d9db',
    height: 50,
    paddingHorizontal: 20,
  },

  form: {
    alignItems: 'center',
    margin: 15,
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 1,
    marginBottom: 15,
  },

  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'rgb(112, 172, 177)',
    resizeMode: 'center',
    borderRadius: 5,
  },

  informaionContainer: {
    borderWidth: 2,
    borderColor: 'rgb(112, 172, 177)',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
  },

  title: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  text: {
    marginBottom: 10,
  },

  button: {
    borderRadius: 5,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconka: {
    marginRight: 10,
  },
});
