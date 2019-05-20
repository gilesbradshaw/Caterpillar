


const getElements = modelInfo =>
  (element) => {
    if (modelInfo.controlFlowInfoMap.has(element.nodeId)) {
      const cfInfo = modelInfo.controlFlowInfoMap.get(element.nodeId)
      const elements = [
        ...cfInfo.multiinstanceActivities || [],
        ...cfInfo.nonInterruptingEvents || [],
        ...cfInfo.callActivities || [],
      ].map(
        ([
          nodeId,
          nodeName,
        ]) => ({
          nodeId,
          nodeName,
          bundleId: '',
          nodeIndex: 0,
          bundleParent: '',
          factoryContract: '',
        })
      )
      return [
        ...elements,
        ...elements
          .reduce(
            (acc, val) => [
              ...acc,
              ...getElements(modelInfo)(val),
            ],
            [],
          )
      ]
    }
    return []
  }

  export default modelInfo =>
    element => [
      element,
      ...getElements(modelInfo)(element)
    ].reverse()
