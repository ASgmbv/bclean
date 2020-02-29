import FirebaseKeys from './config';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

try {
  firebase.initializeApp(FirebaseKeys);
} catch (err) {
  console.log(err);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const storage = firebase.storage().ref();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addPost = async (
  companyName,
  companyPhone,
  companyEmail,
  description,
  imageLocalUri,
) => {
  try {
    const uid = auth.currentUser.uid;
    const path = `images/${uid}/${Date.now()}.jpg`;

    // 1) local image
    const response = await fetch(imageLocalUri);

    // 2) turning image into blob
    const file = await response.blob();

    // 3) upload image
    const upload = storage.child(path).put(file);

    upload.on(
      'state_changed',
      null,
      err => {
        throw error;
      },
      () => {
        upload.snapshot.ref
          .getDownloadURL()
          .then(url => {
            // console.log('URL: ' + url);
            firestore.collection('posts').add({
              companyName,
              companyPhone,
              companyEmail,
              uid,
              timestamp: Date.now(),
              description,
              image: url,
            });
          })
          .catch(error => {
            throw error;
          });
      },
    );
  } catch (error) {
    console.log(error);
  }
};

// export const addPost = ({companyName, imageLocalUri}) => {
//   uploadPhotoAsync(imageLocalUri);
// };

class Fire {
  constructor() {}

  addPost = async ({text, localUri}) => {
    // const remoteUri = await this.uploadPhotoAsync(localUri);

    return new Promise((res, rej) => {
      firebase
        .firestore()
        .collection('posts')
        .add({
          text: 'testing',
        })
        .then(ref => res(ref))
        .catch(err => rej(err));

      // firebase
      //   .firestore()
      //   .collection('posts')
      //   .add({
      //     text,
      //     uid: this.uid,
      //     timestamp: this.timestamp,
      //     image: localUri, // remoteUri
      //   })
      //   .then(ref => res(ref))
      //   .catch(err => rej(err));
    });
  };

  uploadPhotoAsync = async uri => {
    const path = `images/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(path)
        .put(file);

      upload.on(
        'state_changed',
        snapshot => {},
        err => rej(err),
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        },
      );
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

//Fire.shared = new Fire();
// export default Fire;
