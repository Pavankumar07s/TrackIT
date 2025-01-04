import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Manufacture from '../Screens/Manufacture';
import ManufacturerScreen  from '../Screens/Manufacturer';
import { ManufacturerProducts } from '../../components/tractit/ManufacturerProducts';
import ProductScreen from '../Screens/ProductDetails';
import ProductItemsScreen from '../Screens/ProductItems';
import ProductItemTimelineScreen from '../Screens/ProductItemTimeline';
import ModalScreen from '../Screens/Modal';
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
      {/* Product items screen */}
      <Stack.Screen
        name="ProductItems"
        component={ProductItemsScreen}
        options={{
          headerShown: false,
          title: 'Product Items',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
      
      {/* Product item timeline screen */}
      <Stack.Screen
        name="ProductItemTimeline"
        component={ProductItemTimelineScreen}
        options={{
          headerShown: false,
          title: 'Item Timeline',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />

      {/* Modal screen */}
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: 'modal', // Ensure this screen appears as a modal
          headerShown: false,
          title: 'About',
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