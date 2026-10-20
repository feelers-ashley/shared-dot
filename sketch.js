// SHARED DOT — the finished live-coding example (Workshop 2)
// Every device draws one dot. Every device sees every dot.

// STEP 2 · paste the config from the Firebase console
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

// STEP 5 · each device gets its own random id and colour
const me = Math.random().toString(36).slice(2, 8);
let myHue;
let dots = {}; // STEP 6 · every device's dot, by id

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  myHue = floor(random(360));

  // STEP 4 + 6 · listen: run this whenever anything under "dots" changes
  db.ref("dots").on("value", (snapshot) => {
    dots = snapshot.val() || {};
  });

  // STEP 7 · when this device disconnects, the database deletes its dot
  db.ref("dots/" + me)
    .onDisconnect()
    .remove();
}

function draw() {
  background(20);

  // STEP 6 · draw every dot in the database
  for (const [id, d] of Object.entries(dots)) {
    noStroke();
    fill(d.hue, 70, 100);
    circle(d.x * width, d.y * height, id === me ? 50 : 36);
  }

  fill(255);
  text(Object.keys(dots).length + " here", 16, height - 16);
}

// STEP 3 + 5 · write: send my position (0–1, so any screen size works)
// STEP 8 · throttle: no more than ~20 writes a second
let lastSend = 0;
function mouseDragged() {
  if (millis() - lastSend < 50) return false;
  lastSend = millis();
  db.ref("dots/" + me).set({
    x: mouseX / width,
    y: mouseY / height,
    hue: myHue,
  });
  return false;
}
