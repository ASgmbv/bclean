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

import PrimaryButton from '../components/primaryButton';

// CUSTOM COMPONENTS
import Header from '../components/header';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    buttonPressed: false,
  };

  handleLogin = async () => {
    const {email, password} = this.state;
    try {
      this.setState({buttonPressed: true});

      await auth.signInWithEmailAndPassword(email, password);
      this.props.setCurrentUser({...auth.currentUser});
    } catch (error) {
      this.setState({buttonPressed: false});
      this.setState({errorMessage: error.message});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="BeClean" />

        <View style={{padding: 15, flex: 1, justifyContent: 'center'}}>
          {this.state.errorMessage ? (
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          ) : (
            <></>
          )}
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder="Электронный адрес"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            autoCapitalize="none"
            placeholder="Пароль"
          />

          <PrimaryButton
            onPress={() => {
              this.handleLogin();
            }}>
            {this.state.buttonPressed ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Войти</Text>
            )}
          </PrimaryButton>

          <View style={{alignItems: 'center', marginVertical: 32}}>
            <Text style={{color: '#414959', fontSize: 13}}>
              Впервые здесь?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              <Text style={{fontWeight: '500', color: '#598ec2'}}>
                Создать учетную запись
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// const entireScreenWidth = Dimensions.get('window').width;
// EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    color: '#011E3B',
  },
  errorText: {
    color: '#e9446a',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
  },
  form: {
    justifyContent: 'center',
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
    borderRadius: 5,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
