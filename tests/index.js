const { Client, ReplyKeyboardMarkupButton, RowButtonsKeyboardMarkup, ReplyKeyboardMarkup, InlineKeyboardMarkupButton, InlineKeyboardMarkup } = require("../");
const cfg = require("./cfg.json");

const bot = new Client({ "ignore_start_message": false });
bot.on("command", msg => {
	if (msg.isBotCommand()) {
		if (msg.d.text == "/help") {
			const description = `Привет ${msg.d.chat.first_name} ${msg.d.chat.last_name}(@${msg.d.chat.username})\nУ меня есть команды:\n /keyboard`;
			msg.send_message_chat({ "text": description });
		} else if (msg.d.text == "/keyboard") {
			const row = new RowButtonsKeyboardMarkup()
				.addButton(
					new ReplyKeyboardMarkupButton("Кто твой создатель?"),
					new ReplyKeyboardMarkupButton("Как тебя зовут?")
				);
			const row2 = new RowButtonsKeyboardMarkup()
				.addButton(
					new ReplyKeyboardMarkupButton("GitHub"),
					new ReplyKeyboardMarkupButton("Discord")
				);
			const Keyboard = new ReplyKeyboardMarkup({ "resize_keyboard": true })
				.addRowButtons(row, row2);


			msg.send_message_chat({ "text": "Клавиатура создана", "keyboard": Keyboard.toJSON() });
		}
	}
});

bot.on("new_callback", call => {
	call.answerCallbackQuery({ "text": "" }).catch(err => console.log(err));
	call.message.send_message_chat({ "text": "Hello" });
});
bot.on("message", msg => {
	if (msg.d.text == "Кто твой создатель?") {
		const row = new RowButtonsKeyboardMarkup()
			.addButton(
				new InlineKeyboardMarkupButton({ "text": "Hello", "callback_data": "id1" })
			);
		const board = new InlineKeyboardMarkup()
			.addRowButtons(row);
		msg.send_message_chat({ "text": "Меня сделал AOV", "keyboard": board.toJSON() });
	} else if (msg.d.text == "Как тебя зовут?") {
		msg.send_message_chat({ "text": "Меня зовут aovs_bot" });
	} else if (msg.d.text == "GitHub") {
		msg.send_message_chat({ "text": "https://github.com/aovzerk" });
	} else if (msg.d.text == "Discord") {
		msg.send_message_chat({ "text": "AOV#2077" });
	}

});
bot.login(cfg.token);