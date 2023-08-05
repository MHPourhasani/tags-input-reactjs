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

    const ref: any = useOutsideClick(handleClickOutside, true, false);

    const dropDownOnClick = (e: any) => {
        e.stopPropagation();
    };

    const handleClick = (item: string) => {
        if (maxTags) {
            setSelectedTags([...new Set([...selectedTags, item].slice(0, maxTags))]);
            onChange?.([...new Set([...selectedTags, item].slice(0, maxTags))]);
        } else {
            setSelectedTags([...new Set([...selectedTags, item])]);
            onChange?.([...new Set([...selectedTags, item])]);
        }
        setInputValue('');
    };

    return (
        <div
            id="dropDown"
            ref={ref}
            onClick={dropDownOnClick}
            className={`w-full h-auto max-h-72 flex flex-col gap-1 border border-zSecondary-400 rounded-xl custom-scrollbar overflow-y-auto ${
                theme === 'dark' ? 'bg-bg-dark' : 'bg-bg-light'
            } ${dropDownContainerClassName}`}
        >
            {mode === 'advanced-multi-select' && filteredTags && inputValue.trim() && !filteredTags.find((tag: string) => tag === inputValue) && (
                <EmptyList
                    inputValue={inputValue}
                    clickHandler={clickHandler}
                    theme={theme}
                    mode={mode}
                    isLoading={isLoading}
                    emptyListClassName="border-0"
                />
            )}

            {mode === 'advanced-multi-select' &&
                !isLoading &&
                filteredTags &&
                inputValue.trim() &&
                !filteredTags.find((tag: string) => tag === inputValue) && <span className={`border border-zSecondary-300`} />}

            {!isLoading && (
                <div className="flex flex-col gap-1">
                    {filteredTags.map((item: string) => (
                        <span
                            key={item}
                            onClick={() => handleClick(item)}
                            className={`truncate cursor-pointer rounded-lg py-2 px-4 ${
                                theme === 'dark' ? 'text-white hover:bg-zGray-700' : 'text-zGray-800 hover:bg-zSecondary-300'
                            } ${filteredTags.indexOf(item) === activeIndex && `${theme === 'dark' ? 'bg-zGray-700' : 'bg-zSecondary-300'}`} ${
                                filteredTags.find((tag: string) => tag === selectedTags[selectedTags.indexOf(item)]) &&
                                'text-zSecondary-400 cursor-text'
                            }`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
