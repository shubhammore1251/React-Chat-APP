const express =  require('express');
const router = express.Router();

router.get('/', (req,res) => {
   res.send('server is up and running'); 
});

router.get('/keep-alive', (req,res) => {
   console.log(`CRON JOB EXECUTED TO KEEP SERVER ALIVE - ${new Date()}`); 
})

module.exports = router;
