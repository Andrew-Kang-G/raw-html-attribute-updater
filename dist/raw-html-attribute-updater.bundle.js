var RawHtmlAttributeUpdater=function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="../dist/",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=r(1),u=n(a);try{e.exports={storeAttrField:function(e,t,r,n){return(new u.default).storeAttrField(e,t,r,n)}}}catch(e){}},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){var e=Error.apply(this,arguments);e.name=this.name="RawHtmlAttributeUpdaterError",this.message=e.message,Object.defineProperty?Object.defineProperty(this,"stack",{get:function(){return e.stack},configurable:!0}):this.stack=e.stack}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u={isElementValid:function(e){return!(!e||"string"!=typeof e||!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e))},isAttrNameValid:function(e){return!(!e||"string"!=typeof e||!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e))},isAttrValueValid:function(e){return!(!e||"string"!=typeof e||!/^[^\/]*$/.test(e))}},i={replaceBetween:function(e,t,r,n){return e.substring(0,t)+n+e.substring(r)}},l={};l.isAttrValueExistInAttrField=function(e,t,r,n){var a=new RegExp("(?:^"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)","g"),u=r.replace(a,""),i=u.split(n);return i.forEach(function(e,r){if(e.trim()===t.trim())return!0}),!1},l.isAttrValueExistInAttrFieldByKey=function(e,t,r,n){var a=new RegExp("(?:^"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*[\\u0022\\u0027])|(?:[\\n\\r\\t\\s]*[\\u0022\\u0027][\\n\\r\\t\\s]*$)","g"),u=r.replace(a,""),i=u.split(n),l=!1;return i.forEach(function(e,r){e.split(":")[0].trim()===t.split(":")[0].trim()&&(l=!0)}),!!l},l.addValueToAttrField=function(e,t,r,n){var a=r;return a=a.replace(new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)(?:[^\\u005C]|)([\\u0022])|([\\u0027])(.*?)(?:[^\\u005C]|)([\\u0027]))","g"),e+"=$1$4$2$5"+n+t+"$3$6 "),a=a.replace(new RegExp(n+n,"g"),n),a=a.replace(new RegExp("(=[\\n\\r\\t\\s]*[\\u0022\\u0027])"+n,"g"),"$1")},l.overwriteValueToAttrField=function(e,t,r){return r.replace(new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)(?:[^\\u005C]|)([\\u0022])|([\\u0027])(.*?)(?:[^\\u005C]|)([\\u0027]))","g"),e+"=$1$4"+t+"$3$6 ")},l.overwriteValueToAttrValueField=function(e,t,r){for(var n=t.split(":")[0].trim(),a=new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)(?:[^\\u005C]|)([\\u0022])|([\\u0027])(.*?)(?:[^\\u005C]|)([\\u0027]))","g"),u=[],l={};null!==(l=a.exec(r));)u.push({value:l[0],index:l.index});return u=u.reverse(),u.forEach(function(e,a){var u=new RegExp("\\b"+n+"[\\n\\r\\t\\s]*:[^;]+[^\\u0027\\u0022;]","g"),l=e.value.replace(u,t);r=i.replaceBetween(r,e.index,e.index+e.value.length,l)}),r},n.prototype=Object.create(Error.prototype,{constructor:{value:n,writable:!0,configurable:!0}});var s=function(){function e(){r(this,e)}return a(e,[{key:"storeAttrField",value:function(e,t,r,a){try{a=a.trim(),r=r.trim(),e=e.trim(),t=t.trim();var s=u.isElementValid(r);if(!s)throw new n("Not valid argument : elementName : The first letter must be an alphabet and the following chracters must consist of alphabets and numbers");var o=u.isAttrNameValid(e);if(!o)throw new n("Not valid argument : attrName : The first letter must be an alphabet and the following chracters must consist of alphabets and numbers");var c=u.isAttrValueValid(t);if(!c)throw new n("Not valid argument : attrValue : The character '/' should not be used");for(var d=new RegExp("<[\\n\\r\\t\\s]*"+r+"[\\n\\r\\t\\s]*[^>]*>","g"),f=[],p={};null!==(p=d.exec(a));)f.push({value:p[0],index:p.index});f=f.reverse(),f.forEach(function(r,n){var u=r.value,s=new RegExp("\\b"+e+"[\\n\\r\\t\\s]*=[\\n\\r\\t\\s]*(?:([\\u0022])(.*?)(?:[^\\u005C]|)([\\u0022])|([\\u0027])(.*?)(?:[^\\u005C]|)([\\u0027]))","g"),o=!1,c=r.value.match(s);switch(e){case"class":if(c&&c.length>0){if(c.length>1)break;o=!0;var d=l.isAttrValueExistInAttrField(e,t,c[0],/[\t\s]+/);d===!1&&(u=l.addValueToAttrField(e,t,r.value," "))}switch(o){case!1:u=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,u);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,u)}break;case"id":if(c&&c.length>0){if(c.length>1)break;o=!0;var d=l.isAttrValueExistInAttrField(e,t,c[0],/[\t\s]+/);d===!1&&(u=l.overwriteValueToAttrField(e,t,r.value))}switch(o){case!1:u=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,u);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,u)}break;case"style":if(c&&c.length>0){if(c.length>1)break;o=!0;var f=l.isAttrValueExistInAttrFieldByKey(e,t,c[0],/[\n\r\t\s]*;[\n\r\t\s]*/);u=f===!1?l.addValueToAttrField(e,t,r.value,";"):l.overwriteValueToAttrValueField(e,t,r.value)}switch(o){case!1:u=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,u);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,u)}break;default:if(c&&c.length>0){if(c.length>1)break;o=!0;var d=l.isAttrValueExistInAttrField(e,t,c[0],/[\t\s]+/);d===!1&&(u=l.addValueToAttrField(e,t,r.value," "))}switch(o){case!1:u=r.value.replace(/([\n\r\t\s]*>|\/[\n\r\t\s]*>)/g," "+e+'="'+t+'"$1'),a=i.replaceBetween(a,r.index,r.index+r.value.length,u);break;default:a=i.replaceBetween(a,r.index,r.index+r.value.length,u)}}})}catch(e){console.log(e)}finally{return a}}}]),e}();t.default=s,e.exports=t.default}]);