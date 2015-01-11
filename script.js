function Wave(name, location, minHeight, maxHeight) {
  this.name = name;
  this.location = location;
  this.bestSize = function() {
    var minHeight = 4;
    var maxHeight = 20;
    return minHeight + ' to ' + maxHeight + ' feet';
  }
}

//setting global array for waveType
var waveType = ['pointbreak', 'beachbreak', 'reefbreak'];
var boardType = ['shortboard', 'longboard', 'fish', 'gun']

var steamers = new Wave('Steamer Lane', 'Santa Cruz, CA.');
var rincon = new Wave('Rincon', 'Carpenteria, CA.', 'pointbreak', 'longboard');
var trestles = new Wave('Trestles', 'San Clemente, CA.', 'reefbreak', 'shortboard');

//steamers details
var details1 = steamers.name + ', ' + steamers.location;
var details2 = waveType[0];
var range1 = steamers.bestSize();
var boards = boardType[0];

var waveTitle = document.getElementById('waveTitle');
waveTitle.textContent = details1;

var waveRange = document.getElementById('waveRange');
waveRange.textContent = range1;

var waveType = document.getElementById('waveType');
waveType.textContent = details2;

var boardType = document.getElementById('boardType');
boardType.textContent = boards;
