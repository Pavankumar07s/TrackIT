// import { StyleSheet,View } from 'react-native'
// import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated'
// import { useQuery } from '@apollo/client'
// import { FlatList } from 'react-native'
// import { ManufacturerCard } from '../../components/tractit/ManufacturerCard'

// export default function Manufacture() {
//   const { data, loading, fetchMore } = useQuery(ManufacturersDocument);
//   console.log(data);

//   const loadMore = async () => {
//     await fetchMore({
//       variables: {
//         skip: data?.manufacturers?.length,
//         take: 8,
//       },
//     })
//   }

//   return (
//     <View>
//       <FlatList<ManufacturersQuery['manufacturers'][0]>
//         data={data?.manufacturers}
//         renderItem={({ item }) => <ManufacturerCard manufacturer={item} />}
//         onEndReached={loadMore}
//       />
//     </View>
//   )
// }

import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, FlatList, Platform } from 'react-native';
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { ManufacturerCard } from '../../components/tractit/ManufacturerCard';

const SkeletonLoader = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startShimmerAnimation();
    return () => shimmerValue.stopAnimation();
  }, []);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderSkeletonItem = () => (
    <Animated.View style={[styles.skeletonCard, { opacity }]}>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonInitials} />
        <View style={styles.skeletonTitleContainer}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonStatus} />
        </View>
      </View>
      <View style={styles.skeletonDivider} />
      <View style={styles.skeletonInfoSection}>
        <View style={styles.skeletonInfoRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonText} />
        </View>
        <View style={styles.skeletonInfoRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonText} />
        </View>
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={[1, 2, 3, 4]}
      renderItem={renderSkeletonItem}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const ManufactureCard = ({ item, index }: { 
  item: ManufacturersQuery['manufacturers'][0],
  index: number 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const delay = index * 150; 
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <ManufacturerCard manufacturer={item} />
    </Animated.View>
  );
};

const ManufactureScreen: React.FC = () => {
  const { data, loading, fetchMore } = useQuery(ManufacturersDocument);
  console.log(data?.manufacturers);
  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.manufacturers?.length,
        take: 8,
      },
    });
  };

  if (loading && !data?.manufacturers?.length) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <FlatList<ManufacturersQuery['manufacturers'][0]>
        data={data?.manufacturers}
        renderItem={({ item, index }) => (
          <ManufactureCard item={item} index={index} />
        )}
        onEndReached={loadMore}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  skeletonInitials: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  skeletonTitleContainer: {
    flex: 1,
    gap: 8,
  },
  skeletonTitle: {
    height: 20,
    width: '60%',
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  skeletonStatus: {
    height: 24,
    width: '30%',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  skeletonDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  skeletonInfoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  skeletonInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  skeletonText: {
    height: 16,
    width: '70%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
});

export default ManufactureScreen;