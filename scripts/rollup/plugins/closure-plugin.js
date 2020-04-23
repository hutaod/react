'use strict'

const ClosureComplier = require('google-closure-compiler').compiler
const { promisify } = require('util')
const fs = require('fs')
const tmp = require('tmp')
const writeFileAsync = promisify(fs.writeFile);

function compile(flags) {
  return new Promise((resolve, reject) => {
    const closureComplier = new ClosureComplier(flags);
    closureComplier.run(function(exitCode, stdOut, stdErr) {
      if(!stdErr) {
        resolve(stdOut)
      } else {
        reject(new Error(stdErr))
      }
    })
  })
}

function encodeNativeCalls(code) {
  // 如果我们全局引用Symbol，则Closure Compiler会尝试安装polyfill。
  // 我们需要暂时欺骗Closure，它不是它正在寻找的内置函数。
  return code.replace(/Symbol/g, 'SymbolTmp')
}

function decodeNativeCalls(code) {
  return code.replace(/SymbolTmp/g, 'Symbol')
}

module.exports = function closure(flags = {}) {
  return {
    name: 'scripts',
    async renderChunk(code) {
      const inputFile = tmp.fileSync();
      const tempPath = inputFile.name;

      flags = Object.assign({}, flags, { js: tempPath })
      const filteredCode = encodeNativeCalls(code);
      await writeFileAsync(tempPath, filteredCode, 'utf8')
      const compileCode = await compile(flags);
      inputFile.removeCallback();
      const decodedCode = decodeNativeCalls(compileCode);
      return {
        code: decodedCode
      }
    }
  }
}