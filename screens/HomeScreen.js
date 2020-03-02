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

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {selectAllItems} from '../redux/items/items.selectors';
import {setItems} from '../redux/items/items.actions';

// FIREBASE
import {firestore} from '../fire';

//PAGES
import LoadingScreen from './LoadingScreen';

class HomeScreen extends React.Component {
  state = {
    loading: true,
  };

  constructor(props) {
    super(props);
  }

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = firestore
      .collection('posts')
      .onSnapshot(querySnapshot => {
        const temp = [];
        querySnapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        // this.setState({items: [...temp], loading: false});
        console.log(this.props);
        console.log('1');
        this.props.setItems([...temp]);
        console.log('2');
        this.setState({loading: false});
        console.log('3');
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  itemClicked = item => {
    this.props.navigation.navigate('CompanyScreen', item);
  };

  render() {
    return this.state.loading ? (
      <LoadingScreen />
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Главная</Text>
        </View>

        <FlatList
          style={styles.content}
          data={this.props.allItems}
          renderItem={({item}) => (
            <ListItem
              onItemClicked={this.itemClicked}
              item={item}
              keyExtractor={item.id}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#777',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgb(112, 172, 177)',
  },
  content: {
    backgroundColor: 'rgb(201, 230, 225)',
    // backgroundColor: '#fff',
  },
});

const mapStateToProps = createStructuredSelector({
  allItems: selectAllItems,
});

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
