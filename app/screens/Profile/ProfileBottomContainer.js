import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Image
} from "react-native";
import ProfilePortrait from "app/components/profile/ProfilePortrait";
import Bio from "app/components/profile/Bio";
import Row from "app/components/profile/Row";
import RecentPostScreen from "./RecentPostScreen";
import AchievementScreen from "./AchievementScreen";
import Badge from "app/components/common/Badge";

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
} from "native-base";

const profileImgSrc = "https://loremflickr.com/225/225/dog";

export default class ProfileBottomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Recent"
    };
  }

  //important note!--scrollable tab bar will only work with plain text heading only. No icosn
  // <Tabs renderTabBar={() => <ScrollableTab />}>
  // <Tab heading="recentPosts" style={{ backgroundColor: "#FFFFFF" }}>

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Tabs>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#FFFFFF" }}>
                  <Icon
                    name="dashboard"
                    type="MaterialIcons"
                    style={{ fontSize: 25 }}
                  />
                  <Text style={{ fontSize: 15 }}>Recent Posts</Text>
                </TabHeading>
              }
              onPress={() => {
                this.setState({ view: "Recent" });
              }}
            >
              <RecentPostScreen />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#FFFFFF" }}>
                  <Icon
                    name="book"
                    type="MaterialIcons"
                    style={{ fontSize: 20 }}
                  />
                  <Text style={{ fontSize: 15 }}>Bookmarked</Text>
                </TabHeading>
              }
              onPress={() => {
                this.setState({ view: "Achievements" });
              }}
            >
              <AchievementScreen />
            </Tab>

            {/* <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#FFFFFF" }}>
                  <Icon name="ios-ribbon" style={{ fontSize: 20 }} />
                  <Text style={{ fontSize: 15 }}>Achievements</Text>
                </TabHeading>
              }
              onPress={() => {
                this.setState({ view: "Achievements" });
              }}
            >
              <AchievementScreen />
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
    flexDirection: "column"
  },
  navButton: {
    borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 2,
    width: 45
  },
  headerBar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly"
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: "flex-end",
    width: "100%"
  }
});

/* //previous version--taht i still like better */
/* <Button
            title="Posts"
            style={styles.navButton}
            onPress={() => {
              this.setState({ view: "Recent" });
            }}
          />
          <Button
            title="Bookmarked"
            style={styles.navButton}
            onPress={() => {
              this.setState({ view: "Achievements" });
            }}
          />
        </View>
        <View>
          {this.state.view === "Achievements" ? (
            <AchievementScreen />
          ) : (
            <RecentPostScreen />
          )}
        </View>
      </View>*/
