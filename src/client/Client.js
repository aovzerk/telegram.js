"use strict";
const fetch = require("node-fetch");
const EventEmitter = require("events");
const Message = require("../structures/Message");
const CallBackT = require("../structures/CallBackT");
const api_consts = require("../consts/api_consts.json");
class Client extends EventEmitter {
	constructor(options) {
		super();
		const { ignore_start_message } = options;
		this.ignore_start_message = false;
		if (ignore_start_message) {
			this.ignore_start_message = ignore_start_message;
		}
		this.last_offset = 0;
	}
	get token() {
		return this._token();
	}
	build_url(method) {
		return `${api_consts.base_url}bot${this.token}/${method}`;
	}
	send_data(options) {
		const { method, body, url } = options;
		return new Promise((result, reject) => {
			fetch(url, {
				"method": method,
				"body": body
			}).then(async response => {
				response.json().then(data => {
					if (data.error_code) {
						reject(data);
					} else {
						result(data);
					}

				}).catch(err => { reject(err); });

			}).catch(err => { reject(err); });
		});
	}
	getUpdates() {
		this.send_data({ "method": "GET", "body": null, "url": `${this.build_url(api_consts.methods.getUpdates)}?offset=${this.last_offset}` }).then(data => {
			if (data.result.length == 0) {
				setTimeout(() => this.getUpdates(), api_consts.interval_update);
			} else if (this.ignore_start_message) {
				this.last_offset = Number(data.result[data.result.length - 1].update_id) + 1;
				this.ignore_start_message = false;
				setTimeout(() => this.getUpdates(), api_consts.interval_update);
			} else {
				this.last_offset = Number(data.result[data.result.length - 1].update_id) + 1;
				data.result.forEach(message => {
					if (message.message) {
						if (message.message.entities && message.message.entities[0].type == api_consts.bot_command) {
							const new_message = new Message(message.message, this, true);
							this.emit("command", new_message);
						} else {
							const new_message = new Message(message.message, this, false);
							this.emit("message", new_message);
						}

					} else if (message.callback_query) {
						const new_callback = new CallBackT(message.callback_query, this);
						this.emit("new_callback", new_callback);
					}

				});
				setTimeout(() => this.getUpdates(), api_consts.interval_update);
			}

		});
	}
	login(token) {
		this._token = () => token;
		this.getUpdates();
	}

}
module.exports = Client;