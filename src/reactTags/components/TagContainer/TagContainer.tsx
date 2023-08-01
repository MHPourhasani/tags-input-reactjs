import React, { useEffect, useState } from 'react';
import { TagContainerProps } from './TagContainer.interface';
import { FilteredTagsType, ThemeType } from '../../interfaces/general';
import SelectedTagsList from '../SelectedTagsList/SelectedTagsList';
import Dropdown from '../Dropdown/Dropdown';
import EmptyList from '../EmptyList/EmptyList';
import CloseIcon from '../../assets/icons/closeIcon';

export default function TagContainer({
    mode,
    theme = 'light',
    maxTags,
    defaultSelectedTags,
    onChange,
    title = 'تگ',
    inputPlaceholder = 'آیتم‌ها را با Enter از هم جدا کنید.',
    inputClassName,
    categoriesTags,
    addToCategoryOnClick,
    dropDownContainerClassName,
    tagsContainerClassName,
    tagsClassName,
    selectedTagClassName,
    selectedTagCloseIconClass,
}: TagContainerProps) {
    const [userTheme, setUserTheme] = useState<ThemeType>('light');
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredTags, setFilteredTags] = useState<FilteredTagsType>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [listOfTags, setListOfTags] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    useEffect(() => {
        if (theme) {
            setUserTheme(theme);
        }
    }, [theme]);

    useEffect(() => {
        if (defaultSelectedTags) {
            if (maxTags) {
                setSelectedTags([...new Set(defaultSelectedTags.slice(0, maxTags))]);
            } else {
                setSelectedTags([...new Set(defaultSelectedTags.slice(0))]);
            }
        }
    }, [defaultSelectedTags, maxTags]);

    useEffect(() => {
        if (categoriesTags) {
            setListOfTags(categoriesTags);
        }
    }, [categoriesTags]);

    useEffect(() => {
        if (listOfTags) {
            setFilteredTags(
                listOfTags
                    .filter((tag: string, index: number) => listOfTags.indexOf(tag) === index)
                    .filter((item: string) => Object.values(item).join('').toLowerCase().includes(inputValue.toLowerCase())),
            );
        }
    }, [inputValue, listOfTags]);

    const inputChangeHandler = (e: any) => {
        let value = e.target.value;
        if (value.trim() || value === '') {
            setInputValue(value);
        }
    };

    const inputKeyDown = async (e: any) => {
        const value = e.target.value;
        setInputValue(value.trim());

        if (e.key === 'Enter' && value.trim() && activeIndex === null) {
            if (
                mode === 'multi-select' &&
                selectedTags.filter((item: string) => Object.values(item).join('').toLowerCase().includes(value.toLowerCase()))
            ) {
                if (filteredTags.find((i) => i === value)) {
                    if (maxTags) {
                        setSelectedTags([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                        onChange?.([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                    } else {
                        setSelectedTags([...new Set([...selectedTags, value.trim()])]);
                        onChange?.([...new Set([...selectedTags, value.trim()])]);
                    }
                }
            } else {
                if (addToCategoryOnClick && mode === 'advanced-multi-select') {
                    setIsLoading(true);
                    await addToCategoryOnClick(value.trim());
                    setIsLoading(false);

                    if (listOfTags.filter((tag: string) => tag !== value.trim())) {
                        setListOfTags([...listOfTags, value.trim()]);
                        if (maxTags && selectedTags.length < maxTags) {
                            setSelectedTags([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                            onChange?.([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                        } else {
                            setSelectedTags([...new Set([...selectedTags, value.trim()])]);
                            onChange?.([...new Set([...selectedTags, value.trim()])]);
                        }
                    }
                }

                if (mode === 'array-of-string') {
                    onChange?.([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                    setSelectedTags([...new Set([...selectedTags, value.trim()].slice(0, maxTags))]);
                }
            }

            setInputValue('');
            setInputFocus(true);
        }

        if (e.key === 'Enter') {
            if (activeIndex !== null) {
                if (maxTags) {
                    setSelectedTags([...new Set([...selectedTags, filteredTags[activeIndex]].slice(0, maxTags))]);
                    onChange?.([...new Set([...selectedTags, filteredTags[activeIndex]].slice(0, maxTags))]);
                } else {
                    setSelectedTags([...new Set([...selectedTags, filteredTags[activeIndex]])]);
                    onChange?.([...new Set([...selectedTags, filteredTags[activeIndex]])]);
                }
                setActiveIndex(null);
            }
            setInputFocus(true);
            setInputValue('');
        }

        if (e.key === 'Backspace') {
            if (!value && selectedTags) {
                setSelectedTags(selectedTags.slice(0, selectedTags.length - 1));
                onChange?.(selectedTags.slice(0, selectedTags.length - 1));
            }
            setActiveIndex(null);
        }

        if (e.key === 'ArrowDown') {
            if (activeIndex === null) {
                setActiveIndex(0);
            } else if (activeIndex === filteredTags.length - 1) {
                setActiveIndex(0);
            } else {
                setActiveIndex(activeIndex + 1);
            }
        }

        if (e.key === 'ArrowUp') {
            if (activeIndex === null) {
                setActiveIndex(filteredTags.length - 1);
            } else if (activeIndex === 0) {
                setActiveIndex(filteredTags.length - 1);
            } else {
                setActiveIndex(activeIndex - 1);
            }
        }
    };

    const clickHandler = async () => {
        if (addToCategoryOnClick && inputValue.trim()) {
            if (mode === 'advanced-multi-select') {
                setIsLoading(true);
                await addToCategoryOnClick(inputValue.trim());
                setIsLoading(false);
                setSelectedTags([...new Set([...selectedTags, inputValue].slice(0, maxTags))]);
                setListOfTags([...listOfTags, inputValue.trim()]);
            } else {
                setSelectedTags([...new Set([...selectedTags, inputValue].slice(0, maxTags))]);
            }
            onChange?.([...new Set([...selectedTags, inputValue].slice(0, maxTags))]);
        }

        setInputFocus(true);
        setInputValue('');
    };

    const tagsMouseDown = (e: any) => {
        if (!document.getElementById('input')?.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        if (!showDropdown) {
            setActiveIndex(null);
        }
    }, [showDropdown]);

    const selectedTagsProps = {
        selectedTags: selectedTags,
        setSelectedTags: setSelectedTags,
        onChange: onChange,
    };

    const globalProps = {
        theme: userTheme,
        mode: mode,
    };

    return (
        <section dir="rtl" id="tagsContainer" className={`w-full flex flex-col items-center font-iranyekan ${tagsContainerClassName}`}>
            <section className={`relative w-full`}>
                <label className={`text-sm ${userTheme === 'dark' ? 'text-zSecondary-10' : 'text-zGray-800'}`}>{`${title}`}</label>

                {maxTags && (
                    <label
                        className={`text-sm mr-1 ${userTheme === 'dark' ? 'text-zSecondary-400' : 'text-zSecondary-400'}`}
                    >{`(حداکثر ${maxTags} مورد)`}</label>
                )}

                <div
                    id="tags"
                    onMouseDown={tagsMouseDown}
                    className={`relative w-full max-w-full min-h-[3.5rem] h-fit flex items-start gap-2 mt-2 p-2.5 rounded-[0.625rem] border-zSecondary-100 border ${
                        userTheme === 'dark' ? 'bg-bg-dark' : 'bg-white'
                    } ${tagsClassName}`}
                >
                    <SelectedTagsList
                        {...globalProps}
                        {...selectedTagsProps}
                        maxTags={maxTags}
                        selectedTagClassName={selectedTagClassName}
                        selectedTagCloseIconClass={selectedTagCloseIconClass}
                        inputPlaceholder={inputPlaceholder}
                        inputValue={inputValue}
                        inputChangeHandler={inputChangeHandler}
                        inputKeyDown={inputKeyDown}
                        setShowDropdown={setShowDropdown}
                        inputClassName={inputClassName}
                        isLoading={isLoading}
                        inputFocus={inputFocus}
                    />

                    {mode === 'advanced-multi-select' && (
                        <span className={`w-fit mt-1.5 rounded-full transition-all ease-in-out`}>
                            {isLoading ? (
                                <span className="flex items-center gap-2 w-36">
                                    <span className="w-6 h-6 animate-spin border-2 border-dashed rounded-full mr-5" />
                                    <div className="text-xs">در حال افزودن</div>
                                </span>
                            ) : (
                                <CloseIcon
                                    onClick={clickHandler}
                                    className={`w-5 h-auto rotate-45 cursor-pointer ${theme === 'dark' ? 'stroke-white' : 'stroke-zGray-800'}`}
                                />
                            )}
                        </span>
                    )}
                </div>
            </section>

            <span id="dropdown-container" className="relative w-full h-auto z-50">
                {showDropdown &&
                    mode === 'advanced-multi-select' &&
                    inputValue &&
                    !filteredTags.length &&
                    !filteredTags.find((item) => item === inputValue) && (
                        <div className="absolute w-full">
                            <EmptyList {...globalProps} inputValue={inputValue} clickHandler={clickHandler} isLoading={isLoading} />
                        </div>
                    )}

                {showDropdown && mode !== 'array-of-string' && !!filteredTags.length && (
                    <div className="absolute w-full h-auto">
                        <Dropdown
                            {...globalProps}
                            {...selectedTagsProps}
                            maxTags={maxTags}
                            filteredTags={filteredTags}
                            dropDownContainerClassName={dropDownContainerClassName}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            clickHandler={clickHandler}
                            activeIndex={activeIndex}
                            setShowDropdown={setShowDropdown}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </span>
        </section>
    );
}
