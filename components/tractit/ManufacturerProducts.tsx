import { ProductsDocument, ProductsQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { 
  FlatList, 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  Text, 
  RefreshControl,
  Dimensions 
} from 'react-native'
import { ProductCard } from './ProductCard'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'

const ITEMS_PER_PAGE = 8
const { width } = Dimensions.get('window')

interface ManufacturerProductsProps {
  manufacturerId: string
}

export const ManufacturerProducts: React.FC<ManufacturerProductsProps> = ({
  manufacturerId,
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const { data, loading, fetchMore, refetch, error } = useQuery(ProductsDocument, {
    variables: { 
      where: { manufacturerId: { equals: manufacturerId } },
      take: ITEMS_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  })

  const products = data?.products || []
  const hasMoreProducts = products.length >= ITEMS_PER_PAGE

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (e) {
      console.error('Error refreshing products:', e)
    } finally {
      setRefreshing(false)
    }
  }

  const loadMore = async () => {
    if (loadingMore || !hasMoreProducts) return

    setLoadingMore(true)
    try {
      await fetchMore({
        variables: {
          skip: products.length,
          take: ITEMS_PER_PAGE,
          where: { manufacturerId: { equals: manufacturerId } },
        },
      })
    } catch (e) {
      console.error('Error loading more products:', e)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading && !loadingMore && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#666" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="alert-circle" size={48} color="#666" />
        <Text style={styles.errorTitle}>Unable to load products</Text>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="package" size={48} color="#666" />
        <Text style={styles.emptyTitle}>No Products Found</Text>
        <Text style={styles.emptyText}>
          This manufacturer hasn't added any products yet.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList<ProductsQuery['products'][0]>
        data={products}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <ProductCard 
              product={item}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#666"
            colors={['#666']}
          />
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#666" />
              <Text style={styles.footerText}>Loading more products...</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        numColumns={width >= 768 ? 2 : 1}
        columnWrapperStyle={width >= 768 ? styles.columnWrapper : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 16,
    minWidth: width >= 768 ? (width - 48) / 2 : '100%',
  },
  columnWrapper: {
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
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
    color: '#666',
  },
})