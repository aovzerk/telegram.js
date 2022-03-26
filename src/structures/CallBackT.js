const Message = require("../structures/Message");
const api_consts = require("../consts/api_consts.json");
class CallBackT {
	constructor(data, client) {
		this.client = client;
		this.message = new Message(data.message, client);
		this.d = data;
	}
	answerCallbackQuery(options) {
		const { text } = options;
		const url = `${this.client.build_url(api_consts.methods.answerCallbackQuery)}?text=${text.replace(/\n/gi, "%0a").replace(/#/gi, "%23")}&callback_query_id=${this.d.id}`;
		return this.client.send_data({ "method": "GET", "body": null, "url": `${url}` });
	}
}
module.exports = CallBackT;