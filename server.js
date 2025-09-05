const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

let videos = []; 
const data = {
    10: {
        maths: [
            "https://rolexcoderz.live/10me.php"
        ],
        science: [
            "https://rolexcoderz.live/science.php"
        ],
        SSt: [
            "https://rolexcoderz.live/SST.php"
        ],
        EnglishB: [
            "https://www.rolexcoderz.xyz/Eng",
            "https://rolexcoderz.live/English/"
        ],
        EnglishA: [
            "https://rolexcoderz.live/Communicative.php"
        ],
        readingandwriting: [
            "https://www.rolexcoderz.live/Writingskill/",
            "https://www.rolexcoderz.live/10thRc/"
        ],
        AI: [
            "https://rolexcoderz.live/IT.php"
        ],
        Sanskrit: [
            "https://rolexcoderz.live/Sanskrit/"
        ],
        Hindi: [
            "https://www.rolexcoderz.xyz/Hindi",
            "https://rolexcoderz.live/Hindi.php",
            "https://rolexcoderz.live/kritika.php"
        ],
        EnglishGrammer: [
            "https://rolexcoderz.live/Grammar.php"
        ]
    },
    11: {
        maths: [
            "https://rolexcoderz.live/11Maths/"
        ],
        physics: [           "https://rolexcoderz.live/phy11th.php"
        ],
        chemistry: [           "https://rolexcoderz.live/Chemistry/"
        ],
        Biology: [   "https://rolexcoderz.live/Biology/"
        ],
        Applied_mathematics: [
            "https://www.rolexcoderz.xyz/AP",
            "https://rolexcoderz.live/AP.php"
        ],
        hindi: [
            "https://www.rolexcoderz.xyz/Antra",
            "https://rolexcoderz.live/hi11.php",
            "https://www.rolexcoderz.xyz/Aroh",
            "https://rolexcoderz.live/Aroh.php"
        ],
        readingandwriting: [
            "https://www.rolexcoderz.live/11thWritingskill/",
            "https://www.rolexcoderz.live/11thRc/"
        ],
        English_grammer: [
            "https://rolexcoderz.live/11thGrammar/"
        ],
        English: [
            "https://www.rolexcoderz.xyz/Hornbill",
            "https://rolexcoderz.live/Hornbill.php",
            "https://rolexcoderz.live/Snapshot/"
        ]
    },
    eco: {
        Buisness_studies: [
            "https://rolexcoderz.live/BS/"
        ],
        Accounts: [
            "https://rolexcoderz.live/acc.php"
        ],
        Economics: [
            "https://rolexcoderz.live/eco.php"
        ],
    },
   9: {
        maths: [
            "https://rolexcoderz.live/9thMaths/"
        ],
        science: [
            "https://rolexcoderz.live/9thScience/"
        ],
        SSt: [
            "https://rolexcoderz.live/9thSST/"
        ],
        EnglishB: [
            "https://rolexcoderz.live/9thEng//"
        ],
        
        readingandwriting: [
            "https://www.rolexcoderz.live/9thRc/"
        ],
        AI: [
            "https://rolexcoderz.live/9thIT/"
        ],
        Sanskrit: [
            "https://rolexcoderz.live/9thSanskrit/"
        ],
        Hindi: [
           "https://rolexcoderz.live/9thHindi/"
        ],
        EnglishGrammer: [
            "https://rolexcoderz.live/9thGrammar/"
        ]
    },
    hum: {
        Political_science: [
            "https://rolexcoderz.live/PS.php"
        ],
        History: [
            "https://rolexcoderz.live/history/"
        ],
        Geography: [
            "https://rolexcoderz.live/Geo.php"
        ],
       
    },
};

