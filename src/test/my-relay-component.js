import React from 'react';
import Relay from 'react-relay';
import MyComponent from "./my-component";

const relayComponent = Relay.createContainer(
    MyComponent,
    {
        fragments: {
            greeter: () => Relay.QL`
                fragment on QueryRoot {
                    greeting
                }
            `,
        }
    }
);

export default relayComponent;
