import gql from "graphql-tag"

export default (name: string) => gql`
  fragment ${name} on RoleTask {
    _id
    address
    solidityCode
    abi
    bytecode
  }
`
