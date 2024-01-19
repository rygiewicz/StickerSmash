import { Pressable, StyleSheet, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../config/colors';

export default function Button({ label, theme }) {
  return (
    <View style={styles.buttonContainer(theme)}>
      <Pressable style={styles.button(theme)} onPress={() => alert('You pressed a button.')}>
        {theme === 'primary' && <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />}
        <Text style={styles.buttonLabel(theme)}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: (theme) => {
    let css = {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    };

    if (theme === 'primary') {
      css = {
        ...css,
        borderWidth: 4,
        borderColor: colors.primaryAccent,
        borderRadius: 18,
      };
    }

    return css;
  },
  button: (theme) => {
    let css = {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (theme === 'primary') {
      css = {
        ...css,
        backgroundColor: colors.primaryBackground,
      };
    }

    return css;
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: (theme) => {
    let css = {
      color: colors.appText,
      fontSize: 16,
    };

    if (theme === 'primary') {
      css = {
        ...css,
        color: colors.primaryText,
      };
    }

    return css;
  },
});
