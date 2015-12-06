/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

export type RequestContextType = {
    body: string
};

export type ReactAdapterOptionsType = {
    renderToStaticMarkup?: boolean,
    template: (html: string) => string
};

export default {
    render: function(requestContext: RequestContextType, component: Object, options: ReactAdapterOptionsType) {
        if (typeof options.renderToStaticMarkup === "undefined" || options.renderToStaticMarkup === null) {
            options.renderToStaticMarkup = false;
        }

        if (!options.template) {
            options.template = x => x;
        }

        const html = (options.renderToStaticMarkup) ?
            ReactDOMServer.renderToStaticMarkup(component) : ReactDOMServer.renderToString(component);
        requestContext.body = options.template(html);
    }
}
