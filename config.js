var secretKey = '12345-67890-09876-54321';
var mongoUrl = process.env.MONGO_CONNECTION;
var fbClientId = process.env.DMA_FB_CLIENTID;
var fbClientSecret = process.env.DMA_FB_SECRET;
var mailApiKey = process.env.DMA_MAILGUN_KEY;

module.exports = {
    'secretKey': secretKey,
    'mongoUrl': mongoUrl,
    'facebook': {
        clientID: fbClientId,
        clientSecret: fbClientSecret,
        callbackURL: 'http://localhost:3000/users/facebook/callback'
    },
    'mailApiKey': mailApiKey
}