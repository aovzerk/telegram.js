"use strict";
const fetch = require("node-fetch");
const EventEmitter = require("events");
const Message = require("../structures/Message");
const api_consts = require("../consts/api_consts.json");
class Client extends EventEmitter {
	constructor() {
		super();
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
					result(data);
				}).catch(err => { reject(err); });

			}).catch(err => { reject(err); });
		});
	}
	getUpdates() {
		this.send_data({ "method": "GET", "body": null, "url": `${this.build_url(api_consts.methods.getUpdates)}?offset=${this.last_offset}` }).then(data => {
			if (data.result.length == 0) {
				setTimeout(() => this.getUpdates(), api_consts.interval_update);
			} else {
				this.last_offset = Number(data.result[data.result.length - 1].update_id) + 1;
				data.result.forEach(message => {
					const new_message = new Message(message.message, this);
					this.emit("message", new_message);
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