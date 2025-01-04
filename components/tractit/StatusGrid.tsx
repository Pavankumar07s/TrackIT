
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Package, ShoppingCart, RotateCcw, RefreshCw } from 'lucide-react-native';

interface StatusItemProps {
  title: string;
  value: number;
  Icon: React.ComponentType<any>;
  color: string;
}

interface ProductCardProps {
  total: number;
  sold: number;
  returned: number;
  recycled: number;
}

const StatusItem: React.FC<StatusItemProps> = ({ title, value, Icon, color }) => (
  <View style={styles.statusItem}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const StatusGrid: React.FC<ProductCardProps> = ({
  total,
  sold,
  returned,
  recycled,
}) => {
  const inventory = total - (sold + returned + recycled);

  const items = [
    {
      title: 'Inventory',
      value: inventory,
      Icon: Package,
      color: '#4F46E5',
    },
    {
      title: 'Sold',
      value: sold,
      Icon: ShoppingCart,
      color: '#16A34A',
    },
    {
      title: 'Returned',
      value: returned,
      Icon: RotateCcw,
      color: '#CA8A04',
    },
    {
      title: 'Recycled',
      value: recycled,
      Icon: RefreshCw,
      color: '#DC2626',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <StatusItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusItem: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  title: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});