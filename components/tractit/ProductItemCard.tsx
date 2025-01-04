// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { ProductItemsQuery } from '@/gql/generated';

// interface ProductItemCardProps {
//   item: ProductItemsQuery['productItems'][0];
//   index?: number;
// }

// export const ProductItemCard: React.FC<ProductItemCardProps> = ({ 
//   item,
//   index = 0 
// }) => {
//   const navigation = useNavigation(); // Use React Navigation's useNavigation hook

//   // Safely access properties with defaults
//   const {
//     id = 'Unknown ID',
//     status = 'Unknown Status',
//     location,
//     lastUpdated,
//   } = item || {};

//   const handlePress = () => {
//     if (id) {
//       // Use navigation.navigate to go to the 'ProductItemTimeline' screen
//       navigation.navigate('ProductItemTimeline', { productItemId: id });
//     }
//   };

//   // Get status color based on item status
//   const getStatusColor = () => {
//     switch (status.toLowerCase()) {
//       case 'active':
//         return '#10B981'; // Green
//       case 'inactive':
//         return '#6B7280'; // Gray
//       case 'maintenance':
//         return '#F59E0B'; // Orange
//       case 'error':
//         return '#EF4444'; // Red
//       default:
//         return '#6B7280'; // Default gray
//     }
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       style={styles.touchable}
//       activeOpacity={0.7}
//     >
//       <View style={styles.card}>
//         {/* Header with ID and Status */}
//         <View style={styles.header}>
//           <View style={styles.idContainer}>
//             <Feather name="hash" size={16} color="#666" />
//             <Text style={styles.itemId} numberOfLines={1}>
//               {id}
//             </Text>
//           </View>
          
//           <View style={[styles.statusBadge, { borderColor: getStatusColor() }]}>
//             <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
//             <Text style={[styles.statusText, { color: getStatusColor() }]}>
//               {status}
//             </Text>
//           </View>
//         </View>

//         {/* Details Section */}
//         <View style={styles.detailsContainer}>
//           {location && (
//             <View style={styles.infoRow}>
//               <Feather name="map-pin" size={14} color="#666" />
//               <Text style={styles.infoText} numberOfLines={1}>
//                 {location}
//               </Text>
//             </View>
//           )}
          
//           {lastUpdated && (
//             <View style={styles.infoRow}>
//               <Feather name="clock" size={14} color="#666" />
//               <Text style={styles.infoText}>
//                 Last updated: {new Date(lastUpdated).toLocaleDateString()}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Footer with chevron */}
//         <View style={styles.footer}>
//           <Text style={styles.viewTimelineText}>View Timeline</Text>
//           <Feather name="chevron-right" size={20} color="#666" />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   touchable: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   idContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   itemId: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     flex: 1,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     borderWidth: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   statusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginRight: 6,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   detailsContainer: {
//     gap: 8,
//     marginBottom: 12,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#666',
//     flex: 1,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5E5',
//   },
//   viewTimelineText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
// });


import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductItemsQuery } from '@/gql/generated';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ProductItemCardProps {
  item: ProductItemsQuery['productItems'][0];
  index?: number;
}

export const ProductItemCard: React.FC<ProductItemCardProps> = ({ 
  item,
  index = 0 
}) => {
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  // Safely access properties with defaults
  const {
    id = 'Unknown ID',
    status = 'Unknown Status',
    location,
    lastUpdated,
  } = item || {};

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (id) {
      navigation.navigate('ProductItemTimeline', { productItemId: id });
    }
  }, [id, navigation]);

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#10B981';
      case 'inactive':
        return '#6B7280';
      case 'maintenance':
        return '#F59E0B';
      case 'error':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const statusColor = getStatusColor();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim.interpolate({
            inputRange: [0.97, 1],
            outputRange: [0.9, 1],
          }),
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
        activeOpacity={1}
      >
        <View style={styles.card}>
          {/* Status Bar */}
          <View style={[styles.statusBar, { backgroundColor: statusColor }]} />
          
          {/* Header with ID and Status */}
          <View style={styles.header}>
            <View style={styles.idContainer}>
              <Feather name="hash" size={16} color="#4B5563" />
              <Text style={styles.itemId} numberOfLines={1}>
                {id}
              </Text>
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}10` }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {status}
              </Text>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            {location && (
              <View style={styles.infoRow}>
                <Feather name="map-pin" size={14} color="#4B5563" />
                <Text style={styles.infoText} numberOfLines={1}>
                  {location}
                </Text>
              </View>
            )}
            
            {lastUpdated && (
              <View style={styles.infoRow}>
                <Feather name="clock" size={14} color="#4B5563" />
                <Text style={styles.infoText}>
                  Last updated: {new Date(lastUpdated).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>

          {/* Footer with chevron */}
          <View style={styles.footer}>
            <Text style={styles.viewTimelineText}>View Timeline</Text>
            <Animated.View
              style={{
                transform: [{
                  translateX: scaleAnim.interpolate({
                    inputRange: [0.97, 1],
                    outputRange: [-4, 0],
                  }),
                }],
              }}
            >
              <Feather name="chevron-right" size={20} color="#4B5563" />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  itemId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewTimelineText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
});