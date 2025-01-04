import { ProductsQuery } from '@/gql/generated';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface ToxicItemsProps {
  toxicItems: ProductsQuery['products'][0]['toxicItems'];
}

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${percentage}%` }]} />
  </View>
);

export const ToxicItemsChart = ({ toxicItems }: ToxicItemsProps) => {
  const totalWeight = toxicItems.reduce((sum, item) => sum + item.weight, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle size={20} color="#DC2626" />
        <Text style={styles.title}>Toxic Components</Text>
      </View>
      
      {toxicItems.map((item) => {
        const percentage = (item.weight / totalWeight) * 100;
        return (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemWeight}>{item.weight}mg</Text>
            </View>
            <ProgressBar percentage={percentage} />
            <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
          </View>
        );
      })}
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Weight</Text>
        <Text style={styles.totalWeight}>{totalWeight}mg</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  itemWeight: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  totalContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalWeight: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
  },
});