import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

function Login() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Login</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 96,
    paddingBottom: 22,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
  },
});

export default Login;
