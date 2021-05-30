/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import styles from './style';
import {WrapperScreen, H_W} from '../../../components';
import auth from '@react-native-firebase/auth';
import {color} from '../../../theme';

const SignupPeople = () => {
  const [name, setName] = useState('');

  const SignupUser = () => {
    auth()
      .createUserWithEmailAndPassword('abdulhaseeb13mar@gmail.com', 'haseeb123')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const changeName = text => setName(text);
  return (
    <WrapperScreen>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Signup People
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={color.darkGray}
          style={{
            height: 40,
            borderWidth: 1,
            width: H_W.width * 0.7,
            color: 'black',
          }}
          onChangeText={changeName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={color.darkGray}
          style={{
            height: 40,
            borderWidth: 1,
            width: H_W.width * 0.7,
            color: 'black',
          }}
          onChangeText={changeName}
        />
        <TextInput
          placeholder="Number"
          placeholderTextColor={color.darkGray}
          keyboardType="number-pad"
          style={{
            height: 40,
            borderWidth: 1,
            width: H_W.width * 0.7,
            color: 'black',
          }}
          onChangeText={changeName}
        />
        <Button title="signup" onPress={SignupUser} />
      </View>
    </WrapperScreen>
  );
};

export default SignupPeople;
