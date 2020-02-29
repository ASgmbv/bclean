import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {auth} from '../fire';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';

class ProfileScreen extends React.Component {
  signOutUser = () => {
    auth.signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.title}>Пользователь: </Text>
          <Text style={{textTransform: 'uppercase'}}>
            {this.props.currentUser.displayName}
          </Text>
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
  },
  title: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#1EA1F2',
    padding: 15,
    borderRadius: 9999,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1EA1F2',
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(ProfileScreen);
