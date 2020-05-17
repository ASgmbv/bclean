import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  BackgroundImage,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default (HorizontalListItem = ({item, onItemClicked}) => {
  const {companyName, image, description, rating, isAdvertised} = item;
  return (
    <TouchableOpacity
      onPress={() => onItemClicked(item)}
      style={{
        width: 210,
        height: 200,
        justifyContent: 'space-between',
        overflow: 'hidden',
        elevation: 1,
        backgroundColor: '#fff',
        marginRight: 20,
        borderRadius: 15,
        elevation: 3,
      }}>
      <View style={{height: '30%'}}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/images/background.jpg')}
        />
      </View>
      <View
        style={{
          padding: 10,
          height: '70%',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#004588',
          }}>
          {companyName}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            color: '#598ec2',
            fontSize: 15,
            fontWeight: '600',
          }}>
          {description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', color: '#F6436A'}}>{rating}</Text>
            <Icon
              style={{marginRight: 5}}
              name="star"
              size={20}
              color={'#F6436A'}
            />
          </View>
          {isAdvertised ? (
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#F6436A',
                }}>
                VIP
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'center',
  },
  description: {
    color: 'rgb(0, 0, 0)',
    fontSize: 15,
    fontWeight: '500',
  },
});
