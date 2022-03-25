"use strict";
class Button {
	constructor(text) {
		this.text = text;
	}
	setText(text) {
		this.text = text;
		return this;
	}
	toJSON() {
		return {
			"text": this.text
		};
	}
}
module.exports = Button;