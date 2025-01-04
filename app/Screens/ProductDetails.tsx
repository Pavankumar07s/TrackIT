import { StatusGrid } from '../../components/tractit/StatusGrid';
import { ToxicItemsChart } from '../../components/tractit/ToxicItemsChart';
import { ProductDocument } from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { ChevronRight, Building2, Package } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  product: { productId: string };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { data, loading } = useQuery(ProductDocument, {
    variables: { where: { id: productId } },
  });

  useEffect(() => {
    navigation.setOptions({
      title: data?.product.name || 'Product Details',
      headerStyle: {
        backgroundColor: '#F9FAFB',
      },
      headerShadowVisible: false,
    });
  }, [navigation, data?.product.name]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: insets.bottom + 16 },
      ]}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{data.product.name}</Text>
        <View style={styles.manufacturerRow}>
          <Building2 size={20} color="#6B7280" />
          <Text style={styles.manufacturerText}>
            {data.product.manufacturer.name}
          </Text>
        </View>
      </View>

      {/* Status Grid Section */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionTitle}>Product Status</Text>
        <StatusGrid
          recycled={data.product.recycledCount}
          returned={data.product.returnedCount}
          sold={data.product.soldCount}
          total={data.product.totalCount}
        />
      </View>

      {/* Toxic Items Chart Section */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionTitle}>Toxicity Analysis</Text>
        <ToxicItemsChart toxicItems={data.product.toxicItems} />
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('ProductItems', { productId })}
      >
        <View style={styles.actionButtonContent}>
          <Package size={20} color="#2563EB" />
          <Text style={styles.actionButtonText}>View all items</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  headerSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  manufacturerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  manufacturerText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#4B5563',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductScreen;