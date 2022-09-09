import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig: any = {
  firebaseConfig: {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId:
      Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
  },
};

const app = initializeApp(firebaseConfig.firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;

// export const config = {
//   firebaseConfig: {
//     apiKey: 'AIzaSyAsYYNWTdbem-EMw2DqYCAGxZqCZm0UB4o',
//     authDomain: 'recipes-react-97ff8.firebaseapp.com',
//     projectId: 'recipes-react-97ff8',
//     storageBucket: 'recipes-react-97ff8.appspot.com',
//     messagingSenderId: '294226124601',
//     appId: '1:294226124601:web:37c6d4cb8b55cb6cd192e8',
//   },
// };
