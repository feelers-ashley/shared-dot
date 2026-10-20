const firebaseConfig = {
  // paste your config from the Firebase console here
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
