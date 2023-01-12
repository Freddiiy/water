import {ReactNode} from "react";

const SectionRow = ({children}: {children: ReactNode}) => {
    return (
        <div className={"flex flex-row justify-center items-center p-4"}>
            {children}
        </div>
    )
}

export default SectionRow;