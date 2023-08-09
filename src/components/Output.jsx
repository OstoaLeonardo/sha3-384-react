export function Output({ concatHash, concatHashBinary }) {
    const saveBinary = () => {
        const element = document.createElement('a')
        const file = new Blob([concatHashBinary], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = 'binary.txt'
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
    }

    return (
        <>
            <label htmlFor='concat-hash' className='text-sm font-medium text-gray-900 dark:text-white'>Concat Hash</label>
            <textarea
                type='text'
                id='concat-hash'
                className='font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:text-white'
                defaultValue={concatHash}
            />
            <label htmlFor='binary-hash' className='text-sm font-medium text-gray-900 dark:text-white'>Concat Hash Binary</label>
            <textarea
                type='text'
                id='binary-hash'
                className='font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:text-white'
                defaultValue={concatHashBinary}
            />
            <button
                type='button'
                onClick={saveBinary}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                Guardar binario
            </button>
        </>
    )
}