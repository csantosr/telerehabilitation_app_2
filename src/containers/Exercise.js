import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import colors from '../res/colors';

const ExerciseScreen = ({route, navigation}) => {
  const {exercise} = route.params;

  const registerExercise = () =>
    navigation.navigate('exercise-register', {exercise});

  return (
    <SafeAreaView style={styles.exerciseWrapper}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={styles.exerciseHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <Video
        style={styles.exerciseVideo}
        source={{uri: `http://186.28.225.72:8003/${exercise.video}`}}
        controls
        resizeMode="contain"
      />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>{exercise.description}</Text>
      </View>
      <View style={styles.exerciseActions}>
        <TouchableOpacity
          style={styles.exerciseAction}
          onPress={registerExercise}>
          <Text style={styles.exerciseActionText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  exerciseWrapper: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  exerciseVideo: {
    flex: 1,
    width: '100%',
  },
  exerciseInfo: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
    alignItems: 'center',
  },
  exerciseActions: {
    backgroundColor: colors.light,
    width: '100%',
    padding: 20,
  },
  exerciseTitle: {
    fontSize: 25,
  },
  exerciseSubtitle: {
    fontSize: 16,
  },
  exerciseAction: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  exerciseActionText: {
    color: 'white',
  },
  exerciseHeader: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: 'white',
    marginRight: 10,
  },
});

export default ExerciseScreen;
