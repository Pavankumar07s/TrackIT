
// import React, { useEffect, useCallback } from 'react';
// import {
//   ProductStatus,
//   TransactionsDocument,
//   TransactionsQuery,
// } from '@/gql/generated';
// import { useQuery } from '@apollo/client';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import { format } from 'date-fns';
// import {
//   Factory,
//   RefreshCw,
//   RotateCcw,
//   ShoppingCart,
// } from 'lucide-react-native';

// type RootStackParamList = {
//   product: { productItemId: string };
// };

// type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

// const statusIconMap: Record<ProductStatus, React.ComponentType<any>> = {
//   [ProductStatus.Manufactured]: Factory,
//   [ProductStatus.Recycled]: RefreshCw,
//   [ProductStatus.Returned]: RotateCcw,
//   [ProductStatus.Sold]: ShoppingCart,
// };

// const TimelineItem = React.memo(({ 
//   item, 
//   isActive,
// }: { 
//   item: TransactionsQuery['transactions'][0];
//   isActive: boolean;
// }) => {
//   const IconComponent = statusIconMap[item.status];
//   const iconColor = isActive ? '#007bff' : '#b0b0b0'; // Primary and gray colors directly
  
//   return (
//     <View style={[styles.productItem, isActive && styles.activeItem]}>
//       <View style={styles.timelineContainer}>
//         <View style={styles.iconContainer}>
//           <IconComponent size={24} color={iconColor} />
//         </View>
//       </View>

//       <View style={styles.contentContainer}>
//         <Text style={[styles.date, isActive && styles.activeDate]}>
//           {format(new Date(item.timestamp), 'PPp')}
//         </Text>
//         <Text style={[styles.status, isActive && styles.activeStatus]}>
//           {item.status}
//         </Text>
//       </View>
//     </View>
//   );
// });

// const ProductItemTimelineScreen = () => {
//   const route = useRoute<ProductScreenRouteProp>();
//   const { productItemId } = route.params;
//   const navigation = useNavigation();

//   const { data, loading, fetchMore } = useQuery(TransactionsDocument, {
//     variables: {
//       where: { productItemId: { equals: productItemId } },
//       skip: 0,
//       take: 8,
//     },
//   });

//   useEffect(() => {
//     navigation.setOptions({
//       title: `${productItemId} Timeline`,
//     });
//   }, [navigation, productItemId]);

//   const loadMoreItems = useCallback(async () => {
//     if (!loading && data?.transactions?.length) {
//       try {
//         await fetchMore({
//           variables: {
//             skip: data.transactions.length,
//             take: 8,
//           },
//         });
//       } catch (error) {
//         console.error('Error loading more items:', error);
//       }
//     }
//   }, [data?.transactions?.length, loading, fetchMore]);

//   if (loading && !data?.transactions) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList<TransactionsQuery['transactions'][0]>
//         data={data?.transactions || []}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item, index }) => (
//           <TimelineItem
//             item={item}
//             isActive={index === 0}
//           />
//         )}
//         onEndReached={loadMoreItems}
//         onEndReachedThreshold={0.5}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No transactions found</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black', // Light gray background directly
//   },
//   listContent: {
//     paddingVertical: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa', // Light gray background directly
//   },
//   timelineContainer: {
//     width: 40,
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#dcdcdc', // Light gray border directly
//   },
//   contentContainer: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   productItem: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: 'white',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#6c757d', // Medium gray text color directly
//     marginBottom: 4,
//   },
//   activeDate: {
//     color: '#343a40', // Dark gray text color directly
//   },
//   status: {
//     fontSize: 14,
//     color: '#6c757d', // Medium gray text color directly
//     textTransform: 'capitalize',
//   },
//   activeStatus: {
//     color: '#007bff', // Primary blue color directly
//     fontWeight: '500',
//   },
//   activeItem: {
//     backgroundColor: '#e9ecef', // Light gray background color directly
//   },
//   emptyContainer: {
//     padding: 24,
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#adb5bd', // Light gray text color directly
//   },
// });

// export default ProductItemTimelineScreen;

import React, { useEffect, useCallback } from 'react';
import {
  ProductStatus,
  TransactionsDocument,
  TransactionsQuery,
} from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { format } from 'date-fns';
import {
  Factory,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react-native';

type RootStackParamList = {
  product: { productItemId: string };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const statusIconMap: Record<ProductStatus, React.ComponentType<any>> = {
  [ProductStatus.Manufactured]: Factory,
  [ProductStatus.Recycled]: RefreshCw,
  [ProductStatus.Returned]: RotateCcw,
  [ProductStatus.Sold]: ShoppingCart,
};

const TimelineItemSkeleton = () => (
  <View style={styles.productItem}>
    <View style={styles.timelineContainer}>
      <View style={styles.skeletonIconContainer} />
    </View>
    <View style={styles.contentContainer}>
      <View style={styles.skeletonDate} />
      <View style={styles.skeletonStatus} />
    </View>
  </View>
);

const SkeletonLoader = () => (
  <View style={styles.container}>
    {[1, 2, 3, 4].map((key) => (
      <TimelineItemSkeleton key={key} />
    ))}
  </View>
);

const TimelineItem = React.memo(({ 
  item, 
  isActive,
}: { 
  item: TransactionsQuery['transactions'][0];
  isActive: boolean;
}) => {
  const IconComponent = statusIconMap[item.status];
  const iconColor = isActive ? '#2563EB' : '#666';
  
  return (
    <View style={[styles.productItem, isActive && styles.activeItem]}>
      <View style={styles.timelineContainer}>
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
          <IconComponent size={24} color={iconColor} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.date, isActive && styles.activeDate]}>
          {format(new Date(item.timestamp), 'PPp')}
        </Text>
        <Text style={[styles.status, isActive && styles.activeStatus]}>
          {item.status}
        </Text>
      </View>
    </View>
  );
});

const ProductItemTimelineScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productItemId } = route.params;
  const navigation = useNavigation();

  const { data, loading, fetchMore } = useQuery(TransactionsDocument, {
    variables: {
      where: { productItemId: { equals: productItemId } },
      skip: 0,
      take: 8,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: `${productItemId} Timeline`,
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerShadowVisible: false,
    });
  }, [navigation, productItemId]);

  const loadMoreItems = useCallback(async () => {
    if (!loading && data?.transactions?.length) {
      try {
        await fetchMore({
          variables: {
            skip: data.transactions.length,
            take: 8,
          },
        });
      } catch (error) {
        console.error('Error loading more items:', error);
      }
    }
  }, [data?.transactions?.length, loading, fetchMore]);

  if (loading && !data?.transactions) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <FlatList<TransactionsQuery['transactions'][0]>
        data={data?.transactions || []}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TimelineItem
            item={item}
            isActive={index === 0}
          />
        )}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    paddingVertical: 16,
  },
  timelineContainer: {
    width: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  activeIconContainer: {
    backgroundColor: '#1a365d',
    borderColor: '#2563EB',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#111',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  activeDate: {
    color: '#fff',
  },
  status: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  activeStatus: {
    color: '#2563EB',
    fontWeight: '500',
  },
  activeItem: {
    backgroundColor: '#1a1a1a',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  // Skeleton styles
  skeletonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  skeletonDate: {
    height: 20,
    backgroundColor: '#222',
    borderRadius: 4,
    width: '60%',
    marginBottom: 8,
  },
  skeletonStatus: {
    height: 16,
    backgroundColor: '#222',
    borderRadius: 4,
    width: '40%',
  },
});

export default ProductItemTimelineScreen;