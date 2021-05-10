import React from 'react';
import {Button, Text, View} from 'react-native';

function Student({...props}) {
  return (
    <>
      <View>
        <Text>Student main activity</Text>
        <Button
          title="My Class"
          onPress={() => props.navigation.navigate('MyClass')}
        />
        <Button
          title="Class Detail"
          onPress={() => props.navigation.navigate('ClassDetail')}
        />
      </View>
    </>
  );
}

export default Student;
