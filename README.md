# adam-yjy
>10 frequently-used function
## Install
```sh
npm install adam-yjy
```
## Usage
```sh
import Tool from 'adam-yjy'
```
## function
### query (name, querystring) 
Gets the value of the specified name in the specified querystring
```js
 Tool.query('hello', '?hello=js') //return 'js
```
### serialize (data) 
serialized objects
```js
  Tool.serialize({hello: 'js', hi: 'test'}) return 'hello=js&hi=test'
```
### $ (selector)
Lookup DOM according to the selector
```js
 Tool.$ (selector) //return DOM
```
### removeNode (node)
Delete the DOM node
### insertAfter (node, target)
Insert the node node after the target node
### addClass (node, className) 
Add class to the specified DOM
### removeClass (node, className)
Remove class from the specified DOM
### getAbsoluteUrl (url)
Getting the absolute path on the current page
```js
  Tool.getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
```
### debounce (callback, time = 500)
debounce
### removeItemByIndex (index, arr)
Moving an item out of an array by index
```js
  Tool.removeItemByIndex(1, [1,2,3]) => [1, 3]
```

