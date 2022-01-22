import * as React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import {
  faCalendarAlt,
  faNotesMedical,
  faUserAlt,
  faWalking,
  faArrowRight,
  faArrowLeft,
  faRedoAlt,
} from '@fortawesome/fontawesome-free-solid';
import {isSignedIn} from './auth';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/containers/Login';
import TodayScreen from './src/containers/Today';
import colors from './src/res/colors';
import TherapiesScreen from './src/containers/Therapies';
import ProfileScreen from './src/containers/Profile';
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

fontawesome.library.add(
  faCalendarAlt,
  faNotesMedical,
  faUserAlt,
  faWalking,
  faArrowRight,
  faArrowLeft,
  faRedoAlt,
);

function App() {
  const [signedIn, setSignedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    isSignedIn()
      .then(res => setSignedIn(res))
      .catch(() => Alert.alert('Ocurrió un error'))
      .finally(() => setLoading(false));
  }, []);

  const iconMap = {
    Hoy: 'calendar-alt',
    Terapias: 'notes-medical',
    Perfil: 'user-alt',
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: focused => (
              <FontAwesomeIcon
                icon={iconMap[route.name]}
                style={{color: focused ? colors.light : colors.secondary}}
              />
            ),
            tabBarActiveTintColor: colors.light,
            tabBarInactiveTintColor: colors.light,
            tabBarStyle: {
              backgroundColor: colors.dark,
            },
          })}>
          <Tab.Screen name="Hoy" component={TodayScreen} />
          <Tab.Screen name="Terapias" component={TherapiesScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
