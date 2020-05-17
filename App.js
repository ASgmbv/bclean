/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {SafeAreaView, StyleSheet, YellowBox} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// FIREBASE
import * as firebase from 'firebase';
import {auth, firestore, createUserProfileDocument} from './fire';

// REDUX
import {setCurrentUser} from './redux/user/user.actions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';

// SCREENS
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import CompanyScreen from './screens/CompanyScreen';
import SearchScreen from './screens/SearchScreen';
import ContactScreen from './screens/ContactScreen';
import BookScreen from './screens/BookScreen';

// NAVIGATION

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'HomeTab') {
      return <Icon name="home" size={size + 5} color={color} />;
    } else if (route.name === 'ProfileTab') {
      return <Icon name="person" size={size + 5} color={color} />;
    } else {
      return <Icon name="star" size={size + 3} color={color} />;
    }
  },
});

// You can return any component that you like here!

// <Stack.Screen name="AuthStack" component={AuthStack} />
// <Stack.Screen name="LoadingScreen" component={LoadingScreen} />

class App extends React.Component {
  state = {};

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    YellowBox.ignoreWarnings(['Setting a timer']);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  ProfileStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
      </Stack.Navigator>
    );
  };

  AuthStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    );
  };

  PostsStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen name="BookScreen" component={BookScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
      </Stack.Navigator>
    );
  };

  FavoriteStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="SearchScreen">
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={{
            showLabel: false,
            activeTintColor: '#5CB5EC',
            inactiveTintColor: '#011E3B',
          }}>
          <Tab.Screen name="HomeTab" component={this.PostsStack} />
          <Tab.Screen name="FavoriteTab" component={this.FavoriteStack} />
          <Tab.Screen
            name="ProfileTab"
            component={
              this.props.currentUser ? this.ProfileStack : this.AuthStack
            }
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
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
  mapDispatchToProps,
)(App);
