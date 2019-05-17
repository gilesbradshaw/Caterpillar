import React from 'react';
import {
  Query,
} from 'react-apollo';

import {
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';

import CopyToClipboard from 'react-copy-to-clipboard';

import { Link } from 'react-router-relative-link'

import query from './query'
import Viewer from './Viewer'

import Data from './types/Data'
import QueryVariables from './types/Query-Variables'

import AddRoleTask from '../role-tasks/Add-Role-Task'
import RoleTask from '../role-tasks/Role-Task'
import AddProcess from '../processes/Add-Process'
import fourOFour from '../util/four-o-four'

const Model: React.FC<
  RouteComponentProps<
    {
      modelId: string
      registryId: string
    }
  >
> =
  ({
    match: {
      params: {
        modelId,
        registryId,
      },
      path,
      url,
    },
  }) =>
    <Query<Data, QueryVariables>
      query={query}
      variables={{
        modelId,
        registryId,
      }}
    >
      {
        ({
          data,
          loading,
        }) =>
          ( !loading &&
            data &&
            data.registries &&
            data.registries[0] &&
            data.registries[0].models &&
            data.registries[0].models[0] &&
            
            <Switch>
              <Route
                exact
                path={url}
                render={
                  () =>
                    <div
                      style={{
                        whiteSpace: 'pre'
                      }}
                    >
                      <Link to='.'>.</Link>
                      <div>
                        {data.registries[0].models[0].policyId}
                        :
                        {data.registries[0].models[0].taskRoleId}
                      </div>
                      <Link
                        to={`${url}/role-task`}
                      >
                        role task
                      </Link>
                      <Link
                        to={`${url}/role-task-add`}
                      >
                        add role task
                      </Link>
                      <Link
                        to={`${url}/process-add`}
                      >
                        add process
                      </Link>
                      {JSON.stringify(data.registries[0].models[0])}
                      <Viewer
                        id={data.registries[0].models[0].id}
                        model={data.registries[0].models[0].bpmn}
                      />
                      {
                        Object.keys(data.registries[0].models[0].newSolidity)
                          .map(
                            (key) =>
                              <div
                                key={key}
                              >
                                <h1>
                                  {key}
                                </h1>
                                <CopyToClipboard
                                  text={data.registries[0].models[0].newSolidity[key]}
                                >
                                  <span>Copy to clipboard</span>
                                </CopyToClipboard>
                                <div>
                                  {data.registries[0].models[0].newSolidity[key]}
                                </div>
                              </div>
                          )
                      }
                    </div>
                }
              />
              <Route
                path={`${path}/role-task`}
                component={RoleTask}
              />
              <Route
                path={`${url}/role-task-add`}
                render={
                  () =>
                    <AddRoleTask
                      modelId={modelId}
                      registryId={data.registries[0]._id}
                      registryAddress={data.registries[0].address}
                    />
                }
              />
              <Route
                path={`${url}/process-add`}
                render={
                  () =>
                    <AddProcess
                      modelId={modelId}
                      registryAddress={data.registries[0].address}
                    />
                }
              />
              
              <Route
                component={fourOFour({ url })}
              />
            </Switch>
      ) || null
    }
  </Query>

export default Model;
