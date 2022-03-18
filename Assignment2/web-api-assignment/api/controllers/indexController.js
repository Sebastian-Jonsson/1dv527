const indexController = {}

VERSION = process.env.API_VERSION

indexController.index = async (req, res, next) => {
    res.status(200).json({
        meta: {
          license: 'MIT',
          title: 'Spells REST API',
          author: 'Sebastian Jonsson',
          version: VERSION,
          contentType: 'application/json',
          description: `Register a user, after do a login so that you receive access rights certain methods.`
        },
        links: {
          self: {
            method: 'GET',
            accessRights: 'Not Required.',
            description: 'The Root of the API.',
            url: `${req.protocol}://${req.headers.host}${req.originalUrl}`
          },
          users: {
            viewUsers: {
              method: 'GET',
              accessRights: 'Not Required.',
              description: 'View all registered users.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/users`
            },
            register: {
              method: 'POST',
              contentType: 'application/json',
              accessRights: 'Not Required.',
              description: 'In order to register send the following in JSON format: { email: <email>, password: <String> }',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/users`
            },
            login: {
              method: 'POST',
              contentType: 'application/json',
              accessRights: 'Not Required.',
              description: 'In order to login send the following in JSON format: { email: <email>, password: <String> }',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/users/login`
            },
            unregister: {
              method: 'DELETE',
              accessRights: 'Required.',
              description: 'In order to unregister, make sure to include the id in the uri while logged in with a token.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/users/:userId`
            }
          },
          spells: {
            showEverySpell: {
              method: 'GET',
              accessRights: 'Not Required.',
              description: 'View all created spells.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/spells`
            },
            findSpecificSpell: {
              method: 'GET',
              accessRights: 'Not Required.',
              description: 'View specific a spell based on spellId.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/spells/:spellId`
            },
            createSpell: {
              method: 'POST',
              contentType: 'application/json',
              accessRights: 'Required.',
              description: `In order to create a new spell send the following in JSON format: { name: <String>, level: <Number>, castingTime: <String>, rangeOrArea: <String>, components: <String>, duration: <String>, school: <String>, attackOrSave: <String>, damageOrEffect: <String> }`,
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/spells`
            },
            improveSpell: {
              method: 'PATCH',
              contentType: 'application/json',
              accessRights: 'Required.',
              description: 'Update a specific spell based on spellId. Send any of the following in JSON format: { name: <String>, level: <Number>, castingTime: <String>, rangeOrArea: <String>, components: <String>, duration: <String>, school: <String>, attackOrSave: <String>, damageOrEffect: <String> }',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/spells/:spellId`
            },
            removeSpell: {
              method: 'DELETE',
              accessRights: 'Required.',
              description: 'In order to remove a spell, make sure to include the id in the uri while logged in with a token.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/spells/:spellId`
            },
          },
          hooks: {
            viewHooks: {
              method: 'GET',
              accessRights: 'Not Required.',
              description: 'View all webhooks.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/webhooks`
            },
            createHook: {
              method: 'POST',
              contentType: 'application/json',
              accessRights: 'Required.',
              description: 'In order to create a new spell send the following in JSON format: { url: <String>, representiveName: <String>}',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/webhooks`
            },
            removeHook: {
              method: 'DELETE',
              accessRights: 'Required.',
              description: 'In order to remove a webhook, make sure to include the id in the uri while logged in with a token.Remove a webhook.',
              url: `${req.protocol}://${req.headers.host}${req.originalUrl}/${VERSION}/webhooks/:hookId`

            }
          }
        }
    })
  }

module.exports = indexController