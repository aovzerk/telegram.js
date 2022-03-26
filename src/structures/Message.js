"use strict";
const api_consts = require("../consts/api_consts.json");
class Message {
	constructor(data, client, isCommand) {
		this.d = data;
		this.client = client;
		this.isCommand = isCommand;
	}
	isBotCommand() {
		return this.isCommand;
	}
	send_message_chat(options) {
		const { text, keyboard } = options;
		let url = `${this.client.build_url(api_consts.methods.sendMessage)}?text=${text.replace(/\n/gi, "%0a").replace(/#/gi, "%23")}&chat_id=${this.d.chat.id}`;
		if (keyboard != undefined) {
			url = `${url }&reply_markup=${JSON.stringify(keyboard)}`;
		}
		return this.client.send_data({ "method": "GET", "body": null, "url": `${url}` });
	}
}
module.exports = Message;