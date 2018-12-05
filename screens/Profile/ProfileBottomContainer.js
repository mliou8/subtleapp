import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import ProfilePortrait from '../../components/profile/ProfilePortrait';
import Bio from '../../components/profile/Bio';
import Row from '../../components/profile/Row';
import RecentPostScreen from './RecentPostScreen';
import AchievementScreen from './AchievementScreen';
import Badge from '../../components/Badge';

const profileImgSrc = 'https://loremflickr.com/225/225/dog';

export default class ProfileBottomScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'Recent'
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
        <Button
            title="Recent Posts"
            style={styles.navButton}
            onPress={() => {
              this.setState({view: 'Recent'})
            }}
          />
        <Button
            title="Achievements"
            style={styles.navButton}
            onPress={() => {
              this.setState({view: 'Achievements'})
            }}
          />
        </View>
        <View>
          {
            this.state.view === 'Achievements' ?
            <AchievementScreen/> : <RecentPostScreen/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navButton: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 2,
    width: 45,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%',
  },
});
