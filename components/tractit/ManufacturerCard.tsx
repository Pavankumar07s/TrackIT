// import { ManufacturersQuery } from '@/gql/generated';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { RootStackParamList } from '../../types/navigation';

// interface ManufacturerCardProps {
//   manufacturer?: ManufacturersQuery['manufacturers'][0];
// }
// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// export const ManufacturerCard: React.FC<ManufacturerCardProps> = ({ manufacturer }) => {
//   const navigation = useNavigation<NavigationProp>();

//   // Safety check for undefined manufacturer
//   if (!manufacturer) {
//     return null;
//   }

//   const { id, name, location, contact } = manufacturer;

//   // Handle the navigation only if we have a valid ID
//   const handlePress = () => {
//     if (id) {
//       navigation.navigate('ManufacturerScreen', { manufacturerId: id });
//     }
//   };

//   // Create initials for the placeholder
//   const initials = name
//     ? name
//         .split(' ')
//         .slice(0, 2)
//         .map(word => word.charAt(0))
//         .join('')
//         .toUpperCase()
//     : '??';

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.touchable} activeOpacity={0.7}>
//       <View style={styles.card}>
//         <View style={styles.headerContainer}>
//           <View style={styles.initialsContainer}>
//             <Text style={styles.initials}>{initials}</Text>
//           </View>

//           <View style={styles.titleSection}>
//             <Text style={styles.title} numberOfLines={1}>
//               {name || 'Unknown Manufacturer'}
//             </Text>

//             <View style={styles.statusBadge}>
//               <Text style={styles.statusText}>Active</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.infoSection}>
//           {location && (
//             <View style={styles.infoRow}>
//               <View style={styles.iconWrapper}>
//                 <Feather name="map-pin" size={16} color="#666" />
//               </View>
//               <Text style={styles.infoText} numberOfLines={2}>
//                 {location}
//               </Text>
//             </View>
//           )}

//           {contact && (
//             <View style={styles.infoRow}>
//               <View style={styles.iconWrapper}>
//                 <Feather name="phone" size={16} color="#666" />
//               </View>
//               <Text style={styles.infoText} numberOfLines={1}>
//                 {contact}
//               </Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.footer}>
//           <Feather name="chevron-right" size={20} color="#666" />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   touchable: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   initialsContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   initials: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
//   },
//   titleSection: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     flex: 1,
//     marginRight: 8,
//   },
//   statusBadge: {
//     backgroundColor: '#F5F5F5',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   statusText: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: '500',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginBottom: 12,
//   },
//   infoSection: {
//     gap: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   iconWrapper: {
//     width: 28,
//     height: 28,
//     borderRadius: 6,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#666',
//     flex: 1,
//   },
//   footer: {
//     marginTop: 8,
//     alignItems: 'flex-end',
//   },
// })

import { ManufacturersQuery } from '@/gql/generated';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

interface ManufacturerCardProps {
  manufacturer?: ManufacturersQuery['manufacturers'][0];
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ManufacturerCard: React.FC<ManufacturerCardProps> = ({ manufacturer }) => {
  const navigation = useNavigation<NavigationProp>();

  if (!manufacturer) {
    return null;
  }

  const { id, name, location, contact } = manufacturer;

  const handlePress = () => {
    if (id) {
      navigation.navigate('ManufacturerScreen', { manufacturerId: id });
    }
  };

  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
    : '??';

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.touchable} 
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{initials}</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {name || 'Unknown Manufacturer'}
              </Text>
              
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            {location && (
              <View style={styles.infoRow}>
                <View style={styles.iconWrapper}>
                  <Feather name="map-pin" size={16} color="#4B5563" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoText} numberOfLines={2}>
                    {location}
                  </Text>
                </View>
              </View>
            )}

            {contact && (
              <View style={styles.infoRow}>
                <View style={styles.iconWrapper}>
                  <Feather name="phone" size={16} color="#4B5563" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Contact</Text>
                  <Text style={styles.infoText} numberOfLines={1}>
                    {contact}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.viewDetails}>View Details</Text>
          <Feather name="chevron-right" size={20} color="#6B7280" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
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
  mainContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  initialsContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initials: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
  },
  titleContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#059669',
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});