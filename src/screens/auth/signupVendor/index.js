/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import {color} from '../../../theme';
import firestore from '@react-native-firebase/firestore';
import {isFormValid} from './validation';
import {WrapperScreen} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import {Navigator} from '../../../utils';
import constants from '../../../theme/constants';

const SignupVendor = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [signupErrMsg, setSignupErrMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [numberErrorMsg, setNumberErrorMsg] = useState('');
  const [addressErrorMsg, setAddressErrorMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

  const Signup = () => {
    const validation = isFormValid(
      name,
      email,
      number,
      address,
      password,
      confirmPassword,
    );
    if (!validation.status) {
      errorMsgHandler(validation.errCategory, validation.errMsg);
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          console.log(user);
          const userdata = {
            name,
            email,
            number,
            address,
            maxQueue: 10,
            startQueue: 0,
            endQueue: 0,
            userType: 'vendor',
            uid: user.uid,
            isAccepting: false,
          };
          setLoading(false);
          firestore()
            .collection(constants.collections.Vendors)
            .doc(user.uid)
            .set(userdata)
            .then(async () => {
              setLoading(false);
              try {
                await AsyncStorage.setItem(
                  constants.async.user,
                  JSON.stringify(userdata),
                );
                props.setUserInfoAction(userdata);
              } catch (e) {
                console.log(e);
              }
              console.log('User account created & signed in!');
            });
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            setSignupErrMsg('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            setSignupErrMsg('That email address is invalid!');
          } else {
            setSignupErrMsg('A problem occured while signing you up!');
          }
        });
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrorMsg(errMsg);
      setPasswordErrorMsg('');
      setNumberErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setNameErrorMsg('');
      setAddressErrorMsg('');
    } else if (errCategory === 'name') {
      setNameErrorMsg(errMsg);
      setEmailErrorMsg('');
      setPasswordErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setNumberErrorMsg('');
      setAddressErrorMsg('');
    } else if (errCategory === 'phone') {
      setNumberErrorMsg(errMsg);
      setEmailErrorMsg('');
      setPasswordErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setNameErrorMsg('');
      setAddressErrorMsg('');
    } else if (errCategory === 'address') {
      setAddressErrorMsg(errMsg);
      setNumberErrorMsg('');
      setEmailErrorMsg('');
      setPasswordErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setNameErrorMsg('');
    } else if (errCategory === 'password') {
      setPasswordErrorMsg(errMsg);
      setNumberErrorMsg('');
      setNameErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setEmailErrorMsg('');
      setAddressErrorMsg('');
    } else if (errCategory === 'confirmPassword') {
      setConfirmPasswordErrorMsg(errMsg);
      setPasswordErrorMsg('');
      setNumberErrorMsg('');
      setNameErrorMsg('');
      setEmailErrorMsg('');
      setAddressErrorMsg('');
    }
  };

  const goToLogin = () => Navigator.navigate(constants.authScreens.Login);
  const changeName = text => setName(text);
  const changeEmail = text => setEmail(text);
  const changeNumber = text => setNumber(text);
  const changePassword = text => setPassword(text);
  const changeAddress = text => setAddress(text);
  const changeConfirmPassword = text => setConfirmPassword(text);
  return (
    <WrapperScreen>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Signup Vendor
      </Text>
      <View style={styles.container}>
        {signupErrMsg.length > 0 && <Text>{signupErrMsg}</Text>}
        <TextInput
          placeholder="Name"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeName}
        />
        <Text>{nameErrorMsg}</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeEmail}
        />
        <Text>{emailErrorMsg}</Text>
        <TextInput
          placeholder="Number"
          placeholderTextColor={color.darkGray}
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={changeNumber}
        />
        <Text>{numberErrorMsg}</Text>
        <TextInput
          placeholder="address"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeAddress}
        />
        <Text>{addressErrorMsg}</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changePassword}
          secureTextEntry
        />
        <Text>{passwordErrorMsg}</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeConfirmPassword}
          secureTextEntry
        />
        <Text>{confirmPasswordErrorMsg}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="signup" onPress={Signup} />
        )}
      </View>
      <View style={styles.signUpTextContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.signupText}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(SignupVendor);
