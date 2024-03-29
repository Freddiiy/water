import {ReactNode} from "react";

const SectionContainer = ({children, success, error}: { children: ReactNode, success?: boolean, error?: boolean }) => {
    return (
        <div>
            <div
                className={`flex flex-col justify-center items-center outline outline-1 outline-white  rounded-2xl overflow-hidden ${success ? "outline-green-500 outline-4" : null} ${error ? "outline-red-600 outline-4" : null} transition-all duration-150 ease-in`}>
                {children}
            </div>
        </div>
    )
}

export default SectionContainer;