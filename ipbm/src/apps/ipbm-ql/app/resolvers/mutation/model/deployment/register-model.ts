import _debug from 'debug'

import registerModels from './register-models'
import getSortedElements from './get-sorted-elements'
// Step 1. Model Registration: Collects the compilation artifacts of the produced models, 
//         and saves all these metadata as an entry in the Process Repository.

const debug = _debug('ipbm-ql:model:register-model')

export default ({
  web3,
  registryContract,
  modelInfo,
  contracts,
  registryId
}) => {
  // Sorting elements such that children are created first
  const sortedElements = getSortedElements(modelInfo)(
    {
      nodeId: modelInfo.id,
      nodeName: modelInfo.name,
      bundleId: '',
      nodeIndex: 0,
      bundleParent: '',
      factoryContract: '',
    }
  )
  const nodeIndexes = sortedElements
    .reduce(
      (acc, { nodeId }, i) =>
        acc.set(nodeId, i),
      new Map(),
    )
  debug('....................................................................')
  debug('UPDATING COMPILATION ARTIFACTS IN REPOSITORY ...')
  return registerModels({
    web3,
    registryContract,
    currentIndex: 0,
    sortedElements,
    nodeIndexes,
    modelInfo,
    contracts,
    registryId,
  })
}
