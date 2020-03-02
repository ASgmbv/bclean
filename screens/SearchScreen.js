import React from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';

import ListItem from '../components/ListItem';

// REDUX
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {selectAllItems} from '../redux/items/items.selectors';
import {setItems} from '../redux/items/items.actions';

class SearchScreen extends React.Component {
  state = {
    resultArray: null,
    query: '',
  };

  // makeSearch = query => {
  //   const searchResult = this.props.allItems.filter(item =>
  //     item.companyName.includes(query),
  //   );
  //   console.log(searchResult);
  //   // this.setState({resultArray: [...searchResult]});
  // };
  //query => this.makeSearch(query)

  render() {
    console.log(this.props.allItems);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Поиск</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Поиск"
          autoCapitalize="none"
          value={this.state.query}
          onChangeText={query => {
            // const temp = this.makeSearch(query);
            this.setState({query});
          }}
        />

        <FlatList
          style={styles.content}
          renderItem={({item}) => (
            <ListItem item={item} keyExtractor={item.id} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

// this.props.allItems.filter(item => { item.name.includes(this.state.query);})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201, 230, 225)',
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
  input: {
    borderWidth: 2,
    borderColor: 'rgb(112, 172, 177)',
    margin: 15,
    padding: 10,
    fontSize: 15,
    color: '#161f3d',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  allItems: selectAllItems,
});

export default connect(mapStateToProps, null)(SearchScreen);
