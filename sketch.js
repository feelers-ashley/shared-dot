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

// STEP 5 · each device gets its own id and colour
const me = Math.random().toString(36).slice(2, 8);
let myHue;

// STEP 6 · every device's dot, by id
let dots = {};

// STEP 8 · when this device last wrote
let lastSend = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  myHue = floor(random(360));

  // STEP 4 + 6 · listen: runs whenever anything under "dots" changes
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
  noStroke();
  for (const [id, d] of Object.entries(dots)) {
    fill(d.hue, 70, 100);
    circle(d.x * width, d.y * height, id === me ? 50 : 36);
  }

  fill(0, 0, 100);
  textSize(14);
  text(
    Object.keys(dots).length + " here · drag to move your dot",
    16,
    height - 16
  );
}

// STEP 3 + 5 · write: my position as 0–1, so every screen size agrees
function sendDot() {
  if (millis() - lastSend < 50) return; // STEP 8 · ~20 writes a second
  lastSend = millis();
  db.ref("dots/" + me).set({
    x: mouseX / width,
    y: mouseY / height,
    hue: myHue,
  });
}

function mousePressed() {
  sendDot();
  return false;
} // a tap places your dot
function mouseDragged() {
  sendDot();
  return false;
} // a drag moves it

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
