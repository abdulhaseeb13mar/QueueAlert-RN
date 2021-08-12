import {StyleSheet} from 'react-native';
import {width} from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: width * 0.7,
    color: 'black',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  signupText: {
    fontWeight: 'bold',
  },
});

export default styles;
