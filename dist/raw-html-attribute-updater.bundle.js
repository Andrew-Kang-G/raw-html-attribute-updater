var RawHtmlAttributeUpdater=function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="../dist/",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=r(1),l=n(a);try{e.exports={storeAttrField:function(e,t,r,n,a){return(new l.default).storeAttrField(e,t,r,n,a)}}}catch(e){}},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){var e=Error.apply(this,arguments);e.name=this.name="RawHtmlAttributeUpdaterError",this.message=e.message,Object.defineProperty?Object.defineProperty(this,"stack",{get:function(){return e.stack},configurable:!0}):this.stack=e.stack}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l={isElementValid:function(e){return!(!e||"string"!=typeof e||!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e))},isAttrNameValid:function(e){return!(!e||"string"!=typeof e||!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e))},isAttrValueValid:function(e){return!(!e||"string"!=typeof e||!/^[^\/]+$/.test(e))}},i={replaceBetween:function(e,t,r,n){return e.substring(0,t)+n+e.substring(r)}},u={};u.isAttrValueExistInAttrField=function(e,t,r,n){var a=new RegExp("(?:^"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)","g"),l=r.replace(a,""),i=l.split(n);return i.forEach(function(e,r){if(e.trim()===t.trim())return!0}),!1},u.isAttrValueExistInAttrFieldByKey=function(e,t,r,n){var a=new RegExp("(?:^"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)","g"),l=r.replace(a,""),i=l.split(n),u=!1;return i.forEach(function(e,r){e.split(":")[0].trim()===t.split(":")[0].trim()&&(u=!0)}),!!u},u.addValueToAttrField=function(e,t,r,n){var a=r;return a=a.replace(new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))","g"),e+"=$1$4$2$5"+n+t+"$3$6 "),a=a.replace(new RegExp(n+n,"g"),n),a=a.replace(new RegExp("(=[\\n\\r\\t\\s]*[\\u0022\\u0027])"+n,"g"),"$1")},u.overwriteValueToAttrField=function(e,t,r){return r.replace(new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))","g"),e+"=$1$4"+t+"$3$6 ")},u.overwriteValueToAttrValueField=function(e,t,r){for(var n=t.split(":")[0].trim(),a=new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))","g"),l=[],u={};null!==(u=a.exec(r));)l.push({value:u[0],index:u.index});return l=l.reverse(),l.forEach(function(e,a){var l=new RegExp("\\b"+n+"[\\n\\r\\t\\s]*:[^;]+[^\\u0027\\u0022;]","g"),u=e.value.replace(l,t);r=i.replaceBetween(r,e.index,e.index+e.value.length,u)}),r},n.prototype=Object.create(Error.prototype,{constructor:{value:n,writable:!0,configurable:!0}});var s=function(){function e(){r(this,e)}return a(e,[{key:"storeAttrField",value:function(e,t,r,a,s){try{a=a.trim(),r=r.trim(),e=e.trim(),t=t.trim();var c=l.isElementValid(r);if(!c)throw new n("Not valid argument : elementName : The first letter must be an alphabet and the following chracters must consist of alphabets and numbers");var o=l.isAttrNameValid(e);if(!o)throw new n("Not valid argument : attrName : The first letter must be an alphabet and the following characters must consist of alphabets and numbers");var d=l.isAttrValueValid(t);if(!d)throw new n("Not valid argument : attrValue : The character '/' should not be used, and the length must be longer than 1");for(var f=new RegExp("<[\\n\\r\\t\\s]*"+r+"[\\n\\r\\t\\s]*[^>]*>","g"),p=[],g={};null!==(g=f.exec(a));)p.push({value:g[0],index:g.index});p=p.reverse(),p.forEach(function(r,n){var l=r.value,c=new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)([\\u0022])|([\\u0027])(.*?)([\\u0027]))","g"),o=!1,d=r.value.match(c),f=e;switch(s===!0&&(f="id"),f){case"class":if(d&&d.length>0){if(d.length>1)break;o=!0;var p=u.isAttrValueExistInAttrField(e,t,d[0],/[\t\s]+/);p===!1&&(l=u.addValueToAttrField(e,t,r.value," "))}switch(l=l.replace(/([\s]){2,}/g,"$1"),l=l.replace(/([\t]){2,}/g,"$1"),o){case!1:l=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,l);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,l)}break;case"id":if(d&&d.length>0){if(d.length>1)break;o=!0;var p=u.isAttrValueExistInAttrField(e,t,d[0],/[\t\s]+/);p===!1&&(l=u.overwriteValueToAttrField(e,t,r.value))}switch(l=l.replace(/([\s]){2,}/g,"$1"),l=l.replace(/([\t]){2,}/g,"$1"),o){case!1:l=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,l);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,l)}break;case"style":if(d&&d.length>0){if(d.length>1)break;o=!0;var g=u.isAttrValueExistInAttrFieldByKey(e,t,d[0],/[\n\r\t\s]*;[\n\r\t\s]*/);l=g===!1?u.addValueToAttrField(e,t,r.value,";"):u.overwriteValueToAttrValueField(e,t,r.value)}switch(l=l.replace(/([\s]){2,}/g,"$1"),l=l.replace(/([\t]){2,}/g,"$1"),o){case!1:l=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,l);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,l)}break;default:if(d&&d.length>0){if(d.length>1)break;o=!0;var p=u.isAttrValueExistInAttrField(e,t,d[0],/[\t\s]+/);p===!1&&(l=u.addValueToAttrField(e,t,r.value," "))}switch(l=l.replace(/([\s]){2,}/g,"$1"),l=l.replace(/([\t]){2,}/g,"$1"),o){case!1:l=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,l);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,l)}}})}catch(e){console.log(e)}finally{return a}}}]),e}();t.default=s,e.exports=t.default}]);