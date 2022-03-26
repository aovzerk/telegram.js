"use strict";

class InlineKeyboardMarkup {
	constructor() {
		this.rows = [];
	}
	addRowButtons(...rows) {
		this.rows.push(...rows);
		return this;
	}
	toJSON() {
		return {
			"inline_keyboard": this.rows.map(c => c.toJSON())
		};
	}
}
module.exports = InlineKeyboardMarkup;