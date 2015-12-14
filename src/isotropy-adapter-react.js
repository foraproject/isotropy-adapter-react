/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import IsomorphicRelay from "isomorphic-relay";
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';

type KoaContextType = {
    code: number;
    redirect: (url: string) => void;
    method: string;
    path: string;
    status: number;
    body: string;
}

export type ReactAdapterOptionsType = {
    renderToStaticMarkup?: boolean,
    template: (html: string, props: Object) => string
}

export type RenderArgsType = {
    component: Function,
    args: Object,
    context: KoaContextType,
    options: ReactAdapterOptionsType
}

export type RenderRelayContainerArgsType = {
    relayContainer: Function,
    relayRoute: Object,
    args: Object,
    graphqlUrl: string,
    context: KoaContextType,
    options: ReactAdapterOptionsType
}

const render = function(params: RenderArgsType) : void {
    const { component, args, context } = params;
    const options = params.options || {};

    const reactElement = React.createElement(component, args);
    const template = options.template || ((x, args) => x);
    const renderToStaticMarkup = (typeof options.renderToStaticMarkup !== "undefined" && options.renderToStaticMarkup !== null) ? options.renderToStaticMarkup : false;
    const html = !renderToStaticMarkup ? ReactDOMServer.renderToString(reactElement) : ReactDOMServer.renderToStaticMarkup(reactElement);
    context.body = template(html, args);
};


const renderRelayContainer = async function(params: RenderRelayContainerArgsType) : Promise {
    const { relayContainer, relayRoute, args, context, graphqlUrl, options } = params;

    const rootContainerProps = {
        Component: relayContainer,
        route: relayRoute
    };

    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphqlUrl));
    RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {});

    return IsomorphicRelay.prepareData(rootContainerProps).then(data => {
        const template = options.template || ((x, args) => x);
        const renderToStaticMarkup = (typeof options.renderToStaticMarkup !== "undefined" && options.renderToStaticMarkup !== null) ? options.renderToStaticMarkup : false;
        const relayElement = <IsomorphicRelay.RootContainer {...rootContainerProps} />;
        const html = !renderToStaticMarkup ? ReactDOMServer.renderToString(relayElement) : ReactDOMServer.renderToStaticMarkup(relayElement);
        context.body = template(html, args);
    });
};


export default {
    render,
    renderRelayContainer
};
