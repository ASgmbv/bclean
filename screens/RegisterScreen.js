import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// FIREBASE
import {auth} from '../fire';

// REDUX
import {setCurrentUser} from '../redux/user/user.actions';
import {connect} from 'react-redux';

// CUSTOM COMPONENTS
import Header from '../components/header';

import PrimaryButton from '../components/primaryButton';

class RegisterScreen extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    errorMessage: '',
    buttonPressed: false,
  };

  constructor(props) {
    super(props);
  }

  handleSignUp = async () => {
    try {
      this.setState({buttonPressed: true});
      const {email, password, displayName} = this.state;
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredentials.user.updateProfile({
        displayName,
      });
    } catch (error) {
      this.setState({buttonPressed: false, errorMessage: error.message});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="BeClean" />

        <View style={{padding: 15, flex: 1, justifyContent: 'center'}}>
          <View style={styles.form}>
            {this.state.errorMessage ? (
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            ) : (
              <></>
            )}

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Имя"
              value={this.state.name}
              onChangeText={displayName => this.setState({displayName})}
            />

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Электронный адрес"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />

            <TextInput
              style={styles.input}
              value={this.state.password}
              placeholder="Пароль"
              onChangeText={password => this.setState({password})}
              autoCapitalize="none"
            />

            <PrimaryButton onPress={this.handleSignUp}>
              {this.state.buttonPressed ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Создать учетную запись
                </Text>
              )}
            </PrimaryButton>
          </View>

          <View>
            <TouchableOpacity
              style={{alignItems: 'center', marginVertical: 32}}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{color: '#414959', fontSize: 13}}>
                У вас есть учетная запись?{' '}
              </Text>
              <Text style={{fontWeight: '500', color: '#598ec2'}}>Вход</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 100,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 30,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: '#e9446a',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputTitle: {
    color: '#8a8d9e',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  form: {
    alignItems: 'center',
    marginHorizontal: 10,
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
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(RegisterScreen);
