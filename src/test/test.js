import __polyfill from "babel-polyfill";
import React from "react";
import should from 'should';
import adapter from "../isotropy-adapter-react";
import MyComponent from "./my-component";

//For now the GraphQL server is going to run as a separate process.
import express from 'express';
import graphQLHTTP from 'express-graphql';

// isomorphic-relay must be loaded before react-relay (happens in isotropy-adapter-react)
// or you get "self is not defined"
// https://github.com/denvned/isomorphic-relay/commit/5a7b673250bd338f3333d00075336ffcc73be806
import Relay from "react-relay";

describe("Isotropy", () => {

  const staticMarkupTypes = [false, true];

  staticMarkupTypes.forEach((isStatic) => {
    it(`Should serve a React UI${isStatic ? "with Static Markup" : ""}`, () => {
      const component = MyComponent;
      const req = {};
      const res = {
        body: "",
        end: function(html) { this.body = html; }
      };

      adapter.render({
        component,
        args: { name: "Jeswin"},
        req,
        res,
        renderToStaticMarkup: isStatic,
        toHtml: x => x
      });
      if (!isStatic) {
        res.body.should.containEql("Jeswin");
      } else {
        res.body.should.equal("<html><body>Hello Jeswin</body></html>");
      }
    });
  });

});
