import { Text,View,FlatList, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import {
  ManufacturersDocument,
  ProductsDocument,
  ProductsQuery,
} from '../../gql/generated'
import { ProductCard } from '../../components/tractit/ProductCard'

export default function Product() {
  const { data, loading, fetchMore } = useQuery(ProductsDocument);
  console.log(data);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
      },
    })
  }

  return (
    <View>
      <FlatList<ProductsQuery['products'][0]>
        data={data?.products || []}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={loadMore}
      />
    </View>
  )
}
