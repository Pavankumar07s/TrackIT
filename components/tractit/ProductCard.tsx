import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductsQuery } from '../../gql/generated'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

interface ProductCardProps {
  product: ProductsQuery['products'][0];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation();

  // Safely access nested properties
  const {
    id,
    name = 'Unnamed Product',
    manufacturer,
    totalCount = 0,
  } = product || {};

  const handlePress = () => {
    if (id) {
      navigation.navigate('ProductDetails', { productId: id });
    }
  };

  // Get status color based on count
  const getStatusColor = () => {
    if (totalCount === 0) return '#EF4444'; // Red
    if (totalCount < 10) return '#F59E0B'; // Orange
    return '#10B981'; // Green
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchable}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.productIcon}>
            <Feather name="box" size={20} color="#666" />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>

            <View style={styles.manufacturerContainer}>
              <Feather name="briefcase" size={12} color="#666" />
              <Text style={styles.manufacturerName} numberOfLines={1}>
                {manufacturer?.name || 'Unknown Manufacturer'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor() },
              ]}
            />
            <Text style={styles.statusText}>
              {totalCount === 0
                ? 'Out of Stock'
                : totalCount < 10
                ? 'Low Stock'
                : 'In Stock'}
            </Text>
          </View>

          <View style={styles.countContainer}>
            <Text style={styles.countLabel}>Total Items:</Text>
            <Text style={styles.countValue}>{totalCount.toLocaleString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Feather name="chevron-right" size={20} color="#666" />
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
    borderRadius: 12,
    padding: 16,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  manufacturerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  manufacturerName: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countLabel: {
    fontSize: 13,
    color: '#666',
  },
  countValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
});
