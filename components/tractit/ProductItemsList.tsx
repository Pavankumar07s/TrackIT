// import { ProductItemsDocument, ProductItemsQuery } from '@/gql/generated'
// import { useQuery } from '@apollo/client'
// import { 
//   FlatList, 
//   Text, 
//   View, 
//   ActivityIndicator, 
//   StyleSheet, 
//   RefreshControl,
//   Dimensions 
// } from 'react-native'
// import { ProductItemCard } from './ProductItemCard'
// import { useState, useCallback } from 'react'
// import { Feather } from '@expo/vector-icons'

// const ITEMS_PER_PAGE = 8
// const { width } = Dimensions.get('window')

// interface ProductItemsListProps {
//   productId: string
//   searchQuery?: string
// }

// export const ProductItemsList: React.FC<ProductItemsListProps> = ({
//   productId,
//   searchQuery,
// }) => {
//   const [refreshing, setRefreshing] = useState(false)
//   const [loadingMore, setLoadingMore] = useState(false)

//   const {
//     data: productItemsData,
//     loading,
//     fetchMore,
//     refetch,
//     error,
//   } = useQuery(ProductItemsDocument, {
//     variables: {
//       where: {
//         productId: { equals: productId },
//         ...(searchQuery ? { id: { contains: searchQuery } } : null),
//       },
//       skip: 0,
//       take: ITEMS_PER_PAGE,
//     },
//     notifyOnNetworkStatusChange: true,
//   })

//   const items = productItemsData?.productItems || []
//   const hasMoreItems = items.length >= ITEMS_PER_PAGE

//   const handleRefresh = async () => {
//     setRefreshing(true)
//     try {
//       await refetch()
//     } catch (e) {
//       console.error('Error refreshing items:', e)
//     } finally {
//       setRefreshing(false)
//     }
//   }

//   const loadMoreItems = async () => {
//     if (loadingMore || !hasMoreItems) return

//     setLoadingMore(true)
//     try {
//       await fetchMore({
//         variables: {
//           skip: items.length,
//           take: ITEMS_PER_PAGE,
//           where: {
//             productId: { equals: productId },
//             ...(searchQuery ? { id: { contains: searchQuery } } : null),
//           },
//         },
//       })
//     } catch (e) {
//       console.error('Error loading more items:', e)
//     } finally {
//       setLoadingMore(false)
//     }
//   }

//   const renderItem = useCallback(({ item, index }: { 
//     item: ProductItemsQuery['productItems'][0]
//     index: number 
//   }) => (
//     <ProductItemCard item={item} index={index} />
//   ), [])

//   if (loading && !loadingMore && !refreshing) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#666" />
//         <Text style={styles.loadingText}>Loading items...</Text>
//       </View>
//     )
//   }

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Feather name="alert-circle" size={48} color="#666" />
//         <Text style={styles.errorTitle}>Unable to load items</Text>
//         <Text style={styles.errorText}>{error.message}</Text>
//       </View>
//     )
//   }

//   if (!loading && items.length === 0) {
//     return (
//       <View style={styles.centerContainer}>
//         <Feather name="inbox" size={48} color="#666" />
//         <Text style={styles.emptyTitle}>No Items Found</Text>
//         <Text style={styles.emptyText}>
//           {searchQuery 
//             ? `No items match the search "${searchQuery}"`
//             : 'No items available for this product.'}
//         </Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList<ProductItemsQuery['productItems'][0]>
//         data={items}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.listContent}
//         onEndReached={loadMoreItems}
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
//               <Text style={styles.footerText}>Loading more items...</Text>
//             </View>
//           ) : null
//         }
//         showsVerticalScrollIndicator={false}
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
//     paddingVertical: 8,
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

import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { 
  FlatList, 
  Text, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  RefreshControl 
} from 'react-native';
import { ProductItemCard } from './ProductItemCard';
import { ProductItemsDocument, ProductItemsQuery } from '@/gql/generated';

const ITEMS_PER_PAGE = 8;

interface ProductItemsListProps {
  productId: string;
  searchQuery?: string;
}

export const ProductItemsList: React.FC<ProductItemsListProps> = ({
  productId,
  searchQuery,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, fetchMore, refetch, error } = useQuery(ProductItemsDocument, {
    variables: {
      where: {
        productId: { equals: productId },
        ...(searchQuery ? { id: { contains: searchQuery } } : {}),
      },
      skip: 0,
      take: ITEMS_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const items = data?.productItems || [];
  const hasMoreItems = items.length >= ITEMS_PER_PAGE;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.error('Error refreshing items:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMoreItems = async () => {
    if (loadingMore || !hasMoreItems) return;

    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          skip: items.length,
          take: ITEMS_PER_PAGE,
          where: {
            productId: { equals: productId },
            ...(searchQuery ? { id: { contains: searchQuery } } : {}),
          },
        },
      });
    } catch (e) {
      console.error('Error loading more items:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: ProductItemsQuery['productItems'][0] }) => (
      <ProductItemCard item={item} />
      
    ),
    []
  );

  if (loading && !refreshing && !loadingMore) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#666" />
        <Text>Loading items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No items found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color="#666" />
            <Text>Loading more items...</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
