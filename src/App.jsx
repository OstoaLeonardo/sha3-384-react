import React, { useEffect, useState } from 'react'
import { SHA3 } from 'crypto-js'
import { Item } from './components/Item'
import { Input } from './components/Input'
import { Output } from './components/Output'

function App() {
  const [fileContent, setFileContent] = useState('')
  const [blocksInfo, setBlocksInfo] = useState([])
  const [hashBlocks, setHashBlocks] = useState([])
  const [concatHash, setConcatHash] = useState('')
  const [concatHashBinary, setConcatHashBinary] = useState('')

  useEffect(() => {
    handleFileContent(fileContent)
  }, [fileContent])

  const handleFileContent = (content) => {
    if (content === '') return

    const blockSize = 333 // Tamaño del bloque en caracteres
    const totalBlocks = Math.ceil(content.length / blockSize)

    const blocksInfo = []
    const hashBlocks = []
    setConcatHash('')

    for (let i = 0; i < totalBlocks; i++) {
      const block = content.slice(i * blockSize, (i + 1) * blockSize)
      blocksInfo.push(block)

      const result = getHash(block)
      hashBlocks.push(result)
    }

    const concatenatedHash = hashBlocks.join('')
    setConcatHash(concatenatedHash)

    setBlocksInfo(blocksInfo)
    setHashBlocks(hashBlocks)
    setConcatHashBinary(getHashBinary(concatenatedHash))
  }

  const getHash = (block) => {
    const hashResult = SHA3(block, { outputLength: 384 }).toString()
    return [hashResult]
  }

  const getHashBinary = (concatHash) => {
    const hexToBytes = (hex) => new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
    const bytes = hexToBytes(concatHash)
    let binaryHash = ''

    for (let i = 0; i < bytes.length; i++) {
      binaryHash += bytes[i].toString(2).padStart(8, '0')
    }

    return binaryHash
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 py-16 gap-8'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        SHA3-
        <span className='text-blue-600 dark:text-blue-500'>384</span>
      </h1>
      <div className='w-3/5 flex flex-col gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700'>
        <Input setFileContent={setFileContent} />
        {blocksInfo.map((blockInfo, index) => {
          return (
            <div key={index}>
              <Item name={`Block ${index + 1}`} value={blockInfo} />
              <Item name={`Hash ${index + 1}`} value={hashBlocks[index]} />
            </div>
          )
        })}
        {concatHash && <Output concatHash={concatHash} concatHashBinary={concatHashBinary} />}
      </div>
    </main>
  )
}

export default App
