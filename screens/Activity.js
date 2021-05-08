import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';

function Activity() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Hello activity</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
    backgroundColor: '#F9F9F9',
  },
  main: {
    flex: 1,
  },
});

export default Activity;
