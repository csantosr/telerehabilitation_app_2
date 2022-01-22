import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../res/colors';
import ListElementComponent from '../components/ListElement';

const TherapyScreen = ({navigation, route}) => {
  const {routine} = route.params;

  const goToExercise = exercise => navigation.push('exercise', {exercise});
  const finishRoutine = () => {};

  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <SafeAreaView style={styles.baseView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{routine.name}</Text>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.exercises}>
            <Text style={styles.title}>Ejercicios</Text>
            {routine.exercises.map((exercise, index) => (
              <ListElementComponent
                key={index}
                title={exercise.name}
                subtitle1={exercise.description}
                action={() => goToExercise(exercise)}
              />
            ))}
          </ScrollView>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.action} onPress={finishRoutine}>
              <Text style={styles.actionText}>Terminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  backIcon: {
    color: 'white',
    marginRight: 10,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  exercises: {
    flex: 1,
  },
  actionContainer: {
    width: '100%',
  },
  action: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  actionText: {
    color: 'white',
  },
});

export default TherapyScreen;
