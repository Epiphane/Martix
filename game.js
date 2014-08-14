exports.init = function(program) {
  this.program = program;
  this.catchInput = false;
  this.default_module = './module/echo.js';

  this.intro = function() {
    program.writeln('Welcome to the M4tr1x...');
    program.write('No modules connected! Use default module? (y/n) ');
    this.catchInput = true;
  }

	this.quit = function() {
		program.writeln('Bye!');
		process.exit(0);
	}

	this.input = function(ch, key) {
    // Use default module!
    if(key.name === 'y' && !this.currentModule) {
      program.writeln('y');
      program.writeln('Loading echo...');
      this.currentModule = require(this.default_module).init(program);
      this.catchInput = false;
    }
    // They want a custom module
    else if(!this.currentModule) {
      program.writeln('n');
      program.write('Enter module name: ');
      this.catchInput = false;
    }
	}

  this.currentModule = null;
	this.interpret = function(command) {
    if(command === 'exit')
      this.quit();

    if(this.currentModule) {
      this.currentModule.interpret(command, program);
    }
    else {
      if(command === 'y')
      this.currentModule = require('./module/' + command + '.js').init(program);
    }
	}

	return this;
}