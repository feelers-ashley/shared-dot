const firebaseConfig = {
  apiKey: "AIzaSyA2WWfOjkzHoDPO2A5T5Y7CE1pHhimRYaM",
  authDomain: "signalroom-c4c48.firebaseapp.com",
  databaseURL:
    "https://signalroom-c4c48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signalroom-c4c48",
  storageBucket: "signalroom-c4c48.firebasestorage.app",
  messagingSenderId: "934108614640",
  appId: "1:934108614640:web:6fb057d17794c733c35735",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let remote = { x: 0.5, y: 0.5 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  db.ref("dot").on("value", (snapshot) => {
    remote = snapshot.val() || remote;
  });
}

function draw() {
  background(20);
  circle(remote.x * width, remote.y * height, 50);
}

function mouseDragged() {
  db.ref("dot").set({ x: mouseX / width, y: mouseY / height });
  return false;
}
