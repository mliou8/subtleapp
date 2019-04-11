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
import { Dialog, Portal } from 'react-native-paper';

import store from 'app/redux/';


export default class InviteCodePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            errorMessage: '',
            inviteCode: "",
            isLoading: false,
        };
        this.signOut = this.signOut.bind(this);
        this.submitInput = this.submitInput.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.authenticated && this.props.authenticated) {
            this.setState({ ...this.state, authenticated: true });
        }
    }

    async signOut() {
        try {
            await this.startedLoading();
            await firebase.auth().signOut();
            this.props.navigation.popToTop();
        } catch (e) {
            await this.finishedLoading();
        }
    }

    async submitInput() {
        try {
            await this.startedLoading();
            const inviteCode = this.state.inviteCode;
            const inviteRef = await db.collection('codes').doc(inviteCode);
            const user = firebase.auth().currentUser;
            const dbCode = await inviteRef.get();
            if (dbCode.exists) {
                await inviteRef.update({
                    usersUsed: firebase.firestore.FieldValue.arrayUnion(user.uid)
                });
                await this.setStateAsync({ ...this.state, errorMessage: "" });
                this.props.navigation.navigate('EULAPage');
            } else {
                console.log("wrong invite code");
                await this.setStateAsync({ ...this.state, errorMessage: "Wrong invite code. Please try again." });
                await this.finishedLoading();
            }
        } catch (e) {
            console.log(e);
            await this.setStateAsync({ ...this.state, errorMessage: "Wrong invite code. Please try again." });
            await this.finishedLoading();
        }
    }

    async startedLoading() {
        await this.setStateAsync({...this.state, isLoading: true});
    }

    async finishedLoading() {
        await this.setStateAsync({...this.state, isLoading: false});
    }

    async setStateAsync(state) {
        return new Promise((resolve)=> {
            this.setState(state, resolve);
        });
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
              <KeyboardAvoidingView behavior='height' style={{ padding: 30, flex: 1}}>
                  <Portal style={{flex: 1}}>
                  <Dialog visible={this.state.showEULA}>
                    <Dialog.Title>Please Review the EULA</Dialog.Title>
                    <Dialog.ScrollArea>
                      <ScrollView>
                      <Text>
                      End-User License Agreement ("Agreement")
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
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                      <Button onPress={() => {}}></Button>
                      <Button onPress={() => { this.setState({showEULA: false}); this.props.navigation.navigate('Home') }}></Button>
                    </Dialog.Actions>
                  </Dialog>
                  </Portal>
                    <View>
                        <H1>Welcome</H1>
                        <Text style={{marginTop: 6}}>Subtle app is an invite-only community. Enter your invite code to continue.</Text>
                        <Item rounded style={{marginTop: 40}}>
                            <Input
                                placeholder="Enter invite code"
                                autoCorrect={false}
                                style={{paddingLeft: 20, paddingRight: 20}}
                                onChangeText={(text => this.setState({inviteCode: text}))}
                                ></Input>
                        </Item>
                        <Text style={{color: 'red', marginTop: 10, paddingLeft: 24, paddingRight: 24}}>{this.state.errorMessage}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flex:1, flexDirection: 'row'}}>
                        <View style={{ flexGrow: 1 }}>
                            <Button
                                disabled={this.state.isLoading}
                                transparent
                                style={{alignSelf:'center' }}
                                onPress={() => this.signOut()}
                            ><Text style={this.state.isLoading ? {color: '#9B9B9B'} : {color: '#3F57D3'}}>Cancel</Text></Button>
                        </View>
                        <View style={{ flexGrow: 1 }} onPress={Keyboard.dismiss}>
                            <Button
                                disabled={this.state.isLoading}
                                rounded
                                onPress={() => this.submitInput()}
                                style={{alignSelf:'center', width:150}}
                            ><Text style={{textAlign: 'center', width:'100%'}}>Submit</Text></Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
