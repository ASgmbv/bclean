import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  YellowBox,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {ScrollView} from 'react-native-gesture-handler';

// custom components
import Header from '../components/header';
import PrimaryButton from '../components/primaryButton';

// REDUX
import {selectCurrentUser} from '../redux/user/user.selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {addFavorite, removeFavorite} from '../fire';

class CompanyScreen extends React.Component {
  state = {};

  componentDidMount() {
    // this.requestCameraPermission();
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  render() {
    const {
      companyName,
      companyPhone,
      companyEmail,
      description,
      image,
      services,
      uid,
      reviews,
      favorited,
    } = this.props.route.params;

    const {currentUser} = this.props;

    return (
      <>
        <Header
          title={companyName}
          onPress={() => this.props.navigation.goBack()}
        />

        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground style={styles.image} source={{uri: image}} />

            <View style={styles.informaionContainer}>
              <PrimaryButton
                style={{marginBottom: '5'}}
                onPress={() =>
                  this.props.navigation.navigate('BookScreen', companyPhone)
                }>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Связаться
                </Text>
              </PrimaryButton>

              {/* COMPANY PHONE */}
              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="email"
                  size={20}
                  color={'#000'}
                />
                <Text style={styles.text}>{companyEmail}</Text>
              </View>

              {/* DESCRIPTION */}
              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="phone"
                  size={20}
                  color={'#000'}
                />
                <Text style={styles.text}>{companyPhone}</Text>
              </View>

              <View style={styles.block}>
                <Icon
                  style={styles.iconka}
                  name="info-outline"
                  size={20}
                  color={'#000'}
                />
                <Text style={styles.text}>{description}</Text>
              </View>

              <Text
                style={{fontSize: 17, fontWeight: 'bold', marginVertical: 10}}>
                Услуги
              </Text>

              {currentUser ? (
                favorited.includes(currentUser.email) ? (
                  <PrimaryButton
                    style={{marginBottom: '5'}}
                    onPress={() =>
                      removeFavorite(uid, currentUser.email)
                        .then(() =>
                          ToastAndroid.show(
                            'Операция выполнена успешна!',
                            ToastAndroid.LONG,
                          ),
                        )
                        .catch(() =>
                          ToastAndroid.show(
                            'Что-то пошло не так!',
                            ToastAndroid.LONG,
                          ),
                        )
                    }>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      Убрать из избранных
                    </Text>
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    style={{marginBottom: '5'}}
                    onPress={() =>
                      addFavorite(uid, currentUser.email)
                        .then(() =>
                          ToastAndroid.show(
                            'Операция выполнена успешна!',
                            ToastAndroid.LONG,
                          ),
                        )
                        .catch(() =>
                          ToastAndroid.show(
                            'Что-то пошло не так!',
                            ToastAndroid.LONG,
                          ),
                        )
                    }>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      В избранные
                    </Text>
                  </PrimaryButton>
                )
              ) : null}

              <View>
                <FlatList
                  style={styles.block}
                  data={services}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.block}>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          style={styles.iconka}
                          name="label-outline"
                          size={20}
                          color={'#000'}
                        />
                        <Text style={{color: '#004588'}}>{`${item}`}</Text>
                      </View>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <Text
                style={{fontSize: 17, fontWeight: 'bold', marginVertical: 10}}>
                Комментарии
              </Text>

              <PrimaryButton
                style={{marginBottom: '5'}}
                onPress={() => {
                  if (currentUser) {
                    this.props.navigation.navigate('ContactScreen', {
                      companyId: uid,
                    });
                  } else {
                    ToastAndroid.show(
                      `Нужно сперва зарегистрироваться!`,
                      ToastAndroid.LONG,
                    );
                  }
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Написать отзыв
                </Text>
              </PrimaryButton>

              <View>
                <FlatList
                  style={styles.block}
                  data={reviews}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={styles.block} key={index.toString()}>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          style={styles.iconka}
                          name="message"
                          size={20}
                          color={'#000'}
                        />
                        <Text
                          style={{
                            color: '#004588',
                          }}>{`${item.name}`}</Text>
                      </View>
                      <Text>{`${item.review}`}</Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(
  mapStateToProps,
  null,
)(CompanyScreen);

// {/* {`name: ${review.name}, review: ${review.review}`} */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },

  image: {
    width: '100%',
    aspectRatio: 2 / 1,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'center',
  },

  informaionContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
  },

  block: {
    marginBottom: 10,
    marginTop: 10,
  },
  iconka: {
    marginRight: 10,
  },

  text: {
    color: '#004588',
  },
});
