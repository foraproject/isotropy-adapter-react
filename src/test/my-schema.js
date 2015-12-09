import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    greeting: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }) => `Hello user ${id}`
    },
    thrower: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => { throw new Error('Throws!'); }
    }
  }
});


const MutationRootType = new GraphQLObjectType({
  name: 'MutationRoot',
  fields: {
    writeTest: {
      type: QueryRootType,
      resolve: () => ({})
    }
  }
});


var TestSchema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType
});


export default TestSchema;
