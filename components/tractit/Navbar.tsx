import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import {
  Menu,
  User,
  X,
  UserCircle,
  Package,
  Factory,
  ChevronRight,
  LogOut,
  Settings,
} from 'lucide-react-native';
import  RootStackParamList  from '../../app/(tabs)/index';
import { StackHeaderProps } from '@react-navigation/stack';

const Navbar = (props: StackHeaderProps) => {
  const navigation = useNavigation<NavigationProp<typeof RootStackParamList>>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.75)).current;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    Animated.timing(slideAnim, {
      toValue: isDrawerOpen ? -Dimensions.get('window').width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateTo = (screen: keyof typeof RootStackParamList) => {
    setIsDrawerOpen(false);
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(screen);
    });
  };

  const menuItems = [
    { icon: UserCircle, label: 'Profile', screen: 'profile' },
    { icon: Package, label: 'Products', screen: 'Product' },
    { icon: Factory, label: 'Manufacturers', screen: "Manufacture" },
    { icon: Settings, label: 'Settings', screen: 'settings' },
  ];

  return (
    <>
      {/* Navbar */}
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={toggleDrawer} 
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>TrackIT</Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <User size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.drawerContent}>
          {/* Drawer Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerUser}>
              <View style={styles.avatarContainer}>
                <User size={32} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john@example.com</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={toggleDrawer}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigateTo(item.screen as keyof typeof RootStackParamList)}
              >
                <View style={styles.menuItemContent}>
                  <item.icon size={22} color="#FFFFFF" />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Backdrop */}
      {isDrawerOpen && (
        <TouchableOpacity 
          style={styles.backdrop} 
          onPress={toggleDrawer}
          activeOpacity={1}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'black',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 48,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  drawerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    padding: 8,
  },
  menuContainer: {
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 12,
    fontWeight: '500',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default Navbar;