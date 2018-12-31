import RawHtmlAttributeUpdater from './raw-html-attribute-updater';

export default RawHtmlAttributeUpdater; // *** when you do 'npm run build', annotate this, but must not be annotated when 'npm publish'

try {
    module.exports = {
        storeAttrField: function (attrName, attrValue, elementName, htmlStr) {
            return new RawHtmlAttributeUpdater().storeAttrField(attrName, attrValue, elementName, htmlStr);
        }
    };
}catch (e){
    // ES5 approach is regarded as an error in ES6
}
