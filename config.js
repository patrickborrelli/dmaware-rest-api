var secretKey = process.env.DMA_SECRET_KEY;
var mongoUrl = process.env.DMA_MONGO_URL;
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