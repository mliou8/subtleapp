// import React from 'react';
// import { View } from 'react-native';
// import { connect } from 'react-redux';
// import validator from 'validator';
// import {RkTextInput} from 'react-native-ui-kitten'
// 
// 
// class EmailTextInput extends React.Component {
// 
//   constructor(props) {
//       super(props)
//       this.state = {
//         emailError: '',
//       }
//   }
// 
//   onEmailChange(text) {
//     this.props.emailChanged(text);
//   }
// 
//   validateInput(inputName, inputVal) {
//      if(!validator.isEmail(inputVal)) {
//         this.setState({ emailError: "Please enter a valid email address"});
//      }
//   }
// 
//   renderFormError(inputName) {
//       if (this.state.emailError) {
//         return (<RkText rkType='danger'>{this.state.emailError}</RkText>);
//       }
//     }
//   }
// 
//   render() {
//     return (
//       <View style = {styles.emailPwdContainer}>
//         <RkTextInput
//           rkType="rounded"
//           placeholder="subtleaZnriceboi@aim.com"
//           value={this.props.email}
//           onChangeText={email => this.onEmailChange(email)}
//           onBlur={() => { this.validateInput('email', this.props.email); }}
//         />
//         <View>
//         { this.renderFormError('email') }
//         </View>
//       </View>
//     );
//   }
// }
// 
// let styles = StyleSheet.create(theme => ({
//   emailPwdContainer: {
//     alignItems: 'center',
//     marginHorizontal: 20
//   }
// }));
