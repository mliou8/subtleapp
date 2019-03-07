import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import firebase from 'db/firebase';
import { Button, Text, H1, Input, Item, Container, Content } from 'native-base';
import db from 'db/firestore';
import { createUser } from 'app/actions/login';
import store from 'app/redux/';


export default class InviteCodePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            errorMessage: '',
            inviteCode: "",
            isLoading: false
        };
        this.signOut = this.signOut.bind(this);
        this.submitInput = this.submitInput.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (!prevProps.authenticated && this.props.authenticated) {
            this.setState({ ...this.state, authenticated: true });
            this.props.navigation.navigate('MainScreen');
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
        console.log('Submitting invite code')
        try {
            await this.startedLoading();
            const inviteCode = this.state.inviteCode;
            console.log("invitecode: " + inviteCode);
            const inviteRef = await db.collection('codes').doc(inviteCode);
            const user = firebase.auth().currentUser;
            const dbCode = await inviteRef.get();
            console.log(dbCode);

            if (dbCode.exists) {
                await inviteRef.update({
                    usersUsed: firebase.firestore.FieldValue.arrayUnion(user.uid)
                });
                await this.setStateAsync({ ...this.state, errorMessage: "" });
                store.dispatch(createUser(user));
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
                    <View>
                        <H1>Welcome</H1>
                        <Text style={{marginTop: 6}}>Subtle app is an invite-only community. Enter your invite code to continue.</Text>
                        <Item rounded style={{marginTop: 40}}>
                            <Input 
                                placeholder="Enter invite code"
                                autoCorrect={false}
                                style={{paddingLeft: 20, paddingRight: 20}}
                                onChangeText={(text => this.setState({ ...this.state, inviteCode: text }))}
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
                        <View style={{ flexGrow: 1 }}>
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


