import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import { SelectedTagsListProps } from './SelectedTagsList.interface';
import Input from '../Input/Input';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const SelectedTagsList = ({
    theme,
    mode,
    maxTags,
    selectedTags,
    setSelectedTags,
    setShowDropdown,
    onChange,
    selectedTagClassName,
    selectedTagCloseIconClass,
    inputPlaceholder,
    inputValue,
    inputChangeHandler,
    inputKeyDown,
    inputClassName,
    inputFocus,
    setInputFocus,
}: SelectedTagsListProps) => {
    const [contentEditable, setContentEditable] = useState(false);
    const [tagIndex, setTagIndex] = useState<number | undefined>();
    const pRef = useRef<any>();

    useEffect(() => {
        if (mode === 'array-of-string') {
            setContentEditable(true);
        }
    }, [mode]);

    const selectedTagsKeyDown = (e: any) => {
        if (
            e.key === 'Enter' &&
            tagIndex !== undefined &&
            pRef.current?.innerText &&
            selectedTags.find((item) => selectedTags.indexOf(item) === tagIndex)
        ) {
            setContentEditable(false);

            setSelectedTags([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = pRef.current?.innerText), ...selectedTags.slice(tagIndex + 1)]
                        .filter((item) => item !== '\n'.toString())
                        .slice(0, maxTags),
                ),
            ]);

            onChange?.([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = pRef.current?.innerText), ...selectedTags.slice(tagIndex + 1)]
                        .filter((item) => item !== '\n'.toString())
                        .slice(0, maxTags),
                ),
            ]);
            setTagIndex(undefined);
        }
    };

    const handleClickOutside = () => {
        if (tagIndex !== undefined && mode === 'array-of-string') {
            if (pRef.current?.innerText && selectedTags.find((item) => selectedTags.indexOf(item) === tagIndex)) {
                console.log('out');
                setSelectedTags([
                    ...new Set(
                        [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = pRef.current?.innerText), ...selectedTags.slice(tagIndex + 1)]
                            .filter((item) => item !== '\n'.toString())
                            .slice(0, maxTags),
                    ),
                ]);

                onChange?.([
                    ...new Set(
                        [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = pRef.current?.innerText), ...selectedTags.slice(tagIndex + 1)]
                            .filter((item) => item !== '\n'.toString())
                            .slice(0, maxTags),
                    ),
                ]);
                setTagIndex(undefined);
            }
        }
    };

    const ref: any = useOutsideClick(handleClickOutside, false, true);

    const selectedTagOnClick = (e: any) => {
        e.stopPropagation();
    };

    console.log(pRef.current?.innerText);

    return (
        <div className="w-full flex flex-wrap gap-2 ml-3">
            <div id="selectedTags" className="flex items-center gap-2">
                {selectedTags &&
                    !!selectedTags.length &&
                    selectedTags.map((tag: string, index) => (
                        <span
                            title={tag}
                            key={tag}
                            ref={ref}
                            onClick={(e) => {
                                if (mode === 'array-of-string') setContentEditable(true);
                                setTagIndex(index);
                                selectedTagOnClick(e);
                            }}
                            className={`selectedTag w-fit max-w-[400px] h-8 px-2 rounded-[4px] flex items-center gap-2.5 text-sm cursor-default focus:border-2 focus:border-zSecondary-400 hover:scale-105 ${
                                theme === 'dark' ? 'bg-zDark-5' : 'bg-zGray-300'
                            } ${selectedTagClassName}`}
                        >
                            <p
                                dir="auto"
                                ref={pRef}
                                contentEditable={contentEditable}
                                onClick={() => {
                                    if (mode === 'array-of-string') setContentEditable(true);
                                    setTagIndex(index);
                                }}
                                onKeyDown={selectedTagsKeyDown}
                                className={`flex items-center text-[13px] outline-none truncate ${contentEditable && 'cursor-text'}`}
                            >
                                {tag}
                            </p>
                            <CloseIcon
                                className={`w-3 h-auto shrink-0 stroke-black cursor-pointer hover:scale-125 transition-all ease-in-out hover:stroke-red-600 ${selectedTagCloseIconClass}`}
                                onClick={() => {
                                    setSelectedTags(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                    onChange?.(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                }}
                            />
                        </span>
                    ))}
            </div>

            <Input
                theme={theme}
                placeholder={inputPlaceholder}
                value={inputValue}
                changeHandler={inputChangeHandler}
                keyDown={inputKeyDown}
                inputClassName={inputClassName}
                selectedTags={selectedTags}
                inputFocus={inputFocus}
                setInputFocus={setInputFocus}
                setShowDropdown={setShowDropdown}
            />
        </div>
    );
};

export default SelectedTagsList;
