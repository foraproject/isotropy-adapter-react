/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import IsomorphicRelay from "isomorphic-relay";
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';

export type RequestContextType = {
    body: string
}


export type ReactAdapterOptionsType = {
    renderToStaticMarkup?: boolean,
    template: (html: string, props: Object) => string
}


export type renderArgsType = {
    component: Function,
    relayRoute: Object,
    props: Object,
    context: KoaContext,
    options: ReactAdapterOptionsType
}


const render = function(params: Object) {
    const { component, args, context, options } = params;
    const reactElement = React.createElement(component, args);
    const template = options.template || ((x, args) => x);
    const renderToStaticMarkup = (typeof options.renderToStaticMarkup !== "undefined" && options.renderToStaticMarkup !== null) ? options.renderToStaticMarkup : false;
    const html = !renderToStaticMarkup ? ReactDOMServer.renderToString(reactElement) : ReactDOMServer.renderToStaticMarkup(reactElement);
    context.body = template(html, args);
};


const renderRelayContainer = async function(params: Object) {
    const { relayContainer, relayRoute, props, context, graphqlUrl, options } = params;

    const rootContainerProps = {
        Component: relayContainer,
        route: relayRoute
    };

    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));
    RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {});

    return IsomorphicRelay.prepareData(rootContainerProps).then(data => {
        const template = options.template || ((x, props) => x);
        const renderToStaticMarkup = (typeof options.renderToStaticMarkup !== "undefined" && options.renderToStaticMarkup !== null) ? options.renderToStaticMarkup : false;
        const relayElement = <IsomorphicRelay.RootContainer {...rootContainerProps} />;
        const html = !renderToStaticMarkup ? ReactDOMServer.renderToString(relayElement) : ReactDOMServer.renderToStaticMarkup(relayElement);
        context.body = template(html, props);
    });
};


export default {
    render,
    renderRelayContainer
};
