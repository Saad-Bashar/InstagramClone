import {SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import CommentsScreen from './src/screens/CommentsScreen/CommentsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      {/* <HomeScreen /> */}
      {/* <CommentsScreen /> */}
      {/* <ProfileScreen /> */}
      <EditProfileScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;