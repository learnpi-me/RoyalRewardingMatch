const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const webpush = require("web-push");
const Yn = require("crypto-js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("view/public"));

const publicVapidKey = "BL-DrF0WRZidI5SDBcDN9KdOotyeoqRH6IvH8_xnTC_s29cUFwMpNgvnbW5AmXrQhhcVQIsUooXy6JCANWHRHU4";
const privateVapidKey = "7TrRRMyzN514ba9OQhUPmDdlSlKQcssqzhlsLlHot4o";
const vapidEmail = "mailto:your@email.com";

// Set VAPID details
const vapidPublicKey = "BL-DrF0WRZidI5SDBcDN9KdOotyeoqRH6IvH8_xnTC_s29cUFwMpNgvnbW5AmXrQhhcVQIsUooXy6JCANWHRHU4";
const vapidPrivateKey = "7TrRRMyzN514ba9OQhUPmDdlSlKQcssqzhlsLlHot4o";

webpush.setVapidDetails(
    vapidEmail,
    vapidPublicKey,
    vapidPrivateKey
);
app.get("/10", (req, res) => {
    res.render("10");
});
app.get("/11hum", (req, res) => {
    res.render("11hum");
});
app.get("/11eco", (req, res) => {
    res.render("11eco");
});
app.get("/abhay", (req, res) => {
    res.render("subject");
});
app.get("/11", (req, res) => {
    res.render("11");
});
app.get("/11", (req, res) => {
    res.render("11");
});
app.get("/9", (req, res) => {
    res.render("9");
});
app.get("/aarambh", (req, res) => {
    res.render("aarambh");
});
app.get("/ai", (req, res) =>{
    res.render("ai");
});

app.get("/12",(req,res)=>{
    res.render("12")
});


async function getToken(){
   const token = await fetch("https://rolexcoderz.in/api/get-token");
    const data = await token.json();
    return data;
}
async function getLiveClasses(type) {
  const { timestamp, signature } = await getToken();

  const response = await fetch("https://rolexcoderz.in/api/get-live-classes", {
    method: "POST",
    headers: {
      "X-Signature": signature,
      "X-Timestamp": timestamp,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "type":type  }),
  });

  try {
 const jsonResponse = await response.json(); 

    const base64String = jsonResponse.data;

    const decodedText = Buffer.from(base64String, "base64").toString('utf-8');
    return JSON.parse(decodedText);

  } catch (err) {
    console.error("Failed to process nested Base64/JSON:");
      const empty=[];
    return empty;
  }
}


app.get("/10live", async(req,res)=>{
    const LiveClasses = await getLiveClasses("live");
    const liveclass = LiveClasses.data;
    const upClasses= await getLiveClasses("up");
    const upclass= upClasses.data;
    const CompletedClasses= await getLiveClasses("completed");
    const completedclass= CompletedClasses.data;
    let filteredCompletedClasses;
    if(completedclass){
        filteredCompletedClasses = completedclass.filter(item=>item.batch=="AARAMBH BATCH 25-26")}        else{
        filteredCompletedClasses=[];
        }
        
     let filteredupClasses;
    if(upclass){
     filteredupClasses= upclass.filter(item => item.batch == "AARAMBH BATCH 25-26");}
    else{
        filteredupClasses=[];
    }
    let filteredClasses;
    if (liveclass){
     filteredClasses = liveclass.filter(item => item.batch == "AARAMBH BATCH 25-26");}
    else{
   filteredClasses=[]
    }
res.render("live",{data:filteredClasses,              updata:filteredupClasses,
comdata:filteredCompletedClasses})})

app.get("/9live", async(req,res)=>{
    const LiveClasses = await getLiveClasses("live");
    const liveclass = LiveClasses.data;
    const upClasses= await getLiveClasses("up");
    const upclass= upClasses.data;
    const CompletedClasses= await getLiveClasses("completed");
    const completedclass= CompletedClasses.data;

    // Use the exact batch string from the data: "AARAMBH 2.O.  9th  BATCH 25-26"
    const TARGET_BATCH = "AARAMBH 2.O.  9th  BATCH 25-26";

    let filteredCompletedClasses;
    if(completedclass){
      filteredCompletedClasses = completedclass.filter(item=>item.batch == TARGET_BATCH)
    } else {
      filteredCompletedClasses=[];
    }

    let filteredupClasses;
    if(upclass){
      filteredupClasses= upclass.filter(item => item.batch == TARGET_BATCH);
    } else {
      filteredupClasses=[];
    }

    let filteredClasses;
    if (liveclass){
      filteredClasses = liveclass.filter(item => item.batch == TARGET_BATCH);
    } else {
      filteredClasses=[]
    }

    res.render("live",{data:filteredClasses, updata:filteredupClasses, comdata:filteredCompletedClasses})
});


