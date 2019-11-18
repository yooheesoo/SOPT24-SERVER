const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const authUtil = require('../module/util/authUtil');
const pool = require('../module/db/pool');

const table = 'blog';



module.exports = {
    insert: async (blogName) => { //비동기 처리를 하기 위해 화살표 함수 앞에 async를 붙여줌
        const fields = 'blogName'; //query문에 들어갈 값 초기화-문자열 형태
        const questions = `'${blogName}'`; //query문에 들어갈 값 초기화-변수 값
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query); //완성된 query문을 pool.queryParam_None()메서드에 피라미터로 넣어준다.
        
        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_CREATE_FAIL)
            }; //result가 없을 경우 에러메시지 초기화해서 return
        }
        return { //에러가 걸리지 않았다면 성공한 값 넣어주기
            code: sc.OK,
            json: au.successTrue(rm.BOARD_CREATE_SUCCESS, result)
        };
    },
    selectOne: async (blogIdx) => {
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_READ_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_READ_SUCCESS, result)
        };
    },
    selectAll: async () => {
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_READ_ALL_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_READ_ALL_SUCCESS, result)
        };
    },
    update: async (blogIdx, blogName) => {
        const query = `UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_UPDATE_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_UPDATE_SUCCESS, result)
        };
    },
    delete: async (blogIdx) => {
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_DELETE_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_DELETE_SUCCESS, result)
        };
    }
}