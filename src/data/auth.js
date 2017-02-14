import firebase from 'firebase';
// import firebase from 'src/config/firebase';

const getUserStatus = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            return user;
    /*
            store.dispatch('LOGIN_SUCCESS', user.uid);
            resolve(user.uid);
    */
        }
        return 'No signed in user';
    });
};

export default getUserStatus;