let id = 0;
const generateRandomTime = () => {
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hour}:${minute}`;
};

const generateRandomDate = () => {
    const start = new Date(2025, 2, 1); 
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    const randomDays = Math.floor(Math.random() * (diff / (1000 * 3600 * 24)));
    const randomDate = new Date(start.getTime() + randomDays * (1000 * 3600 * 24));

    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); 
    const year = randomDate.getFullYear();

    return `${year}-${month}-${day}`;
};

async function scrapeVideosFromUrl(url, subject, classnum) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('#videos .video-card').each((index, element) => {
            const title = $(element).find('.card-content h3').text().trim();
            const onclickAttr = $(element).find('.button-item').attr('onclick');
            let link = '';
            if (onclickAttr) {
                const match = onclickAttr.match(/window\.location\.href=['"]([^'"]+)['"]/);
                if (match && match[1]) {
                    link = match[1];
                    if (link.startsWith('https://www.rolexcoderz.xyz/Player?url=')) {
                        link = link.replace('https://www.rolexcoderz.xyz/Player?url=', '');
                    }
                    if (link.includes('https://www.rolexcoderz.xyz/Play?url=')) {
                        link = link.replace('https://www.rolexcoderz.xyz/Play?url=', '');
                    }
                    if (link.includes('https://www.rolexcoderz.xyz/Player?token=')) {
                        link = link.replace("https://www.rolexcoderz.xyz/Player?token=", '');
                    }
                    if (link.includes('https://www.rolexcoderz.live/Player?token=')) {
                        link = link.replace('https://www.rolexcoderz.live/Player?token=', '');
                    }
                    if (link.includes('https://rolexcoderz.live/Player?token=')) {
                        link = link.replace('https://rolexcoderz.live/Player?token=', '');
                    }
                    if (link.includes("Player?url=")) {
                        link = link.replace("Player?url=", '');
                    }
                    if (link.includes("../Player?token=")) {
                        link = link.replace("../Player?token=", '');
                    }
                    if (link.includes("240p30.m3u8")) {
                        link = link.replace("240p30.m3u8", '720p30.m3u8');
                    }
                    if (link.includes("Play?url=")) {
                        link = link.replace("play?url", '');
                    }
                    try {
                        link = decodeURIComponent(link);
                    } catch (e) {
                     
                    }
                }
            }

            if (title && link) {
                videos.push({
                    title: title.replace('🔥', ''),
                    link: link,
                    class: classnum,
                    subject: subject,
                    type: "video",
                    time: generateRandomTime(),
                    date: generateRandomDate(),
                    id: id++,
                });
            }
        });
        console.log(`Scraped ${videos.filter(v => v.type === "video" && v.class === classnum && v.subject === subject).length} videos from ${url}`);
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
    }
}

async function scrapeNotesFromUrl(url, subject, classnum) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('#notes .notes-card').each((index, element) => {
            const title = $(element).find('.card-content h3').text().trim();
            let link = $(element).find('.card-actions a').attr('href');
            if (title && link) {
                videos.push({
                    title: title.replace('🔥 ', ''),
                    link: link,
                    class: classnum,
                    subject: subject,
                    type: "notes",
                    time: generateRandomTime(),
                    date: generateRandomDate(),
                    id: id++,
                });
            }
        });
        console.log(`Scraped ${videos.filter(v => v.type === "notes" && v.class === classnum && v.subject === subject).length} notes from ${url}`);
    } catch (error) {
        console.error(`Error scraping notes from ${url}:`, error.message);
    }
}
async function scrapeDPPFromUrl(url, subject, classnum) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        if ($('.dpp-card').length > 0) {
        $('#dpp .dpp-card').each((index, element) => {
            const title = $(element).find('.card-content h3').text().trim();
            let link = $(element).find('.card-actions a').attr('href');
            if (title && link) {
                videos.push({
                    title: title.replace('🔥 ', ''),
                    link: link,
                    class: classnum,
                    subject: subject,
                    type: "DPP",
                    time: generateRandomTime(),
                    date: generateRandomDate(),
                    id: id++,
                });
            }
        });}
        console.log(`Scraped ${videos.filter(v => v.type === "DPP" && v.class === classnum && v.subject === subject).length} DPP from ${url}`);
    } catch (error) {
        console.error(`Error scraping notes from ${url}:`, error.message);
    }
}
async function scrapeAllVideos() {
   
    videos = [];
    id = 0; 

    for (const classNum of Object.keys(data)) {
        for (const subject of Object.keys(data[classNum])) {
            for (const url of data[classNum][subject]) {
                await scrapeVideosFromUrl(url, subject, classNum);
                await scrapeNotesFromUrl(url, subject, classNum);
                await scrapeDPPFromUrl(url, subject, classNum);
            }
        }
    }
    try {
        await fs.writeFile('videos.json', JSON.stringify(videos, null, 2));
        console.log('All video data has been successfully saved to videos.json');
    } catch (error) {
        console.error('Error writing videos.json file:', error.message);
    }
}

async function scrapeAll() {
    await scrapeAllVideos();
}

module.exports = { scrapeAllVideos, scrapeAll };
