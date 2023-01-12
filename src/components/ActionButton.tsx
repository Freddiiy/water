import React, {ReactNode} from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
}

const ActionButton = (props: ButtonProps) => {
    return (
        <button {...props} className={"p-2 bg-indigo-600 w-full hover:bg-indigo-700"}>
            <span className={"font-semibold text-lg flex justify-center items-center text-white"}>
                {props.children}
            </span>
        </button>
    )
}

export default ActionButton