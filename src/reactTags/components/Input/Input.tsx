import React from 'react';
import { InputProps } from './Input.interface';

const Input = ({
    theme,
    placeholder,
    setShowDropdown,
    value,
    changeHandler,
    keyDown,
    inputClassName,
    selectedTags,
    isLoading,
    inputFocus,
}: InputProps) => {
    return (
        <input
            id="input"
            type="text"
            dir="rtl"
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            onKeyDown={keyDown}
            disabled={isLoading}
            autoFocus={inputFocus}
            onFocus={() => setShowDropdown(true)}
            className={`flex-1 h-8 pl-4 rounded-[10px] outline-none !text-right bg-transparent text-sm placeholder:text-zSecondary-400 ${
                selectedTags.length ? 'placeholder:opacity-0' : 'placeholder:opacity-100'
            } focus:placeholder:opacity-100 transition-all ease-in-out ${theme === 'dark' ? 'text-white' : 'text-zGray-800'} ${inputClassName}`}
        />
    );
};

export default Input;
