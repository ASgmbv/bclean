import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {auth} from '../fire';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {TextInput} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

// custom components
import PrimaryButton from '../components/primaryButton';

// CUSTOM COMPONENTS
import Header from '../components/header';

class ProfileScreen extends React.Component {
  signOutUser = () => {
    auth.signOut();
  };

  render() {
    return (
      <>
        <Header title="Профиль" />
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              elevation: 3,
              borderRadius: 15,
              alignItems: 'center',
              padding: 10,
            }}>
            <Icon name="person" size={150} color="#000" />
            <Text style={styles.text}>
              {this.props.currentUser.displayName}
            </Text>

            <PrimaryButton onPress={this.signOutUser}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Выйти с аккаунта
              </Text>
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    color: '#011E3B',
    fontSize: 20,
    marginBottom: 40,
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(
  mapStateToProps,
  null,
)(ProfileScreen);
