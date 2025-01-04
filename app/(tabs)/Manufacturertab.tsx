import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Manufacture from '../Screens/Manufacture';
import ManufacturerScreen  from '../Screens/Manufacturer';
import { ManufacturerProducts } from '../../components/tractit/ManufacturerProducts';
import ProductScreen from '../Screens/ProductDetails';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Manufacture" screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Manufacture" component={Manufacture} />
      <Stack.Screen
        name="ManufacturerScreen"
        component={ManufacturerScreen}
        options={{ title: 'Manufacturer Details' }}
      />
      <Stack.Screen
        name="ManufacturerProducts"
        component={ManufacturerProducts}
        options={{ title: 'Manufacturer Details' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductScreen}
        options={{
          headerShown: false,
          title: 'Product Details',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default App;