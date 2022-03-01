import React, { useEffect, useRef } from 'react';

export default function Textarea({
    name,
    value,
    className,
    required,
    isFocused,
    handleChange,
    rows = 3,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                required={required}
                onChange={(e) => handleChange(e)}
                rows={rows}
            />
        </div>
    );
}
