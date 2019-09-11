var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://YOUR-JWKSURI.auth0.com/.well-known/jwks.json' // Replace it with your jwksUri
    }),
    getToken: function fromHeaderOrQuerystring(req){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer"){
            return req.headers.authorization.split(' ')[1];
        }else if(req.query && req.query.access_token){
            return req.query.access_token
        }else{
            return null
        }
    },
    audience: 'my_audience', // Replace it with your audience
    issuer: 'https://YOUR-JWKSURI.auth0.com/', // Replace it with your issuer
    algorithms: ['RS256']
});

module.exports = function(){
    return jwtCheck;
}