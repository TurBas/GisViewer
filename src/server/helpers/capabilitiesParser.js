(function(capabilitiesParser) {
    'use strict';

    capabilitiesParser.parse = parse;

    /////////////////

    var _ = require('underscore');
    var xmlParser = require('xml2js').parseString;

    function parse(capabilities, next){
        xmlParser(capabilities, function(err, result){
            if (err)
            {
                next("Error parsing capabilities. " +  err.message);
            } else if (result && result.WMS_Capabilities) {
                var root = result.WMS_Capabilities;
                var service = root.Service[0];

                var capabilities = {
                    abstract: service.Abstract,
                    keywords: getKeywordsFromService(service),
                    title: service.Title[0],
                    version: root.$.version
                };

                next(null, capabilities);
            } else {
                next("Error parsing capabilities.")
            }
        });
    }

    function getKeywordsFromService(service){
        var keywordsList = (service.KeywordList && service.KeywordList.length) ? service.KeywordList[0].Keyword : [];
        return _.map(keywordsList, function (val) {
            return val.trim()
        })
    }

}(module.exports));