import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator/Navigator';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface iProps
  extends StackScreenProps<RootStackParamList, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: iProps) => {
  const {
    simplePokemon: {name, id, picture},
    color,
  } = route.params;
  const {isLoading, pokemon} = usePokemon(id);
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* Back icon  */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 6,
          }}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        {/* pokemon name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {`${name} \n#${id}`}
        </Text>
        {/* pokeball */}
        <Image
          source={require('../assets/pokeball-white.png')}
          style={{...styles.pokeBall}}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* Detalles */}
      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  pokemonName: {
    color: 'white',
    fontSize: 35,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeBall: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
