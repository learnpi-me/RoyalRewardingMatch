const cron = require('node-cron');
const { scrapeAll } = require('./server');
const app = require('./db');
app.post('/scrape', (req, res) =>
  {
    scrapeAll()
      .then(() => {
        res.status(200).send('Scraping completed');
      })
      .catch(err => {
        res.status(500).send('Scraping failed: ' + err.message);
      });
  })
scrapeAll()
  .then(() => {
    console.log('Initial scraping completed');
  })
  .catch(err => {
    console.error('Initial scraping failed:', err.message);
  });
/*


https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engextranotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engextra



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engblivenotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engblive

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engfootnotes

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engfoot



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engffnotes





https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engff





https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engalivenotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engalive



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engrcnotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engrc

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engwsnotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=engws



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=enggmnotes

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgm



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=englrnotes

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=englr



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgmnotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinbgm



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinsnnotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinsn



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinalivenotes



https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinalive
https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=live

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinkrnotes


https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinkr

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinksnotes

https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=hinks

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinkrnotes

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinkr


https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinksnotes


https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=hinks

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engblivenotes

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engblive

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engbeenotes

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engbee


https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engmomentsnotes
https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engmoments

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engalivenotes

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engalive

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=englrnotes

https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=englr
https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=enggmnotes
https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=enggm



https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engrcnotes
https://automation9thphp.vercel.app/api/api.php?token=my_secret_key_123&view=engrc



 */
