var express = require('express');
var router = express.Router();

//base : localhost :3000
//router.use('/board', require('.\board'));
console.log('routes/api/index 확인용');
router.use('/news', require('./news/index'));
router.use('/cafe', require('./cafe'));
router.use('/blog', require('./blog'));

module.exports = router;
