# urbit-ob

[![Build Status](https://secure.travis-ci.org/urbit/ob-js.png)](http://travis-ci.org/urbit/ob-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/urbit-ob.svg)](https://www.npmjs.com/package/urbit-ob)

Utilities for phonetic base wrangling.

## What

Here you can primarily find functions for dealing with the *phonetic bases*
used by Urbit.  The `@p` encoding is used for naming ships, while the `@q`
encoding is used for representing arbitrary data in a memorable and
pronounceable fashion.

The `@p` encoding is an *obfuscated* representation of an underlying 32-bit
number, in particular, hence the 'ob' in the library's name.

## Install

A simple `npm install` should do it.

## Usage

The library exposes two families of functions:

* `patp / patp2dec / patp2hex / hex2patp`
* `patq / patq2dec / patq2hex / hex2patq``

They are pretty self-explanatory.  Use `patp` or `patq` to convert base-10
numbers (or strings encoding base-10 numbers) to `@p` or `@q` respectively.
Use `patp2dec` or `patq2dec` to go in reverse.  `patp2hex`, `patq2hex`, and
their inverses work similarly.

Some examples:

```
> const ob = require('urbit-ob')
> ob.patp('0')
'~zod'
> ob.patp2dec('~nidsut-tomdun')
'15663360'
> ob.hex2patq('010203')
'~doznec-binwes'
> ob.patq2hex('~marned-wismul-nilsev-botnyt')
'01ca0e51d20462f3'
```

There are a few other noteworthy functions exposed as well:

* `clan`, for determining the ship class of a `@p` value
* `sein`, for determining the parent of a `@p` value
* `eqPatq`, for comparing `@q` values for equality

In the third case: `@q` values are considered equal modulo the existence of
leading zero bytes, so that, for example:

```
> '~doznec-marzod' === '~nec-marzod'
false
> ob.eqPatq('~doznec-marzod', '~nec-marzod')
true
```

## Testing

A simple `npm test` will run the test suite.
