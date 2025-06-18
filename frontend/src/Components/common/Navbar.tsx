import React, { useContext, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  MessageCircle, Menu, Settings, User,
  History, Plus, Search, X,
  MoonIcon
} from 'lucide-react';
import { chatContext } from '../../contextApi/chatContext';
import type { Message } from '../../services/Request';
import { logout } from '../../services/Auth_services';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface DropdownItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick, isActive = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center mr-3 space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-black/80 bg-opacity-25 text-white'
        : 'bg-black/80 bg-opacity-10 hover:bg-opacity-20 text-blue-100 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-xs lg:text-sm font-medium">{label}</span>
  </button>
);



const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex cursor-pointer hover:bg-black hover:text-white hover:rounded ease-in-out duration-300 items-center space-x-3 w-full px-4 py-3 text-left text-gray-700  transition-colors"
  >
    {icon && <span className="text-gray-500">{icon}</span>}
    <span>{label}</span>
  </button>
);

export default function ChatbotNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string>('current');
  const [isdark,setisdark]=useState<boolean>(true)
  const{ userstate,onOpenLogin,onClose,onOpen,setUserstate}=useContext(chatContext);


const {MessageApi, setMessageApi}=useContext(chatContext)


const generatePDF = (messages: Message[]=MessageApi) => {
  const doc = new jsPDF();
  
  let y = 20; // Start 20 units from the top (more margin)
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 10;
  
  if (MessageApi.length > 0) {
    MessageApi.forEach((message, index) => {
      
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = 20; 
      }
      
    
      const messageText = `${message.role.toUpperCase()}: ${message.content}`;
      
 
      const splitText = doc.splitTextToSize(messageText, doc.internal.pageSize.width - 40);
      
      // Add each line of the split text
      splitText.forEach((line: string) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = 20;
        }
        
        doc.text(line, 20, y);
        y += lineHeight;
      });
      
      y += 5;
    });
  } else {
    doc.text("No messages to display", 20, y);
  }
  
  doc.save("chat_conversation.pdf");
};

  const handleNewChat = () => {
    console.log('Starting new chat...');
    setMessageApi([])
    setActiveChat('new');
    setIsMenuOpen(false);
  };


const handlelogout=async()=>{
  try {
   const res= await logout()
   if(res.success){
    alert('logout successfull')
setUserstate({
  isLoggedIn:false,
  username:'',
  email:''
})
   }
  } catch (error) {
    console.error('error while logout',error)
  }
}
  const handleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };




  useEffect(() => {
    if (isdark) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [isdark]);
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg relative ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-lg font-bold">Vo-1AI</h1>
              <p className="text-sm text-blue-100">Intelligent Assistant</p>
            </div>
          </div>

    
          <div className='flex flex-row items-center justify-between '>
             <NavButton
             
              icon={<Plus className="h-3 w-3 mr-" />}
              label="New Chat"
              onClick={handleNewChat}
              isActive={activeChat === 'new'}
            />

              <NavButton
             
              icon={<Plus className="h-3 w-3 mr-3" />}
              label="Chat Export"
              onClick={generatePDF}
              isActive={activeChat === 'new'}
            />
             <div  onClick={()=>setisdark(prev=>!prev)}  >
            <MoonIcon className={`mr-4 h-8 w-8 rounded-2xl ${isdark?'bg-black/60 text-black':''} text-white`}  />
          </div>
          
          
          <div className="hidden md:flex items-center space-x-4">
            
         
       
            <div className="relative">
              <button
                onClick={handleProfile}
                className="flex items-center space-x-2 p-2 rounded-lg bg-black/60 bg-opacity-10 hover:bg-opacity-20 transition-all"
              >
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-1 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{userstate?.username||'User'}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                   {!userstate.isLoggedIn&&<>
                    <DropdownItem
                      label="Login"
                      onClick={onOpenLogin}
                      icon={<Settings className="h-4 w-4" />}
                    />
                    <DropdownItem
                      label="Signup"
                      onClick={onOpen}
                      icon={<MessageCircle className="h-4 w-4" />}
                    />
                    <hr className="my-2" />
                   </>}
                    <DropdownItem
                      label="Logout"
                      onClick={handlelogout}
                      icon={<User className="h-4 w-4" />}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ">
            <button
            
              className="p-2 rounded-lg  bg-black/30 bg-opacity-10 hover:bg-opacity-20 transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6  text-black"   onClick={() => setIsMenuOpen(!isMenuOpen)} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
    {isMenuOpen && (
  <div className=" absolute right-0 z-40 md:hidden bg-white text-black rounded-lg mt-2 mb-4 shadow-lg">
    <div className="px-2 pt-2 pb-3 space-y-2">
                   {!userstate.isLoggedIn&&<>
                    <DropdownItem
                      label="Login"
                      onClick={onOpenLogin}
                      icon={<Settings className="h-4 w-4" />}
                    />
                    <DropdownItem
                      label="Signup"
                      onClick={onOpen}
                      icon={<MessageCircle className="h-4 w-4" />}
                    />
                    <hr className="my-2" />
                   </>}
                    
                    <DropdownItem
                      label="Logout"
                      onClick={handlelogout}
                      icon={<User className="h-4 w-4" />}
                    />
                 
    </div>
  </div>
)}

      </div>


      {(isProfileOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
}