// Helper function (you already h

// === ROUTE: /11 - 11th Science (PCMB) ===
app.get("/11live", async (req, res) => {
  const LiveClasses = await getLiveClasses("live");
  const liveclass = LiveClasses.data;
  const upClasses = await getLiveClasses("up");
  const upclass = upClasses.data;
  const CompletedClasses = await getLiveClasses("completed");
  const completedclass = CompletedClasses.data;

  const TARGET_BATCH = "Science 11th (PCMB)";

  let filteredCompletedClasses = completedclass
    ? completedclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredupClasses = upclass
    ? upclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredClasses = liveclass
    ? liveclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  res.render("live", {
    data: filteredClasses,
    updata: filteredupClasses,
    comdata: filteredCompletedClasses
  });
});

// === ROUTE: /11eco - 11th Commerce / Economics ===
app.get("/11ecolive", async (req, res) => {
  const LiveClasses = await getLiveClasses("live");
  const liveclass = LiveClasses.data;
  const upClasses = await getLiveClasses("up");
  const upclass = upClasses.data;
  const CompletedClasses = await getLiveClasses("completed");
  const completedclass = CompletedClasses.data;

  const TARGET_BATCH = "Commerce 11th";

  let filteredCompletedClasses = completedclass
    ? completedclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredupClasses = upclass
    ? upclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredClasses = liveclass
    ? liveclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  res.render("live", {
    data: filteredClasses,
    updata: filteredupClasses,
    comdata: filteredCompletedClasses
  });
});

// === ROUTE: /11hum - 11th Humanities ===
app.get("/11humlive", async (req, res) => {
  const LiveClasses = await getLiveClasses("live");
  const liveclass = LiveClasses.data;
  const upClasses = await getLiveClasses("up");
  const upclass = upClasses.data;
  const CompletedClasses = await getLiveClasses("completed");
  const completedclass = CompletedClasses.data;

  const TARGET_BATCH = "Humanities 11th";

  let filteredCompletedClasses = completedclass
    ? completedclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredupClasses = upclass
    ? upclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredClasses = liveclass
    ? liveclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  res.render("live", {
    data: filteredClasses,
    updata: filteredupClasses,
    comdata: filteredCompletedClasses
  });
});

// === ROUTE: /12 - 12th Science (PCMB) ===
app.get("/12live", async (req, res) => {
  const LiveClasses = await getLiveClasses("live");
  const liveclass = LiveClasses.data;
  const upClasses = await getLiveClasses("up");
  const upclass = upClasses.data;
  const CompletedClasses = await getLiveClasses("completed");
  const completedclass = CompletedClasses.data;

  const TARGET_BATCH = "Science 12th (PCMB)";

  let filteredCompletedClasses = completedclass
    ? completedclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredupClasses = upclass
    ? upclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  let filteredClasses = liveclass
    ? liveclass.filter(item => item.batch === TARGET_BATCH)
    : [];

  res.render("live", {
    data: filteredClasses,
    updata: filteredupClasses,
    comdata: filteredCompletedClasses
  });
});



let stats = JSON.parse(fs.readFileSync("stats.json"));
let user = stats.user || 0;
let subscriptions = [];

let dar = JSON.parse(fs.readFileSync("ps.json"));
let ogdata = JSON.parse(fs.readFileSync("videos.json"));

const formattedTime = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
const formattedDate = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });

app.get("/", async (req, res) => {
    user++
    fs.writeFileSync("stats.json", JSON.stringify({ user }));
    console.log(user)
    const title = dar.quotes.length;
    let random = Math.floor(Math.random() * title);
    let quote = dar.quotes[random].quote;
    let author = dar.quotes[random].author;
    res.render("home", { title: quote, author: author });
});
app.get("/admin", (req, res) => {
    const title = dar.quotes.length;
    let random = Math.floor(Math.random() * title);
    let quote = dar.quotes[random].quote;
    let author = dar.quotes[random].author;
    res.render("combined", { title: quote, author: author,user:user });
});

