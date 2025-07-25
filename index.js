const cron = require('node-cron');
const { scrapeAllVideos } = require('./server');
const app = require('./db');
app.post('/scrape', (req, res) =>
  {
    scrapeAllVideos()
      .then(() => {
        res.status(200).send('Scraping completed');
      })
      .catch(err => {
        res.status(500).send('Scraping failed: ' + err.message);
      });
  })
scrapeAllVideos()
  .then(() => {
    console.log('Initial scraping completed');
  })
  .catch(err => {
    console.error('Initial scraping failed:', err.message);
  });

