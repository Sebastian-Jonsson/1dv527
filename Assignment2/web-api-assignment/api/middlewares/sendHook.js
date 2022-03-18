const fetch = require('node-fetch')
const Hook = require('../models/hook')

/**
 * Information below has been useful in understanding the webhook.
 * 
 * https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
 * https://www.npmjs.com/package/node-fetch#fetchurl-options
 * https://blog.bearer.sh/consuming-webhooks-with-node-js-and-express/
 * https://www.javaer101.com/en/article/18577356.html
 */
async function sendHook(data) {
    Hook.find()
    .select('-__v')
    .then(hooks => {
        for(const hook of hooks) {
            fetch(hook.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
        }
    })
}

module.exports = { sendHook }