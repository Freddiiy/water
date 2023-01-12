import {ReactNode} from "react";

const SectionTitle = ({children}: {children: ReactNode}) => {
    return (
        <div className={"w-full border-b"}>
            <h2 className={"font-bold text-2xl px-3 py-1 text-center"}>{children}</h2>
        </div>
    )
}

export default SectionTitle;