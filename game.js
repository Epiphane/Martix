module.exports = function() {
	this.quit = function() {
		process.stdout.write('Bye!\n');
		process.exit(0);
	}

	this.catchInput = false;
	this.input = function(ch, key) {

	}

	this.interpret = function(command, printLine) {
    if(command === 'exit')
      quit();

		printLine(command);

		return {
			then: function(callback) {
				callback();
			}
		}
	}

	return this;
}