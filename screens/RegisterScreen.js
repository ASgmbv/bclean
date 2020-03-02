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

      const userCredentials = await auth.createUserWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );

      await userCredentials.user.updateProfile({
        displayName: this.state.displayName,
      });
    } catch (error) {
      this.setState({buttonPressed: false});
      this.setState({errorMessage: error.message});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{`Создать учетную запись`}</Text>
        </View>

        <View style={styles.form}>
          {this.state.errorMessage ? (
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          ) : (
            <></>
          )}

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="имя фамилия"
            value={this.state.name}
            onChangeText={displayName => this.setState({displayName})}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />

          <TextInput
            style={styles.input}
            value={this.state.password}
            placeholder="password"
            onChangeText={password => this.setState({password})}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            {this.state.buttonPressed ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text style={{color: '#fff', fontWeight: '500'}}>
                Создать учетную запись
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{alignItems: 'center', marginVertical: 32}}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={{color: '#414959', fontSize: 13}}>
              У вас есть учетная запись?{' '}
            </Text>
            <Text style={{fontWeight: '500', color: 'rgb(112, 172, 177)'}}>
              Вход
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201, 230, 225)',
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
    borderColor: 'rgb(112, 172, 177)',
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

export default connect(null, mapDispatchToProps)(RegisterScreen);
