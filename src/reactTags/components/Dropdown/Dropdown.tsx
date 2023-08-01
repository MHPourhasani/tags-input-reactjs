import React from 'react';
import { DropdownProps } from './Dropdown.interface';
import EmptyList from '../EmptyList/EmptyList';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Dropdown = ({
    theme,
    mode,
    filteredTags,
    maxTags,
    selectedTags,
    setSelectedTags,
    onChange,
    dropDownContainerClassName,
    inputValue,
    setInputValue,
    clickHandler,
    activeIndex,
    setShowDropdown,
    isLoading,
}: DropdownProps) => {
    const handleClickOutside = () => {
        setShowDropdown(false);
    };

    const ref: any = useOutsideClick(handleClickOutside);

    const dropDownOnClick = (e: any) => {
        e.stopPropagation();
    };

    return (
        <div
            id="dropDown"
            ref={ref}
            onClick={dropDownOnClick}
            className={`w-full h-auto max-h-72 flex flex-col gap-1 border rounded-xl custom-scrollbar overflow-y-auto ${
                theme === 'dark' ? 'bg-bg-dark' : 'bg-bg-light'
            } ${dropDownContainerClassName}`}
        >
            {mode === 'advanced-multi-select' && filteredTags && inputValue.trim() && !filteredTags.find((tag: string) => tag === inputValue) && (
                <EmptyList inputValue={inputValue} clickHandler={clickHandler} theme={theme} mode={mode} isLoading={isLoading} />
            )}

            {filteredTags.map((item: string) => (
                <span
                    key={item}
                    onClick={() => {
                        setSelectedTags([...new Set([...selectedTags, item].slice(0, maxTags))]);
                        onChange?.([...new Set([...selectedTags, item].slice(0, maxTags))]);
                        setInputValue('');
                    }}
                    className={`truncate cursor-pointer rounded-lg h-10 px-4 overflow-y-auto ${
                        theme === 'dark' ? 'text-white hover:bg-zGray-700' : 'text-zGray-800 hover:bg-zSecondary-300'
                    } ${filteredTags.indexOf(item) === activeIndex && 'bg-zSecondary-300'} ${
                        filteredTags.find((tag: string) => tag === selectedTags[selectedTags.indexOf(item)]) && 'text-zSecondary-400 cursor-text'
                    }`}
                >
                    {item}
                </span>
            ))}
        </div>
    );
};

export default Dropdown;
