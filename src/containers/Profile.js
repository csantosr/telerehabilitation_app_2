import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import colors from '../res/colors';

const TodayScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <SafeAreaView style={styles.baseView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Perfil</Text>
        </View>
        <View style={styles.body} />
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
  },
});

export default TodayScreen;
