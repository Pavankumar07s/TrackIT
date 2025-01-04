// import { ProductsDocument, ProductsQuery } from '@/gql/generated'
// import { useQuery } from '@apollo/client'
// import { 
//   FlatList, 
//   View, 
//   StyleSheet, 
//   ActivityIndicator, 
//   Text, 
//   RefreshControl,
//   Dimensions 
// } from 'react-native'
// import { ProductCard } from './ProductCard'
// import { useState } from 'react'
// import { Feather } from '@expo/vector-icons'

// const ITEMS_PER_PAGE = 8
// const { width } = Dimensions.get('window')

// interface ManufacturerProductsProps {
//   manufacturerId: string
// }

// export const ManufacturerProducts: React.FC<ManufacturerProductsProps> = ({
//   manufacturerId,
// }) => {
//   const [refreshing, setRefreshing] = useState(false)
//   const [loadingMore, setLoadingMore] = useState(false)

//   const { data, loading, fetchMore, refetch, error } = useQuery(ProductsDocument, {
//     variables: { 
//       where: { manufacturerId: { equals: manufacturerId } },
//       take: ITEMS_PER_PAGE,
//     },
//     notifyOnNetworkStatusChange: true,
//   })

//   const products = data?.products || []
//   const hasMoreProducts = products.length >= ITEMS_PER_PAGE

//   const handleRefresh = async () => {
//     setRefreshing(true)
//     try {
//       await refetch()
//     } catch (e) {
//       console.error('Error refreshing products:', e)
//     } finally {
//       setRefreshing(false)
//     }
//   }

//   const loadMore = async () => {
//     if (loadingMore || !hasMoreProducts) return

//     setLoadingMore(true)
//     try {
//       await fetchMore({
//         variables: {
//           skip: products.length,
//           take: ITEMS_PER_PAGE,
//           where: { manufacturerId: { equals: manufacturerId } },
//         },
//       })
//     } catch (e) {
//       console.error('Error loading more products:', e)
//     } finally {
//       setLoadingMore(false)
//     }
//   }

//   if (loading && !loadingMore && !refreshing) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#666" />
//         <Text style={styles.loadingText}>Loading products...</Text>
//       </View>
//     )
//   }

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Feather name="alert-circle" size={48} color="#666" />
//         <Text style={styles.errorTitle}>Unable to load products</Text>
//         <Text style={styles.errorText}>{error.message}</Text>
//       </View>
//     )
//   }

//   if (!loading && products.length === 0) {
//     return (
//       <View style={styles.centerContainer}>
//         <Feather name="package" size={48} color="#666" />
//         <Text style={styles.emptyTitle}>No Products Found</Text>
//         <Text style={styles.emptyText}>
//           This manufacturer hasn't added any products yet.
//         </Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList<ProductsQuery['products'][0]>
//         data={products}
//         renderItem={({ item, index }) => (
//           <View style={styles.cardContainer}>
//             <ProductCard 
//               product={item}
//             />
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         keyExtractor={(item) => item.id}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             tintColor="#666"
//             colors={['#666']}
//           />
//         }
//         ListFooterComponent={
//           loadingMore ? (
//             <View style={styles.footerLoader}>
//               <ActivityIndicator size="small" color="#666" />
//               <Text style={styles.footerText}>Loading more products...</Text>
//             </View>
//           ) : null
//         }
//         showsVerticalScrollIndicator={false}
//         numColumns={width >= 768 ? 2 : 1}
//         columnWrapperStyle={width >= 768 ? styles.columnWrapper : undefined}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   cardContainer: {
//     flex: 1,
//     marginBottom: 16,
//     minWidth: width >= 768 ? (width - 48) / 2 : '100%',
//   },
//   columnWrapper: {
//     gap: 16,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//     backgroundColor: '#F5F5F5',
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: '#666',
//   },
//   errorTitle: {
//     marginTop: 16,
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   errorText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   emptyTitle: {
//     marginTop: 16,
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   emptyText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   footerLoader: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     gap: 8,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#666',
//   },
// })
import { ProductsDocument, ProductsQuery } from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet
} from 'react-native';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const ITEMS_PER_PAGE = 8;
const { width } = Dimensions.get('window');

const ProductSkeleton = () => {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonDescription} />
        <View style={styles.skeletonPrice} />
      </View>
    </View>
  );
};

const ManufacturerProductsSkeleton = () => {
  const items = Array.from({ length: 8 }, (_, i) => i);
  const isTablet = width >= 768;

  return (
    <View style={styles.container}>
      <View style={styles.skeletonGrid}>
        {items.map((item) => (
          <View 
            key={item} 
            style={[
              styles.skeletonCardWrapper,
              { width: isTablet ? (width - 48) / 2 : '100%' }
            ]}
          >
            <ProductSkeleton />
          </View>
        ))}
      </View>
    </View>
  );
};

interface ManufacturerProductsProps {
  manufacturerId: string;
}

export const ManufacturerProducts: React.FC<ManufacturerProductsProps> = ({
  manufacturerId,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, fetchMore, refetch, error } = useQuery(ProductsDocument, {
    variables: { 
      where: { manufacturerId: { equals: manufacturerId } },
      take: ITEMS_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.products || [];
  const hasMoreProducts = products.length >= ITEMS_PER_PAGE;
  const isTablet = width >= 768;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.error('Error refreshing products:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || !hasMoreProducts) return;

    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          skip: products.length,
          take: ITEMS_PER_PAGE,
          where: { manufacturerId: { equals: manufacturerId } },
        },
      });
    } catch (e) {
      console.error('Error loading more products:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading && !loadingMore && !refreshing) {
    return <ManufacturerProductsSkeleton />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="alert-circle" size={48} color="#666666" />
        <Text style={styles.errorTitle}>Unable to load products</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="package" size={48} color="#666666" />
        <Text style={styles.emptyTitle}>No Products Found</Text>
        <Text style={styles.emptyMessage}>
          This manufacturer hasn't added any products yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View 
            style={[
              styles.productCardWrapper,
              { width: isTablet ? (width - 48) / 2 : '100%' }
            ]}
          >
            <ProductCard product={item} />
          </View>
        )}
        numColumns={isTablet ? 2 : 1}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#666666"
            colors={['#666666']}
          />
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#666666" />
              <Text style={styles.footerText}>Loading more products...</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  listContent: {
    padding: 16,
  },
  productCardWrapper: {
    padding: 8,
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  errorMessage: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptyMessage: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  // Skeleton styles
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  skeletonCardWrapper: {
    marginBottom: 16,
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  skeletonImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#E0E0E0',
  },
  skeletonContent: {
    padding: 16,
    gap: 12,
  },
  skeletonTitle: {
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '80%',
  },
  skeletonDescription: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '100%',
  },
  skeletonPrice: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '40%',
    marginTop: 4,
  },
});

export default ManufacturerProducts;