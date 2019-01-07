/*
*   raw-html-attribute-updater
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

/*
*     Private part
* */
const ValidObj = {

    isElementValid (sth) {
        if (sth && typeof sth === 'string' && /^[a-zA-Z][a-zA-Z0-9]*$/.test(sth)) {
            return true;
        }
        return false;
    },

    isAttrNameValid (sth) {
        if (sth && typeof sth === 'string' && /^[a-zA-Z][a-zA-Z0-9]*$/.test(sth)) {
            return true;
        }
        return false;
    },

    isAttrValueValid (sth) {
        if (sth && typeof sth === 'string' && /^[^/]+$/.test(sth)) {
            return true;
        }
        return false;
    }
};

const UtilObj = {

    replaceBetween (from, start, end, what) {
        return from.substring(0, start) + what + from.substring(end);
    }

};

const ProcessObj = {};
ProcessObj.isAttrValueExistInAttrField = function (attrName, attrValue, attrField, delimiter) {

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
}
ProcessObj.isAttrValueExistInAttrFieldByKey = function (attrName, attrValue, attrField, delimiter) {

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

    if(isMatchedKeyExist){
        return true;
    }else{
        return false;
    }

}
ProcessObj.addValueToAttrField = function (attrName, attrValue, elementField, delimiter) {

    let t = elementField;

    //console.log(t);

    t = t.replace(new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
        '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"),
        attrName + '=$1$4$2$5' + delimiter + attrValue + '$3$6 ');

    //console.log(t);

    t = t.replace(new RegExp(delimiter + delimiter, "g"), delimiter); // delimiter should be a character that does not need to be escaped.
    t = t.replace(new RegExp('(=[\\n\\r\\t\\s]*[\\u0022\\u0027])' + delimiter, "g"), '$1'); // delimiter should be a character that does not need to be escaped.
    return t;

};
ProcessObj.overwriteValueToAttrField = function (attrName, attrValue, elementField) {

    return elementField.replace(new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
        '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"), attrName + '=$1$4' + attrValue + '$3$6 ');

};
ProcessObj.overwriteValueToAttrValueField = function (attrName, attrValue, elementField) {

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
class RawHtmlAttributeUpdater {

    /*
    *  The prefix here 'Store' means 'Create' if the key doesn't exist, or 'Update'.
    * */
    storeAttrField(attrName, attrValue, elementName, htmlStr, isIdWay) {

        try {

            htmlStr = htmlStr.trim();
            elementName = elementName.trim();
            attrName = attrName.trim();
            attrValue = attrValue.trim();

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



            /*
            *  Description : 'rx1' is a regex to distill all opening tags with each element name, 'elementName'
            *
            *
            *   In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters
            *   [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_);
            *   they cannot start with a digit, two hyphens, or a hyphen followed by a digit.
            *
            *   'rx1' below meets the standard above.
            *
            * */

            let rx1 = new RegExp('<[\\n\\r\\t\\s]*' + elementName + '[\\n\\r\\t\\s]*[^>]*>', "g");

            let matches = [];
            let match = {};

            while ((match = rx1.exec(htmlStr)) !== null) {
                matches.push({
                    'value': match[0],
                    'index': match.index
                })
            }

            matches = matches.reverse();

            //console.log(matches);


            matches.forEach(function (val, idx) {

                let strToBeReplaced = val.value;

/*                let rx2 = new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
                    '(?:[\\u0022].+?[^\\u005C][\\u0022]|[\\u0027].+?[^\\u005C][\\u0027])' +
                    '(?:[\\t\\s\\u002F]|)', "g");*/

                let rx2 = new RegExp('\\b' + attrName + '[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*' +
                    '(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))', "g"); // rx2 : Check if the attribute field exists.

                let isAttrNameMatched = false;
                let attrNameMatches = val.value.match(rx2);


                /*
                *   From version 1.5
                * */
                let attrName_virtual = attrName;
                if(isIdWay === true){
                    attrName_virtual = 'id'
                }

                /* ex) <p attribute=... /> if p has the attribute? */
                switch (attrName_virtual) {

                    case 'class' :

                        if (attrNameMatches && attrNameMatches.length > 0) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            isAttrNameMatched = true;

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

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;

                    case 'id' :

                        if (attrNameMatches && attrNameMatches.length > 0) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            isAttrNameMatched = true;

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

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;


                    case 'style' :

                        if (attrNameMatches && attrNameMatches.length > 0) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            isAttrNameMatched = true;

                            // Check if our input value is already in values in the key attribute.
                            let isAttrValueExistInAttrFieldByKey_bool = ProcessObj.isAttrValueExistInAttrFieldByKey(attrName, attrValue, attrNameMatches[0], /[\n\r\t\s]*;[\n\r\t\s]*/);

                            // if the value does not exist, add the value to previous values in the key
                            if (isAttrValueExistInAttrFieldByKey_bool === false) {
                                //console.log('name : ' + attrName + ' / value : ' + attrValue + ' / ' + val.value);
                                strToBeReplaced = ProcessObj.addValueToAttrField(attrName, attrValue, val.value, ';');

                            }else{
                                strToBeReplaced = ProcessObj.overwriteValueToAttrValueField(attrName, attrValue, val.value);
                            }

                        }

                        /*  element-level sanity process */
                        strToBeReplaced = strToBeReplaced.replace(/([\s]){2,}/g, '$1');
                        strToBeReplaced = strToBeReplaced.replace(/([\t]){2,}/g, '$1');

                        switch (isAttrNameMatched) {
                            /* the attribute does not exist */
                            case false :

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;

                            /* the attribute to replace has been found */
                            default :

                                htmlStr = UtilObj.replaceBetween(htmlStr, val.index, val.index + val.value.length, strToBeReplaced);
                                break;
                        }

                        break;

                    default :

                        if (attrNameMatches && attrNameMatches.length > 0) {

                            if (attrNameMatches.length > 1) {
                                break;  // two same attributes in an element is definitely an error.
                            }

                            isAttrNameMatched = true;

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

                                strToBeReplaced = val.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g, ' ' + attrName + '="' + attrValue + '"$1'); // Add to the last part of the tag
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

    }

}
export default RawHtmlAttributeUpdater;

