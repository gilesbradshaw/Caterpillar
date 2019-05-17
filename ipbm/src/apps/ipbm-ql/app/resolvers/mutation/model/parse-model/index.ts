import _debug from 'debug'
import BpmnModdle from "bpmn-moddle"
import {
  ModelInfo,
} from "./definitions"
import * as ejs from "ejs"

import parseBpmn from './parse-bpmn'
import collectControlFlowInfo from './collect-control-flow-info'

import nameId from './model-info/name-id'
import setModelInfoSolidity from './set-model-info-solidity'
import makeCodeGenerationInfo from './set-model-info-solidity/make-code-generation-info'
import makeWorklistGenerationInfo from './set-model-info-solidity/make-worklist-generation-info'
import bpmn2solEJS from '../../../../templates/bpmn2sol.ejs'
import worklist2solEJS from '../../../../templates/worklist2sol.ejs'

import oracleWrapperEjs from '../../../../templates/bpmn/oracle-wrapper.ejs'
import factoryEjs from '../../../../templates/bpmn/factory.ejs'
import contractEjs from '../../../../templates/bpmn/contract.ejs'

import abstractWorklistEjs from '../../../../templates/bpmn/abstract-worklist.ejs'
import worklistEjs from '../../../../templates/bpmn/worklist.ejs'

// import goodsShipmentWorklist from '../../../../templates/bpmn/Goods_Shipment_worklist.sol'
// import goodsShipmentContract from '../../../../templates/bpmn/Goods_Shipment_Contract.sol'

const oracleWrapperTemplate = ejs.compile(oracleWrapperEjs)
const factoryTemplate = ejs.compile(factoryEjs)
const contractTemplate = ejs.compile(contractEjs)
const abstractWorklistTemplate = ejs.compile(abstractWorklistEjs)
const worklistTemplate = ejs.compile(worklistEjs)

const bpmn2solTemplate = ejs.compile(bpmn2solEJS)
const worklist2solTemplate = ejs.compile(worklist2solEJS)



const debug = _debug('ipbm-ql:parse-model')



export default (bpmn: string) =>
  parseBpmn(bpmn)
    .then((definitions: any) => {
      debug('parsed model', definitions)
      if (!definitions.diagrams || definitions.diagrams.length == 0)
        throw new Error("ERROR: No diagram found in BPMN file")
      const proc = definitions
        .diagrams[0]
        .plane
        .bpmnElement

      const modelInfo: ModelInfo = {
        ...nameId({
          definitions,
        }),
        bpmn,
        newSolidity: {},
        solidity: 'pragma solidity ^0.5.0;\n',
        controlFlowInfoMap: new Map(),
      }
      
      
      // BPMN to Solidity parsing

      let
        globalEdgeIndexMap: Map<string, number> = new Map()

      ////////////////////////////////////////////////////////////
      const {
        globalNodeMap,
        globalControlFlowInfo,
      } = collectControlFlowInfo(proc)

      modelInfo.globalNodeMap = globalNodeMap

      const generationInfo = setModelInfoSolidity({
        globalControlFlowInfo,
        globalNodeMap,
      })
      modelInfo.controlFlowInfoMap = generationInfo
        .map(
          ({ controlFlowInfo }) =>
            controlFlowInfo,
        )
        .reduce(
          (map, info) =>
            map.set(info.self.id, info),
          new Map(),
        )
      const newSolidity = generationInfo
        .filter(
          ({
            codeGenerationInfo,
            worklistGenerationInfo,
          }) =>
            codeGenerationInfo &&
              worklistGenerationInfo
        )
        .reduce(
          (
            acc,
            {
              codeGenerationInfo,
              worklistGenerationInfo,
            },
          ) => {
            const code = codeGenerationInfo &&
              makeCodeGenerationInfo(codeGenerationInfo)
            const worklist = worklistGenerationInfo &&
              makeWorklistGenerationInfo(worklistGenerationInfo)
            const name = (code && code.nodeName(code.processId())) ||
              (worklist && worklist.nodeName(worklist.processId()))
            return {
              ...acc,
              ...code &&
                code.oracleTaskMap.size && {
                  Oracle_Wrapper: oracleWrapperTemplate(code),
                },
              ...code && {
                [`${name}_Contract`]: /* `${name}_Contract` === 'Goods_Shipment_Contract'
                  ? goodsShipmentContract
                  : */ contractTemplate(code),
                [`${name}_Factory`]: factoryTemplate(code),
              },
              ...worklist && {
                [`${name}_AbstractWorklist`]: abstractWorklistTemplate(worklist),
                [`${name}_worklist`]: /* `${name}_worklist` === 'Goods_Shipment_worklist'
                  ? goodsShipmentWorklist
                  : */ worklistTemplate(worklist),                
              }
            }
          },
          {},
        )
      modelInfo.newSolidity = newSolidity
      modelInfo.solidity = ''
      //////////////////////////////////////////////////////////////////////////////////
      debug(modelInfo.solidity)
      modelInfo.entryContractName = modelInfo.name + ":" + (proc.name ? proc.name.replace(/\s+/g, "_") : proc.id) + "_Contract"
      return modelInfo
  },
)
