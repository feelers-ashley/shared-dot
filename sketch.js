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

const me = Math.random().toSring(36).slice(2, 8);
let myHue;
let dots = {};

let remote = { x: 0.5, y: 0.5 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  myHue = floor(random(360));
  db.ref("dots").on("value", (snapshot) => {
    dots = snapshot.val() || {}};
  });
}

function draw() {
  background(20);
  for (const [id, d] of Object.entries(dots)) {
    fill(d.hue, 70, 100);
    circle(d.x * width, d.y * height, id === me ? 50 : 36);
  }
}

function mouseDragged() {
  db.ref("dots/" + me).set({ x: mouseX / width, y: mouseY / height, hue: myHue });
  return false;
}
