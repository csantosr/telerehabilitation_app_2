/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ListElementComponent from '../components/ListElement';
import Http from '../lib/http';
import Storage from '../lib/storage';
import colors from '../res/colors';

const TodayMainScreen = ({navigation}) => {
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState([]);
  const [futureRoutines, setFutureRoutines] = useState([]);
  const [todayRoutines, setTodayRoutines] = useState([]);
  const [tomorrowRoutines, setTomorrowRoutines] = useState([]);
  const [duedRoutines, setDuedRoutines] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const parseDate = date => {
    const month = parseInt(date.getMonth(), 10) + 1;
    return `${date.getDate()}/${
      month < 10 ? '0' + month : '' + month
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const parseRoutines = () => {
    const today = moment().toDate();
    const tomorrow = moment().add(1, 'days').toDate();
    const futureRoutinesVar = [];
    const todayRoutinesVar = [];
    const tomorrowRoutinesVar = [];
    const duedRoutinesVar = [];

    routines.forEach(routine => {
      const routine_date = moment(
        routine.start_time,
        'YYYY-MM-DDTHH:mm:ss:ZZ',
      ).toDate();
      if (
        routine_date.getDate() === today.getDate() &&
        routine_date.getMonth() === today.getMonth() &&
        routine_date.getFullYear() === today.getFullYear()
      ) {
        todayRoutinesVar.push({
          schedule_training_id: routine.id,
          id: routine.routine.id,
          name: routine.routine.name,
          start_time: parseDate(routine_date),
          exercises: routine.routine.exercises,
          status: routine.status,
        });
      } else if (
        routine_date.getDate() === tomorrow.getDate() &&
        routine_date.getMonth() === tomorrow.getMonth() &&
        routine_date.getFullYear() === tomorrow.getFullYear()
      ) {
        tomorrowRoutinesVar.push({
          schedule_training_id: routine.id,
          id: routine.routine.id,
          name: routine.routine.name,
          start_time: parseDate(routine_date),
          exercises: routine.routine.exercises,
          status: routine.status,
        });
      } else if (routine_date.getTime() < today.getTime()) {
        duedRoutinesVar.push({
          schedule_training_id: routine.id,
          id: routine.routine.id,
          name: routine.routine.name,
          start_time: parseDate(routine_date),
          exercises: routine.routine.exercises,
          status: routine.status,
        });
      } else {
        futureRoutinesVar.push({
          schedule_training_id: routine.id,
          id: routine.routine.id,
          name: routine.routine.name,
          start_time: parseDate(routine_date),
          exercises: routine.routine.exercises,
          status: routine.status,
        });
      }
    });
    setTodayRoutines(todayRoutinesVar);
    setTomorrowRoutines(tomorrowRoutinesVar);
    setFutureRoutines(futureRoutinesVar);
    setDuedRoutines(duedRoutinesVar);
  };

  const getRoutines = async () => {
    const http = new Http();
    const response = await http.authGet('/scheduled_training');
    setRoutines(response.data);
    parseRoutines();
  };

  const onRefreshRoutines = () => {
    setRefreshing(true);
    getRoutines().finally(() => setRefreshing(false));
  };

  const goToRoutine = routine => {
    navigation.push('therapy', {routine});
  };

  useEffect(() => {
    setRefreshing(true);
    const storage = new Storage();
    storage.get('user').then(response => {
      setUser(JSON.parse(response));
      getRoutines().finally(() => setRefreshing(false));
    });
  }, []);

  const renderRoutines = (routineList, customMessage) => (
    <>
      {routineList.length === 0 && <Text>{customMessage}</Text>}
      {routineList.length > 0 &&
        routineList.map(todayRoutine => (
          <ListElementComponent
            title={todayRoutine.name}
            subtitle1={todayRoutine.name}
            subtitle2={todayRoutine.start_time}
            resume={todayRoutine.status === '2'}
            finished={todayRoutine.status === '3'}
            action={() => goToRoutine(todayRoutine)}
          />
        ))}
    </>
  );

  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <SafeAreaView style={styles.baseView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenido, {user?.name}</Text>
        </View>
        <View style={styles.body}>
          <ScrollView
            style={styles.container_routines}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshRoutines}
              />
            }>
            <Text style={styles.routine_title}>Rutinas para hoy</Text>
            {renderRoutines(todayRoutines, 'No tienes rutinas para hoy')}
            <Text style={styles.routine_title}>Rutinas para mañana</Text>
            {renderRoutines(tomorrowRoutines, 'No tienes Rutinas para mañana')}
            <Text style={styles.routine_title}>Rutinas futuras</Text>
            {renderRoutines(
              futureRoutines,
              'No tienes rutinas programadas en el futuro',
            )}
            <Text style={styles.routine_title}>Rutinas vencidas</Text>
            {renderRoutines(duedRoutines, 'No tienes rutinas vencidas')}
          </ScrollView>
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
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
  },
  routine_title: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  routine_item: {
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routine_item_text: {
    flex: 7,
  },
  routine_item_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark,
  },
  routine_item_subtitle: {
    fontSize: 10,
    color: colors.dark,
  },
  routine_item_btn: {
    backgroundColor: colors.dark,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  routine_item_btn_resume: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  routine_item_btn_icon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  routine_icon: {
    color: colors.light,
    alignSelf: 'center',
  },
});

export default TodayMainScreen;
