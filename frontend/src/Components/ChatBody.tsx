import { useState, useEffect, useRef, useContext, } from "react"
import { chatContext } from "../contextApi/chatContext"
import type { Message } from "../services/Request";

interface MessageBubbleProps {
  message: Message
  index: number
}

const ChatBody: React.FC = () => {
  const [chats, setChats] = useState<Message[]>([
  ])

  const {MessageApi, setMessageApi}=useContext(chatContext)

  useEffect(()=>{
    console.log(MessageApi);
    
   setChats(MessageApi)
  },[MessageApi])



  const [typingEffect, setTypingEffect] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const MessageBubble: React.FC<MessageBubbleProps> = ({ message, index }) => {
    const isUser = message.role === 'user'

    return (
      <div
        className={`flex mb-8 animate-slideIn ${isUser ? 'justify-end' : 'justify-start'}`}
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        {!isUser && (
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
          </div>
        )}

        <div className={`max-w-[80%] group ${isUser ? 'flex flex-col items-end' : ''}`}>
          <div className={`relative px-8 py-5 rounded-[2rem] shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${
            isUser
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-white border border-white/30 rounded-br-lg'
              : 'bg-black/10 text-white/95 border border-white/20 rounded-bl-lg'
          }`}>
            <div className="text-sm leading-relaxed font-medium">
              {message.content}
            </div>

            <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-30 transition-all duration-500 ${
              isUser ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-violet-400 to-fuchsia-400'
            } blur-2xl `}></div>

            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/80 to-cyan-500/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-bold">S</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  const TypingIndicator: React.FC = () => (
    <div className="flex justify-start mb-8 animate-fadeIn">
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
      </div>
      <div className="bg-black/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] rounded-bl-lg px-8 py-5 shadow-2xl">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full relative xl:h-[80vh] lg:h-[78vh] md:h-[80%] sm:h-full h-[79vh] mb-4 mt-1">
      {/* background and effects omitted for brevity (unchanged) */}
      <div className="relative z-10 h-full px-6 py-8 overflow-x-hidden overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-6 py-3 bg-black/20 backdrop-blur-2xl rounded-full shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse shadow-lg"></div>
              <span className="text-sm font-semibold text-white/90 tracking-wide">CHAT ACTIVE</span>
            </div>
          </div>

          {chats.map((message, index) => (
            <MessageBubble key={index} message={message} index={index} />
          ))}

          {typingEffect && <TypingIndicator />}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* keep your JSX style block untouched here */}
    </div>
  )
}

export default ChatBody
