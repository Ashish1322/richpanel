
import { initializeApp, } from "firebase/app";
import {getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
 // Your Configs here
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)

export {db,auth,app}