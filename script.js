function Wave(name, location, minHeight, maxHeight) {
  this.name = name;
  this.location = location;
  this.bestSize = function() {
    var minHeight = 4;
    var maxHeight = 20;
    return minHeight + ' to ' + maxHeight + ' feet';
  }
}

var waveType = ['pointbreak', 'beachbreak', 'reefbreak'];

var steamers = new Wave('Steamer Lane', 'Santa Cruz, CA.');
var rincon = new Wave('Rincon', 'Carpenteria, CA.', 'pointbreak', 'longboard');
var trestles = new Wave('Trestles', 'San Clemente, CA.', 'reefbreak', 'shortboard');

var details1 = steamers.name + ', ' + steamers.location;
    details1 += steamers.bestSize();
var details2 = 'Type of wave: ' + waveType[0];
var wave1 = document.getElementById('wave1');
wave1.textContent = details1 + details2;
