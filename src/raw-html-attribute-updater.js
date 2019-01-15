/*
*
*
*   Raw-html-attribute-updater
*
*
*
*   The MIT License (MIT)

    Copyright (c) 2011-2018 Twitter, Inc.
    Copyright (c) 2011-2018 The Bootstrap Authors

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

* */

const all_lang_char_regex = '[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]';

/*
*     Private part
* */
const ValidObj = {

    isElementValid(sth) {
        if (sth && typeof sth === 'string' && /^[a-zA-Z][a-zA-Z0-9]*$/.test(sth)) {
            return true;
        }
        return false;
    },

    isAttrNameValid(sth) {
        if (sth && typeof sth === 'string' && /^[a-zA-Z][a-zA-Z0-9]*$/.test(sth)) {
            return true;
        }
        return false;
    },

    isAttrValueValid(sth) {
        if (sth && typeof sth === 'string' && /^[^/]+$/.test(sth)) {
            return true;
        }
        return false;
    },

};


const UtilObj = {

    replaceBetween(from, start, end, what) {
        return from.substring(0, start) + what + from.substring(end);
    },
    escapeRegex(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

};


const ProcessObj = {

    isAttrValueExistInAttrField(attrName, attrValue, attrField, delimiter) {

        // Check if our input value is already in values in the key attribute.
        let rx3_1 = new RegExp('(?:^' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)', 'g')
        let keyMatches_pre = attrField.replace(rx3_1, '');
        let keyMatches_arr = keyMatches_pre.split(delimiter);

        keyMatches_arr.forEach(function (val, idx) {
            if (val.trim() === attrValue.trim()) {
                return true;
            }
        });

        return false;
    },
    isAttrValueExistInAttrFieldByKey(attrName, attrValue, attrField, delimiter) {

        // Check if our input value is already in values in the key attribute.
        let rx3_1 = new RegExp('(?:^' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)', 'g')
        let keyMatches_pre = attrField.replace(rx3_1, '');
        let keyMatches_arr = keyMatches_pre.split(delimiter);

        let isMatchedKeyExist = false;
        keyMatches_arr.forEach(function (val, idx) {

            if (val.split(':')[0].trim() === attrValue.split(':')[0].trim()) {
                isMatchedKeyExist = true;
            }
        });

        if (isMatchedKeyExist) {
            return true;
        } else {
            return false;
        }

    },
    addValueToAttrField(attrName, attrValue, elementField, delimiter) {

        let t = elementField;

        //console.log('bf : ' + t);

        t = t.replace(new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
            '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"),
            attrName + '=$1$4$2$5' + delimiter + attrValue + '$3$6');

        //console.log('af : ' + t);

        t = t.replace(new RegExp(delimiter + delimiter, "g"), delimiter); // delimiter should be a character that does not need to be escaped.
        t = t.replace(new RegExp('(=[\\n\\r\\t\\s]*[\\u0022\\u0027])' + delimiter, "g"), '$1'); // delimiter should be a character that does not need to be escaped.
        return t;

    },
    overwriteValueToAttrField(attrName, attrValue, elementField) {

        return elementField.replace(new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
            '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"), attrName + '=$1$4' + attrValue + '$3$6');

    },
    overwriteValueToAttrValueField(attrName, attrValue, elementField) {

        //console.log('name : ' + attrName + ' / value : ' + attrValue + ' / elementField : ' +  elementField)

        let keyOfAttrValue = attrValue.split(':')[0].trim();

        let rx3_2 = new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
            '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g");

        let matches = [];
        let match = {};

        while ((match = rx3_2.exec(elementField)) !== null) {
            matches.push({
                'value': match[0],
                'index': match.index
            })
        }

        matches = matches.reverse();

        //console.log(matches);

        matches.forEach(function (val, idx) {

            let rx3_3 = new RegExp('\\b' + keyOfAttrValue + '[\\n\\r\\t\\s]*:[^;]+[^\\u0027\\u0022;]', "g");
            let t = val.value.replace(rx3_3, attrValue);

            //console.log('t : ' + t);

            elementField = UtilObj.replaceBetween(elementField, val.index, val.index + val.value.length, t);

        });

        return elementField;

    },
    isCommentArea(stIdx, endIdx, cmt_matches) {

        let re = false;
        cmt_matches.forEach(function (val, idx) {
            if (val.index + 3 < stIdx && endIdx < val.index + val.value.length - 2) {
                re = true;
            }
        });

        return re;
    }

};

/*
*   Private part : Error Handler
* */
function RawHtmlAttributeUpdaterError() {
    let temp = Error.apply(this, arguments);
    temp.name = this.name = 'RawHtmlAttributeUpdaterError';
    this.message = temp.message;
    if (Object.defineProperty) {
        // getter for more optimizy goodness
        /*this.stack = */
        Object.defineProperty(this, 'stack', {
            get: function () {
                return temp.stack
            },
            configurable: true // so you can change it if you want
        })
    } else {
        this.stack = temp.stack
    }
}

//inherit prototype using ECMAScript 5 (IE 9+)
RawHtmlAttributeUpdaterError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: RawHtmlAttributeUpdaterError,
        writable: true,
        configurable: true
    }
});


