import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {iSimplePokemon} from '../interfaces/pokemonInterfaces';

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonScreen: {
    simplePokemon: iSimplePokemon;
    color: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export {Navigator};
