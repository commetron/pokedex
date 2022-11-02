import {Text, Image, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {styles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FlatList} from 'react-native-gesture-handler';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();
  return (
    <>
      <Image
        source={require('../assets/pokeball.png')}
        style={styles.pokeballBg}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          style={{top: top + 20}}
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          // Header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                marginBottom: 20,
              }}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="gray" />
          }
        />
      </View>
    </>
  );
};
