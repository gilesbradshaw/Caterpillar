import React from 'react';
import {
  Query,
} from 'react-apollo';

import {
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';

import { Link } from 'react-router-relative-link'

import query from './query'

import Data from './types/Data'
import QueryVariables from './types/Query-Variables'

import fourOFour from '../util/four-o-four'

const RoleTask: React.FC<
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
          ( !loading && data && data.registries[0] &&
            data.registries[0].models &&
            data.registries[0].models[0] &&
            data.registries[0].models[0].roleTask &&
            <div>
              {data.registries[0].models[0].roleTask.address}
              <div
              style={{ whiteSpace: 'pre'}}
            >

              {data.registries[0].models[0].roleTask.solidityCode}
            </div>
            </div>
      ) || null
    }
  </Query>

export default RoleTask;
