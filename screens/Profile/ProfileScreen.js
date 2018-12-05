import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import ProfilePortrait from '../../components/profile/ProfilePortrait';
import Bio from '../../components/profile/Bio';
import Row from '../../components/profile/Row';
import ProfileBottomContainer from './ProfileBottomContainer';
import Badge from '../../components/Badge';

const profileImgSrc = 'https://loremflickr.com/225/225/dog';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerLeft: (
          <Button
            onPress={() => navigation.getParam('edit')}
            title="Edit"
            color="#000000"
          />
      )
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      badges: [
        { 
          badgeType: 'youtube',
          sourceName: 'justlikemike'
        },
        { 
          badgeType: 'instagram',
          sourceName: 'justlikemike'
        },
        { 
          badgeType: 'twitch',
          sourceName: 'justlikemike'
        },
      ]
    }
    this._editProfile = this._editProfile.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
    this.renderSocialBadges = this.renderSocialBadges.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ edit: this._editProfile });
    this.props.navigation.setParams({ save: this._saveProfile });
  }

  _editProfile = () => {
    this.setState({ edit: !this.state.edit });
  };
  
  _saveProfile = () => {
    this.setState({ edit: !this.state.edit });
  }
  
  renderSocialBadges = () => {
    return this.state.badges.map((badge, idx) => {
        return (
          <Badge key={idx} badgeType={badge.badgeType} sourceName={badge.sourceName}/>
        )
      })
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <ProfilePortrait style={styles.profile} imageSrc={profileImgSrc}/>
            <View style={{flex: 1, marginLeft: 35, marginTop: 15, flexDirection: 'column'}}>
              <Text style={{fontSize: 24}}>@heyitsmmike</Text>
              <Text style={{fontSize: 15, marginTop: 15}}>Michael Liou</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            { 
              this.renderSocialBadges() 
            }
          </View>
          <View style={styles.divider} />
        </View>
        <View style={{flex: 1, marginTop: 15, paddingLeft: 15}}>
          <Text>Im just here to make some money and get some notoriety</Text>
        </View>
        <ProfileBottomContainer/>
        <View style={{height:40, width:"100%"}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7.6,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 10,
    height: 212,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderColor: 'black',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  profile: {
    display: 'flex',
    alignContent: 'flex-start',
    flex: 1,
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    flex: 2,
  },

});
