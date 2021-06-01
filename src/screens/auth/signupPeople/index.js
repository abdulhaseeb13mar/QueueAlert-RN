/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import {color} from '../../../theme';
import firestore from '@react-native-firebase/firestore';
import {isFormValid} from './validation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {WrapperScreen, RadioButton} from '../../../components';

const SignupPeople = () => {
  const [dob, setDob] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [signupErrMsg, setSignupErrMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numberErrorMsg, setNumberErrorMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

  const SignupUser = () => {
    const validation = isFormValid(
      name,
      email,
      number,
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
          setLoading(false);
          firestore()
            .collection('People')
            .doc(user.uid)
            .set({
              name,
              email,
              number,
              dob,
              gender: isMale ? 'male' : 'female',
              userType: 'person',
            })
            .then(() => {
              setLoading(false);
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
    } else if (errCategory === 'name') {
      setNameErrorMsg(errMsg);
      setEmailErrorMsg('');
      setPasswordErrorMsg('');
      setConfirmPasswordErrorMsg('');
      setNumberErrorMsg('');
    } else if (errCategory === 'phone') {
      setNumberErrorMsg(errMsg);
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
    } else if (errCategory === 'confirmPassword') {
      setConfirmPasswordErrorMsg(errMsg);
      setPasswordErrorMsg('');
      setNumberErrorMsg('');
      setNameErrorMsg('');
      setEmailErrorMsg('');
    }
  };

  const onDateChange = (event, selectedDate) => {
    setDob(selectedDate);
    setShowDatePicker(false);
  };

  const getStructuredDate = d =>
    d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
  const changeName = text => setName(text);
  const changeEmail = text => setEmail(text);
  const changeNumber = text => setNumber(text);
  const changePassword = text => setPassword(text);
  const changeConfirmPassword = text => setConfirmPassword(text);
  return (
    <WrapperScreen>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Signup People
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
          placeholder="Date Of Birth"
          value={getStructuredDate(dob)}
          placeholderTextColor={color.darkGray}
          onPressOut={toggleDatePicker}
          style={styles.input}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
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
        <View style={styles.RadioContainer}>
          <TouchableOpacity
            style={styles.RadioBox}
            onPress={() => setIsMale(true)}>
            <Text>Male:</Text>
            <RadioButton selected={isMale} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RadioBox}
            onPress={() => setIsMale(false)}>
            <Text>FeMale:</Text>
            <RadioButton selected={!isMale} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="signup" onPress={SignupUser} />
        )}
      </View>
    </WrapperScreen>
  );
};

export default SignupPeople;
