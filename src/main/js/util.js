/*
 * Modified from
 * https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
 * to work with arrays
 */
export function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var attr = decodeURIComponent(pair[0]);
        var val = decodeURIComponent(pair[1] || '');
        if (query.hasOwnProperty(attr)) {
            if (Array.isArray(query[attr])) {
                query[attr] = [...query[attr], val];
            } else {
                query[attr] = [query[attr], val];
            }
        } else {
            query[attr] = val;
        }
    }
    return query;
}