
import './App.css'
import ChatBody from './Components/ChatBody'
import ClientOnly from './Components/ClientOnly'
import Navbar from './Components/common/Navbar'
import Pattern from './Components/common/Pattern'
import Footer from './Components/Footer'

function App() {


  return (
    <>
<div className='max-w-screen  max-h-screen'>
      <Pattern/>
<ClientOnly>
     <Navbar/>
      <ChatBody/>
     <Footer/>
</ClientOnly>
</div>
    </>
  )
}

export default App
