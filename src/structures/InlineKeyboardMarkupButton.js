"use strict";
class InlineKeyboardMarkupButton {
	constructor(options) {
		const { text, callback_data } = options;
		this.text = text;
		this.callback_data = callback_data;
	}
	setText(text) {
		this.text = text;
		return this;
	}
	setCallbackData(text) {
		this.callback_data = text;
		return this;
	}
	toJSON() {
		return {
			"text": this.text,
			"callback_data": this.callback_data
		};
	}
}
module.exports = InlineKeyboardMarkupButton;