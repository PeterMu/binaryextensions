"use strict";
// should be consistent between
// https://github.com/bevry/textextensions/blob/master/test.ts
// https://github.com/bevry/binaryextensions/blob/master/test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = __importDefault(require("./index.js"));
var textextensions_1 = __importDefault(require("textextensions"));
var assert_helpers_1 = require("assert-helpers");
var kava_1 = __importDefault(require("kava"));
var fs_1 = require("fs");
var path_1 = require("path");
var filedirname_1 = __importDefault(require("filedirname"));
var _a = filedirname_1.default(), file = _a[0], dir = _a[1];
var listPath = path_1.join(dir, '..', 'list.json');
var indentation = '  ';
kava_1.default.suite('extensions', function (suite, test) {
    test('data had no text extensions', function () {
        var duplicates = index_js_1.default.filter(function (local) { return textextensions_1.default.includes(local); });
        assert_helpers_1.deepEqual(duplicates, [], 'there should be no text extensions that are present inside binaryextensions');
    });
    test('data had duplicates removed', function () {
        var set = new Set(index_js_1.default);
        assert_helpers_1.equal(index_js_1.default.length, set.size, 'length was the same as when duplicates were removed');
    });
    test('data was sorted', function () {
        var expected = index_js_1.default.slice().sort();
        assert_helpers_1.equal(JSON.stringify(index_js_1.default, null, indentation), JSON.stringify(expected, null, indentation));
    });
    test('write the json file', function (next) {
        fs_1.writeFile(listPath, JSON.stringify(index_js_1.default), function (error) {
            if (error)
                return next(error);
            next();
        });
    });
});
