import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Inputs from './components/Inputs';

export default function App() {
  return (
      <View style={styles.container}>
        <Inputs/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 0,
      backgroundColor: '#ecf0f1',
      padding: 8,
  },
});
