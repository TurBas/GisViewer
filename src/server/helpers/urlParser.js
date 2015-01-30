(function(urlParser) {
    'use strict';

    urlParser.parse = parse;

    /////////////////

    var http = require('http');
    var https = require('https');
    var querystring = require('querystring');
    var url = require('url');
    var _ = require('underscore');

    function parse(requestUrl, additionalQueryParams) {
        var result = {};

        var parsedUrl = url.parse(requestUrl, true);
        _.extend(parsedUrl.query, additionalQueryParams || {});
        var query = parsedUrl.query ? ('?' + querystring.stringify(parsedUrl.query)) : '';

        result.protocol = parsedUrl.protocol == 'https:' ? https : http;
        result.options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: (parsedUrl.pathname ? parsedUrl.pathname : '') + query + (parsedUrl.hash ? parsedUrl.hash : '') ,
            method: 'GET'
        };

        return result;
    }

}(module.exports));