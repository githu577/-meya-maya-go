const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

module.exports = {
        config: {
                name: "slap",
                aliases: ["thappor"],
                version: "1.7",
                author: "乛 SIYAM ゎ",
                countDown: 10,
                role: 0,
                description: {
                        en: "Create a slap image of someone"
                },
                category: "fun",
                guide: {
                        en: '   {pn} <@tag>: Slap a tagged user'
                                + '\n   {pn} <uid>: Slap by UID'
                                + '\n   (Or reply to someone\'s message)'
                }
        },

        langs: {
                en: {
                        noTarget: "× Baby, mention or reply to someone to slap!",
                        success: "ja shor🫩🫵🏻! 💥",
                        error: "× Failed to slap: %1"
                }
        },

        onStart: async function ({ api, message, args, event, getLang }) {
                const { senderID, messageReply, mentions } = event;
                let id2;

                if (messageReply) {
                        id2 = messageReply.senderID;
                } else if (Object.keys(mentions).length > 0) {
                        id2 = Object.keys(mentions)[0];
                } else if (args[0] && !isNaN(args[0])) {
                        id2 = args[0];
                }

                if (!id2) return message.reply(getLang("noTarget"));

                try {
                        const baseUrl = await baseApiUrl();
                        const url = `${baseUrl}/api/dig?type=slap&user=${senderID}&user2=${id2}`;

                        const response = await axios.get(url, { responseType: "arraybuffer" });
                        const cachePath = path.join(__dirname, "cache", `slap_${id2}.png`);
                        
                        if (!fs.existsSync(path.join(__dirname, "cache"))) {
                                fs.mkdirSync(path.join(__dirname, "cache"));
                        }

                        fs.writeFileSync(cachePath, Buffer.from(response.data));

                        await message.reply({
                                body: getLang("success"),
                                attachment: fs.createReadStream(cachePath)
                        });

                        fs.unlinkSync(cachePath);
                } catch (err) {
                        console.error("Error in slap command:", err);
                        return message.reply(getLang("error", err.message));
                }
        }
};
