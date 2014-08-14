exports.init = function(program) {
	this.program = program;

	this.interpret = function(command) {
		program.writeln(command);
	};

	return this;
}