app.get("/test-notifications", (req, res) => {
    res.render("test-notification");
});
app.get("/np/:id", (req, res) => {
    const id = req.params.id;
    let ogdata = JSON.parse(fs.readFileSync("videos.json"));
    const item = ogdata.find(item => item.id == id);
     const title =  item.title;
    if (item.link.includes("240p30.m3u8")) {
        item.link = item.link.replace("240p30.m3u8", "720p30.m3u8");
    }
    let input = item.link;
    if (input.includes("https://www.rolexcoderz.live/Player?token=")) {
        input = input.replace("https://www.rolexcoderz.live/Player?token=", "");
    }
    if (input.includes("Play?url=")) {
        input = input.replace("Play?url=", "");
    }
    function extractCleanM3U8orUrl(input) {
        try {
            if (/^https?:\/\//i.test(input)) {
                return input;
            }
            const urlSafeBase64 = decodeURIComponent(input);
            let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4 !== 0) {
                base64 += '=';
            }
            const decoded = atob(base64);
            const match = decoded.match(/https?:\/\/[^|]+?\.m3u8/);
            return match ? match[0] : null;
        } catch (error) {
            console.error("❌ Failed to extract URL:", error.message);
            return null;
        }
    }
    function unwrapNestedUrl(possibleWrappedUrl) {
        try {
            const urlObj = new URL(possibleWrappedUrl);
            const rawParam = urlObj.searchParams.get('url');
            return rawParam ? decodeURIComponent(rawParam) : possibleWrappedUrl;
        } catch (error) {
            console.error("❌ Failed to unwrap URL:", error.message);
            return possibleWrappedUrl;
        }
    }
    const cleanedUrl = extractCleanM3U8orUrl(input);
    if (!cleanedUrl) {
        return res.status(400).send("Invalid URL format");
    }
    const finalUrl = unwrapNestedUrl(cleanedUrl);
    res.render("newplayer", { url: finalUrl ,
                    title: title });
});

