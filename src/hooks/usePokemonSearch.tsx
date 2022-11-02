import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  iPokemonPaginatedRespone,
  iSimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<iSimplePokemon[]>(
    [],
  );
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1200';

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<iPokemonPaginatedRespone>(url);
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: iResult[]) => {
    const newPokemonList: iSimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, picture, name};
    });
    setSimplePokemonList(newPokemonList);
    setIsLoading(false);
  };
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemonList,
  };
};
