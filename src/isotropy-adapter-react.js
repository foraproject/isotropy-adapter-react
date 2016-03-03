/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import type { IncomingMessage, ServerResponse } from "isotropy-interfaces/node/http";

export type RenderArgsType = {
  component: Function,
  req: IncomingMessage,
  res: ServerResponse,
  args: Object,
  renderToStaticMarkup?: boolean,
  toHtml: (html: string, props: Object) => string
}

const render = async function(params: RenderArgsType) : Promise {
  const { component, args, req, res, toHtml, renderToStaticMarkup } = params;
  const reactElement = React.createElement(component, args);
  const _toHtml = toHtml || ((x, args, data) => x);
  const _renderToStaticMarkup = (typeof renderToStaticMarkup !== "undefined" && renderToStaticMarkup !== null) ? renderToStaticMarkup : false;
  const html = !_renderToStaticMarkup ? ReactDOMServer.renderToString(reactElement) : ReactDOMServer.renderToStaticMarkup(reactElement);
  res.end(_toHtml(html, args));
};

export default {
  render
};
