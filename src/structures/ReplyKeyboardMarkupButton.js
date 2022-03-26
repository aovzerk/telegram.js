"use strict";
class ReplyKeyboardMarkupButton {
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
module.exports = ReplyKeyboardMarkupButton;