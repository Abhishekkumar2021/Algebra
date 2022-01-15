//Polynomial class
class Polynomial {
	constructor(...arg) {
		if (arg.length === 3) {
			this.deg = arg[0];
			this.char = arg[1];
			this.polynomialArray = arg[2];
			this.polynomial = this.builtPolynomial(this.polynomialArray);
		} else {
			this.polynomial = arg[0];
			const arr = arg[0].split("");

			for (let i = 0; i < arr.length; i++) {
				if (arr[i] === "^") {
					this.char = arr[i - 1];
					break;
				}
			}
			let polynomialArray = [];
			for (let i = 0; i < arr.length; i++) {
				let exp = 1;
				let coeff = 0;
				if (arr[i] === this.char) {
					if (arr[i + 1] === "^") {
						exp = parseInt(arr[i + 2]);
					}
					if (arr[i - 1] === "*") {
						if (i - 3 >= 0) {
							if (arr[i - 3] === "+") coeff = parseInt(arr[i - 2]);
							else coeff = -parseInt(arr[i - 2]);
						} else if (i - 2 >= 0) {
							coeff = parseInt(arr[i - 2]);
						} else {
							coeff = 1;
						}
					} else {
						coeff = 1;
					}
					polynomialArray.push({ exp, coeff });
				}
			}
			let deg = 0;
			for (let item of polynomialArray) {
				if (item.exp > deg) {
					deg = item.exp;
				}
			}
			this.polynomialArray = polynomialArray;
			this.deg = deg;
		}
	}
	builtPolynomial = (polynomialArray) => {
		let polynomial = "";
		for (let element of polynomialArray) {
			if (element.coeff !== 0) {
				if (element.coeff > 0) polynomial += "+" + element.coeff;
				else polynomial += element.coeff;
				polynomial += "*";
				polynomial += this.char;
				polynomial += "^";
				polynomial += element.exp;
			}
		}
		if (polynomial[0] === "+") return polynomial.slice(1);
		else return polynomial;
	};
	//getters
	getCoeff = (exp) => {
		if (this.polynomialArray)
			return this.polynomialArray.find((item) => item.exp === exp).coeff;
		else return 0;
	};

	getChar = () => this.char;

	getExp = (coeff) => {
		const filterd = this.polynomialArray.filter((item) => item.coeff === coeff);
		const mappedArray = filterd.map((item) => item.exp);
		return mappedArray;
	};
	getDeg = () => this.deg;
	getPolynomial = () => {
		if (this.polynomial) return this.polynomial;
		else {
			this.polynomial = this.builtPolynomial(this.polynomialArray);
			return this.polynomial;
		}
	};
	getValueHelper = (x, polynomialArray) => {
		let value = 0;
		for (let item of polynomialArray) {
			value += item.coeff * Math.pow(x, item.exp);
		}
		return value;
	};

	getValue = (x) => {
		return this.getValueHelper(x, this.polynomialArray);
	};
	//setters
	setCoeff = (exp, coeff) => {
		if (this.polynomialArray) {
			const found = this.polynomialArray.find((item) => item.exp === exp);
			if (found) {
				found.coeff = coeff;
				this.polynomialArray = [...this.polynomialArray, found];
			} else {
				this.polynomialArray.push({ exp, coeff });
				if (this.exp < exp) this.exp = exp;
			}
		} else {
			this.polynomialArray = [{ exp, coeff }];
			if (this.exp < exp) this.exp = exp;
		}
	};
	//other functions
	integral = () => {
		let newArray = [];
		for (let element of this.polynomialArray) {
			let exp = element.exp + 1;
			let coeff = element.coeff / exp;
			if (Math.floor(coeff) === coeff) newArray.push({ exp, coeff });
			else newArray.push({ exp, coeff: coeff.toFixed(2) });
		}
		return this.builtPolynomial(newArray);
	};
	defIntegral = (a, b) => {
		let newArray = [];
		for (let element of this.polynomialArray) {
			let exp = element.exp + 1;
			let coeff = element.coeff / exp;
			if (Math.floor(coeff) === coeff) newArray.push({ exp, coeff });
			else newArray.push({ exp, coeff: coeff.toFixed(2) });
		}
		return this.getValueHelper(b, newArray) - this.getValueHelper(a, newArray);
	};
	differentiateHelper = (polynomialArray) => {
		let newArray = [];
		for (let element of polynomialArray) {
			let coeff = element.coeff * element.exp;
			let exp = element.exp - 1;
			if (Math.floor(coeff) === coeff) newArray.push({ exp, coeff });
			else newArray.push({ exp, coeff: coeff.toFixed(2) });
		}
		return newArray;
	};
	differentiate = (r = 1) => {
		let ansArray = this.differentiateHelper(this.polynomialArray);
		if (r === 1) return this.builtPolynomial(ansArray);
		else {
			while (r > 1) {
				ansArray = this.differentiateHelper(ansArray);
				r--;
			}
			return this.builtPolynomial(ansArray);
		}
	};
	differential = (x) => {
		let newArray = [];
		for (let element of this.polynomialArray) {
			let coeff = element.coeff * element.exp;
			let exp = element.exp - 1;
			if (Math.floor(coeff) === coeff) newArray.push({ exp, coeff });
			else newArray.push({ exp, coeff: coeff.toFixed(2) });
		}
		return this.getValueHelper(x, newArray);
	};
}

const first = new Polynomial(3, "x", [
	{ exp: 3, coeff: 1 },
	{ exp: 2, coeff: 5 },
]);

console.log(first.differentiate());
console.log(first.differentiate(3));
console.log(first.differential(5));
console.log(first.integral());
console.log(first.defIntegral(10, 20));
console.log(first.getValue(10));

const second = new Polynomial("x^2-2*x+5*x^0");
console.log(second.getValue(10));
