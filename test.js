import * as React from './packages/htreact'
import { map } from './packages/htreact/src/ReactChildren'
var testA = 1
var testB = [1, 2, 3, 4, 5]
var testC = [null, <div>123</div>]
var testD = [null, <div id="222">123</div>]
var arr = testC
const context = { name: '哈哈' }
const res = map(
  arr,
  function (a) {
    console.log(this)
    return [a, [a, [a, [a, [a, [a, a]]]]]]
  },
  context
)
console.log(res)
