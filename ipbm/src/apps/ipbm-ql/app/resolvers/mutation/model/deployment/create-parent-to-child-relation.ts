import _debug from 'debug'

import registerFactory from './register-factory'

const debug = _debug('ipbm-ql:model:create-parent-to-child-relation')

const createParent2ChildRelation = ({
  web3,
  registryContract,
  currentIndex,
  sortedElements,
  contracts,
  modelInfo,
  registryId,
}) => {
  return web3.eth.personal.getAccounts()
    .then(
      accounts =>
        registryContract
          .addChildBundleId({
            parentBundleId: web3.utils.fromAscii(sortedElements[currentIndex].bundleParent),
            processBundleId: web3.utils.fromAscii(sortedElements[currentIndex].bundleId),
            nodeIndex: sortedElements[currentIndex].nodeIndex,
          })
          (
            {
              from: accounts[0],
              gas: 4700000
            },
          )
          .then(
            (result) => {
              debug('child bundleId added')
              if (currentIndex + 1 < sortedElements.length) {
                return createParent2ChildRelation({
                  web3,
                  registryContract,
                  currentIndex: currentIndex + 1,
                  sortedElements,
                  contracts,
                  modelInfo,
                  registryId,
                })
              } else {
                debug('....................................................................')
                let removedCallActivities = []
                sortedElements.forEach(element => {
                  if (modelInfo.controlFlowInfoMap.has(element.nodeId) || modelInfo.globalNodeMap[element.nodeId].$type === 'bpmn:StartEvent') {
                    removedCallActivities.push(element)
                  }
                })
                if (removedCallActivities.length > 0) {
                  debug('DEPLOYING FACTORIES AND UPDATING PROCESS-FACTORY RELATION IN REGISTRY ...')
                  return registerFactory({
                    web3,
                    registryContract,
                    currentIndex: 0,
                    sortedElements: removedCallActivities,
                    contracts,
                    modelInfo,
                    registryId,
                  })
                }
              }
            }
          )
        )
}

export default createParent2ChildRelation
