import __polyfill from "babel-polyfill";
import React from "react";
import should from 'should';
import adapter from "../isotropy-adapter-react";
import MyComponent from "./my-component";
import MyRelayComponent from "./my-relay-component";
import MyRelayRoute from "./my-relay-route";

// isomorphic-relay must be loaded before react-relay (happens in isotropy-adapter-react)
// or you get "self is not defined"
// https://github.com/denvned/isomorphic-relay/commit/5a7b673250bd338f3333d00075336ffcc73be806
import Relay from "react-relay";

describe("Isotropy", () => {


    it(`Should serve a React UI`, () => {
        const component = MyComponent;
        const context = {};
        const options = {
            renderToStaticMarkup: false,
            template: x => x
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
            template: x => x
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
            template: x => x
        };

        const promise = new Promise((resolve, reject) => {
            return adapter.renderRelayContainer({
                relayContainer,
                relayRoute: MyRelayRoute,
                args: { name: "Jeswin" },
                context,
                options
            }).then(resolve, reject);
        });

        return promise.then(() => {
            context.body.should.equal("<html><body>Hello World</body></html>");
        });
    });

});
