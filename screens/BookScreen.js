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
  ScrollView,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// custom components
import Header from '../components/header';
import PrimaryButton from '../components/primaryButton';

// FIREBASE
import {addReview} from '../fire';

// REDUX
import {selectCurrentUser} from '../redux/user/user.selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

class BookScreen extends React.Component {
  state = {
    address: '',
    phone: '',
    description: '',
  };

  constructor(props) {
    super(props);
    console.log(this.props.route.params);
  }

  handlePost = () => {
    const {address, phone, description} = this.state;
    Linking.openURL(
      `whatsapp://send?text=Адрес: ${address}%0aТелефон: ${phone}%0aОписание: ${description}&phone=${
        this.props.route.params
      }`,
    );
  };

  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const {address, phone, description} = this.state;

    return (
      <>
        <Header title="Заказ" onPress={() => this.props.navigation.goBack()} />

        <View style={styles.container}>
          <ScrollView>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Ваш адрес"
              onChangeText={address => this.setState({address})}
              value={address}
              multiline={true}
            />

            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Ваш телефон"
              onChangeText={phone => this.setState({phone})}
              value={phone}
              multiline={true}
            />

            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Описание"
              onChangeText={description => this.setState({description})}
              value={description}
              multiline={true}
              numberOfLines={5}
            />
          </ScrollView>

          <PrimaryButton onPress={this.handlePost}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              Связаться через Whatsapp
            </Text>
          </PrimaryButton>
        </View>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(
  mapStateToProps,
  null,
)(BookScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
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
    borderColor: '#199EF3',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
    borderRadius: 5,
  },

  input: {
    borderWidth: 2,
    borderColor: '#199EF3',
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
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
