import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {RootStackParamList} from './Navigator';

const SearchTab = createStackNavigator<RootStackParamList>();

export const SearchTabNavigator = () => {
  return (
    <SearchTab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <SearchTab.Screen name="HomeScreen" component={SearchScreen} />
      <SearchTab.Screen name="PokemonScreen" component={PokemonScreen} />
    </SearchTab.Navigator>
  );
};
