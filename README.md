# edits
A little library to calculate the [edit distance](https://en.wikipedia.org/wiki/Edit_distance) between 2 strings, and allow returning the edit record path, transforming string1 -> string2.

## Usage
```typescript
import { editDistance } from 'edits';

const {
    distance,
    records
} = editDistance('art', 'bat', {
    returnEditRecords: true,
});

console.log(distance);
console.log(JSON.stringify(records || [], null, '\t'));
/* Console Output
2
[
	{
		"type": "replace",
		"str1": {
			"index": 0,
			"value": "a"
		},
		"str2": {
			"index": 0,
			"value": "b"
		},
		"transformIndex": 0
	},
	{
		"type": "replace",
		"str1": {
			"index": 1,
			"value": "r"
		},
		"str2": {
			"index": 1,
			"value": "a"
		},
		"transformIndex": 1
	},
	{
		"type": "match",
		"str1": {
			"index": 2,
			"value": "t"
		},
		"str2": {
			"index": 2,
			"value": "t"
		},
		"transformIndex": 2
	}
]
*/
```

### Browser
If you are using `edits` in the browser, then you will want to reference the browser global `Edits`.
```javascript
console.log(Edits.editDistance('foo', 'bar'));
```

### Demos/Examples:  
- https://rcasto.github.io/edits/
- https://codepen.io/rcasto/pen/qBjZOga?editors=0012

## Edit Records
Edit records represent individual operations taken along determining the edit distance between string1 and string2.

The operations or edit record types are:
- Add
- Delete
- Match
- Replace

A `Match` operation does not contribute to the edit distance between the 2 strings.

All of the edit records are in reference to the transformation of string1 advancing towards becoming string2. In that context an add operation/edit record means adding the current character from string2 to string1.