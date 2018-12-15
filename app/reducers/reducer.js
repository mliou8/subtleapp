// import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from 'actions/login/index.js';
// 
// const initialState = {
//   authenticated: false,
//   error: null
// };
// 
// case ‘SIGN_IN_FACEBOOK_FULFILLED’:
//   if (action.payload.type !== ‘error’)
//     return Object.assign({}, authentication, {
//       signedIn: true,
//       type: ‘facebook’,
//        credentials: action.payload.credentials,
//       userInfo: {
//         id: action.payload.credentials.id,
//         name: action.payload.credentials.name,
//         email: action.payload.credentials.email,
//         accessToken: action.payload.credentials.accessToken,
//         birthday: action.payload.credentials.birthday
//       }
//     });
//   else
//     return authentication;

// export default function auth(state = initialState, action) {
//   switch (action.type) {
//     case AUTH_USER:
//       return {
//         ...state,
//         authenticated: true,
//         error: null
//       };
// 
//     case SIGN_OUT_USER:
//       return {
//         ...state,
//         authenticated: false,
//         error: null
//       };
// 
//     case AUTH_ERROR:
//       return {
//         ...state,
//         error: action.payload.message
//       };
// 
//     default:
//       return state;
//   }
// }
