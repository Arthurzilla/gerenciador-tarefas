import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCy0xZbrYID-l_kfpwbj69r52PblxkSE-U",
  authDomain: "gerenciador-tarefas-9ffc9.firebaseapp.com",
  projectId: "gerenciador-tarefas-9ffc9",
  storageBucket: "gerenciador-tarefas-9ffc9.appspot.com",
  messagingSenderId: "376941037024",
  appId: "1:376941037024:web:514193071711825b025785",
  databaseURL: "https://gerenciador-tarefas-9ffc9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
