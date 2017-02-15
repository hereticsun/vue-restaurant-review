import Firebase from 'firebase';
import config from 'src/config/firebase';

const db = Firebase.initializeApp(config).database();
export default db;
