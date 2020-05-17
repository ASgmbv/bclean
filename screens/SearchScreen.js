import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';

import ListItem from '../components/ListItem';
import HorizontalListItem from '../components/HorizontalListItem';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {
  selectAllItems,
  selectAdvertisedItems,
} from '../redux/items/items.selectors';
import {setItems} from '../redux/items/items.actions';

// FIREBASE
import {firestore} from '../fire';

//PAGES
import LoadingScreen from './LoadingScreen';

// CUSTOM COMPONENTS
import Header from '../components/header';

class SearchScreen extends React.Component {
  state = {
    list: [],
    loading: true,
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = firestore
      .collection('posts')
      .onSnapshot(querySnapshot => {
        const temp = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.setState({list: [...temp], loading: false});
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  itemClicked = item => {
    this.props.navigation.navigate('CompanyScreen', item);
  };

  render() {
    let data = [];
    const currentUser = this.props.currentUser;
    const list = this.state.list;

    if (currentUser) {
      data = list.filter(item => item.favorited.includes(currentUser.email));
    }

    return this.state.loading ? (
      <LoadingScreen />
    ) : (
      <View style={styles.container}>
        <Header title="BeClean" />

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Избранные</Text>

            <FlatList
              data={data}
              renderItem={({item}) => (
                <ListItem
                  onItemClicked={this.itemClicked}
                  item={item}
                  keyExtractor={item.id}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#EEE',
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#777',
  },
  sectionTitle: {
    fontFamily: 'Roboto',
    marginVertical: 15,
    fontSize: 23,
    fontWeight: 'bold',
    color: '#011E3B',
    letterSpacing: 0.3,
  },
});

const mapStateToProps = createStructuredSelector({
  allItems: selectAllItems,
  advertisedItems: selectAdvertisedItems,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
