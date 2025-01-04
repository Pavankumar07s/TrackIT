import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, View, StyleSheet } from 'react-native';
import { ProductItemsList } from '../../components/tractit/ProductItemsList';

type RootStackParamList = {
  product: { productId: string };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const ProductItemsScreen: React.FC = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Items',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
        keyboardAppearance="default"
      />
      <ProductItemsList productId={productId} searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  searchBox: {
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default ProductItemsScreen;
