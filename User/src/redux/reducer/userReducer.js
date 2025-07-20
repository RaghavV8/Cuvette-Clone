// export const userReducerSignIn = (state = {}, action ) => {
//     switch (action.type) {
//         case USER_SIGNIN_REQUEST:
//             return { loading: true, userInfo: null, isAuthenticated: false}
//         case USER_SIGNIN_SUCCESS:
//             return{
//                 loading:false,
//                 userInfo: action.payload,
//                 isAuthenticated:true
//             }
//         case USER_SIGIN_FAIL:
//             return { loading: false, userInfo:null, isAuthenticated: false, error: action.payload }
//         case USER_SIGIN_RESET:
//             return {}
//         default: 
//             return state;
//     }
// }