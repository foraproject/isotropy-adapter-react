import Relay from 'react-relay';

export default {
    name: 'Greeter',
    queries: {
        ship: () => Relay.QL`
            query getShip { ship(id: "10") }
        `
    },
    params: {
        id: 200,
    }
}
