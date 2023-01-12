import React from "react";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const NumberInput = (props: InputProps) => {
    return (
        <input type={"text"} {...props} className={"rounded-lg outline outline-1 h-6 w-24 outline-neutral-900 m-2 px-2 bg-neutral-700 appearance-none text-lg text-center"} />
    )
}

export default NumberInput