import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FullPokemon} from '../interfaces/pokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface iProps {
  pokemon: FullPokemon;
}

const PokemonDetails = ({pokemon}: iProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types */}
      <View style={{...styles.container, marginTop: 370}}>
        <Text style={{...styles.tittle}}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => {
            return (
              <Text style={styles.regularText} key={type.name}>
                {type.name}
              </Text>
            );
          })}
        </View>
        {/* weight */}
        <Text style={{...styles.tittle}}>Weight</Text>
        <Text style={{...styles.regularText}}>{pokemon.weight}kg</Text>
      </View>
      {/* Sprites */}
      <View style={{...styles.container, marginTop: 20}}>
        <Text style={{...styles.tittle}}>Sprites</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprites}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprites}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprites}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprites}
        />
      </ScrollView>
      {/* Abilities */}
      <View style={styles.container}>
        <Text style={styles.tittle}>Base abilities</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => {
            return (
              <Text style={styles.regularText} key={ability.name}>
                {ability.name}
              </Text>
            );
          })}
        </View>
      </View>
      {/* Movements */}
      <View style={styles.container}>
        <Text style={styles.tittle}>Movements</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => {
            return (
              <Text style={styles.regularText} key={move.name}>
                {move.name}
              </Text>
            );
          })}
        </View>
      </View>
      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.tittle}>Stats</Text>
        <View>
          {pokemon.stats.map(({stat, base_stat}, i) => {
            return (
              <View key={stat.name + i} style={{flexDirection: 'row'}}>
                <Text style={{...styles.regularText, width: 150}}>
                  {stat.name}
                </Text>
                <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                  {base_stat}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{alignItems: 'center', marginHorizontal: 25}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={{...styles.basicSprites}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  tittle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
    marginRight: 10,
  },
  basicSprites: {
    width: 100,
    height: 100,
  },
});
