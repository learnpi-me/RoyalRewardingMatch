const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

let videos = [];
let id = 0;

// Data for scraping from rolexcoderz.live
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
     /*   EnglishB: [
            "https://www.rolexcoderz.xyz/Eng",
            "https://rolexcoderz.live/English/"
        ],
        EnglishA: [
            "https://rolexcoderz.live/Communicative.php"
        ],
        readingandwriting: [
            "https://www.rolexcoderz.live/Writingskill/",
            "https://rolexcoderz.live/10thRc/"
        ],*/
        AI: [
            "https://rolexcoderz.live/IT.php"
        ],
        Sanskrit: [
            "https://rolexcoderz.live/Sanskrit/"
        ],
      /*  Hindi: [
            "https://www.rolexcoderz.xyz/Hindi",
            "https://rolexcoderz.live/Hindi.php",
            "https://rolexcoderz.live/kritika.php"
        ],
        EnglishGrammer: [
            "https://rolexcoderz.live/Grammar.php"
        ]*/
    },
    11: {
        maths: [
            "https://rolexcoderz.live/11Maths/"
        ],
        physics: [
            "https://rolexcoderz.live/phy11th.php"
        ],
        chemistry: [
            "https://rolexcoderz.live/Chemistry/"
        ],
        Biology: [
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
            "https://rolexcoderz.live/11thRc/"
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
      /*  EnglishB: [
            "https://rolexcoderz.live/9thEng/"
        ],
        readingandwriting: [
            "https://www.rolexcoderz.live/9thRc/"
        ],*/
        AI: [
            "https://rolexcoderz.live/9thIT/"
        ],
        Sanskrit: [
            "https://rolexcoderz.live/9thSanskrit/"
        ],
        /*Hindi: [
            "https://rolexcoderz.live/9thHindi/"
        ],
        EnglishGrammer: [
            "https://rolexcoderz.live/9thGrammar/"
        ]*/
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

/*const studyData = {
    "data": [
        {
            "class": "11",
            "subject": "physics",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Phy&type=lectures"
        },
        {
            "class": "11",
            "subject": "maths",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Maths&type=dpp"
        },
        {
            "class": "11",
            "subject": "maths",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Maths&type=notes"
        },
        {
            "class": "11",
            "subject": "maths",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Maths&type=lectures"
        },
        {
            "class": "11",
            "subject": "physics",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Phy&type=notes"
        },
        {
            "class": "11",
            "subject": "physics",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Phy&type=dpp"
        },
        {
            "class": "11",
            "subject": "chemistry",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Chem&type=lectures"
        },
        {
            "class": "11",
            "subject": "chemistry",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Chem&type=notes"
        },
        {
            "class": "11",
            "subject": "Biology",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Bio&type=lectures"
        },
        {
            "class": "11",
            "subject": "Biology",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Bio&type=dpp"
        },
        {
            "class": "11",
            "subject": "Biology",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Bio&type=notes"
        },
        {
            "class": "11",
            "subject": "Accounts",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Account&type=lectures"
        },
        {
            "class": "11",
            "subject": "Accounts",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Account&type=dpp"
        },
        {
            "class": "11",
            "subject": "Accounts",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Account&type=notes"
        },
        {
            "class": "11",
            "subject": "Buisness_studies",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Business&type=lectures"
        },
        {
            "class": "11",
            "subject": "Buisness_studies",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Business&type=dpp"
        },
        {
            "class": "11",
            "subject": "Buisness_studies",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Business&type=notes"
        },
        {
            "class": "11",
            "subject": "Economics",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Eco&type=lectures"
        },
        {
            "class": "11",
            "subject": "Economics",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Eco&type=dpp"
        },
        {
            "class": "11",
            "subject": "Economics",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Eco&type=notes"
        },
        {
            "class": "11",
            "subject": "History",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11History&type=lectures"
        },
        {
            "class": "11",
            "subject": "History",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11History&type=dpp"
        },
        {
            "class": "11",
            "subject": "History",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11History&type=notes"
        },
        {
            "class": "11",
            "subject": "Geography",
            "type": "video",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Geo&type=lectures"
        },
        {
            "class": "11",
            "subject": "Geography",
            "type": "DPP",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Geo&type=dpp"
        },
        {
            "class": "11",
            "subject": "Geography",
            "type": "notes",
            "url": "https://studyversent-proxy.kunalkankani5.workers.dev/?getdata=11Geo&type=notes"
        }  ]
   
};*/

const dataOther = [
    {"class":"9","subject":"English","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=englrnotes"},
    {"class":"9","subject":"English","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=englr"},
    {"class":"9","subject":"English","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engalivenotes"},
    {"class":"9","subject":"English","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engalive"},
    {"class":"9","subject":"EnglishB","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engbeenotes"},
    {"class":"9","subject":"EnglishB","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engbee"},
    {"class":"9","subject":"EnglishB","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engmomentsnotes"},
    {"class":"9","subject":"EnglishB","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engmoments"},
    {"class":"9","subject":"EnglishB","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engblivenotes"},
    {"class":"9","subject":"EnglishB","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engblive"},
    {"class":"9","subject":"English_grammer","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=enggmnotes"},
    {"class":"9","subject":"English_grammer","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=enggm"},
    {"class":"9","subject":"readingandwriting","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engrcnotes"},
    {"class":"9","subject":"readingandwriting","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engrc"},
    {"class":"9","subject":"Hindi","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinkrnotes"},
    {"class":"9","subject":"Hindi","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinkr"},
    {"class":"9","subject":"Hindi","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinksnotes"},
    {"class":"9","subject":"Hindi","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinks"},
    {"class":"9","subject":"HindiB","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinsp"},
{"class":"9","subject":"Hindi","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinspnotes"},
{"class":"9","subject":"Hindi","type":"video","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinsn"},
{"class":"9","subject":"Hindi","type":"notes","url":"https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinsnnotes"},
    {"class":"10","subject":"English","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engextranotes"},
    {"class":"10","subject":"English","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engextra"},
    {"class":"10","subject":"EnglishB","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engblivenotes"},
    {"class":"10","subject":"EnglishB","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engblive"},
    {"class":"10","subject":"English","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engalivenotes"},
    {"class":"10","subject":"English","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engalive"},
    {"class":"10","subject":"English","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=englrnotes"},
    {"class":"10","subject":"English","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=englr"},
    {"class":"10","subject":"EnglishB","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engffnotes"},
    {"class":"10","subject":"EnglishB","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engff"},
    {"class":"10","subject":"EnglishB","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engfootnotes"},
    {"class":"10","subject":"EnglishB","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engfoot"},
    {"class":"10","subject":"English_grammer","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=enggmnotes"},
       {"class":"10","subject":"English_grammer","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=enggm"},
     {"class":"10","subject":"Hindi_grammer","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgm"},
    {"class":"10","subject":"readingandwriting","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engrcnotes"},
    {"class":"10","subject":"readingandwriting","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engrc"},
    {"class":"10","subject":"readingandwriting","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engwsnotes"},
    {"class":"10","subject":"readingandwriting","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engws"},
    {"class":"10","subject":"Hindi","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinalivenotes"},
    {"class":"10","subject":"Hindi","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinalive"},
    {"class":"10","subject":"Hindi","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinkrnotes"},
    {"class":"10","subject":"Hindi","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinkr"},
    {"class":"10","subject":"Hindi","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinksnotes"},
    {"class":"10","subject":"Hindi","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinks"},
    {"class":"10","subject":"HindiB","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinsnnotes"},
    {"class":"10","subject":"HindiB","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinsn"},
    {"class":"10","subject":"Hindi_grammer","type":"notes","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgmnotes"},
    {"class":"10","subject":"Hindi_grammer","type":"video","url":"https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgm"}
]
const generateRandomTime = () => {
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hour}:${minute}`;
};

const generateRandomDate = () => {
    const start = new Date(2023, 0, 1);  // Set a reasonable start date
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    const randomDays = Math.floor(Math.random() * (diff / (1000 * 3600 * 24)));
    const randomDate = new Date(start.getTime() + randomDays * (1000 * 3600 * 24));

    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const year = randomDate.getFullYear();

    return `${year}-${month}-${day}`;
};

/*async function fetchStudyData(className, subject, type, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
            data.items.forEach(element => {
                let title = element.title;
                let url = element.url || element.link;
                if (title && url) {
                    videos.push({
                        title: title,
                        url: url,
                        class: className,
                        subject: subject,
                        type: type,
                        time: generateRandomTime(),
                        date: generateRandomDate(),
                        id: id++
                    });
                }
            });
            console.log(`Fetched ${type} data for ${subject} (Class ${className}):`);
       
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}*/

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
                    // Clean up the link
                    link = link.replace('https://www.rolexcoderz.xyz/Player?url=', '');
                    link = link.replace('https://www.rolexcoderz.xyz/Play?url=', '');
                    link = link.replace('https://www.rolexcoderz.xyz/Player?token=', '');
                    link = link.replace('https://www.rolexcoderz.live/Player?token=', '');
                    link = link.replace('https://rolexcoderz.live/Player?token=', '');
                    link = link.replace("Player?url=", '');
                    link = link.replace("../Player?token=", '');
                    link = link.replace("Play?url=", '');

                    if (link.includes("240p30.m3u8")) {
                        link = link.replace("240p30.m3u8", "720p30.m3u8");
                    }

                    try {
                        link = decodeURIComponent(link);
                    } catch (e) {
                        console.warn("Error decoding URI:", e);
                        // ignore decode error
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
        });
        console.log(`Scraped ${videos.filter(v => v.type === "DPP" && v.class === classnum && v.subject === subject).length} DPP from ${url}`);
    } catch (error) {
        console.error(`Error scraping DPP from ${url}:`, error.message);
    }
}

async function updateOtherSubject(url, classNum, subject, type) {
    try {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:92.0) Gecko/20100101 Firefox/92.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59',
        ];
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const response = await fetch(url, {
            headers: {
                'User-Agent': randomUserAgent
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const data = json.data.list;

        if (data && Array.isArray(data)) {
            const className = classNum === '10' ? '10' : '9';
            data.forEach(item => {
                let title = item.title;
                let fileUrl = item.file_url;
                if(fileUrl){
                  fileUrl = fileUrl;

                  videos.push({
                      title: title,
                      link: fileUrl,
                      class: className,
                      subject: subject,
                      type: type,
                      time: generateRandomTime(),
                      date: generateRandomDate(),
                      id: id++,
                  });
                }
            });
            console.log(`Successfully scraped ${data.length} items from ${url}`);
        } else {
            console.log(`No data or invalid data format found at ${url}`);
        }
    } catch (error) {
        console.error(`Something went wrong or the link is not working for ${url}:`, error.message);
    }
}

async function scrapeAll() {
    videos = [];
    id = 0;
    console.log('Starting scrape from rolexcoderz.live...');
    for (const classNum of Object.keys(data)) {
        for (const subject of Object.keys(data[classNum])) {
            for (const url of data[classNum][subject]) {
                await scrapeVideosFromUrl(url, subject, classNum);
                await scrapeNotesFromUrl(url, subject, classNum);
                await scrapeDPPFromUrl(url, subject, classNum);
            }
        }
    }

    // Scrape from the second set of URLs
    console.log('Starting scrape from viewer-ten-psi.vercel.app and automation9thphp.vercel.app...');
    for (const item of dataOther) {                      await updateOtherSubject(item.url, item.class, item.subject, item.type);                                  }                 
  /*  console.log('Starting scrape from study data...');
    for (const element of studyData.data) {
      await fetchStudyData(element.class, element.subject, element.type, element.url);
    }*/
    try {
        await fs.writeFile('videos.json', JSON.stringify(videos, null, 2));
        console.log('All video data has been successfully saved to videos.json');
    } catch (error) {
        console.error('Error writing videos.json file:', error.message);
    }
}
module.exports = { scrapeAll };