
import { useContext, useEffect } from 'react'
import './App.css'
import ChatBody from './Components/ChatBody'
import ClientOnly from './Components/ClientOnly'
import Navbar from './Components/common/Navbar'
import Pattern from './Components/common/Pattern'
import Login from './Components/Credentials_ui/Login'
import Signup from './Components/Credentials_ui/Signup'
import Footer from './Components/Footer'
import { chatContext } from './contextApi/chatContext'
import { verify } from './services/Auth_services'

function App() {

  const {  setUserstate , userstate}=useContext(chatContext)

  useEffect(()=>{
const VerifyUser=async()=>{
    try {
      const res=await verify()
        const {success,user}=res;
   console.log(res);
   
   if (success) {
        setUserstate({
          isLoggedIn: true,
          username: user.username,
          email: user.email
        });
      }
    } catch (error) {
      console.error('error while verifying',error)
    }
}
VerifyUser()
  },[])

  return (
    <>

      <Pattern/>
<ClientOnly>
  <Signup/>
<Login/>
     <Navbar/>
      <ChatBody/>
     <Footer/>
</ClientOnly>

    </>
  )
}

export default App
