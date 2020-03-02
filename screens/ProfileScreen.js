import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {auth} from '../fire';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {TextInput} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

class ProfileScreen extends React.Component {
  signOutUser = () => {
    auth.signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Icon name="person" size={150} color="#fff" />
        </View>
        <View>
          <Text style={styles.text}>{this.props.currentUser.displayName}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('PostScreen')}>
          <Text style={styles.buttonText}>Добавить новый пост</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
          <Text style={styles.buttonText}>Выйти с аккаунта</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(201, 230, 225)',
    padding: 15,
  },
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    marginBottom: 40,
  },
  button: {
    borderRadius: 5,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgb(112, 172, 177)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(ProfileScreen);
