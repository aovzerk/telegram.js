"use strict";
class ReplyKeyboardMarkup {
	constructor(options) {
		const { resize_keyboard } = options;
		this.rows = [];
		this.resize_keyboard = false;
		if (resize_keyboard) {
			this.resize_keyboard = resize_keyboard;
		}
	}
	addRowButtons(...rows) {
		this.rows.push(...rows);
		return this;
	}
	toJSON() {
		return {
			"keyboard": this.rows.map(c => c.toJSON()),
			"resize_keyboard": this.resize_keyboard
		};
	}
}


module.exports = ReplyKeyboardMarkup;

