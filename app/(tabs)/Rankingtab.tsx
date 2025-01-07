// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   View,
//   Text,
//   Animated,
//   Dimensions,
//   Platform,
//   RefreshControl,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useQuery } from '@apollo/client';
// import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated';
// import { ProductsQuery } from '../../gql/generated';
// const { width } = Dimensions.get('window');



// // Enhanced Skeleton Loader with gradient-like effect
// const SkeletonLoader = () => {
//   const animatedValue = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(animatedValue, {
//           toValue: 1,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animatedValue, {
//           toValue: 0,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   const opacity = animatedValue.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0.3, 0.7, 0.3],
//   });

//   return (
//     <View style={styles.skeletonContainer}>
//       {[1, 2, 3, 4].map((item) => (
//         <Animated.View
//           key={item}
//           style={[
//             styles.skeletonItem,
//             { opacity },
//             item === 1 && styles.skeletonItemFirst,
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// interface ProductCardProps {
//   product: ProductsQuery['products'][0];
// }

// // Enhanced Manufacturer card with press animation
// const ManufacturerItem = ({ item, index,product }) => {
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;
//   const scaleAnim = React.useRef(new Animated.Value(1)).current;

//   const [estimateData, setEstimateData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const { id, name = 'Unnamed Product', manufacturer, totalCount = 0 } = product || {};
//   // console.log(name)


//   useEffect(() => {
//     const fetchEstimated = async () => {
//       if (!id) return;
//       console.log('Fetching estimate for product:', id);
//       setLoading(true);
//       try {
//         const response = await fetch('https://2af3-2409-40c2-100d-638f-d73-fd9-118f-2c1e.ngrok-free.app/predict', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ company_name:manufacturer.name.slice(0,1).toLocaleUpperCase(),product_id: "P"+id, number_of_products:product.totalCount }),
//         });
//         const data = await response.json();
//         console.log(data);
//       (data);
//       } catch (error) {
//         console.error('Error fetching estimate:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEstimated();
//   }, [id, totalCount]);
  
//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       delay: index * 120,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const onPressIn = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const onPressOut = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   const getRankColor = () => {
//     switch (index) {
//       case 0:
//         return '#FFD700';
//       case 1:
//         return '#C0C0C0';
//       case 2:
//         return '#CD7F32';
//       default:
//         return '#ffffff';
//     }
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       onPressIn={onPressIn}
//       onPressOut={onPressOut}
//     >
//       <Animated.View
//         style={[
//           styles.itemContainer,
//           {
//             opacity: fadeAnim,
//             transform: [
//               { scale: scaleAnim },
//               {
//                 translateY: fadeAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [50, 0],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <View style={[
//           styles.cardContainer,
//           index === 0 && styles.topRankedCard,
//         ]}>
//           <View style={styles.rankContainer}>
//             <Text style={[styles.rankText, { color: getRankColor() }]}>
//               #{index + 1}
//             </Text>
//             {index < 3 && (
//               <View style={styles.medalContainer}>
//                 <Text style={styles.crownEmoji}>{['👑', '🥈', '🥉'][index]}</Text>
//               </View>
//             )}
//             <View style={styles.estimateContainer}>
//               {loading ? (
//                 <ActivityIndicator size="small" color="#6B7280" />
//               ) : estimateData ? (
//                 <View style={styles.estimateContent}>
//                   <Text style={styles.estimateLabel}>Estimated Date</Text>
//                   <Text style={styles.estimateValue}>
//                     {estimateData.predicted_recycle_time?.toLocaleString() || '0'} Days
//                   </Text>
//                 </View>
//               ) : null}
//             </View>
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.manufacturerName} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <View style={styles.statsContainer}>
//               <Text style={styles.recycleCount}>
//                 {item.recycledCount.toLocaleString()} items recycled
//               </Text>
//               {index === 0 && (
//                 <View style={styles.topRankedBadge}>
//                   <Text style={styles.topRankedText}>Top Ranked</Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const RankedManufacturers: React.FC = () => {
//   const [refreshing, setRefreshing] = React.useState(false);
//   const { data, loading, fetchMore, refetch } = useQuery<ManufacturersQuery>(
//     ManufacturersDocument
//   );

