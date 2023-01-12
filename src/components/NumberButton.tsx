import React, {ReactNode} from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
}

const NumberButton = (props: ButtonProps) => {
    return (
        <button {...props} className={"rounded-full h-6 w-6 m-2"}>
            <span className={"w-full h-full font-bold text-2xl flex justify-center items-center"}>
                {props.children}
            </span>
        </button>
    )
}

export default NumberButton