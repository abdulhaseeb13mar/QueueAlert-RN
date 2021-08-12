import {StyleSheet} from 'react-native';

const styles = (colors, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    searchView: {
      width: '100%',
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: height * 0.03,
    },
    searchInput: {
      borderRadius: 12,
      height: height * 0.075,
      backgroundColor: 'transparent',
    },
  });

export default styles;
