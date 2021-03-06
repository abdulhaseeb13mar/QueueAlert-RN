/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import {color} from '../../../theme';
import {isFormValid} from './validation';
import {WrapperScreen} from '../../../components';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import {Navigator} from '../../../utils';
import constants from '../../../theme/constants';

const Login = props => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const Signin = () => {
    const validation = isFormValid(email, password);
    if (!validation.status) {
      errorMsgHandler(validation.errCategory, validation.errMsg);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          const userInfo = await firestore()
            .collection(constants.collections.People)
            .doc(user.uid)
            .get();
          if (userInfo.exists) {
            console.log(userInfo.data());
            try {
              await AsyncStorage.setItem(
                constants.async.user,
                JSON.stringify(userInfo.data()),
              );
              props.setUserInfoAction(userInfo.data());
            } catch (e) {
              console.log(e);
            }
            // setLoading(false);
          } else {
            const vendorInfo = await firestore()
              .collection(constants.collections.Vendors)
              .doc(user.uid)
              .get();
            if (vendorInfo.exists) {
              console.log(vendorInfo.data());
              try {
                await AsyncStorage.setItem(
                  constants.async.user,
                  JSON.stringify(vendorInfo.data()),
                );
                props.setUserInfoAction(vendorInfo.data());
              } catch (e) {
                console.log(e);
              }
              // setLoading(false);
            }
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrorMsg(errMsg);
      setPasswordErrorMsg('');
    } else if (errCategory === 'password') {
      setPasswordErrorMsg(errMsg);
      setEmailErrorMsg('');
    }
  };

  const changePassword = text => setPassword(text);
  const changeEmail = text => setEmail(text);
  const goToSingupPeople = () =>
    Navigator.navigate(constants.authScreens.SignupPeople);
  const goToSingupVendor = () =>
    Navigator.navigate(constants.authScreens.SignupVendor);

  return (
    <WrapperScreen>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Login</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeEmail}
        />
        <Text>{emailErrorMsg}</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changePassword}
          secureTextEntry
        />
        <Text>{passwordErrorMsg}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={Signin} />
        )}
      </View>
      <View style={styles.signUpTextContainer}>
        <Text>Want to Get in Queue? </Text>
        <TouchableOpacity onPress={goToSingupPeople}>
          <Text style={styles.signupText}>SignUp Here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpTextContainer}>
        <Text>Want to Start a Queue? </Text>
        <TouchableOpacity onPress={goToSingupVendor}>
          <Text style={styles.signupText}>SignUp Here</Text>
        </TouchableOpacity>
      </View>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(Login);
