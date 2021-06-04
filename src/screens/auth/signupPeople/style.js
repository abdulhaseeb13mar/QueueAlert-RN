import {StyleSheet} from 'react-native';
import {H_W} from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RadioBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: H_W.height * 0.01,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: H_W.width * 0.7,
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
