import RawHtmlAttributeUpdater from './raw-html-attribute-updater';

export default RawHtmlAttributeUpdater; // when you do 'npm run build', annotate this.

try {
    module.exports = {
        storeAttrField: function (attrName, attrValue, elementName, htmlStr) {
            return new RawHtmlAttributeUpdater().storeAttrField(attrName, attrValue, elementName, htmlStr);
        }
    };
}catch (e){
    // ES5 approach is regarded as an error in ES6
}
