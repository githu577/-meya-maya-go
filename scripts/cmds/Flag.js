const axios = require('axios');

module.exports = {
    config: {
        name: "flag",
        aliases: ["flags", "countryflag", "worldflag"],
        version: "2.0.0",
        author: "MJ HAMIM",
        role: 0,
        shortDescription: {
            en: "Get country flag image",
            vi: "Nhận hình ảnh cờ quốc gia"
        },
        longDescription: {
            en: "Search for a country to get its real flag image.",
            vi: "Tìm kiếm một quốc gia để nhận hình ảnh lá cờ thật của nó."
        },
        category: "utility",
        guide: {
            en: "{pn} <country name>",
            vi: "{pn} <tên quốc gia>"
        }
    },

    onStart: async function ({ api, event, args }) {
        if (args.length === 0) {
            return api.sendMessage("⚠️ Please enter a country name!\nExample: flag Argentina", event.threadID, event.messageID);
        }

        const countryName = args.join(" ");
        
        try {
            // API theke desher data khuje ber korbe
            const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
            const countryData = response.data[0];
            
            const flagUrl = countryData.flags.png;
            const officialName = countryData.name.common;
            const capital = countryData.capital ? countryData.capital[0] : "N/A";
            const region = countryData.region;

            // Chobi (image) ta stream e convert korbe bot e pathanor jonno
            const imageStream = await axios.get(flagUrl, { responseType: 'stream' });
            
            const msg = {
                body: `🎌 𝗖𝗼𝘂𝗻𝘁𝗿𝘆 𝗙𝗹𝗮𝗴 🎌\n\n📌 Name: ${officialName}\n🏙️ Capital: ${capital}\n🌍 Region: ${region}`,
                attachment: imageStream.data
            };

            return api.sendMessage(msg, event.threadID, event.messageID);

        } catch (error) {
            return api.sendMessage(`❌ Sorry, couldn't find the flag for "${countryName}". Banan ta ektu check kore abar try koro!`, event.threadID, event.messageID);
        }
    }
};
