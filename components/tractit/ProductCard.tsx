// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { ProductsQuery } from '../../gql/generated'; // Adjust the import path as necessary
// import { useNavigation } from '@react-navigation/native';

// interface ProductCardProps {
//   product: ProductsQuery['products'][0];
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const navigation = useNavigation();

//   // Safely access nested properties
//   const {
//     id,
//     name = 'Unnamed Product',
//     manufacturer,
//     totalCount = 0,
//   } = product || {};

//   const handlePress = () => {
//     if (id) {
//       navigation.navigate('ProductDetails', { productId: id });
//     }
//   };

//   // Get status color based on count
//   const getStatusColor = () => {
//     if (totalCount === 0) return '#EF4444'; // Red
//     if (totalCount < 10) return '#F59E0B'; // Orange
//     return '#10B981'; // Green
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       style={styles.touchable}
//       activeOpacity={0.7}
//     >
//       <View style={styles.card}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View style={styles.productIcon}>
//             <Feather name="box" size={20} color="#666" />
//           </View>

//           <View style={styles.titleContainer}>
//             <Text style={styles.title} numberOfLines={1}>
//               {name}
//             </Text>

//             <View style={styles.manufacturerContainer}>
//               <Feather name="briefcase" size={12} color="#666" />
//               <Text style={styles.manufacturerName} numberOfLines={1}>
//                 {manufacturer?.name || 'Unknown Manufacturer'}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Details Section */}
//         <View style={styles.detailsContainer}>
//           <View style={styles.statusContainer}>
//             <View
//               style={[
//                 styles.statusIndicator,
//                 { backgroundColor: getStatusColor() },
//               ]}
//             />
//             <Text style={styles.statusText}>
//               {totalCount === 0
//                 ? 'Out of Stock'
//                 : totalCount < 10
//                 ? 'Low Stock'
//                 : 'In Stock'}
//             </Text>
//           </View>

//           <View style={styles.countContainer}>
//             <Text style={styles.countLabel}>Total Items:</Text>
//             <Text style={styles.countValue}>{totalCount.toLocaleString()}</Text>
//           </View>
//         </View>

//         {/* Footer */}
//         <View style={styles.footer}>
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
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   productIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   titleContainer: {
//     flex: 1,
//     gap: 4,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   manufacturerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   manufacturerName: {
//     fontSize: 13,
//     color: '#666',
//     flex: 1,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginBottom: 12,
//   },
//   detailsContainer: {
//     marginBottom: 12,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statusIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 6,
//   },
//   statusText: {
//     fontSize: 13,
//     color: '#666',
//     fontWeight: '500',
//   },
//   countContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   countLabel: {
//     fontSize: 13,
//     color: '#666',
//   },
//   countValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginTop: 8,
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductsQuery } from '../../gql/generated';
import { useNavigation } from '@react-navigation/native';

interface ProductCardProps {
  product: ProductsQuery['products'][0];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation();
  const [estimateData, setEstimateData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { id, name = 'Unnamed Product', manufacturer, totalCount = 0 } = product || {};

  useEffect(() => {
    const fetchEstimate = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await fetch('https://giant-berries-worry.loca.lt/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company_name:manufacturer.name,product_id: id, number_of_products:totalCount }),
        });
        const data = await response.json();
        setEstimateData(data);
      } catch (error) {
        console.error('Error fetching estimate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [id, totalCount]);

  const handlePress = () => {
    if (id) {
      navigation.navigate('ProductDetails', { productId: id });
    }
  };

  const getStatusColor = () => {
    if (totalCount === 0) return '#DC2626'; // Darker red
    if (totalCount < 10) return '#D97706'; // Darker orange
    return '#059669'; // Darker green
  };

  const getStatusBgColor = () => {
    if (totalCount === 0) return '#FEE2E2'; // Light red
    if (totalCount < 10) return '#FEF3C7'; // Light orange
    return '#D1FAE5'; // Light green
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchable}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.mainContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.productIcon}>
              <Feather name="box" size={24} color="#4B5563" />
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {name}
              </Text>

              <View style={styles.manufacturerContainer}>
                <Feather name="briefcase" size={14} color="#6B7280" />
                <Text style={styles.manufacturerName} numberOfLines={1}>
                  {manufacturer?.name || 'Unknown Manufacturer'}
                </Text>
              </View>
            </View>
          </View>

          {/* Status Badge */}
          <View 
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusBgColor() }
            ]}
          >
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor() },
              ]}
            />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {totalCount === 0
                ? 'Out of Stock'
                : totalCount < 10
                ? 'Low Stock'
                : 'In Stock'}
            </Text>
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <View style={styles.countContainer}>
              <Text style={styles.countLabel}>Available Items</Text>
              <Text style={styles.countValue}>{totalCount.toLocaleString()}</Text>
            </View>

            {/* Estimate Section */}
            <View style={styles.estimateContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#6B7280" />
              ) : estimateData ? (
                <View style={styles.estimateContent}>
                  <Text style={styles.estimateLabel}>Estimated Date</Text>
                  <Text style={styles.estimateValue}>
                    {estimateData.predicted_recycle_time?.toLocaleString() || '0'} Days
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.viewDetails}>View Details</Text>
          <Feather name="chevron-right" size={20} color="#6B7280" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  mainContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.5,
  },
  manufacturerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  manufacturerName: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  countContainer: {
    marginBottom: 12,
  },
  countLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  countValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  estimateContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  estimateContent: {
    gap: 4,
  },
  estimateLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  estimateValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});