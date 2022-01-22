/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Http from '../lib/http';
import Storage from '../lib/storage';

const TherapiesScreen = () => {
  const [user, setUser] = useState({});
  const [therapies, setTherapies] = useState([]);
  const getTherapies = async () => {
    const http = new Http();
    const response = await http.authGet(
      `/therapist_patient?patient_user_id=${user.user.id}`,
    );
    setTherapies(response.data);
  };
  useEffect(() => {
    const storage = new Storage();
    storage.get('user').then(response => {
      setUser(JSON.parse(response));
      getTherapies();
    });
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Therapies!</Text>
    </View>
  );
};

export default TherapiesScreen;
