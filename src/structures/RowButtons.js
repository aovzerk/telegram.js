"use strict";
class RowButtons {
	constructor() {
		this.buttons = [];
	}
	addButton(...buttons) {
		this.buttons.push(...buttons);
		return this;
	}
	toJSON() {
		return this.buttons.map(c => c.toJSON());
	}
}
module.exports = RowButtons;