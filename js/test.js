// setup assert testing function
function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}

assert(true, '|------- Before Outer --------|');
assert(typeof outer === 'function',
        'outer() is in scope');
assert(typeof inner === 'function',
        'inner() is in scope');
assert(typeof a === 'number',
        'a is in scope');
assert(typeof b === 'number',
        'b is in scope');
assert(typeof c === 'number',
        'c is in scope');
