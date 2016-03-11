# frontdomain [![NPM version][npm-image]][npm-url]
Simple utility for representing domain-fronted access in a single domain name.

## What is Domain Fronting?

Domain fronting is a system for connecting to a site on a CDN without revealing
the destination site to a passive network adversary.  This approach has been
pioneered by [the meek transport for Tor](https://trac.torproject.org/projects/tor/wiki/doc/meek).

In short, domain fronting works by establishing a TLS connection to one site on
the CDN (revealing the domain name in DNS queries and TLS-SNI), and then
changing the HTTP host header to indicate a request to a different site on the
same CDN.  Most CDNs serve these queries without a problem.  A hostile observer
cannot determine which site the user is accessing, because the Host header is
transmitted inside the TLS tunnel.

## The goal

Suppose you want to use domain fronting with an existing library that performs
some HTTP operations.  If this library doesn't already support domain fronting,
you might have to modify its network access code, effectively requiring you to
maintain a fork of the library.  This would be inconvenient.

This package is designed to support an alternative solution: swap out the
underlying HTTP access primitives (e.g. [freedom-xhr](https://github.com/uproxy/freedom-xhr)),
encode the domain fronting in special domain names, and thereby add domain
fronting support to existing libraries without modifying their code.

## The encoding

Suppose you are trying to access `az786092.vo.msecnd.net`, while revealing only
a front domain of `ajax.aspnetcdn.com`.  frontdomain would encode this as a
single domain name:
```
ajax.aspnetcdn.com.az786092.vo.msecnd.net.3.domainfront
```
The two domains are simply concatenated, followed by the number of
components in the front domain, followed by the magic TLD `domainfront`.

## Usage

```javascript
var frontdomain = require('frontdomain');
var front = 'ajax.aspnetcdn.com';
var host = 'az786092.vo.msecnd.net';
var munged = frontdomain.munge(front, host);
// munged == 'ajax.aspnetcdn.com.az786092.vo.msecnd.net.3.domainfront'
var isFront = frontdomain.isFront(munged);
// isFront == true
var demunged = frontdomain.demnuge(munged);
// demunged.front == front
// demunged.host == host
```

## License

Licensed under [the Apache-2.0 license](LICENSE).  Maintained by [@bemasc](https://github.com/bemasc).


[npm-url]: http://badge.fury.io/js/freedom-xhr
[npm-image]: https://badge.fury.io/js/freedom-xhr.png
