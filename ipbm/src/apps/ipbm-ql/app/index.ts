import Web3 from 'web3'
import mongoose from 'mongoose'
import _debug from 'debug'
import config from 'config'
import serve from './serve'

const web3 = new Web3(config.get('ethereum'))

const debug = _debug('caterpillarql:app')


mongoose.Promise = global.Promise

mongoose.connect(config.get('mongo'))
  .then(
    () => {
      debug('Conectado a MongoDB')
      serve(web3)
    }
  )
  .catch(
    (ex) => {
      debug('Mongo db connection fail', ex)
      global.process.exit(1)
    } 
  )
