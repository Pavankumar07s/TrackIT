
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Box, Factory } from 'lucide-react-native'; // Importing icons from lucide-react-native

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', 
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <Box size={28} color={color} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="Manufacturertab"
        options={{
          title: 'Manufacturer',
          tabBarIcon: ({ color }) => (
            <Factory size={28} color={color} /> 
          ),
        }}
      />
    </Tabs>
  );
}
