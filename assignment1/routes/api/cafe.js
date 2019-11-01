var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res) => {
    res.status(200).send({ 
        message: "카페입니다"
    })
})
module.exports = router;