/*
*     Public part
* */
const ParserObj = {

    extractAllElements(htmlStr, elementName) {

        /*
        *  Description : 'rx' is a regex to distill all opening tags with each element name, 'elementName'
        *
        *
        *   The well-known regex <[^>]+> never meets conditions of a tag, as there is an exception like '<p class="ab>c"/>'.
        *   Definitely, that kind of case is hardly seen. The Javascript formal parser can parse it.
        *
        *   In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters
        *   [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_);
        *   they cannot start with a digit, two hyphens, or a hyphen followed by a digit.
        *
        *   'rx' below meets the standard above.
        *
        * */

        let elementRegex = null;
        if (elementName) {
            elementRegex = UtilObj.escapeRegex(elementName);
        } else {
            elementRegex = '(?:[\\w][^<>\\u0022\\u0027\\t\\s]*)';
        }

        let rx = new RegExp(

            /* Type A. <p> or <p abc> */
            '(?:<' + elementRegex + '(?:[\\t\\s]+[^<>\\u0022\\u0027\\u002F]*?|)(?:[\\n\\r\\t\\s]*\\/[\\n\\r\\t\\s]*|)>)|' +

            /* Type B. <p abc="" ...> */

                /* Head part*/
                '(?:<' + elementRegex + '[\\t\\s]+[^<>\\n\\r\\t\\s\\u0022\\u0027\\u002F].*?' +

                /* Tail part*/

                    // readonly>
                    '(?:[\\t\\s]+?[^<>\\n\\r\\t\\s\\u0022\\u0027\\u002F]+?|' +
                    // "....">
                    '(?:[\\u0022].*?[\\u0022]|[\\u0027].*?[\\u0027])[\\n\\r\\t\\s]*)' +

                /* Final tail part */
                // /> >
                '(?:[\\n\\r\\t\\s]*\\/[\\n\\r\\t\\s]*|)>)', "g");

        let matches = [];
        let match = {};

        while ((match = rx.exec(htmlStr)) !== null) {
            matches.push({
                'value': match[0],
                'index': match.index
            })
        }

        //console.log(matches);

        return matches;

    },

    extractAllComments(htmlStr) {

        let rx = new RegExp('<\\!--.*?-->', 'g');

        let matches = [];
        let match = {};

        while ((match = rx.exec(htmlStr)) !== null) {
            matches.push({
                'value': match[0],
                'index': match.index
            })
        }

        return matches;

    },

    extractAllAttrFieldsWithAttrName(el, attrName) {

        let rx = new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
            '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"); // rx2 : Check if the attribute field exists.

        return el.match(rx); // if this returns more than two, it is an error! An element must not have two attributes at the same time.
    }

};

