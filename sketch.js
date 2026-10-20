const firebaseConfig = {
  apiKey: "AIzaSyA2WWfOjkzHoDPO2A5T5Y7CE1pHhimRYaM",
  authDomain: "signalroom-c4c48.firebaseapp.com",
  databaseURL:
    "https://signalroom-c4c48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signalroom-c4c48",
  appId: "1:934108614640:web:6fb057d17794c733c35735",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);
  circle(mouseX, mouseY, 50);
}

function mouseDragged() {
  db.ref("dot").set({ x: mouseX / width, y: mouseY / height });
  return false;
}
