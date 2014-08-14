// Initialize game
var game = require('./game.js')();

var program = require('blessed')();
program.command = '';
program.inputEnabled = true;
program.log = [];

var printLine = function(line) {
  program.write(line);
  program.feed();
}

program.on('keypress', function(ch, key) {
  if(game.catchInput) {
    game.input(ch, key);
  }
  else if(program.inputEnabled) {
    if(key.name === 'backspace') { // Backspace
      program.cursorBackward(1); 
      program.eraseInLine();
      program.command = program.command.slice(0, -1);
    }
    else if(key.name === 'return' || key.name === 'enter') {
      if(program.command.length > 0) {
        program.inputEnabled = false;
        program.feed();
        game.interpret(program.command, printLine).then(function() {
          program.command = '';
          program.inputEnabled = true;
        });
      }
    }
    else {
      program.command += ch;
      program.write(ch);
    }
  }
});