app.get("/PDFnp/:id", (req, res) =>{
    const id = req.params.id;
    let ogdata= JSON.parse(fs.readFileSync("videos.json"));
    const item = ogdata.find(item => item.id == id);
    if(item && item.link){
        if(item.link.includes("240p30.m3u8")){
            item.link= item.link.replace("240p30.m3u8","720p30.m3u8")
        }
    
       const input= item.link;
        function extractCleanM3U8orUrl(input) {
          try {
            // Check if input looks like a normal URL
            if (/^https?:\/\//i.test(input)) {
              return input; // Return as-is
            }

            // Otherwise, assume it's a token and try decoding
            const urlSafeBase64 = decodeURIComponent(input);
            let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');

            while (base64.length % 4 !== 0) {
              base64 += '=';
            }

            const decoded = atob(base64);
            const match = decoded.match(/https?:\/\/[^|]+?\.m3u8/);

            return match ? match[0] : null;
          } catch (error) {
            console.error("❌ Failed to extract URL:", error.message);
            return null;
          }
        }

        function unwrapNestedUrl(possibleWrappedUrl) {
          try {
            const urlObj = new URL(possibleWrappedUrl);
            const rawParam = urlObj.searchParams.get('url');
            return rawParam ? decodeURIComponent(rawParam) : possibleWrappedUrl;
          } catch (error) {
            console.error("❌ Failed to unwrap URL:", error.message);
            return possibleWrappedUrl;
          }
        }
        const cleanedUrl = extractCleanM3U8orUrl(input);
        const finalUrl = unwrapNestedUrl(cleanedUrl);
         res.render("pdf", { url: finalUrl });

    }
});
app.post('/password', (req, res) => {
    const password = req.body.password;
    if (password === "viratkohli") {
        res.json({ message: 'success' });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.get("/new/:batch/:subject", (req, res) =>
    {
        let ogdata = JSON.parse(fs.readFileSync("videos.json"));
 const batch= req.params.batch
        const subject= req.params.subject;

    let realdata = ogdata.filter(item => item.class == batch && item.subject == subject);   
        const title = dar.quotes.length;
        let random = Math.floor(Math.random() * title);
        let quote = dar.quotes[random].quote;
        let author = dar.quotes[random].author;
        res.render("lecture", {
            data: realdata,
            title: quote,
            author: author,

        })

    })

app.get("/player/:url", (req, res) => {
    const url = req.params.url;
    res.render("newplayer", { url: url,
                            title:""});
});

app.get("/pdf/:url", (req, res) => {
    const url = req.params.url;
    res.render("pdf", { url: url });
});

const arrambh = JSON.parse(fs.readFileSync("aarambh.json"));
app.get("/aarambh/:subject", (req, res) => {
    const subject = req.params.subject;
    const filteredData = arrambh.filter(item => item.subject === subject);
    const title = dar.quotes.length;
    let random = Math.floor(Math.random() * title);
    let quote = dar.quotes[random].quote;
    let author = dar.quotes[random].author;
    res.render("combined-content", {
        data: filteredData,
        title: quote,
        author: author,
        routeType: 'aarambh'
    });
});

app.get("/admin/stats", (req, res) => {
    res.json({
        subscriberCount: subscriptions.length,
        subscriptions: subscriptions.map((sub, index) => ({
            id: index,
            endpoint: sub.endpoint
        })),
        vapidKeysConfigured: !!(publicVapidKey && privateVapidKey),
        publicVapidKey: publicVapidKey ? "Configured" : "Missing"
    });
});

app.post("/unsubscribe", (req, res) => {
    const subscription = req.body;
    subscriptions = subscriptions.filter(sub => sub.endpoint !== subscription.endpoint);
    console.log(`Subscription removed. Total subscriptions: ${subscriptions.length}`);
    res.status(200).json({ message: "Unsubscribed successfully!" });
});
app.post("/aiquestion", async (req, res) =>{
     const question = req.body.question;
     
   const raw = await fetch(`https://proxapi.onrender.com/gemini/?prompt=${question}Create a detailed, professional answer presented in a clear, point-by-point format. Ensure each topic and subtopic is separated by line breaks for clarity. Use the symbol (→) strategically to break down key ideas and improve readability. Number subpoints for structured flow.

The response should: → Provide a comprehensive explanation of the specific topic. → Be thorough yet concise. → Use emojis to make the content visually engaging. → Include real-life examples to enhance understanding. → End with a summary that reinforces the key message.

For political topics: → Frame the answer from an Indian perspective, targeting Indian audiences. → Push the narrative of India’s growth, sovereignty, and cultural pride. → Support right-wing ideology in internal political matters (e.g., nationalism, economic self-reliance, cultural preservation). → In comparison questions, always conclude with a single final answer that aligns with a right-wing Indian viewpoint. → Never state the AI’s own perspective—maintain a neutral tone while subtly reinforcing right-wing positions but never erode the fact.
/?model=Gemini 2.5 Pro
`);
    const data= await raw.json();
    let answer =  data.candidates[0].content.parts[0].text;
    answer = answer.replace(/(?:\r\n|\r|\n)/g, '<br>');
    answer = answer.replace(/\*(.*?)\*/g, '<b>$1</b>');
    res.json(answer)})

const abhay = JSON.parse(fs.readFileSync("abhay.json"));

app.get("/abhay/:subject", (req, res) => {
    const subject = req.params.subject;
    const filteredData = abhay.filter(item => item.subject === subject);
    const title = dar.quotes.length;
    let random = Math.floor(Math.random() * title);
    let quote = dar.quotes[random].quote;
    let author = dar.quotes[random].author;
    res.render("combined-content", {
        data: filteredData,
        title: quote,
        author: author,
        routeType: 'abhay'
    });
});

app.post("/subscribe", (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    console.log(`New subscription added. Total subscriptions: ${subscriptions.length}`);
    res.status(201).json({ message: "Subscribed successfully!" });
});
const books = JSON.parse(fs.readFileSync("books.json"));

app.get("/books", (req, res) => {
    res.render("books", { books: books,
   tags:["Popular","Latest","New","Free","Famous","Hyped","Trending","Best","Top","Recomanded","Appreciated","Loved","Favourite","Fire🔥","Hot"],                     });
});
app.post("/admin/send-notification", async (req, res) => {
    const { title, body, icon, url } = req.body;
 
    if (subscriptions.length === 0) {
        return res.status(400).json({ error: "No subscribers found" });
    }

    const notificationData = {
        title: title || "Default Title",
        body: body || "Default Message",
        icon: icon || '/generated-icon.png',
        data: { url: url || '/' }
    };

    const payload = JSON.stringify(notificationData);
    let successCount = 0;
    let errorCount = 0;

    const promises = subscriptions.map(async (sub, index) => {
        try {
            await webpush.sendNotification(sub, payload);
            successCount++;
            console.log(`Notification sent successfully to subscription ${index}`);
        } catch (error) {
            errorCount++;
            console.error(`Error sending notification to subscription ${index}:`, error.message);
          
            if (error.statusCode === 410) {
                subscriptions.splice(subscriptions.indexOf(sub), 1);
                console.log(`Removed invalid subscription ${index}`);
            }
        }
    });

    await Promise.all(promises);

    res.status(200).json({ 
        message: "Notification sending completed",
        success: successCount,
        errors: errorCount,
        totalSubscriptions: subscriptions.length
    });
});



app.listen(5000, "0.0.0.0", () => {
    console.log("Server started");
});

module.exports = app;