//   const onRefresh = React.useCallback(async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   }, [refetch]);

//   if (loading && !data) {
//     return <SkeletonLoader />;
//   }

//   const rankedManufacturers = data?.manufacturers
//     ?.slice()
//     .sort((a, b) => (b.recycledCount || 0) - (a.recycledCount || 0)) || [];

//   const loadMore = async () => {
//     if (data?.manufacturers?.length) {
//       await fetchMore({
//         variables: {
//           skip: data.manufacturers.length,
//           take: 8,
//         },
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Top Manufacturers</Text>
//         <Text style={styles.headerSubtitle}>
//           Rankings based on recycled items
//         </Text>
//       </View>
//       <FlatList
//         data={rankedManufacturers}
//         renderItem={({ item, index }) => (
//           <ManufacturerItem item={item} index={index} />
//         )}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         contentContainerStyle={styles.listContainer}
//         keyExtractor={(item) => item.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#ffffff"
//           />
//         }
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={<View style={styles.listHeaderSpace} />}
//         ListFooterComponent={<View style={styles.listFooterSpace} />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   header: {
//     padding: 16,
//     paddingTop: Platform.OS === 'ios' ? 60 : 16,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   skeletonContainer: {
//     padding: 16,
//     paddingTop: Platform.OS === 'ios' ? 60 : 16,
//   },
//   skeletonItem: {
//     height: 90,
//     backgroundColor: '#1a1a1a',
//     marginBottom: 16,
//     borderRadius: 16,
//   },
//   skeletonItemFirst: {
//     height: 100,
//     backgroundColor: '#222222',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   listHeaderSpace: {
//     height: 8,
//   },
//   listFooterSpace: {
//     height: 40,
//   },
//   itemContainer: {
//     marginBottom: 16,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4.65,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   topRankedCard: {
//     backgroundColor: '#2a2a2a',
//     borderWidth: 1,
//     borderColor: '#FFD700',
//   },
//   rankContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 16,
//     minWidth: 50,
//   },
//   rankText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   medalContainer: {
//     marginLeft: 8,
//   },
//   crownEmoji: {
//     fontSize: 20,
//   },
//   infoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   manufacturerName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//     marginBottom: 6,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   recycleCount: {
//     fontSize: 14,
//     color: '#888888',
//     marginRight: 8,
//   },
//   topRankedBadge: {
//     backgroundColor: '#FFD700',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   topRankedText: {
//     color: '#000000',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   estimateContainer: {
//     minHeight: 40,
//     justifyContent: 'center',
//   },
//   estimateContent: {
//     gap: 4,
//   },
//   estimateLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   estimateValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#059669',
//   },
// });

// export default RankedManufacturers;
import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated';
import { ProductsQuery } from '../../gql/generated';
import { ArrowUp, ArrowDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');
interface ProductCardProps {
  product: ProductsQuery['products'][0];
}

// Enhanced Skeleton Loader with gradient-like effect
const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((item) => (
        <Animated.View
          key={item}
          style={[
            styles.skeletonItem,
            { opacity },
            item === 1 && styles.skeletonItemFirst,
          ]}
        />
      ))}
    </View>
  );
};

