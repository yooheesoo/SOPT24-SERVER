const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const authUtil = require('../module/util/authUtil');
const pool = require('../module/db/pool');

const table = 'blog';

module.exports = {
    insert: async (blogName) => {
        const fields = 'blogName';
        const questions = `'${blogName}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query);
        
        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_CREATE_FAIL)
            };
        }
        return {
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