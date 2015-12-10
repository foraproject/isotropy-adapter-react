import Relay from 'react-relay';

export default {
    name: 'Greeter',
    queries: {
        greeter: () => Relay.QL`query { greeting(id: $id) }`,
    },
    params: {
        id: '842472',
    }
}