export default {

    /*
    *  The prefix here 'Store' means 'Create' if the key doesn't exist, or 'Update'.
    * */
    storeAttrField(attrName, attrValue, elementName, htmlStr, isIdWay, commentsAreaIgnore) {

        try {

            htmlStr = htmlStr.trim();
            elementName = elementName.trim();
            attrName = attrName.trim();
            attrValue = attrValue.trim();


            /*
             *   From version 1.5.6
             * */
            if (!commentsAreaIgnore) {
                if (commentsAreaIgnore !== false) {
                    commentsAreaIgnore = true;
                }
            } else {
                if (commentsAreaIgnore !== true) {
                    commentsAreaIgnore = false;
                }
            }


            /*
            *
            *   Integrity Check
            *
            * */

            // HtmlIntegrityObj.htmlLevelIntegrityCheck(htmlStr);


            /*
            *    Validation Check
            *
            * */

            let isElementValid_bool = ValidObj.isElementValid(elementName);
            if (!isElementValid_bool) {
                throw new RawHtmlAttributeUpdaterError("Not valid argument : elementName : The first letter must be an alphabet and the following chracters must consist of alphabets and numbers");
            }
            let isAttrNameValid_bool = ValidObj.isAttrNameValid(attrName);
            if (!isAttrNameValid_bool) {
                throw new RawHtmlAttributeUpdaterError("Not valid argument : attrName : The first letter must be an alphabet and the following characters must consist of alphabets and numbers");
            }
            let isAttrValueValid_bool = ValidObj.isAttrValueValid(attrValue);
            if (!isAttrValueValid_bool) {
                throw new RawHtmlAttributeUpdaterError("Not valid argument : attrValue : The character '/' should not be used, and the length must be longer than 1");
            }


            let el_matches = ParserObj.extractAllElements(htmlStr, elementName).reverse();
            let cmt_matches = [];
            if (commentsAreaIgnore === true) {

                cmt_matches = ParserObj.extractAllComments(htmlStr).reverse();
            }
            //console.log(el_matches);

            el_matches.forEach(function (val, idx) {

                if (commentsAreaIgnore === true) {

                    if (ProcessObj.isCommentArea(val.index, val.index + val.value.length, cmt_matches) === true) {

                        return; // same as continue in other languages

                    }
                }


                let strToBeReplaced = val.value;
                let isAttrNameMatched = false;

                let attrNameMatches = ParserObj.extractAllAttrFieldsWithAttrName(val.value, attrName);

                if (attrNameMatches && attrNameMatches.length > 0) {
                    isAttrNameMatched = true;
                }

                /*
                *   From version 1.5
                * */
                let attrName_virtual = attrName;
                if (isIdWay === true) {
                    attrName_virtual = 'id'
                }

                /* ex) <p attribute=... /> if p has the attribute? */
                switch (attrName_virtual) {

                    case 'class' :

                        if (isAttrNameMatched === true) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            // Check if our input value is already in values in the key attribute.
                            let isAttrValueExistInAttrField_bool = ProcessObj.isAttrValueExistInAttrField(attrName, attrValue, attrNameMatches[0], /[\t\s]+/);

                            // if the value does not exist, add the value to previous values in the key
                            if (isAttrValueExistInAttrField_bool === false) {
                                strToBeReplaced = ProcessObj.addValueToAttrField(attrName, attrValue, val.value, ' ');
                            }

                        }

                        /*  element-level sanity process */
                        strToBeReplaced = strToBeReplaced.replace(/([\s]){2,}/g, '$1');
                        strToBeReplaced = strToBeReplaced.replace(/([\t]){2,}/g, '$1');

                        switch (isAttrNameMatched) {
                            /* the attribute does not exist */
                            case false :

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)$/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;

                    case 'id' :

                        if (isAttrNameMatched === true) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            // Check if our input value is already in values in the key attribute.
                            let isAttrValueExistInAttrField_bool = ProcessObj.isAttrValueExistInAttrField(attrName, attrValue, attrNameMatches[0], /[\t\s]+/);

                            // if the value does not exist, replace the previous value with a new value in the key
                            if (isAttrValueExistInAttrField_bool === false) {
                                strToBeReplaced = ProcessObj.overwriteValueToAttrField(attrName, attrValue, val.value);
                            }

                        }

                        /*  element-level sanity process */
                        strToBeReplaced = strToBeReplaced.replace(/([\s]){2,}/g, '$1');
                        strToBeReplaced = strToBeReplaced.replace(/([\t]){2,}/g, '$1');
                        //console.log(strToBeReplaced);

                        switch (isAttrNameMatched) {
                            /* the attribute does not exist */
                            case false :

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)$/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;


                    case 'style' :

                        if (isAttrNameMatched === true) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            // Check if our input value is already in values in the key attribute.
                            let isAttrValueExistInAttrFieldByKey_bool = ProcessObj.isAttrValueExistInAttrFieldByKey(attrName, attrValue, attrNameMatches[0], /[\n\r\t\s]*;[\n\r\t\s]*/);

                            // if the value does not exist, add the value to previous values in the key
                            if (isAttrValueExistInAttrFieldByKey_bool === false) {
                                //console.log('name : ' + attrName + ' / value : ' + attrValue + ' / ' + val.value);
                                strToBeReplaced = ProcessObj.addValueToAttrField(attrName, attrValue, val.value, ';');

                            } else {
                                strToBeReplaced = ProcessObj.overwriteValueToAttrValueField(attrName, attrValue, val.value);
                            }

                        }

                        console.log(strToBeReplaced);

                        /*  element-level sanity process */
                        strToBeReplaced = strToBeReplaced.replace(/([\s]){2,}/g, '$1');
                        strToBeReplaced = strToBeReplaced.replace(/([\t]){2,}/g, '$1');

                        switch (isAttrNameMatched) {
                            /* the attribute does not exist */
                            case false :

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)$/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;

                    default :

                        if (isAttrNameMatched === true) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            // Check if our input value is already in values in the key attribute.
                            let isAttrValueExistInAttrField_bool = ProcessObj.isAttrValueExistInAttrField(attrName, attrValue, attrNameMatches[0], /[\t\s]+/);

                            // if the value does not exist, add the value to previous values in the key
                            if (isAttrValueExistInAttrField_bool === false) {
                                strToBeReplaced = ProcessObj.addValueToAttrField(attrName, attrValue, val.value, ' ');
                            }

                        }

                        /*  element-level sanity process */
                        strToBeReplaced = strToBeReplaced.replace(/([\s]){2,}/g, '$1');
                        strToBeReplaced = strToBeReplaced.replace(/([\t]){2,}/g, '$1');

                        switch (isAttrNameMatched) {
                            /* the attribute does not exist */
                            case false :

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)$/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;


                }

            });


        } catch (e) {

            console.log(e);

        } finally {

            return htmlStr;

        }

    },

}


