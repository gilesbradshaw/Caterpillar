import React, { Component } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/styles/properties.less'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import emptyBpmn from './empty-bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import PaletteProvider from "./Palette-Provider";

import PropsProvider from './Props-Provider'



class Modeler extends Component {

  modeler = null;

  componentDidMount = () => {
    this.modeler = new BpmnModeler({
      container: '#bpmnview',
      keyboard: {
        bindTo: window
      },
      propertiesPanel: {
        parent: '#propview'
      },
      additionalModules: [
        {
          __init__: ["propertiesProvider"],
          propertiesProvider: ["type", PropsProvider],
        },
        propertiesPanelModule,
        propertiesProviderModule,
        {
          __init__: [ 'paletteProvider' ],
          paletteProvider: ["type", PaletteProvider]
        }
      ]
    });
    if (this.props.model) {
      return this.openBpmnDiagram(this.props.model)
    }
    return this.newBpmnDiagram();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      props,
//      state
    } = this;

    if (props.model !== prevProps.model) {
      return this.openBpmnDiagram(props.model)
    }

  }


  newBpmnDiagram = () => {
    this.openBpmnDiagram(emptyBpmn);
  }

  openBpmnDiagram = (xml) => {
    this.modeler.importXML(xml, (error) => {
      if (error) {
        return console.log('fail import xml here');
      }

      var canvas = this.modeler.get('canvas');

      canvas.zoom('fit-viewport');
    });
  }
  save() {
    this.modeler.saveXML({ format: true },
      (err, xml) => {
        if (!err) {
          this.props.save(xml)
        }
      /*
      "<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.6.0">
  <bpmn:process id="Invoice_Handlingwdswd" name="Invoice_Handlingdwdwdw" isExecutable="false">
    <bpmn:documentation>bool accepted;</bpmn:documentation>
    <bpmn:startEvent id="StartEvent_1" name="Invoice Handling Started">
      <bpmn:outgoing>SequenceFlow_0ep6zut</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0ep6zut" sourceRef="StartEvent_1" targetRef="Task_0e5xumt" />
    <bpmn:userTask id="Task_0e5xumt" name="Issue Invoice">
      <bpmn:documentation>@ Invoicer @</bpmn:documentation>
      <bpmn:incoming>SequenceFlow_0ep6zut</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0oiwqsu</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="SequenceFlow_0oiwqsu" sourceRef="Task_0e5xumt" targetRef="ExclusiveGateway_0bvmb9p" />
    <bpmn:userTask id="Task_1j0spgi" name="Approve Invoice">
      <bpmn:documentation>@ Invoicee @
() : (bool _accepted) -&gt; {accepted = _accepted;}</bpmn:documentation>
      <bpmn:incoming>SequenceFlow_1w3n1g7</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_09h00sj</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="ExclusiveGateway_0bvmb9p">
      <bpmn:incoming>SequenceFlow_0oiwqsu</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_07vj39u</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1w3n1g7</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_1w3n1g7" sourceRef="ExclusiveGateway_0bvmb9p" targetRef="Task_1j0spgi" />
    <bpmn:exclusiveGateway id="ExclusiveGateway_18klyzt" name="Is Invoice Accepted?">
      <bpmn:incoming>SequenceFlow_09h00sj</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0927rr5</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_006j8eo</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_09h00sj" sourceRef="Task_1j0spgi" targetRef="ExclusiveGateway_18klyzt" />
    <bpmn:endEvent id="EndEvent_063of2z" name="Invoice Handling Completed">
      <bpmn:incoming>SequenceFlow_0927rr5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0927rr5" name="Yes" sourceRef="ExclusiveGateway_18klyzt" targetRef="EndEvent_063of2z">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">accepted</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="SequenceFlow_006j8eo" name="No" sourceRef="ExclusiveGateway_18klyzt" targetRef="Task_0m7b8xz">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">!accepted</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="SequenceFlow_07vj39u" sourceRef="Task_0m7b8xz" targetRef="ExclusiveGateway_0bvmb9p" />
    <bpmn:userTask id="Task_0m7b8xz" name="Fix Invoice">
      <bpmn:documentation>@ Invoicer @</bpmn:documentation>
      <bpmn:incoming>SequenceFlow_006j8eo</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_07vj39u</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Invoice_Handlingwdswd">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="215" y="105" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="191" y="141" width="83" height="24" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0ep6zut_di" bpmnElement="SequenceFlow_0ep6zut">
        <di:waypoint x="251" y="123" />
        <di:waypoint x="285" y="123" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="268" y="108" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_06i5cy1_di" bpmnElement="Task_0e5xumt">
        <dc:Bounds x="285" y="83" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0oiwqsu_di" bpmnElement="SequenceFlow_0oiwqsu">
        <di:waypoint x="385" y="123" />
        <di:waypoint x="419" y="123" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="402" y="108" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_1igus1e_di" bpmnElement="Task_1j0spgi">
        <dc:Bounds x="498" y="83" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_0bvmb9p_di" bpmnElement="ExclusiveGateway_0bvmb9p" isMarkerVisible="true">
        <dc:Bounds x="419" y="98" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="444" y="148" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1w3n1g7_di" bpmnElement="SequenceFlow_1w3n1g7">
        <di:waypoint x="469" y="123" />
        <di:waypoint x="498" y="123" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="484" y="108" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_18klyzt_di" bpmnElement="ExclusiveGateway_18klyzt" isMarkerVisible="true">
        <dc:Bounds x="629" y="98" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="627" y="62" width="53" height="24" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_09h00sj_di" bpmnElement="SequenceFlow_09h00sj">
        <di:waypoint x="598" y="123" />
        <di:waypoint x="629" y="123" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="614" y="108" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_063of2z_di" bpmnElement="EndEvent_063of2z">
        <dc:Bounds x="718" y="105" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="694" y="141" width="83" height="24" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0927rr5_di" bpmnElement="SequenceFlow_0927rr5">
        <di:waypoint x="679" y="123" />
        <di:waypoint x="718" y="123" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="683" y="101" width="18" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_006j8eo_di" bpmnElement="SequenceFlow_006j8eo">
        <di:waypoint x="654" y="148" />
        <di:waypoint x="654" y="213" />
        <di:waypoint x="597" y="213" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="634" y="175" width="14" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_07vj39u_di" bpmnElement="SequenceFlow_07vj39u">
        <di:waypoint x="497" y="213" />
        <di:waypoint x="444" y="213" />
        <di:waypoint x="444" y="148" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="471" y="198" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_0mjla0b_di" bpmnElement="Task_0m7b8xz">
        <dc:Bounds x="497" y="173" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
"
      for (let i = 0; i < this.modeler.definitions.rootElements.length; i++) {
        if (this.modeler.definitions.rootElements[i].$type === 'bpmn:Process') {
          if (this.processStorage.hasModel(this.modeler.definitions.rootElements[i].id)) {
            this.modelText =
              'The selected ID exists on the Workspace. Please, change this value and try again.';
          } else if (!this.modeler.definitions.rootElements[i].name || this.modeler.definitions.rootElements[i].name === '') {
            this.modelText =
              'The Name of the model cannot be empty. Please, update this value and try again.';
          } else {
            this.processStorage.modelId = this.modeler.definitions.rootElements[i].id;
            this.processStorage.registerModel(xml);
            this.modelText =
              'Working in Model Registration. Please, take into account that this may require some seconds.';
          }
          break;
        }
      }*/
    });
  }


  render = () => {
    return (
      <div
        id='bpmncontainer'
        style={{
          display: 'flex',
        }}
      >
        <div id="bpmnview" style={{ flexGrow: 4 }}></div>
        <div id="propview" style={{ flexGrow: 1 }}></div>
        {
          this.props.save && 
            <button onClick= {
              () => this.save()
            }>save</button>
        }
      </div>
    )
  }
}

export default Modeler;