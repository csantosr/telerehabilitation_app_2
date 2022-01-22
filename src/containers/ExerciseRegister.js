import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../res/colors';
import {useFocusEffect} from '@react-navigation/native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const ExerciseRegisterScreen = ({navigation}) => {
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const devices = useCameraDevices();
  const device = devices.front;

  useEffect(() => {
    manageCameraPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      manageCameraPermissions();
    }, []),
  );

  const manageCameraPermissions = async () => {
    setPermissionsLoading(true);
    let permissionsGrantedAux = true;
    const cameraPermission = check(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission === RESULTS.DENIED) {
      const newCameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
      if ([RESULTS.DENIED, RESULTS.BLOCKED].includes(newCameraPermission)) {
        permissionsGrantedAux = false;
        Linking.openSettings();
      }
    } else if (cameraPermission === RESULTS.BLOCKED) {
      permissionsGrantedAux = false;
      Linking.openSettings();
    }

    const microphonePermission = check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (microphonePermission === RESULTS.DENIED) {
      const newMicrophonePermission = await request(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      if ([RESULTS.DENIED, RESULTS.BLOCKED].includes(newMicrophonePermission)) {
        permissionsGrantedAux = false;
        Linking.openSettings();
      }
    } else if (microphonePermission === RESULTS.BLOCKED) {
      permissionsGrantedAux = false;
      Linking.openSettings();
    }

    setPermissionsGranted(permissionsGrantedAux);
    setPermissionsLoading(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      {!permissionsLoading && permissionsGranted && device != null ? (
        <>
          {/* <View style={styles.info}>
            <RNCamera style={styles.camera} />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action}>
              <Text style={styles.actionText}>Grabar</Text>
            </TouchableOpacity>
          </View> */}
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
        </>
      ) : (
        <View style={styles.secondaryScreen}>
          {permissionsLoading ? (
            <>
              <ActivityIndicator />
              <Text style={styles.secondarySubtitle}>Cargando permisos</Text>
            </>
          ) : (
            <>
              <Text style={styles.secondaryTitle}>Permisos no concedidos</Text>
              <Text style={styles.secondarySubtitle}>
                Por favor dirijirse a ajustes y conceder permisos de camara y
                micrófono
              </Text>
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={() => Linking.openSettings()}>
                <Text style={styles.secondaryActionText}>Ajustes</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: 'white',
    marginRight: 10,
  },
  info: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
  },
  actions: {
    backgroundColor: colors.light,
    width: '100%',
    padding: 20,
  },
  action: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  actionText: {
    color: 'white',
  },
  secondaryScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  secondaryTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  secondarySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryAction: {
    marginTop: 20,
    width: '60%',
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  secondaryActionText: {
    color: 'white',
  },
  camera: {
    flex: 1,
    width: 120,
    backgroundColor: '#F00',
  },
});

export default ExerciseRegisterScreen;
