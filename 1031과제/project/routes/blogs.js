const express = require('express');
const router = express.Router({mergeParams: true})

const authUtil = require('../module/util/authUtil');
const responseMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');

const Blog = require('../model/Blog');

router.post('/', async (req, res) => {
    const {blogName} = req.body;

    // TODO 1: blogName 값 확인하기-post형식으로 받아온 값을 blogname변수에 초기화
    if (!blogName) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 작성하기- blogname 값이 비어있다면 에러메시지 발생
    try {
        const {code, json} = await Blog.insert(blogName);
        console.log(`code: ${code}, json : ${json}`);
        res.status(code).send(json); //model에 정의한 insert메서드 호출
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_CREATE_FAIL));
    }
});

// READ_ALL
router.get('/', async (req, res) => {
    // TODO 1: 읽어오기
    try {
        const {code, json} = await Blog.selectAll();
        res.status(code).send(json);
        
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// READ_ONE
router.get('/:blogIdx', async (req, res) => {
    const blogIdx = req.params.blogIdx;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 읽어오기
    try {
        const {code, json} = await Blog.selectOne(blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// UPDATE
router.put('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;
    const {blogName} = req.body;

    // TODO 1: blogIdx, blogName 값 확인하기
    if (!blogIdx || !blogName) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    
    // TODO 2: 수정하기
    try {
        const {code, json} = await Blog.update(blogIdx, blogName);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_UPDATE_FAIL));
    }
});

// DELETE
router.delete('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 삭제하기
    try {
        const {code, json} = await Blog.delete(blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_DELETE_FAIL));
    }
});

module.exports = router;