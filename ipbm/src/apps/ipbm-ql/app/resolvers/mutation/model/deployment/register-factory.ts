import _debug from 'debug'

import continueFactoryRegistration from './continue-factory-registration'

const debug = _debug('ipbm-ql:model:register-factory')

const registerFactory = ({
  web3,
  registryContract,
  currentIndex,
  sortedElements,
  contracts,
  modelInfo,
  registryId,
}) => {
  debug('------------------------------------------------------------------------')
  debug(
    'adding factory..',
    modelInfo.id,
    `${sortedElements[currentIndex].nodeName}_Factory`,
    Object.keys(
      contracts[`${sortedElements[currentIndex].nodeName}_Factory`],
    )
  )
  const factoryContract = new web3.eth.Contract(contracts[`${sortedElements[currentIndex].nodeName}_Factory`].abi)
  factoryContract.transactionConfirmationBlocks = 1
  return web3.eth.personal.getAccounts()
    .then(
      accounts =>
        factoryContract
          .deploy(
            {
              data: contracts[`${sortedElements[currentIndex].nodeName}_Factory`].bytecode,
            },
          )
          .send(
            {
              from: accounts[0],
              gas: 4700000.
            },
          )
          .then(
            contractF =>
              continueFactoryRegistration({
                web3,
                registryContract,
                currentIndex,
                sortedElements,
                contracts,
                contractF,
                modelInfo,
                registerFactory,
                registryId,
              })
          )
    )
  }

export default registerFactory
