// import React, { useEffect, useState } from 'react';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { TextInput, View, StyleSheet } from 'react-native';
// import { ProductItemsList } from '../../components/tractit/ProductItemsList';

// type RootStackParamList = {
//   product: { productId: string };
// };

// type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

// const ProductItemsScreen: React.FC = () => {
//   const route = useRoute<ProductScreenRouteProp>();
//   const { productId } = route.params;

//   const [searchQuery, setSearchQuery] = useState('');
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       title: 'Items',
//     });
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchBox}
//         placeholder="Search by ID"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         keyboardAppearance="default"
//       />
//       <ProductItemsList productId={productId} searchQuery={searchQuery} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'black',
//   },
//   searchBox: {
//     padding: 10,
//     borderColor: '#ddd',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
// });

// export default ProductItemsScreen;

import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Animated, 
  Platform,
  KeyboardAvoidingView,
  Text
} from 'react-native';
import { ProductItemsList } from '../../components/tractit/ProductItemsList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  product: { productId: string };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const SearchBoxSkeleton = () => (
  <View style={styles.skeletonSearchBox}>
    <View style={styles.skeletonSearchInner} />
  </View>
);

const ItemSkeleton = () => (
  <View style={styles.skeletonItem}>
    <View style={styles.skeletonLeft}>
      <View style={styles.skeletonImage} />
    </View>
    <View style={styles.skeletonContent}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonSubtitle} />
      <View style={styles.skeletonDescription} />
    </View>
  </View>
);

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    <SearchBoxSkeleton />
    {[1, 2, 3].map((key) => (
      <ItemSkeleton key={key} />
    ))}
  </View>
);

const ProductItemsScreen: React.FC = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Items',
      headerShadowVisible: false,
    });

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const containerStyle = {
    ...styles.container,
    paddingBottom: insets.bottom,
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={containerStyle}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search by ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
          keyboardAppearance="default"
          placeholderTextColor="#666"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      <ProductItemsList productId={productId} searchQuery={searchQuery} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#000',
  },
  searchBox: {
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  // Skeleton styles
  skeletonContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  skeletonSearchBox: {
    height: 48,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  skeletonSearchInner: {
    height: '100%',
    width: '30%',
    backgroundColor: '#333',
    borderRadius: 12,
  },
  skeletonItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  skeletonLeft: {
    width: 80,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  skeletonContent: {
    flex: 1,
    gap: 8,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 4,
    width: '60%',
  },
  skeletonSubtitle: {
    height: 16,
    backgroundColor: '#333',
    borderRadius: 4,
    width: '40%',
  },
  skeletonDescription: {
    height: 16,
    backgroundColor: '#333',
    borderRadius: 4,
    width: '80%',
  },
});

export default ProductItemsScreen;