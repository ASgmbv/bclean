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
      this.props.setCurrentUser(user);
    } catch (error) {
      this.setState({buttonPressed: false});
      this.setState({errorMessage: error.message});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{`Hello again\nWelcome Back`}</Text>

        <View style={styles.errorMessage}>
          {<Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleLogin();
          }}>
          {this.state.buttonPressed ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={{color: '#fff', fontWeight: '500'}}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          <Text style={{color: '#414959', fontSize: 13}}>
            New to BClean?{' '}
            <Text style={{fontWeight: '500', color: '#e9446a'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    marginTop: 40,
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 30,
    textAlign: 'center',
  },
  inputTitle: {
    color: '#8a8d9e',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  form: {
    marginHorizontal: 30,
    marginVertical: 40,
  },
  input: {
    borderBottomColor: '#8a8d9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161f3d',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#e9446a',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 30,
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
