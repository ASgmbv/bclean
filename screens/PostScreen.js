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

import Icon from 'react-native-vector-icons/Ionicons';

// FIREBASE
import {addPost, uploadPhotoAsync} from '../fire';

// PERMISSION
import {PermissionsAndroid} from 'react-native';

//IMAGE PICKER
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

export default class PostScreen extends React.Component {
  state = {
    imageLocalUri: '',
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    loading: false,
    description: '',
  };

  componentDidMount() {
    // this.requestCameraPermission();
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'BClean Camera Permission',
          message: 'BClean App needs access to your camera',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  pickImage = () =>
    ImagePicker.showImagePicker({}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageLocalUri: response.uri,
        });
      }
    });

  // HANDLE POST
  handlePost = async () => {
    const {
      companyName,
      companyPhone,
      companyEmail,
      imageLocalUri,
      description,
    } = this.state;
    if (
      companyName == '' ||
      companyPhone == '' ||
      companyEmail == '' ||
      imageLocalUri == '' ||
      description == ''
    ) {
      alert('Введите данные полностью!');
      return;
    }
    try {
      this.setState({loading: true});
      await addPost(
        companyName,
        companyPhone,
        companyEmail,
        description,
        imageLocalUri,
      );
      this.setState({
        companyName: '',
        companyPhone: '',
        companyEmail: '',
        imageLocalUri: '',
        description: '',
        loading: false,
      });
      ToastAndroid.show('Операция успешно выполнена', ToastAndroid.SHORT);
      this.props.navigation.navigate('ProfileScreen');
    } catch (error) {
      this.setState({loading: false});
      alert(error.message);
    }
  };

  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    return (
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-arrow-back" size={22} color="#000"></Icon>
          </TouchableOpacity>
        </View>

        {/* Company Image */}
        <View
          style={{
            height: 150,
          }}>
          <TouchableOpacity
            onPress={this.pickImage}
            style={{width: '100%', height: '100%'}}>
            <ImageBackground
              source={{uri: this.state.imageLocalUri}}
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: '#000',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                resizeMode: 'center',
              }}>
              <Icon
                style={{opacity: 1}}
                name="ios-camera"
                size={40}
                color="#fff"
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* ostalnaya infa */}

        <ScrollView>
          {/* COMPANY NAME */}
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
              }}>
              Название:
            </Text>
            <TextInput
              style={{color: '#0e4c92', fontSize: 15}}
              autoCorrect={false}
              multiline={true}
              placeholder="BClean"
              value={this.state.companyName}
              onChangeText={companyName => this.setState({companyName})}
            />
          </View>

          {/* COMPANY PHONE */}
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
              }}>
              Телефон:
            </Text>
            <TextInput
              style={{color: '#0e4c92', fontSize: 15}}
              autoCorrect={false}
              multiline={true}
              keyboardType="phone-pad"
              placeholder="0555666777"
              value={this.state.companyPhone}
              onChangeText={companyPhone => this.setState({companyPhone})}
            />
          </View>

          {/* COMPANY EMAIL */}
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
              }}>
              Email:
            </Text>
            <TextInput
              style={{color: '#0e4c92', fontSize: 15}}
              autoCorrect={false}
              multiline={true}
              keyboardType="email-address"
              placeholder="bclean@info.kg"
              value={this.state.companyEmail}
              onChangeText={companyEmail => this.setState({companyEmail})}
            />
          </View>

          {/* DESCRIPTION */}
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
              }}>
              Описание:
            </Text>
            <TextInput
              style={{color: '#0e4c92', fontSize: 15}}
              autoCorrect={false}
              multiline={true}
              placeholder="наши услуги: уборка офисов, химчистка ковров, ..."
              value={this.state.description}
              onChangeText={description => this.setState({description})}
            />
          </View>

          {/* HANDLE BUTTON */}
          <TouchableOpacity style={styles.button} onPress={this.handlePost}>
            {this.state.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text style={styles.buttonText}>Post</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d9db',
    backgroundColor: '#e0f5ff',
    height: 50,
    paddingHorizontal: 20,
  },

  inputContainer: {
    marginTop: 20,
    marginHorizontal: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#555',
  },

  inputTitle: {
    color: '#555',
  },
  input: {
    flexDirection: 'row',
    borderBottomColor: '#d8d9db',
    borderBottomWidth: 1,
  },

  button: {
    marginTop: 30,
    marginBottom: 500,
    marginHorizontal: 30,
    borderWidth: 1,
    backgroundColor: '#1EA1F2',
    borderColor: '#1EA1F2',
    padding: 5,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});
