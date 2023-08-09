import { useState } from 'react'

export function Input({ setFileContent }) {
    const [content, setContent] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const content = reader.result
                setContent(content)
                setFileContent(content)
            }
            reader.readAsText(file)
        }
    }

    return (
        <>
            <label htmlFor='file-text' className='text-sm font-medium text-gray-900 dark:text-white'>Input</label>
            <textarea
                type='text'
                id='file-text'
                className='font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:text-white'
                placeholder='Mensaje'
                defaultValue={content}
                onChange={(e) => setFileContent(e.target.value)}
            />
            <input
                type='file'
                id='file-input'
                accept='.txt'
                onChange={handleFileUpload}
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400'
            />
            <hr className='h-px my-2 border-0 bg-gray-200 dark:bg-zinc-700' />
        </>
    )
}