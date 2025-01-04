// import { ManufacturerProducts } from '../../components/tractit/ManufacturerProducts'
// import { StatusGrid } from '../../components/tractit/StatusGrid'
// import { ManufacturerDocument, ManufacturerQuery } from '@/gql/generated'
// import { useQuery } from '@apollo/client'
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
// import React, { useEffect } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   SafeAreaView,
//   Pressable,
// } from 'react-native'
// import {
//   MapPin,
//   Phone,
//   AlertCircle,
//   AlertTriangle,
//   Building2,
//   ChevronRight,
//   Loader2,
// } from 'lucide-react-native'

// type RootStackParamList = {
//   manufacturer: { manufacturerId: string }
// }


// type ManufacturerScreenRouteProp = RouteProp<RootStackParamList, 'manufacturer'>

// const ManufacturerScreen: React.FC = () => {
//   const route = useRoute<ManufacturerScreenRouteProp>()
//   const navigation = useNavigation()
//   const { manufacturerId } = route.params

//   const { data, loading, error, refetch } = useQuery<ManufacturerQuery>(
//     ManufacturerDocument,
//     {
//       variables: { where: { id: manufacturerId } },
//     },
//   )

//   useEffect(() => {
//     if (data?.manufacturer) {
//       navigation.setOptions({
//         title: data.manufacturer.name || 'Manufacturer',
//       })
//     }
//   }, [navigation, data])

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Loader2 size={32} color="#0066CC" style={styles.spinAnimation} />
//         <Text style={styles.loadingText}>Loading details...</Text>
//       </View>
//     )
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <AlertCircle size={48} color="#DC2626" />
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     )
//   }

//   if (!data?.manufacturer) {
//     return (
//       <View style={styles.errorContainer}>
//         <AlertTriangle size={48} color="#F59E0B" />
//         <Text style={styles.errorText}>Manufacturer not found</Text>
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         refreshControl={
//           <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
//         }
//       >
//         <View style={styles.header}>
//           <View style={styles.headerIcon}>
//             <Building2 size={24} color="#0066CC" />
//           </View>
//           <Text style={styles.title}>{data.manufacturer.name}</Text>
//           <View style={styles.infoContainer}>
//             <Pressable style={styles.infoItem}>
//               <MapPin size={20} color="#4B5563" />
//               <Text style={styles.infoText}>{data.manufacturer.location}</Text>
//               <ChevronRight size={16} color="#9CA3AF" />
//             </Pressable>
//             <Pressable style={styles.infoItem}>
//               <Phone size={20} color="#4B5563" />
//               <Text style={styles.infoText}>{data.manufacturer.contact}</Text>
//               <ChevronRight size={16} color="#9CA3AF" />
//             </Pressable>
//           </View>
//         </View>

//         <View style={styles.statsContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Overview</Text>
//           </View>
//           <StatusGrid
//             total={data.manufacturer.totalCount || 0}
//             sold={data.manufacturer.soldCount || 0}
//             returned={data.manufacturer.returnedCount || 0}
//             recycled={data.manufacturer.recycledCount || 0}
//           />
//         </View>

//         <View style={styles.productsContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Products</Text>
//           </View>
//           <ManufacturerProducts manufacturerId={manufacturerId} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     gap: 12,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   spinAnimation: {
//     // Note: You'll need to implement rotation animation
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     padding: 24,
//     gap: 12,
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#4B5563',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     margin: 16,
//     padding: 24,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 12,
//   },
//   headerIcon: {
//     backgroundColor: '#E0F2FE',
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 20,
//     letterSpacing: -0.5,
//   },
//   infoContainer: {
//     gap: 12,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 12,
//     gap: 12,
//   },
//   infoText: {
//     fontSize: 15,
//     color: '#4B5563',
//     flex: 1,
//   },
//   statsContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     margin: 16,
//     marginTop: 0,
//     padding: 24,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 12,
//   },
//   productsContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     margin: 16,
//     marginTop: 0,
//     padding: 24,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 12,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     letterSpacing: -0.3,
//   },
// })

// export default ManufacturerScreen

import { ManufacturerProducts } from '../../components/tractit/ManufacturerProducts'
import { StatusGrid } from '../../components/tractit/StatusGrid'
import { ManufacturerDocument, ManufacturerQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native'
import {
  MapPin,
  Phone,
  AlertCircle,
  AlertTriangle,
  Building2,
  ChevronRight,
  Loader2,
} from 'lucide-react-native'

type RootStackParamList = {
  manufacturer: { manufacturerId: string }
}

type ManufacturerScreenRouteProp = RouteProp<RootStackParamList, 'manufacturer'>

const ListHeaderComponent: React.FC<{
  manufacturer: NonNullable<ManufacturerQuery['manufacturer']>
}> = ({ manufacturer }) => (
  <>
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Building2 size={24} color="#0066CC" />
      </View>
      <Text style={styles.title}>{manufacturer.name}</Text>
      <View style={styles.infoContainer}>
        <Pressable style={styles.infoItem}>
          <MapPin size={20} color="#4B5563" />
          <Text style={styles.infoText}>{manufacturer.location}</Text>
          <ChevronRight size={16} color="#9CA3AF" />
        </Pressable>
        <Pressable style={styles.infoItem}>
          <Phone size={20} color="#4B5563" />
          <Text style={styles.infoText}>{manufacturer.contact}</Text>
          <ChevronRight size={16} color="#9CA3AF" />
        </Pressable>
      </View>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
      </View>
      <StatusGrid
        total={manufacturer.totalCount || 0}
        sold={manufacturer.soldCount || 0}
        returned={manufacturer.returnedCount || 0}
        recycled={manufacturer.recycledCount || 0}
      />
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Products</Text>
    </View>
  </>
)

const ManufacturerScreen: React.FC = () => {
  const route = useRoute<ManufacturerScreenRouteProp>()
  const navigation = useNavigation()
  const { manufacturerId } = route.params

  const { data, loading, error, refetch } = useQuery<ManufacturerQuery>(
    ManufacturerDocument,
    {
      variables: { where: { id: manufacturerId } },
    },
  )

  useEffect(() => {
    if (data?.manufacturer) {
      navigation.setOptions({
        title: data.manufacturer.name || 'Manufacturer',
      })
    }
  }, [navigation, data])

  const spinValue = new Animated.Value(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Loader2 size={32} color="#0066CC" />
        </Animated.View>
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AlertCircle size={48} color="#DC2626" />
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    )
  }

  if (!data?.manufacturer) {
    return (
      <View style={styles.errorContainer}>
        <AlertTriangle size={48} color="#F59E0B" />
        <Text style={styles.errorText}>Manufacturer not found</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ManufacturerProducts 
        manufacturerId={manufacturerId}
        ListHeaderComponent={
          <ListHeaderComponent manufacturer={data.manufacturer} />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  headerIcon: {
    backgroundColor: '#E0F2FE',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  infoContainer: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#4B5563',
    flex: 1,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    marginTop: 0,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.3,
  },
})

export default ManufacturerScreen