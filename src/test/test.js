import __polyfill from "babel-polyfill";
import React from "react";
import should from 'should';
import adapter from "../isotropy-adapter-react";
import schema from "./my-schema";
import MyComponent from "./my-component";
import MyRelayComponent from "./my-relay-component";
import MyRelayRoute from "./my-relay-route";

//For now the GraphQL server is going to run as a separate process.
import express from 'express';
import graphQLHTTP from 'express-graphql';

// isomorphic-relay must be loaded before react-relay (happens in isotropy-adapter-react)
// or you get "self is not defined"
// https://github.com/denvned/isomorphic-relay/commit/5a7b673250bd338f3333d00075336ffcc73be806
import Relay from "react-relay";

describe("Isotropy", () => {

    before(() => {
        const APP_PORT = 8080;

        const app = express();

        // Expose a GraphQL endpoint
        app.use('/graphql', graphQLHTTP({schema, pretty: true}));

        app.listen(APP_PORT);
    });

    it(`Should serve a React UI`, () => {
        const component = MyComponent;
        const context = {};
        const options = {
            renderToStaticMarkup: false,
            toHtml: x => x
        };
        adapter.render({
            component,
            args: { name: "Jeswin"},
            context,
            options
        });
        context.body.should.startWith("<html data-reactid");
        context.body.should.startWith("<html");
    });


    it(`Should serve a React UI with Static Markup`, () => {
        const component = MyComponent;
        const context = {};
        const options = {
            renderToStaticMarkup: true,
            toHtml: x => x
        };
        adapter.render({
            component,
            args: { name: "Jeswin" },
            context,
            options
        });
        context.body.should.equal("<html><body>Hello Jeswin</body></html>");
    });


    it(`Should serve a Relay + React UI with Static Markup`, () => {
        const relayContainer = MyRelayComponent;
        const context = {};
        const options = {
            renderToStaticMarkup: true,
            toHtml: x => x
        };

        const promise = new Promise((resolve, reject) => {
            const graphqlUrl = `http://localhost:8080/graphql`;

            return adapter.renderRelayContainer({
                relayContainer,
                relayRoute: MyRelayRoute,
                args: { id: "200" },
                context,
                graphqlUrl,
                options
            }).then(resolve, reject);
        });

        return promise.then(() => {
            context.body.should.equal("<html><body>Hello ENTERPRISE</body></html>");
        });
    });

});
