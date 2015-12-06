import __polyfill from "babel-polyfill";
import should from 'should';
import adapter from "../isotropy-adapter-react";
import MyComponent from "./my-component";
import React from "react";

describe("Isotropy", () => {


    it(`Should serve a React UI`, () => {
        const context = {};
        const component = React.createElement(MyComponent);
        const options = {
            renderToStaticMarkup: false,
            template: x => x
        };
        adapter.render(context, component, options);
        context.body.should.startWith("<html data-reactid");
        context.body.should.startWith("<html");
    });


    it(`Should serve a React UI with Static Markup`, () => {
        const context = {};
        const component = React.createElement(MyComponent);
        const options = {
            renderToStaticMarkup: true,
            template: x => x
        };
        adapter.render(context, component, options);
        context.body.should.equal("<html><body>Hello World</body></html>");
    });

});
