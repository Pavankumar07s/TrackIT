import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated';

const { width } = Dimensions.get('window');

// Enhanced Skeleton Loader with gradient-like effect
const SkeletonLoader = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((item) => (
        <Animated.View
          key={item}
          style={[
            styles.skeletonItem,
            { opacity },
            item === 1 && styles.skeletonItemFirst,
          ]}
        />
      ))}
    </View>
  );
};

// Enhanced Manufacturer card with press animation
const ManufacturerItem = ({ item, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 120,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getRankColor = () => {
    switch (index) {
      case 0:
        return '#FFD700';
      case 1:
        return '#C0C0C0';
      case 2:
        return '#CD7F32';
      default:
        return '#ffffff';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.itemContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[
          styles.cardContainer,
          index === 0 && styles.topRankedCard,
        ]}>
          <View style={styles.rankContainer}>
            <Text style={[styles.rankText, { color: getRankColor() }]}>
              #{index + 1}
            </Text>
            {index < 3 && (
              <View style={styles.medalContainer}>
                <Text style={styles.crownEmoji}>{['👑', '🥈', '🥉'][index]}</Text>
              </View>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.manufacturerName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.statsContainer}>
              <Text style={styles.recycleCount}>
                {item.recycledCount.toLocaleString()} items recycled
              </Text>
              {index === 0 && (
                <View style={styles.topRankedBadge}>
                  <Text style={styles.topRankedText}>Top Ranked</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const RankedManufacturers: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, loading, fetchMore, refetch } = useQuery<ManufacturersQuery>(
    ManufacturersDocument
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && !data) {
    return <SkeletonLoader />;
  }

  const rankedManufacturers = data?.manufacturers
    ?.slice()
    .sort((a, b) => (b.recycledCount || 0) - (a.recycledCount || 0)) || [];

  const loadMore = async () => {
    if (data?.manufacturers?.length) {
      await fetchMore({
        variables: {
          skip: data.manufacturers.length,
          take: 8,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Manufacturers</Text>
        <Text style={styles.headerSubtitle}>
          Rankings based on recycled items
        </Text>
      </View>
      <FlatList
        data={rankedManufacturers}
        renderItem={({ item, index }) => (
          <ManufacturerItem item={item} index={index} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.listHeaderSpace} />}
        ListFooterComponent={<View style={styles.listFooterSpace} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  skeletonContainer: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  skeletonItem: {
    height: 90,
    backgroundColor: '#1a1a1a',
    marginBottom: 16,
    borderRadius: 16,
  },
  skeletonItemFirst: {
    height: 100,
    backgroundColor: '#222222',
  },
  listContainer: {
    padding: 16,
  },
  listHeaderSpace: {
    height: 8,
  },
  listFooterSpace: {
    height: 40,
  },
  itemContainer: {
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  topRankedCard: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  medalContainer: {
    marginLeft: 8,
  },
  crownEmoji: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  manufacturerName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  recycleCount: {
    fontSize: 14,
    color: '#888888',
    marginRight: 8,
  },
  topRankedBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topRankedText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RankedManufacturers;