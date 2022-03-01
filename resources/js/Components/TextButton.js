import React from 'react';

export default function TextButton({ type = 'submit', className = '', processing, children, handleClick = () => {} }) {

    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-2 py-1 underline border border-transparent rounded-md text-sm text-gray text-gray-600 hover:text-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
