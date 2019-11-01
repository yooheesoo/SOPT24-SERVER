var express = require('express');
var router = express.Router();

console.log('news/index 확인용')
router.use('/like',require('./like'));
router.get('/',function(req,res,next){
    res.send({message:"뉴스입니다"})
});


// router.get('/',(res,req)=>{
//     res.send('not supported')
// });


module.exports = router;
