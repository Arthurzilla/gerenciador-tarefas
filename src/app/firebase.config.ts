// src/app/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA2KuAdSQzERGgCh1qRguAL79GQ5xraQyU",
  authDomain: "td-app-senac.firebaseapp.com",
  databaseURL: "https://td-app-senac-default-rtdb.firebaseio.com/",
  projectId: "td-app-senac",
  storageBucket: "td-app-senac.appspot.com",
  messagingSenderId: "54739359796",
  appId: "1:54739359796:web:a0cca776df80c4a2ce9261"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços
export const auth = getAuth(app);
export const db = getDatabase(app);