const Lexer = require('./Lexer')


class Parser {

	constructor() {
		this._tokens = null
		this._ast = null
		this._cursor = 0
		this._stack = []
		this._result = 0
	}

	get current() {
		return this._tokens[this._cursor]
	}

	test(c) {
		if (this.current === c) {
			return true;
		} else {
			return false;
		}
	}

	consume() {
		this._cursor++;
	}

	parser(tokens) {
		this._tokens = tokens;
		this.parse1();	
		return this._stack ;
	}

	parse1(){
		if (this._tokens[this._cursor] === undefined) {
			console.log('return parse');
			return true;
		}
		else if (this._tokens[this._cursor].name == "+"){
			//faire le plus
			this.consume();
			this.parse1();
			let nb1 = this._stack.pop();
			let nb2 = this._stack.pop();
			console.log('Somme : '+nb1+'+'+nb2);
			this.sum(nb1, nb2)
		}
		else if (this._tokens[this._cursor].name == "-"){
			///faire le moins
			this.consume();
			this.parse1();
			let nb1 = this._stack.pop();
			let nb2 = this._stack.pop();
			console.log('Soustraction : '+nb2+'-'+nb1);
			this.substract(nb2, nb1);
			console.log(this._stack);
		}
		else{
			this.parse2();
		}
	}

	parse2(){
		if (this._tokens[this._cursor].name == "*") {
			//faire le fois
			this.consume();
			this.parse1();
			let nb1 = this._stack.pop();
			let nb2 = this._stack.pop();
			console.log('Multiplication : '+nb1+'*'+nb2);
			this.multiply(nb1, nb2);
		}
		else if (this._tokens[this._cursor].name == "/"){
			//faire le diviser
			this.consume();
			this.parse1();
			let nb1 = this._stack.pop();
			let nb2 = this._stack.pop();
			console.log('Division : '+nb2+'/'+nb1);
			this.divide(nb2, nb1);
		}
		else{
			this.parse3();
		}
		
	}

	parse3(){
		if (this._tokens[this._cursor].type == "NUMBER") {
			//add number to stack
			this._stack.push(parseInt(this._tokens[this._cursor].name));
			console.log(this._stack);
			this.consume();
			this.parse1();
		}
		else if (this._tokens[this._cursor].name == "(") {
			this.consume();
			this.parse1();
			if(this._tokens[this._cursor].name == ")"){
				this.consume();
				this.parse1();
			}
		}
		else return true;
	}

	multiply(nb1, nb2){
		this._stack.push(nb1*nb2);
	}

	sum(nb1, nb2){
		this._stack.push(nb1+nb2);
	}

	substract(nb1, nb2){
		this._stack.push(nb1-nb2);
	}

	divide(nb1, nb2){
		this._stack.push(nb1/nb2);
	}
}

module.exports = Parser