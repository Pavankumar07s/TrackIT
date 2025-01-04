// import { Text,View,FlatList, StyleSheet } from 'react-native'
// import { useQuery } from '@apollo/client'
// import {
//   ManufacturersDocument,
//   ProductsDocument,
//   ProductsQuery,
// } from '../../gql/generated'
// import { ProductCard } from '../../components/tractit/ProductCard'

// export default function Product() {
//   const { data, loading, fetchMore } = useQuery(ProductsDocument);
//   console.log(data);

//   const loadMore = async () => {
//     await fetchMore({
//       variables: {
//         skip: data?.products?.length,
//         take: 8,
//       },
//     })
//   }

//   return (
//     <View>
//       <FlatList<ProductsQuery['products'][0]>
//         data={data?.products || []}
//         renderItem={({ item }) => <ProductCard product={item} />}
//         onEndReached={loadMore}
//       />
//     </View>
//   )
// }

import { Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import Animated, { FadeIn } from 'react-native-reanimated';
import { 
  ManufacturersDocument,
  ProductsDocument,
  ProductsQuery,
} from '../../gql/generated';
import { ProductCard } from '../../components/tractit/ProductCard';

const SkeletonProduct = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonContent}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonPrice} />
      <View style={styles.skeletonDescription} />
    </View>
  </View>
);

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    {[1, 2, 3].map((key) => (
      <SkeletonProduct key={key} />
    ))}
  </View>
);

export default function Product() {
  const { data, loading, fetchMore } = useQuery(ProductsDocument);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
      },
    });
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  const renderProduct = ({ item }) => (
    <Animated.View entering={FadeIn.duration(500)}>
      <ProductCard product={item} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.products || []}
        renderItem={renderProduct}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
  skeletonContainer: {
    padding: 16,
    gap: 16,
  },
  skeletonCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  skeletonImage: {
    width: '100%',
    height: 200, // Fixed height for single column
    backgroundColor: '#E1E9EE',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  skeletonContent: {
    padding: 12,
    gap: 8,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    width: '80%',
  },
  skeletonPrice: {
    height: 24,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    width: '40%',
  },
  skeletonDescription: {
    height: 16,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    width: '100%',
  },
});