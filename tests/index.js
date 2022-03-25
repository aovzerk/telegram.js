const { Client, Button, RowButtons, ReplyKeyboardMarkup } = require("../");
const cfg = require("./cfg.json");

const bot = new Client();
bot.on("message", msg => {
	if (msg.isBotCommand()) {
		if (msg.d.text == "/help") {
			const description = `Привет ${msg.d.chat.first_name} ${msg.d.chat.last_name}(@${msg.d.chat.username})\nУ меня есть команды:\n /keyboard`;
			msg.send_message_chat({ "text": description });
		} else if (msg.d.text == "/keyboard") {
			const row = new RowButtons()
				.addButton(
					new Button("Кто твой создатель?"),
					new Button("Как тебя зовут?")
				);
			const row2 = new RowButtons()
				.addButton(
					new Button("GitHub"),
					new Button("Discord")
				);
			const Keyboard = new ReplyKeyboardMarkup({ "resize_keyboard": true })
				.addRowButtons(row, row2);


			msg.send_message_chat({ "text": "Клавиатура создана", "keyboard": Keyboard.toJSON() });
		}
	} else if (msg.d.text == "Кто твой создатель?") {
		msg.send_message_chat({ "text": "Меня сделал AOV" });
	} else if (msg.d.text == "Как тебя зовут?") {
		msg.send_message_chat({ "text": "Меня зовут aovs_bot" });
	} else if (msg.d.text == "GitHub") {
		msg.send_message_chat({ "text": "https://github.com/aovzerk" });
	} else if (msg.d.text == "Discord") {
		msg.send_message_chat({ "text": "AOV#2077" });
	}

});
bot.login(cfg.token);