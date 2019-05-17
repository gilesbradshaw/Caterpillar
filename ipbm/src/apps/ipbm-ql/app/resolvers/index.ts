import GraphQLJSON from 'graphql-type-json'
import mutation from './mutation'
import query from './query'
import processContract from './process-contract'
import registry from './registry'
import model from './model'

export default (web3): object => ({
  JSON: GraphQLJSON,
  Mutation: mutation(web3),
  Query: query(web3),
  ProcessContract: processContract(web3),
  Registry: registry(web3),
  Model: model(web3),
})
