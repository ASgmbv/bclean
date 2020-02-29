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
    errorMessage: null,
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
        <Text style={styles.greeting}>{`Hello\nSign up to get started`}</Text>

        <View style={styles.errorMessage}>
          <Text>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.name}
              onChangeText={displayName => this.setState({displayName})}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          {this.state.buttonPressed ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={{color: '#fff', fontWeight: '500'}}>Sign up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text style={{color: '#414959', fontSize: 13}}>
            Already have an account?{' '}
            <Text style={{fontWeight: '500', color: '#e9446a'}}>Login</Text>
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

export default connect(null, mapDispatchToProps)(RegisterScreen);
