import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Image
} from 'react-native';
import ProfilePortrait from 'app/components/profile/ProfilePortrait';
import RecentPostScreen from './RecentPostScreen';
import BookmarkedPostScreen from './BookmarkedPostScreen';
import AchievementScreen from './AchievementScreen';
import Badge from 'app/components/common/Badge';

import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  ScrollableTab,
  Content
} from 'native-base';

export default class ProfileBottomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Recent'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#242424' }}>
                  <Icon
                    name="dashboard"
                    type="MaterialIcons"
                    style={{ fontSize: 25, color: 'white' }}
                  />
                  <Text
                    style={{
                      fontFamily: 'poppins',
                      color: 'white'
                    }}
                  >
                    Recent Posts
                  </Text>
                </TabHeading>
              }
              onPress={() => {
                this.setState({ view: 'Recent' });
              }}
            >
              <RecentPostScreen />
            </Tab>
            {/* <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#FFFFFF' }}>
                  <Icon
                    name="bookmark"
                    type="FontAwesome"
                    style={{ fontSize: 20 ,color:'white'}}
                  />
                </TabHeading>
              }
            >
              <BookmarkedPostScreen />
            </Tab> */}
          </Tabs>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  navButton: {
    borderStyle: 'solid',
    borderRadius: 8,
    borderWidth: 2,
    width: 45
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly'
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-end',
    width: '100%'
  }
});
