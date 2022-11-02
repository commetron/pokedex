import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {iSimplePokemon} from '../interfaces/pokemonInterfaces';
import {styles} from '../theme/appTheme';
const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, simplePokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<iSimplePokemon[]>([]);
  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }
    if (isNaN(Number(term))) {
      return setPokemonFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toUpperCase().includes(term.toUpperCase()),
        ),
      );
    }
    const pokemonById = simplePokemonList.find(pokemon => pokemon.id === term);
    setPokemonFiltered(pokemonById ? [pokemonById] : []);
  }, [term]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id}
          // Header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
