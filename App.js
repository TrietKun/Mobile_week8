import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <Home/>
  );
}
