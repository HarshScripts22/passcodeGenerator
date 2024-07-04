import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passcodeRef = useRef(null);

  let pass = "";
  const passcodeGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";

    if (charAllow) str += "#@!$%^&*_-~|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passcodeRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passcodeGenerator();
  }, [length, numAllow, charAllow, setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-stone-800 shadow-md rounded-lg  px-3 py-4 my-8">
        <h1 className="   text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded- lg overflow-hidden mb-5">
          <input
            type="text"
            value=" "
            className=" outine-none  px-3 py-1"
            placeholder="gfhdgg"
            ref={passcodeRef}
          />
          <button
            className=" outline-none text-white bg-blue-400 shrink-0 px-3 py-0.5"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Number </label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
