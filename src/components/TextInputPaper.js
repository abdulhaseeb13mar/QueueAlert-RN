import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withTheme, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextInputPaper = ({
  theme,
  height,
  leftIcon = false,
  onChangeText,
  placeholder = 'placeholder',
  returnKeyType,
  value,
  keyboardType,
  ...props
}) => {
  const StyleProp = {colors: theme.colors, height};
  return (
    <View style={styles(StyleProp).searchView}>
      <TextInput
        mode="flat"
        style={styles(StyleProp).searchInput}
        left={
          leftIcon ? (
            <TextInput.Icon
              name={() => (
                <Ionicons name="search" color={theme.colors.border} size={19} />
              )}
            />
          ) : null
        }
        underlineColor="none"
        placeholderTextColor={theme.colors.border}
        label=""
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        placeholder={placeholder}
        selectionColor={theme.colors.selection}
        onPressOut={props.onPressOut ? props.onPressOut : null}
        value={value}
        theme={{
          colors: {
            primary: 'transparent',
            underlineColor: 'transparent',
          },
        }}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    searchView: {
      width: '100%',
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      borderRadius: 12,
      height: height * 0.075,
      backgroundColor: 'transparent',
    },
  });

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(TextInputPaper));
