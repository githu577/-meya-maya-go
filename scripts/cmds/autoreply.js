module.exports = {
  config: {
    name: "autoreply",
    version: "5.0",
    author: "MJ Hamim",
    countDown: 0,
    role: 0,
    shortDescription: "Exact + Contains Auto Reply",
    category: "chat",
  },
  onStart: async function () {},
  onChat: async function ({ event, api }) {
    let text = event.body?.toLowerCase();
    if (!text) return;
    const cleanText = text.trim();

    // ✅ EXACT MATCH
    const exactReplies = [
      { words: ["love you bot","love u bot","bot love you","bot love u"], reply: "বস হামিম মেয়েদে'র সাথে কথা বলতে মানা করছে-🙂🤗🐸" },
      { words: ["bot jamay dau","বট জামাই দাও"], reply: "আমার বস হামিম কে চোখে দেখো না নাকি__😒🥱" },
      { words: ["i love you bot","bot i love you"], reply: "আমাকে না আমার বস হামিম কে ভালোবাসো-😻🤗🌺" },
      { words: ["baler bot","fuck bot"], reply: "কিরে আমাকে গালি দেস কেনো তোকে কিন্তু বেন করে দিমু😠" },
      { words: ["kiss bot","bot kiss me"], reply: "আমি ভালো তুমি পঁচা😌" },
      { words: ["bot koi","বট কই"], reply: "এই তো আমি এখানে🙋‍♂️" },
      { words: ["/sex","/fuck"], reply: "-জানু ভালো হয়ে যাও তোমাকে আমি অনেক সময় দিয়েছি 🤖 ~ now sex time fuck" },
      { words: ["opoman korli","Ami Hamim"], reply: "-সরি হামিম বস আমার ভূল হইছে-😔-মাফ করে দেন আমাকে ,আর এমন হবে না-🥺🙏" },
      { words: ["single","সিঙ্গেল"], reply: "আমি সিঙ্গেল আছি প্রেম করলে নক দে বলদ!😾" },
      { words: ["love you","i love you"], reply: "I love you too 🥺! মনে লাগে ঢেউ ভালোবাসে না কেউ hihihi....💦💔" },
      { words: ["👍"], reply: "-👍-হাত-মেরে কিবোর্ড দুর্বল করো না-🤣👈-ধন্যবাদ-🤗🤝" },
      { words: ["kmon acho","kemon aso","kemon aso","কেমন আছো","kmn aso","kamon aso","কেমন আছো সবাই","kmon aso sobai","kmn aso sobai"], reply: "-আলহামদুলিল্লাহ-🌺-আমি ভালো আছি তুমি কেমন আছো-💝🌻" },
      { words: ["বট চুপ","bot tham","স্টপ","stop","চুপ","chup thak"], reply: "-না আমি চুপ থাকবো না-😼-বস হামিম আমারে কথা বলতে বলছে-🥱🥷" },
      { words: ["চুম্মাহ দাও","kiss me"], reply: "️-আমি দিবো না-😏-বস হামিম কে বলো চু'মু দিতে-🫣🐸" },
      { words: ["bot ar bacca","বট এর বাচ্ছা","bot er bacca"], reply: "উফফ-🥵-ঝাং-🤤-আমার বস হামিম এর বাচ্ছা তো তোমার পেটে-🥱💦" },
      { words: ["leave","bot left ne","chole ja","লিফট নে","চলে যা","left ne","tui left ne"], reply: "-আমি কেন চলে যাবো তোমার ভালো না লাগলে তুমি চলে যাও-🙄😒 -আমি যাব না..!😏😏" },
      { words: ["😘","💋"], reply: "-আগে brush করে আই তারপর কিস দিস-😼😾🔪" },
      { words: ["biye","বিয়ে মানে কি","বিয়ে কি","বিয়ে","biye mane ki","biye ki"], reply: "-বিয়ে মানে একটা ছেলের হাসিখুশি জীবন টারে সারা জীবন জেলখানার মতো বন্দি করে অত্যাচার করা-🤧🥺" },
      { words: ["বউ কি","বউ","bow","bou"], reply: "-বিয়ে মানে শ্বশুরের মেয়েকে সারা জীবন হাতির মতো কলা গাছ দিয়ে পালা খাইবো..." },
      { words: ["তোর বানাইছে কে","এটা কার বট","tor banayse ke","ata kar bot"], reply: "️আমার বস হামিম আমাকে শুধুমাত্র আপনাদের কে বিনোদনের জন্য তৈরি করেছেন__😊😌" },
      { words: ["miss you"], reply: "<আমি তোমাকে রাইতে মিস খাই🥹🤖👅/👅-✘ হামিম 🎀 🍒:))" },
      { words: ["😽","😚","😙","😗"], reply: "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬" },
      { words: ["👍🏼","👎"], reply: "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️" },
      { words: ["priya","mahi","মাহি","প্রিয়া"], reply: "বাড়িতে খাই ঝাটার বাড়ি, ফেসবুকে সে অ্যাটিটিউড নারী,😒🤣" },
      { words: ["hi","hello","hlw","helo","হাই","হ্যালো"], reply: "এত হাই-হ্যালো না করে সালাম দিতে কি হয়..!😒🔪" },
      { words: ["আজ কেও নাই বলে","aj kew ney bole","aj kew nay bole"], reply: "চিন্তা করো কেন আমি তো আছি🫶 তোমাকে রাইকে ভালোবাসবো" },
      { words: ["pro","lol"], reply: "Khud k0o KYa LeGend SmJhTi Hai 😂" },
      { words: ["morning","good morning","গুড মর্নিং"], reply: "GOOD MORNING TOO দাত ব্রাশ করে খেয়ে নেও;😚" },
      { words: ["tor bal","bal","বাল"], reply: "~ তোমার বাল উঠে নাই নাকি তোমার?? 🤖" },
      { words: ["সিমা","সীমা","sima"], reply: "বাড়িতে খাই ঝাটার বাড়ি, ফেসবুকে সে অ্যাটিটিউড নারী,😒🤣" },
      { words: ["/owner"], reply: "OWNER: MR. BOSS RJ HAMIM" },
      { words: ["admin ke","tor boss ke"], reply: "❤️ হাই আমি মেছেন্জার ROBOT আামার বস হামিম আমাকে বানিয়েছেন আপনাদের কে হাসানোর জন্য আমি চাই আপনারা সব সময় হাসি খুশি থাকেন" },
      { words: ["admin","boter admin"], reply: "HE IS MR.BOSS RJ HAMIM ❤️" },
      { words: ["bhabi","vabi","ভাবি"], reply: "এ তো হাছিনা হে মেরে দিলকি দারকান 😍" },
      { words: ["chup","চুপ কর","chup kor"], reply: "তুই চুপ তোর ১৪ গুষ্টি চুপ😼" },
      { words: ["😂😂","😁😁","😆😆","🤣🤣","😸😸","😹😹"], reply: "ভাই তুই এত হাসিস না হাসলে তোর চোরের মত লাগে, 😏😂" },
      { words: ["😂😂😂","😁😁😁","😆😆😆","🤣🤣🤣","😸😸😸","😹😹😹"], reply: "ভাই তুই এত হাসিস না হাসলে তোর চোরের মত লাগে, 😏😂" },
      { words: ["hop😤","oi😒"], reply: "সরি বস মাফ করে দেন আর এমন ভুল হবে বাহির🥺🙏" },
      { words: ["maye","mim","tonni","liza"], reply: "বাড়িতে খাই ঝাটার বাড়ি, ফেসবুকে সে অ্যাটিটিউড নারী,😒🤣" },
      { words: ["emran","raj","sohan","ahnaf","Humaun"], reply: "আমার বসের কলিজার বন্ধু 😍" },
      { words: ["thanks","thank you","tnx","দন্যবাদ"], reply: "️এতো ধন্যবাদ না দিয়ে বস হামিম কে gf দে..!🌚" },
      { words: ["😡","😤","😠","🤬","😾"], reply: "️রাগ করে না সোনা পাখি 🥰" },
      { words: ["hm","hmm","হুম"], reply: "️হুম হুম করিস না 🤬" },
      { words: ["name ki","tor nam ki"], reply: "️MY NAME IS SIZUKA 🎀" },
      { words: ["pic de","ss dau"], reply: "️এন থেকে সর দুরে গিয়া মর😒" },
      { words: ["nusrat","নুসরাত","farira","roza","nila","নীলা","নিলা"], reply: "️বাড়িতে খাই ঝাটার বাড়ি, ফেসবুকে সে অ্যাটিটিউড নারী,😒🤣" },
      { words: ["😂","😁","😆","🤣","😸","😹"], reply: "ভাই তুই এত হাসিস না হাসলে তোর চোরের মত লাগে, 😏😂" },
      { words: ["🥰","😍","😻","❤️"], reply: "ভালোবাসা বসকে দাও 😒" },
      { words: ["how are you","kemon acho"], reply: "আমি তখনই ভালো থাকি যখন আপনাকে হাসতে দেখি 🤎" },
      { words: ["mon kharap"], reply: "আমার সাদা মনে কোনো কাদা নাই...!🌝" },
      { words: ["bye","by","বাই","যাই গা","বায়"], reply: "প্রতিবার বাই শুনে মনে হয় এবার সত্যিই গেল… কিন্তু না! 😹" },
      { words: ["tumi khaiso","khaicho","তুমি খাইছো","খাইছো তুমি","khaiso tumi"], reply: "না ঝাং 🥹 তুমি রান্না করে রাখো আমি আর আমার বস যাইয়া খামুনে! 😋🤤" },
      { words: ["tumi ki amake bhalobaso"], reply: "হুম ঝাং আমি তোমাকে ভালোবাসি 🥵" },
      { words: ["ami tor boss hamim"], reply: "হ্যা হামিম স্যার কেমন আছেন 😎" },
      { words: ["bow daw","bow dau","bow de","বউ দে","বউ দাউ"], reply: "যেখানে আমার BOSS হামিম সিংগেল,😼সেখানে তোগু বউ দিয়া তো বিলাসিতা,😤সর সাইডে চাপ, 😼🔪😤" },
      { words: ["mimi","মিম"], reply: "বাড়িতে খাই ঝাটার বাড়ি, ফেসবুকে সে অ্যাটিটিউড নারী,😒🤣" },
      { words: ["good night","গুড নাইট"], reply: "-ওকে সোনা গুড নাইট মুতে এসে গুতে যাও!🥱😴" },
      { words: ["🙂","🙃","😔"], reply: "কি গো কলিজা মন খারাপ? 🥺" },
      { words: ["🙂🙂","🙃🙃","😔😔"], reply: "কি গো কলিজা মন খারাপ? 🥺" },
      { words: ["🙂🙂🙂","🙃🙃🙃","😔😔😔"], reply: "কি গো কলিজা মন খারাপ? 🥺" },
      { words: ["😒","🙄"], reply: "এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘" },
      { words: ["😒😒","🙄🙄"], reply: "এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘" },
      { words: ["😒😒😒","🙄🙄🙄"], reply: "এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘" },
      { words: ["gf daw bot","bf daw bot"], reply: "খালি কি তোরাই পেম করবি আমার বস হামিম কেউ একটা gf দে<🔪😒" },
      { words: ["basar sobai kmon ache","বাসার সবাই কেমন আছে"], reply: "সবাই ভালো আছে আলহামদুলিল্লাহ 💝" }
    ];

    // ✅ CONTAINS MATCH (only salam)
    const containsReplies = [
      {
        words: ["assalamualaikum","assalamu alaikum","আসসালামু আলাইকুম"],
        reply: async (userID) => {
          const userName = await api.getUserInfo(userID)
            .then(info => info[userID].name)
            .catch(() => "User");
          
          // Stylish salam captions
          const salamReplies = [
            `┏━━━━━❀ 🌿 ❀━━━━━┓\n🕌 ওয়ালাইকুম আসসালাম 🕌\n┗━━━━━❀ 🌿 ❀━━━━━┛\n𓆩» ${userName} «𓆪\n🌸 আল্লাহর রহমত বর্ষিত হোক আপনার উপর 🌸\n🤍 ইমান ও তাকওয়া বৃদ্ধি পাক 🤍`,
            `╔═══❖•ೋ°🌙°ೋ•❖═══╗\n🕌 𝙒𝙖𝙡𝙖𝙞𝙠𝙪𝙢 𝘼𝙨𝙨𝙖𝙡𝙖𝙢 🕌\n╚═══❖•ೋ°🌙°ೋ•❖═══╝\n𓆩» ${userName} «𓆪\n💫 আজকের দিনটি আনন্দময় হোক 🌟\n🕊️ শান্তি ও সুখ আপনার সাথে থাকুক 🩵`,
            `┏━━━━━❀ 🌸 ❀━━━━━┓\n🕌 ওয়ালাইকুম আসসালাম 🕌\n┗━━━━━❀ 🌸 ❀━━━━━┛\n𓆩» ${userName} «𓆪\n🌹 সুস্থ থাকুন এবং হাসিখুশি থাকুন 😇\n✨ আল্লাহর রহমত সর্বদা আপনার উপর বর্ষিত হোক ✨`,
            `╔═══❖•ೋ°🌙°ೋ•❖═══╗\n🕌 𝙒𝙖𝙡𝙖𝙞𝙠𝙪𝙢 𝘼𝙨𝙨𝙖𝙡𝙖𝙢 🕌\n╚═══❖•ೋ°🌙°ೋ•❖═══╝\n𓆩» ${userName} «𓆪\n🌸 আজকের দিনটি সুন্দর হোক 🌞\n💖 সুখ ও শান্তি আপনার জীবনে বর্ষিত হোক 💐`,
            `┏━━━━━❀ 🌿 ❀━━━━━┓\n🕌 ওয়ালাইকুম আসসালাম 🕌\n┗━━━━━❀ 🌿 ❀━━━━━┛\n𓆩» ${userName} «𓆪\n🌼 আল্লাহ আপনার দিন আনন্দময় করুন 🌸\n🤍 ইমান ও তাকওয়া বৃদ্ধি পাক 🤍`,
            `╔═══❖•ೋ°🌙°ೋ•❖═══╗\n🕌 𝙒𝙖𝙡𝙖𝙞𝙠𝙪𝙢 𝘼𝙨𝙨𝙖𝙡𝙖𝙢 🕌\n╚═══❖•ೋ°🌙°ೋ•❖═══╝\n𓆩» ${userName} «𓆪\n✨ আল্লাহর নূর আপনার জীবন আলোকিত করুক ✨\n🤲 দোয়া রইলো সবসময় 🤲`
          ];
          const randomIndex = Math.floor(Math.random() * salamReplies.length);
          return salamReplies[randomIndex];
        }
      }
    ];

    // 🔥 Exact Match
    for (const item of exactReplies) {
      if (item.words.some(word => cleanText === word.toLowerCase())) {
        return api.sendMessage(item.reply, event.threadID, event.messageID);
      }
    }

    // 🔥 Contains Match
    for (const item of containsReplies) {
      if (item.words.some(word => cleanText.includes(word))) {
        const replyText = typeof item.reply === "function" ? await item.reply(event.senderID) : item.reply;
        return api.sendMessage(replyText, event.threadID, event.messageID);
      }
    }
  }
};
