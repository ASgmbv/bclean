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

class ContactScreen extends React.Component {
  state = {
    review: '',
    isFetching: false,
  };

  // componentDidMount() {
  //   const {companyId} = this.props.route.params;
  //   ToastAndroid.show(companyId, ToastAndroid.LONG);
  // }

  // HANDLE POST
  handlePost = async () => {
    //this.props.navigation.navigate('HomeScreen');
    const {companyId} = this.props.route.params;
    const {review} = this.state;
    const {currentUser} = this.props;
    const {displayName} = currentUser;

    try {
      this.setState({isFetching: true});
      await addReview(companyId, review, displayName);
      ToastAndroid.show('Отзыв успешно оставлен!', ToastAndroid.LONG);
      //HomeScreen
      this.props.navigation.navigate('HomeScreen');
    } catch (error) {
      ToastAndroid.show(`Ошибка: ${error}!`, ToastAndroid.LONG);
      this.setState({isFetching: false});
    }
  };

  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    return (
      <>
        <Header title="Отзыв" onPress={() => this.props.navigation.goBack()} />

        <View style={styles.container}>
          <ScrollView>
            {/* user address */}
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Отзыв"
              onChangeText={review => this.setState({review})}
              value={this.state.review}
              multiline={true}
              numberOfLines={5}
            />

            <TextInput
              style={styles.input}
              placeholder="Рейтинг"
              keyboardType="decimal-pad"
            />
          </ScrollView>
          {/* HANDLE BUTTON <PrimaryButton title="Готово" onPress={this.handlePost} /> */}

          <PrimaryButton onPress={this.handlePost}>
            {this.state.isFetching ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={{color: '#fff', fontWeight: '500'}}>Готово</Text>
            )}
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
)(ContactScreen);

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
