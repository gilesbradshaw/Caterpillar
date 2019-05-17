import _debug from 'debug'

import  continueWorklistCreation from './continue-worklist-creation'

const debug = _debug('ipbm-ql:model:create-worklist-instances')

const createWorklistInstances = (
  web3,
  registryContract: import('ipbm-lib').RegistryContract,
  currentIndex,
  sortedElements,
  outputContracts,
  modelInfo,
  registryId,
) => {
  console.log({ sortedElements })
  console.log('going to register worklist for', currentIndex, sortedElements[currentIndex].nodeName)
  debug('----------------------------------------------------------------------------------------')
  const worklistInstanceContract = outputContracts[`${sortedElements[currentIndex].nodeName}_worklist`]
  if (worklistInstanceContract) {
    const worklistContract = new web3.eth.Contract(worklistInstanceContract.abi)
    worklistContract.transactionConfirmationBlocks = 1
    return web3.eth.personal.getAccounts()
      .then(
        accounts =>
          worklistContract
            .deploy(
              {
                data: worklistInstanceContract.bytecode,
              },
            )
            .send(
              {
                from: accounts[0],
                gas: 4700000,
              },
            )
            .then(
              contractW => {
                if (contractW.address) {
                  return registryContract
                    .registerWorklist({
                      bundleId: web3.utils.fromAscii(sortedElements[currentIndex].bundleId),
                      address: contractW.address,
                    })
                    (
                      {
                        from: accounts[0],
                        gas: 4700000
                      },
                    )
                    .then(
                      result1 => console.log('registered worklist', result1) ||
                        continueWorklistCreation(
                          web3,
                          registryContract, 
                          currentIndex,
                          [
                            ...currentIndex
                              ? sortedElements.slice(0, currentIndex -1)
                              : [],
                            {
                              ...sortedElements[currentIndex],
                              worklist: contractW.address
                            },
                            ...sortedElements.slice(currentIndex + 1)
                          ],
                          outputContracts,
                          modelInfo,
                          createWorklistInstances,
                          registryId,
                        )
                    )
                }
              }
            )
        )
  } else {
    return continueWorklistCreation(
      web3,
      registryContract,               
      currentIndex,
      sortedElements,
      outputContracts,
      modelInfo,
      createWorklistInstances,
      registryId,
    )
  }
}

export default createWorklistInstances
