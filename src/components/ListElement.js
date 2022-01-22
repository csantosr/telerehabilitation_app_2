import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../res/colors';

const ListElementComponent = ({
  title,
  subtitle1,
  subtitle2 = null,
  resume = false,
  finished = false,
  action,
}) => (
  <View style={styles.item}>
    <View style={styles.item_text}>
      <Text style={styles.item_title}>{title}</Text>
      <Text style={styles.item_subtitle}>{subtitle1}</Text>
      {subtitle2 && <Text style={styles.item_subtitle}>{subtitle2}</Text>}
    </View>
    {!finished && (
      <TouchableOpacity
        style={resume ? styles.item_btn_resume : styles.item_btn}
        onPress={action}>
        <FontAwesomeIcon
          icon={resume ? 'redo-alt' : 'arrow-right'}
          style={styles.icon}
        />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item_text: {
    flex: 7,
  },
  item_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark,
  },
  item_subtitle: {
    fontSize: 10,
    color: colors.dark,
  },
  item_btn: {
    backgroundColor: colors.dark,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  item_btn_resume: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  item_btn_icon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  icon: {
    color: colors.light,
    alignSelf: 'center',
  },
});

export default ListElementComponent;
