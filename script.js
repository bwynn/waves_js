//an object containing
function Wave(name, location,bestSize) {
  this.name = name;
  this.location = location;
  this.bestSize = function() {
    var minHeight = 4; //reduce to declaration, add values within Steamers function
    var maxHeight = 20; // reduce to declaration, same as above
    return minHeight + ' to ' + maxHeight + ' feet';
  }
};

//an array of the different wave break options
function WaveType() {
  var waveArray = [
    'pointbreak',
    'beachbreak',
    'reefbreak'
  ];
  return waveArray;
};

//an array of the different board types available
function Boards() {
  var boardsArray = [
    'shortboard',
    'longboard',
    'fish',
    'step-up'
  ];
  return boardsArray;
}

function Steamers() {
// calling wave object to add content to page
var steamers = new Wave('Steamer Lane', 'Santa Cruz, CA.');
// calling WaveType function
var waveType1 = new WaveType();
var boardType = new Boards();

//steamers details
var title = steamers.name + ', ' + steamers.location;
var sizeRange = steamers.bestSize();
var boards = boardType[0];

//getting and displaying waveTitle
var waveTitle = document.getElementById('waveTitle');
waveTitle.textContent = title;

//getting and displaying waveRange
var waveRange = document.getElementById('waveRange');
waveRange.textContent = sizeRange;

//getting and displaying waveKind
var waveKind = document.getElementById('waveType');
waveKind.textContent = waveType1[0];

//getting and displaying boardType
var boardType = document.getElementById('boardType');
boardType.textContent = boards;
};

//var rincon = new Wave('Rincon', 'Carpenteria, CA.', 'pointbreak', 'longboard');
//var trestles = new Wave('Trestles', 'San Clemente, CA.', 'reefbreak', 'shortboard');
Steamers();
