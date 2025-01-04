import { StyleSheet,View } from 'react-native'
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native'
import { ManufacturerCard } from '../../components/tractit/ManufacturerCard'

export default function Manufacture() {
  const { data, loading, fetchMore } = useQuery(ManufacturersDocument);
  console.log(data);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.manufacturers?.length,
        take: 8,
      },
    })
  }

  return (
    <View>
      <FlatList<ManufacturersQuery['manufacturers'][0]>
        data={data?.manufacturers}
        renderItem={({ item }) => <ManufacturerCard manufacturer={item} />}
        onEndReached={loadMore}
      />
    </View>
  )
}
