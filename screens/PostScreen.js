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
            <TouchableOpacity
              onPress={this.pickImage}
              style={styles.imageContainer}>
              <ImageBackground
                source={{uri: this.state.imageLocalUri}}
                style={styles.image}>
                <Icon
                  style={{opacity: 1}}
                  name="add-a-photo"
                  size={40}
                  color="#000"
                />
              </ImageBackground>
            </TouchableOpacity>

            {/* COMPANY NAME */}
            <TextInput
              style={styles.input}
              autoCorrect={false}
              multiline={true}
              placeholder="BClean"
              value={this.state.companyName}
              onChangeText={companyName => this.setState({companyName})}
            />

            {/* DESCRIPTION */}
            <TextInput
              style={styles.input}
              autoCorrect={false}
              multiline={true}
              placeholder="наши услуги: уборка офисов, химчистка ковров, ..."
              value={this.state.description}
              onChangeText={description => this.setState({description})}
            />

            {/* COMPANY PHONE */}
            <TextInput
              style={styles.input}
              autoCorrect={false}
              multiline={true}
              keyboardType="phone-pad"
              placeholder="0555666777"
              value={this.state.companyPhone}
              onChangeText={companyPhone => this.setState({companyPhone})}
            />

            {/* COMPANY EMAIL */}
            <TextInput
              style={styles.input}
              autoCorrect={false}
              multiline={true}
              keyboardType="email-address"
              placeholder="bclean@info.kg"
              value={this.state.companyEmail}
              onChangeText={companyEmail => this.setState({companyEmail})}
            />

            {/* HANDLE BUTTON */}
            <TouchableOpacity style={styles.button} onPress={this.handlePost}>
              {this.state.loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={{color: '#fff', fontWeight: '500'}}>Готово</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    opacity: 0.5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
    borderRadius: 5,
  },

  input: {
    borderWidth: 2,
    borderColor: 'rgb(112, 172, 177)',
    marginBottom: 15,
    padding: 10,
    fontSize: 15,
    color: '#161f3d',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  inputTitle: {
    color: '#555',
  },

  button: {
    borderRadius: 5,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
