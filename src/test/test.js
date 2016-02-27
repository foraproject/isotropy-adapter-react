import __polyfill from "babel-polyfill";
import React from "react";
import should from 'should';
import adapter from "../isotropy-adapter-react";
import MyComponent from "./my-component";

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
