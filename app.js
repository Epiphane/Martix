var program = require('blessed')();
program.command = '';
program.log = [];

// Initialize game
var game = require('./game.js').init(program);

program.writeln = function(line) {
  program.write(line);
  program.feed();
}

// Welcome the user
if(game.intro)
  game.intro();

program.on('keypress', function(ch, key) {
  if(game.catchInput) {
    game.input(ch, key);
  }
  else {
    if(key.name === 'backspace') { // Backspace
      program.cursorBackward(1); 
      program.eraseInLine();
      program.command = program.command.slice(0, -1);
    }
    else if(key.name === 'return' || key.name === 'enter') {
      if(program.command.length > 0) {
        program.feed();
        game.interpret(program.command);
        program.command = '';
      }
    }
    else {
      program.command += ch;
      program.write(ch);
    }
  }
});