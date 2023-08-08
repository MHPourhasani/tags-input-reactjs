import React from 'react';
import { InputProps } from './Input.interface';

const Input = ({ theme, placeholder, value, changeHandler, keyDown, inputClassName, inputFocus, setInputFocus, setShowDropdown }: InputProps) => {
    return (
        <input
            id="input"
            type="text"
            dir="rtl"
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            onKeyDown={keyDown}
            autoFocus={inputFocus}
            onClick={() => setInputFocus(true)}
            onFocus={() => setShowDropdown(true)}
            className={`flex-1 h-8 pl-4 rounded-[10px] outline-none !text-right bg-transparent placeholder:text-zSecondary-400 focus:placeholder:opacity-100 transition-all ease-in-out ${
                theme === 'dark' ? 'text-white' : 'text-zGray-800'
            } ${inputClassName}`}
        />
    );
};

export default Input;
