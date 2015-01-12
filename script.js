function Wave(name, location, minHeight, maxHeight) {
  this.name = name;
  this.location = location;
  this.bestSize = function() {
    var minHeight = 4; //reduce to declaration, add values within Steamers function
    var maxHeight = 20; // reduce to declaration, same as above
    return minHeight + ' to ' + maxHeight + ' feet';
  }
};

function WaveType() {
  var waveArray = [
    'pointbreak',
    'beachbreak',
    'reefbreak'
  ];
  return waveArray;
};

function Steamers() {
var steamers = new Wave('Steamer Lane', 'Santa Cruz, CA.');
var waveType1 = new WaveType();
var boardType = ['shortboard', 'longboard', 'fish', 'gun'];

//steamers details
var details1 = steamers.name + ', ' + steamers.location;
var range1 = steamers.bestSize();
var boards = boardType[0];

var waveTitle = document.getElementById('waveTitle');
waveTitle.textContent = details1;

var waveRange = document.getElementById('waveRange');
waveRange.textContent = range1;

var waveKind = document.getElementById('waveType');
console.log(waveType1[0]);
waveKind.textContent = waveType1[0];

var boardType = document.getElementById('boardType');
boardType.textContent = boards;
};

//var rincon = new Wave('Rincon', 'Carpenteria, CA.', 'pointbreak', 'longboard');
//var trestles = new Wave('Trestles', 'San Clemente, CA.', 'reefbreak', 'shortboard');
Steamers();
