import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView
} from 'react-native';
import firebase from 'db/firebase';
import { Button, Text, H1, Input, Item, Container, Content } from 'native-base';
import {Keyboard} from 'react-native'
import db from 'db/firestore';
import { createUser } from 'app/actions/login';
import store from 'app/redux/';


export default class InviteCodePage extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
    }

    async signOut() {
        try {
            await firebase.auth().signOut();
            this.props.navigation.popToTop();
        } catch (e) {
          console.log("error");
        }
    }

    async handleAgree() {
      try {
        const user = firebase.auth().currentUser;
        store.dispatch(createUser(user));
      } catch (e) {
        console.log("Failure to create user ", e);
      }
    }

    render() {
        return (
            <View>
              <ScrollView style={{padding: 25, paddingBottom: 35, marginBottom: 40}}>
                <Text style={{fontSize: 20, marginBottom: 15}}>End-User License Agreement ("Agreement")</Text>
                <Text style={{fontSize: 18, marginBottom: 45}}>
                Last updated: 04/07/19
                Please read this End-User License Agreement ("Agreement") carefully before clicking the "I Agree" button, downloading or using Subtle Asian App ("Application").
                By clicking the "I Agree" button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this Agreement.
                If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and do not download or use the Application.

                License
                Michael Liou grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.

                Restrictions
                You agree not to, and you will not permit others to:
                a) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application or make the Application available to any third party.
                The Restrictions section is for applying certain restrictions on the app usage, e.g. user can't sell app, user can't distribute the app. For the full disclosure section, create your own EULA.

                Modifications to Application
                Michael Liou reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.

                The Modifications to Application section is for apps that will be updated or regularly maintained. For the full disclosure section, create your own EULA.

                Term and Termination
                This Agreement shall remain in effect until terminated by you or Michael Liou.

                Michael Liou may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.

                This Agreement will terminate immediately, without prior notice from Michael Liou, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your desktop.

                Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your desktop.

                Severability
                If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

                Amendments to this Agreement
                Michael Liou reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

                Contact Information
                If you have any questions about this Agreement, please contact us at admin@subtleasian.app
                </Text>
              </ScrollView>
              <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, flex:1, flexDirection: 'row'}}>
                  <View style={{ flexGrow: 1 }}>
                      <Button
                          rounded
                          style={{alignSelf:'center', width:150 }}
                          onPress={() => this.handleAgree()}
                      ><Text>Agree</Text></Button>
                  </View>
                  <View style={{ flexGrow: 1 }} onPress={Keyboard.dismiss}>
                      <Button
                          rounded
                          onPress={() => this.signOut()}
                          style={{alignSelf:'center', width:150}}
                      ><Text style={{textAlign: 'center', width:'100%'}}>Disagree</Text></Button>
                  </View>
              </View>
              </View>
        );
    }
}
