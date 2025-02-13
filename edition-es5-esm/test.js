// should be consistent between
// https://github.com/bevry/textextensions/blob/master/test.ts
// https://github.com/bevry/binaryextensions/blob/master/test.ts
import list from './index.js';
import aliens from 'textextensions';
import { equal, deepEqual } from 'assert-helpers';
import kava from 'kava';
import { writeFile } from 'fs';
import { join } from 'path';
import filedirname from 'filedirname';
var _a = filedirname(), file = _a[0], dir = _a[1];
var listPath = join(dir, '..', 'list.json');
var indentation = '  ';
kava.suite('extensions', function (suite, test) {
    test('data had no text extensions', function () {
        var duplicates = list.filter(function (local) { return aliens.includes(local); });
        deepEqual(duplicates, [], 'there should be no text extensions that are present inside binaryextensions');
    });
    test('data had duplicates removed', function () {
        var set = new Set(list);
        equal(list.length, set.size, 'length was the same as when duplicates were removed');
    });
    test('data was sorted', function () {
        var expected = list.slice().sort();
        equal(JSON.stringify(list, null, indentation), JSON.stringify(expected, null, indentation));
    });
    test('write the json file', function (next) {
        writeFile(listPath, JSON.stringify(list), function (error) {
            if (error)
                return next(error);
            next();
        });
    });
});
