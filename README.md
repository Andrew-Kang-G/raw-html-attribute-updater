# Raw-html-attribute-updater

## Overview

**Raw-html-attribute-updater** is an open source JavaScript library. 
This is useful when **updating an attribute of all same kinds of elements in raw html** saved or edited by Wysiwyg. Moreover, as the core parsing logic is a strong combination of regular expressions. You can use this library for not only html but also any kinds of tag-based resources.

## Example Usage

#### Installation & Usage

``` javascript

var htmlStr = '<p></p>\n' +
            '<img style="max-width: 50%;float:none;width: auto;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>\n' +
            '<p></p>\n' +
            '<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>\n' +
            '<p><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>\n' +
            '<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>';

var elementName = 'img';
var attrName = 'style';
var attrValue = 'max-width:100%';
	
```

For ES6 npm users, 'npm install --save raw-html-attribute-updater'.
(https://www.npmjs.com/package/raw-html-attribute-updater)

``` javascript

import RawHtmlAttributeUpdater from './raw-html-attribute-updater';

new RawHtmlAttributeUpdater().storeAttrField(attrName, attrValue, elementName, htmlStr)  // Returns htmlStr that has been updated with elementName, attrName, attrValue.

```

For ES5 users,

``` html

<html>
<body>
	<p id="content"></p>
	<p><button id="loadCat">Lazy load <b>Cat</b></button></p>
	<script src="../dist/raw-html-attribute-updater.bundle.js"></script>
	<script type="text/javascript">

        RawHtmlAttributeUpdater.storeAttrField(attrName, attrValue, elementName, htmlStr); // Returns htmlStr that has been updated with elementName, attrName, attrValue.

	</script>
</body>
</html>

```

#### Syntax Overview

##### The function above returns different results according to three types of attrName below.

***

- attrName : style (before)

``` javascript

attrName = 'style';
attrValue = 'max-width:100%';
elementName = 'img';
htmlStr = '<p></p>\n' +
          '<img style="max-width: 50%;float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>\n' +
          '<p></p>\n' +
          '<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>\n' +
          '<p><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>\n' +
          '<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>';
        
```

###### The following is the result of the example. (You can see differences for every 'style' for every 'img') 

- attrName : style (after)

``` javascript

<p></p>
<img style="max-width:100%;float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>
<p></p>
<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>
<p><img style="float:none;height: 200px;margin-top : 3;max-width:100%"  src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>
<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>

```

***

- attrName : id (before)

``` javascript

attrName = 'id';
attrValue = 'abc';
elementName = 'p';
htmlStr = '<p></p>\n' +
          '<img style="max-width: 50%;float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>\n' +
          '<p></p>\n' +
          '<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>\n' +
          '<p><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>\n' +
          '<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>';
        
```

###### The following is the result of the example. (You can see differences for every 'id' for every 'p') 

- attrName : id (after)

``` javascript

<p id="abc"></p>
<img style="max-width: 50%;float:none;width: auto;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>
<p id="abc"></p>
<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>
<p id="abc"><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>
<p style="text-align:center;" id="abc">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>

```

***

- attrName : class (before)

``` javascript

attrName = 'class';
attrValue = 'xyz';
elementName = 'p';
htmlStr = '<p></p>\n' +
          '<img style="max-width: 50%;float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>\n' +
          '<p></p>\n' +
          '<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>\n' +
          '<p><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>\n' +
          '<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>';
        
```

###### The following is the result of the example. (You can see differences for every 'class' for every 'p') 

- attrName : class (after)

``` javascript

<p class="xyz"></p>
<img style="max-width: 50%;float:none;width: auto;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>
<p class="xyz"></p>
<p id="abc" class="def xxx gh xyz" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>
<p class="xyz"><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>
<p style="text-align:center;" class="xyz">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>

```

***

- attrName : random (before)

All other attrNames except for the three above function like in a 'class' way. 
For example,

``` javascript

attrName = 'monkey';
attrValue = 'happy';
elementName = 'p';
htmlStr = '<p monkey="kind"></p>\n' +
          '<img style="max-width: 50%;float:none;width: auto;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>\n' +
          '<p></p>\n' +
          '<p id="abc" class="def xxx gh" style="text-align:center;"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>\n' +
          '<p><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>\n' +
          '<p style="text-align:center;">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>';
        
```

###### The following is the result of the example. (You can see differences for every 'monkey' for every 'p') 

- attrName : random (after)

``` javascript

<p monkey="kind happy" ></p>
<img style="max-width: 50%;float:none;width: auto;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=12345.png" alt="undefined"/>
<p monkey="happy"></p>
<p id="abc" class="def xxx gh" style="text-align:center;" monkey="happy"><span style="color: rgb(127,127,127);">Please align the paper to the left.</span>&nbsp;</p>
<p monkey="happy"><img style="float:none;height: 200px;margin-top : 3%" src="/image/showWorkOrderImg?fileName=123456.png" alt="undefined"/></p>
<p style="text-align:center;" monkey="happy">※Please ask your manager if you have any issues! ※&nbsp;&nbsp;&nbsp;&nbsp;</p>

