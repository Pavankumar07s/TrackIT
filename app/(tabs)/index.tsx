import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Prod from '../Screens/Product';
import ProductScreen from '../Screens/ProductDetails';
import ProductItemsScreen from '../Screens/ProductItems';
import ProductItemTimelineScreen from '../Screens/ProductItemTimeline';
import ModalScreen from '../Screens/Modal';
import Navbar from '../../components/tractit/Navbar';
type RootStackParamList = {
  Product: undefined;
  ProductDetails: { productId: string };
  ProductItems: { productId: string };
  ProductItemTimeline: { itemId: string };
  Modal: undefined;
  ManufacturerProducts: { manufacturerId: string };
  Manufacture: undefined;
  ManufacturerScreen: undefined;


};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    
    <Stack.Navigator initialRouteName="Product" screenOptions={{
      header: (props) => <Navbar {...props} />,
    }}>
      {/* Product list screen */}
      <Stack.Screen
        name="Product"
        component={Prod}
        options={{ headerShown: false }}
      />
      
      {/* Product details screen */}
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
