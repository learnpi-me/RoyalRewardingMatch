// Import necessary libraries
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

// The main array to store all scraped video and note data.
// It is declared with 'let' so it can be reassigned (cleared).
let videos = []; 

// The 'data' object containing all the URLs to be scraped.
const data = {
    10: {
        maths: [
            "https://www.rolexcoderz.xyz/Maths",
            "https://rolexcoderz.live/10me.php"
        ],
        science: [
            "https://www.rolexcoderz.xyz/Science",
            "https://rolexcoderz.live/science.php"
        ],
        SSt: [
            "https://www.rolexcoderz.xyz/SST",
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
            "https://rolexcoderz.live/AI/"
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
            "https://www.rolexcoderz.xyz/11thMaths",
            "https://rolexcoderz.live/11Maths/"
        ],
        physics: [
            "https://www.rolexcoderz.xyz/11thphy",
            "https://rolexcoderz.live/phy11th.php"
        ],
        chemistry: [
            "https://www.rolexcoderz.xyz/11thChe",
            "https://rolexcoderz.live/Chemistry/"
        ],
        Biology: [
            "https://www.rolexcoderz.xyz/11thbio",
            "https://rolexcoderz.live/Biology/"
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
            "https://www.rolexcoderz.xyz/11thbi",
            "https://rolexcoderz.live/BS/"
        ],
        Accounts: [
            "https://www.rolexcoderz.xyz/11thacc",
            "https://rolexcoderz.live/acc.php"
        ],
        Economics: [
            "https://rolexcoderz.live/eco.php",
            "https://www.rolexcoderz.xyz/11theco"
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
            "https://rolexcoderz.live/9thEng/",
            "https://rolexcoderz.live/9thGrammar/"
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
            "https://rolexcoderz.live/9thHindi/",
            "https://rolexcoderz.live/9thKritika/"
        ],
        EnglishGrammer: [
            "https://rolexcoderz.live/9thGrammar/"
        ]
    },
    hum: {
        Political_science: [
            "https://www.rolexcoderz.xyz/PS",
            "https://rolexcoderz.live/PS.php"
        ],
        History: [
            "https://www.rolexcoderz.xyz/History",
            "https://rolexcoderz.live/history/"
        ],
        Geography: [
            "https://rolexcoderz.live/Geo.php",
            "https://www.rolexcoderz.xyz/Geography"
        ],
       
    },
};

// Global ID counter to ensure each item has a unique ID
let id = 0;

// Utility functions for random date and time to be used in the data
const generateRandomTime = () => {
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hour}:${minute}`;
};

const generateRandomDate = () => {
    const start = new Date(2025, 2, 1); // March 1, 2025
    const end = new Date(); // Today's date
    const diff = end.getTime() - start.getTime();
    const randomDays = Math.floor(Math.random() * (diff / (1000 * 3600 * 24)));
    const randomDate = new Date(start.getTime() + randomDays * (1000 * 3600 * 24));

    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = randomDate.getFullYear();

    return `${year}-${month}-${day}`; // ISO format
};

/**
 * Scrapes video data from a given URL and pushes it to the global `videos` array.
 * @param {string} url - The URL to scrape.
 * @param {string} subject - The subject of the videos.
 * @param {string} classnum - The class number for the videos.
 */
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
                    // Decode URL if it's encoded
                    try {
                        link = decodeURIComponent(link);
                    } catch (e) {
                        // Keep original link if decoding fails
                    }
                }
            }

            if (title && link) {
                videos.push({
                    title: title.replace('🔥 ', ''),
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

/**
 * Scrapes notes data from a given URL and pushes it to the global `videos` array.
 * @param {string} url - The URL to scrape.
 * @param {string} subject - The subject of the notes.
 * @param {string} classnum - The class number for the notes.
 */
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

/**
 * The main function to scrape all videos and notes from all URLs.
 * It clears the previous data before scraping to prevent duplicates.
 */
async function scrapeAllVideos() {
    // --- FIX APPLIED HERE ---
    // Reset the videos array and ID counter at the start of each run.
    // This is the key to preventing duplicate data.
    videos = [];
    id = 0; 

    console.log('Starting to scrape all videos and notes...');

    // Loop through all classes, subjects, and URLs
    for (const classNum of Object.keys(data)) {
        for (const subject of Object.keys(data[classNum])) {
            for (const url of data[classNum][subject]) {
                await scrapeVideosFromUrl(url, subject, classNum);
                await scrapeNotesFromUrl(url, subject, classNum);
            }
        }
    }

    try {
        // Write the new, non-duplicated data to a JSON file
        await fs.writeFile('videos.json', JSON.stringify(videos, null, 2));
        console.log('All video data has been successfully saved to videos.json');
    } catch (error) {
        console.error('Error writing videos.json file:', error.message);
    }
}

// Export the scrapeAllVideos function so it can be called from another file.
module.exports = { scrapeAllVideos };
