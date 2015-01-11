function Wave(name, location, waveType, boardType) {
  this.name = name;
  this.location = location;
  var waveType = new Array['pointbreak'];
  this.boardType = boardType;
}

var steamers = new Wave('Steamer Lane', 'Santa Cruz, CA.', waveType[0], 'shortboard');
var rincon = new Wave('Rincon', 'Carpenteria, CA.', 'pointbreak', 'longboard');
var trestles = new Wave('Trestles', 'San Clemente, CA.', 'reefbreak', 'shortboard');

var details1 = steamers.name + ', ' + steamers.location;
var details2 = 'Type of wave: ' + steamers.waveType;
var wave1 = document.getElementById('wave1');
wave1.textContent = details1 + details2;
