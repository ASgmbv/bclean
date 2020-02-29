import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ListItem from '../components/ListItem';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';

// FIREBASE
import {firestore} from '../fire';

class HomeScreen extends React.Component {
  state = {
    items: [],
    loading: true,
  };

  constructor(props) {
    super(props);
  }

  unsubscribe = null;

  componentDidMount() {
    const temp = [];
    this.unsubscribe = firestore
      .collection('posts')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        this.setState({items: [...temp], loading: false});
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator style={{marginTop: 100}} size="large" />
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 18}}>Главная</Text>
        </View>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => (
            <ListItem item={item} keyExtractor={item.id} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d9db',
    backgroundColor: '#e0f5ff',
    height: 50,
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(HomeScreen);
