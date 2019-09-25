'use strict';

const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const HapiUrl = require('hapi-url');
const Boom = require('boom');

const init = async () => {

    const dbOpts = {
        url: 'mongodb+srv://passpasteuser:Mariasshadow64!@cluster0-gkjcs.gcp.mongodb.net/PassPaste?retryWrites=true&w=majority',
        settings: {
            poolSize: 10
        },
        decorate: true
    };

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOpts
    });


    server.route([
    {
        method: 'GET',
        path: '/api/ping',
        handler: (request, h) => {
            return 'pong'
        }
    },
    {
        method: 'POST',
        path: '/api/make_post',
        handler: (request, h) => {
            const newUUID = uuid.v4();
            const newPost = {
                text: request.payload.text,
                password: request.payload.password,
                url: HapiUrl.resolve(request, "/post") + '/' + newUUID
            }

            if(!newPost.text || !newPost.password) {
                return h.response("Please include text and password").code(400);
            }

            if(!newPost.url) {
                return h.response("Failure to create post").code(500);
            }
            const db = request.mongo.db;
            db.collection("posts").insertOne(newPost, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
              });
            return h.response(newPost).code(200);
        }
    },
    {
        method: 'GET',
        path: '/api/post/{uuid}',
        handler: (request, h) => {
            return h.redirect("/ping")
        }
    },
    { //Get a post using the given password
        method: 'POST',
        path: '/api/post/{uuid}',
        handler: async (request, h) => {
            const db = request.mongo.db;
            const id = request.params.uuid;
            const pass = request.payload.password;
            
            try {
                const result = await db.collection("posts").findOne({url: "http://localhost:3000/post/" + id});
                if(result.password === pass) return result.text
                
                return h.response("Incorrect Password: " + pass).code(400);
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }

    },
]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();