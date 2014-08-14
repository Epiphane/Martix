exports.init = function(program) {
	this.program = program;

	this.intro = function() {
		program.writeln("ECHO...echo....echo......(exit to get out of here)");
	}

	this.interpret = function(command) {
		program.writeln(command);
	};

	return this;
}