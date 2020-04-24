'use strict'

const forks = require('./forks')
const { UMD_DEV, UMD_PROD, UMD_PROFILING } = require('./bundles').bundleTypes

const HAS_NO_SIDE_EFFECTS_ON_IMPORT = false;

const importSideEffects = Object.freeze({
  'prop-types/checkPropTypes': HAS_NO_SIDE_EFFECTS_ON_IMPORT,
})