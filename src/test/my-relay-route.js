import Relay from 'react-relay';

export default {
    name: 'User',
    queries: {
        user: () => Relay.QL`query { node(id: $id) }`,
    },
    params: {
        id: '842472',
    }
}
