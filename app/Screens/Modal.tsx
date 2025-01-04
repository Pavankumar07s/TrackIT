import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

export default function ModalScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Use navigation theme colors

  useEffect(() => {
    navigation.setOptions({
      title: 'About Us',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>TrackIT</Text>
      <Text style={styles.description}>
        TrackIT is an innovative solution designed to help manufacturers monitor and manage the toxic components in their products. Our mission is to promote environmental sustainability by encouraging manufacturers to recycle harmful materials instead of disposing of them irresponsibly.
      </Text>
      <Text style={styles.description}>
        By utilizing TrackIT, companies can track and manage hazardous materials, contributing to a safer environment and a greener future.
      </Text>
      <Text style={styles.description}>
        Interested in contributing to the project or learning more? Visit the official GitHub repository to explore the source code, file issues, and contribute:
      </Text>
      <Text
        style={[styles.link, { color: colors.primary }]}
        onPress={() =>
          Linking.openURL(
            'https://github.com/TrackIT-practice',
          )
        }
      >
        TrackIT GitHub Repository
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Default background, override with navigation theme if needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Default text color
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666', // Default text color for descriptions
  },
});
