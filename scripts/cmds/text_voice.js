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
      // existing default voices
      "good night": "https://files.catbox.moe/i29m4q.mp3",  
      "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",  
      "good morning": "https://files.catbox.moe/8gzqx5.mp3",  
      "গুড মর্নিং": "https://files.catbox.moe/8gzqx5.mp3",  
      "i love you": "https://files.catbox.moe/npy7kl.mp3",  
      "mata beta": "https://files.catbox.moe/5rdtc6.mp3",

      // 🔽 নিচে তোমার ২০টি ভয়েস সেটআপ করো (টেক্সট ও লিংক চেঞ্জ করো) 🔽
      "tonni k":
"https://tmpfiles.org/dl/wAw19CEWD4zW/audio_1784737968058.mp3",
      "Hamim":
"https://tmpfiles.org/dl/wmw89AppekNn/audio_1784739102435.mp3
",
      "Gf daw": 
"https://tmpfiles.org/dl/wpwb9bpY52wz/audio_1784740085339.mp3",
      "Tonni":
"https://tmpfiles.org/dl/wmw69VpgggCw/audio_1784739260530.mp3",
      "Bal": 
"https://tmpfiles.org/dl/wtww9bpuaq7c/audio_1784740628653.mp3",
      "Hi": 
"https://tmpfiles.org/dl/wnwh9IpfLwYO/audio_1784739731355.mp3
",
      "Baby":
"https://tmpfiles.org/dl/wYwI9cpAW46x/audio_1784740153571.mp3",
      "Bavy": 
"https://tmpfiles.org/dl/wSwe9lps5qOe/audio_1784740123916.mp3",
      "voice 9 text": "https://files.catbox.moe/link9.mp3",
      "voice 10 text": "https://files.catbox.moe/link10.mp3",
      "voice 11 text": "https://files.catbox.moe/link11.mp3",
      "voice 12 text": "https://files.catbox.moe/link12.mp3",
      "voice 13 text": "https://files.catbox.moe/link13.mp3",
      "voice 14 text": "https://files.catbox.moe/link14.mp3",
      "voice 15 text": "https://files.catbox.moe/link15.mp3",
      "voice 16 text": "https://files.catbox.moe/link16.mp3",
      "voice 17 text": "https://files.catbox.moe/link17.mp3",
      "voice 18 text": "https://files.catbox.moe/link18.mp3",
      "voice 19 text": "https://files.catbox.moe/link19.mp3",
      "voice 20 text": "https://files.catbox.moe/link20.mp3"
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
