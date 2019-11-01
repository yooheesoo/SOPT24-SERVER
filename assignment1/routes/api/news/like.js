
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res) => {
    res.status(200).send({
        message: "좋아요입니다."
    })
});
module.exports = router;
