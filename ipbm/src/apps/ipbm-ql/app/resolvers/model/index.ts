import Web3 from 'web3'
import { RegistryContract } from 'ipbm-lib'
import roleTask from './role-task'

export default (web3: Web3) => ({
  policyId: async (
    {
      _id,
      registryContract,
    }: {
      _id: string,
      registryContract: RegistryContract,
    }
  ): Promise<string> =>
    registryContract
      .bindingPolicyFromId({
        procId: web3.utils.fromAscii(_id.toString()),
      }),
  roleTask: async (
    {
      _id,
      registryContract,
    },
  ): Promise<any[]> =>
    registryContract
      .taskRoleMapFromId({
        procId: web3.utils.fromAscii(_id.toString()),
      })
      .then(
        _id =>
          roleTask({
            _id,
          }),
      ),  
  taskRoleId: async (
    {
      _id,
      registryContract,
    }: {
      _id: string,
      registryContract: RegistryContract,
    }
  ): Promise<string> =>
    registryContract
      .taskRoleMapFromId({
        procId: web3.utils.fromAscii(_id.toString()),
      }),
})