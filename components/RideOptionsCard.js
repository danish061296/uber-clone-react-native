import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber-X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber-XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber-LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  // get the total distance from origin to destination
  const distanceInMiles =
    travelTimeInformation?.distance?.text
      .substring(0, travelTimeInformation?.distance?.text.length - 3)
      .split(',')
      .join('') / 1.609;

  // calculate the price in US dollars for each car service
  const getPrice = (multiplier) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      (travelTimeInformation?.duration?.value *
        SURGE_CHARGE_RATE *
        multiplier) /
        100
    );
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 h-12 w-12 text-center rounded-full bg-gray-100 z-50 `}
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl font-semibold`}>
          Select a Ride - {distanceInMiles.toFixed(1)} mi
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, id, title, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCar(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              id === selectedCar?.id && 'bg-gray-200'
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{
                uri: image,
              }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>{getPrice(multiplier)}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selectedCar}
          style={tw`bg-black py-3 ml-3 mr-3 mt-2 ${
            !selectedCar && 'bg-gray-300'
          }`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selectedCar?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
