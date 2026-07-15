const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "text_voice",
    version: "1.0.5",
    author: "MR_FARHAN", // ⚠️ DO NOT CHANGE THIS (LOCKED)
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Voice Reply",
    longDescription: "Sends specific voice messages instantly using local cache",
    category: "system"
  },

  // ==============================
  // 🔒 AUTHOR LOCK SYSTEM
  // ==============================
  _authorLock: function () {
    const expectedAuthor = "MR_FARHAN";
    if (module.exports.config.author !== expectedAuthor) {
      throw new Error("🚫 AUTHOR LOCKED: You are not allowed to change author name!");
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    // 🔒 Run lock check every time
    this._authorLock();

    if (!event.body) return;

    const input = event.body.toLowerCase().trim();

    const voiceMap = {
      
		  "good night": "https://files.catbox.moe/i29m4q.mp3",
      "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",

      "good morning": "https://files.catbox.moe/8gzqx5.mp3",
      "গুড মর্নিং": "https://files.catbox.moe/8gzqx5.mp3",
      
   		"i love you": "https://files.catbox.moe/npy7kl.mp3",
      "mata beta": "https://files.catbox.moe/5rdtc6.mp3"
    };

    if (voiceMap[input]) {
      const audioUrl = voiceMap[input];
      const cacheDir = path.join(__dirname, "cache", "voices");
      fs.ensureDirSync(cacheDir);

      const fileName = `${Buffer.from(input).toString("hex")}.mp3`;
      const filePath = path.join(cacheDir, fileName);

      try {
        if (fs.existsSync(filePath)) {
          return await message.reply({
            attachment: fs.createReadStream(filePath)
          });
        }

        const response = await axios.get(audioUrl, {
          responseType: "arraybuffer"
        });

        fs.writeFileSync(filePath, Buffer.from(response.data));

        await message.reply({
          attachment: fs.createReadStream(filePath)
        });

      } catch (error) {
        console.error("Error sending voice:", error);
      }
    }
  }
};
