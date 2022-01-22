import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TodayMainScreen from './TodayMain';
import TherapyScreen from './Therapy';
import ExerciseScreen from './Exercise';
import ExerciseRegisterScreen from './ExerciseRegister';

const TodayStack = createStackNavigator();

const TodayScreen = () => (
  <TodayStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="main">
    <TodayStack.Screen name="main" component={TodayMainScreen} />
    <TodayStack.Screen name="therapy" component={TherapyScreen} />
    <TodayStack.Screen name="exercise" component={ExerciseScreen} />
    <TodayStack.Screen
      name="exercise-register"
      component={ExerciseRegisterScreen}
    />
  </TodayStack.Navigator>
);

export default TodayScreen;
