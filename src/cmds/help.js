const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    description: "Displays available commands and shares bot's contact",
    prefix: true,
    role: 0,
  },
  run: async (api, event, args, reply, react) => {
    const commandPath = path.join(__dirname);
    const files = fs.readdirSync(commandPath);
    let helpMessage = "📋 | 𝖢𝗈𝗆𝗆𝖺𝗇𝖽 𝖫𝗂𝗌𝗍\n\n";

    let index = 1;
    files.forEach(file => {
      if (file.endsWith(".js")) {
        const cmd = require(path.join(commandPath, file));
        helpMessage += `❍ ${index}. ${cmd.config.name}\n`;
        index++;
      }
    });

    helpMessage += `\n⦾ Total Commands: [ ${index - 1} ]\n`;
    helpMessage += `⦾ Prefix: [ ${global.heru.prefix} ]\n`;
    helpMessage += `⦾ Created By: Jay Mar`;

    // Send the help message in the current thread, available to all users
    reply(helpMessage, event);

    // Share bot's contact information
    api.shareContact(
      event.threadID,
      api.getCurrentUserID(),
      (err) => {
        if (err) {
          console.error('Error sharing contact:', err);
        }
      },
      event.messageID
    );
  },
};
