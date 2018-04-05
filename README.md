# jazy

A source file lazy loader implemented in ~460 bytes of native browser JS, compatible with legacy browsers (possibly IE 6 and such). Useful for minimal, frameworkless setups.

```javascript
function callToExternalFunction() {
	jazy.load('http://www.cdn.com/external-script.js') // appends a <script> tag to the document
		.then(() => { // file has been loaded
			externalFunction();
		})
		.catch((e) => { // an exception occured
		});
}
```

The result of loading a script is equivalent to using a hardcoded `<script>` tag in html, which means the content of the script is added to the global scobe. Unlike hardcoded scripts, jazy can be called lazily (at any point in the code), as opposed to being placed in a fixed place in the head or body of the document. Multiple load calls for the same path will only import it the first time (on subsequent calls, all `then` callbacks will be executed immediately).
