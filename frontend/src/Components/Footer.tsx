import { useState } from "react"
import Input from "./common/Input"


function Footer() {
    const [input, setInput] = useState<string>("");


  return (
    <div className="fixed bottom-5 flex justify-center w-full">
      <Input Input={input} setInput={setInput}  />
    </div>
  )
}

export default Footer
