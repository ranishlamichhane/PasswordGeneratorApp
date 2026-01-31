import { useEffect, useCallback, useState, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  //Using ref hook -:
  const PasswordRef = useRef(null);

  const passswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) { str += "0123456789" }
    if (characterAllowed) { str += "!@#$%&./~*=" }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPassToClipBoard = useCallback(() => {
    PasswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    // alert("Password copied!")
  }, [password])

  useEffect(() => {
    passswordGenerator()

  }, [length, numberAllowed, characterAllowed, passswordGenerator])
  return (
    <>
      <h1 className='text-5xl text-center mt-20 text-red-700'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-gray-800'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            ref={PasswordRef}
            type="text"
            value={password}
            className='outline-none w-3xl text-center text-green-500 bg-white rounded-lg'
            placeholder='password'
            readOnly
          />
          <button
            onClick={copyPassToClipBoard}
            className='outline-none bg-blue-500 px-3 py-1 shrink-0 rounded-lg hover:bg-blue-300 cursor-pointer '
          >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex  items-center gap-x-1  text-orange-400'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1  text-orange-400'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 text-orange-400'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label htmlFor="characterAllowed">Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