const ManufacturerItem = ({ item, index, product }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const arrowBounceAnim = useRef(new Animated.Value(0)).current;

  const [estimateData, setEstimateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, name = 'Unnamed Product', manufacturer, totalCount = 0 } = product || {};
  console.log(product)

  const startArrowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowBounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(arrowBounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    const fetchEstimated = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch('https://2af3-2409-40c2-100d-638f-d73-fd9-118f-2c1e.ngrok-free.app/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: name.slice(0, 1).toUpperCase(),
            product_id: "P" + 88,
            number_of_products: totalCount
          }),
        });
        const data = await response.json();
        setEstimateData(data);
        startArrowAnimation();
      } catch (error) {
        console.error('Error fetching estimate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimated();
  }, [id, totalCount]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 120,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getRankColor = () => {
    switch (index) {
      case 0:
        return '#FFD700';
      case 1:
        return '#C0C0C0';
      case 2:
        return '#CD7F32';
      default:
        return '#ffffff';
    }
  };

  const getRecycleTimeStatus = () => {
    console.log(estimateData)
    if (!estimateData) return null;
    
    const timeDiff = estimateData.avg_recycle_time_others - estimateData.predicted_recycle_time;
    const isPositive = timeDiff > 0;

    return {
      color: isPositive ? '#10B981' : '#EF4444',
      icon: isPositive ? (
        <Animated.View style={{
          transform: [{
            translateY: arrowBounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -10],
            }),
          }],
        }}>
          <ArrowUp size={24} color="#10B981" />
        </Animated.View>
      ) : (
        <Animated.View style={{
          transform: [{
            translateY: arrowBounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 10],
            }),
          }],
        }}>
          <ArrowDown size={24} color="#EF4444" />
        </Animated.View>
      ),
      difference: Math.abs(timeDiff).toFixed(1),
    };
  };

  const recycleStatus = getRecycleTimeStatus();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.itemContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[
          styles.cardContainer,
          index === 0 && styles.topRankedCard,
        ]}>
          <View style={styles.rankContainer}>
            <Text style={[styles.rankText, { color: getRankColor() }]}>
              #{index + 1}
            </Text>
            {index < 3 && (
              <View style={styles.medalContainer}>
                <Text style={styles.crownEmoji}>{['👑', '🥈', '🥉'][index]}</Text>
              </View>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.manufacturerName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.statsContainer}>
              <Text style={styles.recycleCount}>
                {item.recycledCount.toLocaleString()} items recycled
              </Text>
              {index === 0 && (
                <View style={styles.topRankedBadge}>
                  <Text style={styles.topRankedText}>Top Ranked</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.estimateContainer}>
            {loading ? (
              <ActivityIndicator size="small" color="#6B7280" />
            ) : estimateData ? (
              <View style={styles.estimateContent}>
                <View style={styles.recycleTimeContainer}>
                  <Text style={styles.estimateLabel}>Recycle Time</Text>
                  <Text style={[styles.estimateValue, { color: recycleStatus?.color }]}>
                    {estimateData.predicted_recycle_time} days
                  </Text>
                </View>
                <View style={styles.differenceContainer}>
                  {recycleStatus?.icon}
                  <Text style={[styles.differenceText, { color: recycleStatus?.color }]}>
                    {recycleStatus?.difference} days
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const RankedManufacturers = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, fetchMore, refetch } = useQuery<ManufacturersQuery>(
    ManufacturersDocument
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && !data) {
    return <SkeletonLoader />;
  }

  const rankedManufacturers = data?.manufacturers
    ?.slice()
    .sort((a, b) => (b.recycledCount || 0) - (a.recycledCount || 0)) || [];

  const loadMore = async () => {
    if (data?.manufacturers?.length) {
      await fetchMore({
        variables: {
          skip: data.manufacturers.length,
          take: 8,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Manufacturers</Text>
        <Text style={styles.headerSubtitle}>
          Rankings based on recycled items
        </Text>
      </View>
      <FlatList
        data={rankedManufacturers}
        renderItem={({ item, index }) => (
          <ManufacturerItem item={item} index={index} product={item} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.listHeaderSpace} />}
        ListFooterComponent={<View style={styles.listFooterSpace} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  skeletonContainer: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  skeletonItem: {
    height: 90,
    backgroundColor: '#1a1a1a',
    marginBottom: 16,
    borderRadius: 16,
  },
  skeletonItemFirst: {
    height: 100,
    backgroundColor: '#222222',
  },
  listContainer: {
    padding: 16,
  },
  listHeaderSpace: {
    height: 8,
  },
  listFooterSpace: {
    height: 40,
  },
  itemContainer: {
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  topRankedCard: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  medalContainer: {
    marginLeft: 8,
  },
  crownEmoji: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  manufacturerName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  recycleCount: {
    fontSize: 14,
    color: '#888888',
    marginRight: 8,
  },
  topRankedBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin:5,
    left:-10,
  },
  topRankedText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  estimateContainer: {
    minWidth: 120,
    justifyContent: 'center',
  },
  estimateContent: {
    gap: 8,
  },
  recycleTimeContainer: {
    alignItems: 'flex-end',
  },
  differenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  estimateLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  estimateValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  differenceText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RankedManufacturers;