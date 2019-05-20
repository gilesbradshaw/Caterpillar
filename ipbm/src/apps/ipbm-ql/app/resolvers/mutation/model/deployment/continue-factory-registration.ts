import _debug from 'debug'
import createWorklistInstances from './create-worklist-instances'

const debug = _debug('ipbm-ql:model:continue-factory-registration')

const continueFactoryRegistration = ({
  web3,
  registryContract,
  currentIndex,
  sortedElements,
  contracts,
  contractF,
  modelInfo,
  registerFactory,
  registryId,
}) => {
  return web3.eth.personal.getAccounts()
    .then(
      accounts =>
        registryContract
          .registerFactory({
            bundleId: web3.utils.fromAscii(sortedElements[currentIndex].bundleId),
            address: contractF.address,
          })
          (
            {
              from: accounts[0],
              gas: 4700000
            },
          )
          .then(
            (result1) => {
                debug(`${sortedElements[currentIndex].nodeName}_Factory registered SUCCESSFULLY in Process Registry`)
                debug('....................................................................')
                if (currentIndex + 1 < sortedElements.length) {
                    return registerFactory({
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
                    debug('DEPLOYONG worklist CONTRACTS AND UPDATING PROCESS REGISTRY ...')
                    return createWorklistInstances({
                      web3,
                      registryContract,
                      currentIndex: 0,
                      sortedElements,
                      contracts,
                      modelInfo,
                      registryId,
                    })
                }
            })
        )
}

export default continueFactoryRegistration
