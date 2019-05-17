import _debug from 'debug'

import registerModels from './register-models'
// Step 1. Model Registration: Collects the compilation artifacts of the produced models, 
//         and saves all these metadata as an entry in the Process Repository.

const debug = _debug('ipbm-ql:model:register-model')

export default (
  web3,
  registryContract,
  modelInfo,
  contracts,
  registryId
) => {
  // Sorting elements such that children are created first
  let sortedElements = [
    {
      nodeId: modelInfo.id,
      nodeName: modelInfo.name,
      bundleId: '',
      nodeIndex: 0,
      bundleParent: '',
      factoryContract: '',
    }
  ]
  for (let i = 0; i < sortedElements.length; i++) {
    if (modelInfo.controlFlowInfoMap.has(sortedElements[i].nodeId)) {
      let cfInfo = modelInfo.controlFlowInfoMap.get(sortedElements[i].nodeId)
      let candidates = [cfInfo.multiinstanceActivities, cfInfo.nonInterruptingEvents, cfInfo.callActivities]
      candidates.forEach(children => {
        if (children) {
          children.forEach((value, key) => {
            sortedElements.push({ nodeId: key, nodeName: value, bundleId: '', nodeIndex: 0, bundleParent: '', factoryContract: '' })
          })
        }
      })
    }
  }
  sortedElements.reverse();
  let nodeIndexes = new Map();
  for (let i = 0; i < sortedElements.length; i++)
    nodeIndexes.set(sortedElements[i].nodeId, i)
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
