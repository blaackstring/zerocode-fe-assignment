
import { XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";


interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
  
}

const Modal: React.FC<ModalProps> = ({
    isOpen=true,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,

}) => {
    const [showModal, setShowModal] = useState(isOpen)


    useEffect(() => {
        setShowModal(isOpen)
        console.log(isOpen);
        
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) return;
setShowModal(false)
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();

    }, [disabled, onSubmit])




    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                justify-center
                items-center
                flex
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                z-50    
                outline-none
                text-black
                focus:outline-none
                bg-neutral-800/90"
            >
                <div
                    className="
                relative
                w-full
                md:w-4/6
                lg:w-3/9 
                xl:w-2/5
                my-6
                mx-auto
                h-[40vh]
                lg:h-[50vh]
                md:h-auto"
                >
                    { /* Content */}

                    <div
                        className={`*:
                    translate
                    duration-300
                  
                    h-full
                    ${showModal ? 'translate-y-0' : 'translate-y-full scale-2 transform-view translate-40'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                    
                    `}
                    >
                        <div
                            className="translate
                    h-full
                   
                    border-0
                    shadow-lg
                    relative
                    flex
                    flex-col
                    outline-none
                    focus:outline-none
                    bg-white
                    rounded-lg
                    ">

                            {/* Header */}

                            <div
                                className="
                                 relative
                                flex
                                items-center
                                p-5
                                rounded-t
                                justify-center"
                            >
                                <button className="p-1 border-0 hover:opcity-70  transition-all duration-300 ease-in-out absolute left-9 cursor-pointer"
                                onClick={handleClose}
                                >
                                    <XIcon className="text-black" size={19}/>
                                </button>

   <div className="  text-center text-lg font-semibold">
                                    {title}
                                </div>
                            </div>

                             
                                {/* body */}
                                <div className="relative  p-5 flex-auto">
                                    {body}
                                </div>
                                {/* footer */}
                                <div className="flex bg flex-col gap-2 p-6">
                                    <div className="flex  flex-col items-center bg-rose-400 gap-4 w-full py-2 font-bold "  onClick={handleSubmit}>
                                     
                                      <button className="text-black"  disabled={disabled} onClick={handleSubmit}>{actionLabel}</button>
                                    </div>
                                </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
export default Modal;