import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../res/colors.js';
import GlobalStyles from '../res/styles.js';
import RNU from 'react-native-units';
import Http from '../lib/http';
import Storage from '../lib/storage';

export default ({navigation}) => {
  const [username, changeUsername] = React.useState('');
  const [password, changePassword] = React.useState('');
  const [hasError, changeHasError] = React.useState(false);
  const [errorMsg, changeErrorMsg] = React.useState('');

  const login = async () => {
    changeHasError(false);
    const http = new Http();
    const response = await http.post('/auth/users/login/', {
      username,
      password,
    });
    if (response.status === 201) {
      const storage = new Storage();
      const groups = [];
      const permissions = [];
      response.data.user.groups.forEach(group => {
        groups.push(group.name);
        group.permissions.forEach(permission => {
          permissions.push(permission.codename);
        });
      });
      if (groups.includes('Patient')) {
        await storage.setToken(response.data.access_token);
        await storage.set(
          'user',
          JSON.stringify({
            name: `${response.data.user.first_name} ${response.data.user.last_name}`,
            user: response.data.user,
          }),
        );
        await storage.set('groups', JSON.stringify(groups));
        await storage.set('permissions', JSON.stringify(permissions));
        // TODO: signed in view
        navigation.navigate('Hoy');
      } else {
        changeErrorMsg('Para acceder debe contar con el rol Paciente.');
        changeHasError(true);
      }
    } else if (response.status >= 400 && response.status <= 500) {
      changeErrorMsg('Usuario y contraseña no válidas.');
      changeHasError(true);
    } else {
      changeErrorMsg('Error interno. Inténtelo más tarde.');
      changeHasError(true);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.login__form}>
          <Text style={[GlobalStyles.light_text, styles.login__form__title]}>
            Bienvenido
          </Text>
          {hasError && (
            <View style={[GlobalStyles.danger_bg, styles.login__form__error]}>
              <Text style={[GlobalStyles.white_text, GlobalStyles.light_text]}>
                {errorMsg}
              </Text>
            </View>
          )}
          <TextInput
            placeholder="Nombre de usuario"
            style={styles.login__form__input}
            onChangeText={input_username =>
              changeUsername(input_username.trim())
            }
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.login__form__input}
            secureTextEntry={true}
            onChangeText={input_password =>
              changePassword(input_password.trim())
            }
            value={password}
          />
          <TouchableOpacity
            style={[GlobalStyles.dark_bg, styles.login__form__btn]}
            onPress={login}>
            <Text style={GlobalStyles.light_text}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.dark,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__form: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
    width: RNU.vw(70),
    alignItems: 'center',
  },
  login__form__title: {
    fontSize: 25,
    marginTop: 25,
    marginBottom: 25,
    color: Colors.white,
  },
  login__form__error: {
    marginBottom: 10,
    padding: 10,
    paddingLeft: 10,
    borderRadius: 20,
    borderWidth: 0,
    fontSize: 20,
    alignSelf: 'stretch',
  },
  login__form__input: {
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 30,
    borderWidth: 0,
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
  },
  login__form__btn: {
    padding: 10,
    paddingLeft: 10,
    borderRadius: 30,
    borderWidth: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
