import database,{firebase} from '@react-native-firebase/database';

const firebaseConfig = {
    // apiKey: "AIzaSyCfUYTzRVz8tYG1F9Ntcn8rFwyEKwJ3Q50",
    // authDomain: "herofcm.firebaseapp.com",
    // databaseURL: "https://herofcm-default-rtdb.firebaseio.com",
    // projectId: "herofcm",
    // storageBucket: "herofcm.appspot.com",
    // messagingSenderId: "485661227205",
    // appId: "1:485661227205:web:64282e3ceceafff0ebd8ac",
    // measurementId: "G-J474MKHZMJ"
    apiKey: "AIzaSyDuLQtqXPtXV1Ql3dL0yruQFSI0FWP0eMQ",
    authDomain: "motherhero-d188d.firebaseapp.com",
    databaseURL: "https://motherhero-d188d-default-rtdb.firebaseio.com",
    projectId: "motherhero-d188d",
    storageBucket: "motherhero-d188d.appspot.com",
    messagingSenderId: "376132069574",
    appId: "1:376132069574:web:afee6eaf5043360b8a0fc7",
    measurementId: "G-LRBD0XK3ET"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
export const firebaseDB = database();