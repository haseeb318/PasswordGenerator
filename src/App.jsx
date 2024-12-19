import { useCallback, useEffect, useState,useRef } from 'react'
import "./App.css"
function App() {
  const [password , setPassword]= useState("")
  const [number ,setNumber] = useState(false)
  const [char ,setChar]=useState(false)
  const[length, setLength]= useState(6)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    ()=>{
      let pass =''
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(number){
        str +="0123456789"
      }
      if(char){
        str += "!@#$%&*()"
      }
      for(let i=1; i<=length;i++){
        let char = Math.floor(Math.random()* str.length+1)
        pass += str.charAt(char)
      }
      setPassword(pass)
    }
    ,[length,number,char,setPassword])
 
  const copyPasswordHandler = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)

  },[password])
    useEffect(()=>{
       passwordGenerator()
    },[length,number,char,setPassword])
  return (
    <>
    <div className='main-container'>
      <h2>Password Generator</h2>
      <hr />
      <div className='input-controls'>
      <input 
      type="text" 
      value={password}
      readOnly
      ref={passwordRef}
       />
       <button className="btn" onClick={copyPasswordHandler}>Copy</button>
      </div>

      <div className='form-controls'> 
      <div className='form-control'>
      <input 
      type="range" 
      min={6}
      max={50}
      value={length}
      onChange={(e)=>{setLength(e.target.value)}}
       />
       <label >Length : {length}</label>
      </div>

      <div  className='form-control'>
      <input 
      type="checkbox" 
      defaultChecked={number}
      onChange={()=>{
        setNumber((prev)=>!prev)
      }}
       />
       <label >Number </label>
      </div>

      <div  className='form-control'>
      <input 
      type="checkbox" 
      defaultChecked={number}
      onChange={()=>{
        setChar((prev)=>!prev)
      }}
       />
       <label >Character </label>
      </div>
      </div>
    </div>
    

    </>
  )
}

export default App
