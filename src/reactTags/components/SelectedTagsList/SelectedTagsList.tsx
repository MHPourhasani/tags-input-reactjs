import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import { SelectedTagsListProps } from './SelectedTagsList.interface';
import Input from '../Input/Input';

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
    closeIcon,
}: SelectedTagsListProps) => {
    const [contentEditable, setContentEditable] = useState(false);
    const [tagIndex, setTagIndex] = useState<number | undefined>();
    const editedTextRef = useRef<any>();

    useEffect(() => {
        if (mode === 'array-of-string') {
            setContentEditable(true);
        }
    }, [mode]);

    const selectedTagsKeyDown = (e: any) => {
        if (e.key === 'Enter' && tagIndex !== undefined && selectedTags.find((item) => selectedTags.indexOf(item) === tagIndex)) {
            setContentEditable(false);

            setSelectedTags([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = editedTextRef.current.trim()), ...selectedTags.slice(tagIndex + 1)]
                        .filter((item) => item.length)
                        .slice(0, maxTags),
                ),
            ]);

            onChange?.([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = editedTextRef.current.trim()), ...selectedTags.slice(tagIndex + 1)]
                        .filter((item) => item.length)
                        .slice(0, maxTags),
                ),
            ]);
            setTagIndex(undefined);
        }

        if (e.key === 'Backspace' && editedTextRef.current.length === 1 && tagIndex !== undefined) {
            editedTextRef.current = '';

            if (e.key === 'Enter') {
                setSelectedTags([
                    ...new Set(
                        [
                            ...selectedTags.slice(0, tagIndex),
                            (selectedTags[tagIndex] = editedTextRef.current.trim()),
                            ...selectedTags.slice(tagIndex + 1),
                        ]
                            .filter((item) => item.length)
                            .slice(0, maxTags),
                    ),
                ]);

                onChange?.([
                    ...new Set(
                        [
                            ...selectedTags.slice(0, tagIndex),
                            (selectedTags[tagIndex] = editedTextRef.current.trim()),
                            ...selectedTags.slice(tagIndex + 1),
                        ]
                            .filter((item) => item.length)
                            .slice(0, maxTags),
                    ),
                ]);
                setTagIndex(undefined);
            }
        }
    };

    return (
        <div className="w-full flex flex-wrap gap-2 ml-3">
            <div id="selectedTags" className="flex items-center gap-2">
                {selectedTags &&
                    !!selectedTags.length &&
                    selectedTags.map((tag: string, index) => (
                        <span
                            title={tag}
                            key={tag}
                            onClick={() => {
                                if (mode === 'array-of-string') setContentEditable(true);
                                setTagIndex(index);
                            }}
                            onFocus={() => {
                                setTagIndex(index);
                                editedTextRef.current = tag.trim();
                            }}
                            onBlur={() => setTagIndex(undefined)}
                            className={`selectedTag w-fit max-w-[400px] h-8 px-2 rounded-[4px] flex items-center gap-2.5 text-sm cursor-default focus:border-2 focus:border-zSecondary-400 hover:scale-105 ${
                                theme === 'dark' ? 'bg-zDark-5' : 'bg-zGray-300'
                            } ${selectedTagClassName}`}
                        >
                            <p
                                dir="auto"
                                contentEditable={contentEditable}
                                onClick={() => {
                                    if (mode === 'array-of-string') setContentEditable(true);
                                    setTagIndex(index);
                                    editedTextRef.current = tag.trim();
                                }}
                                onKeyDown={selectedTagsKeyDown}
                                onInput={(e) => {
                                    e.preventDefault();
                                    if (e.currentTarget.textContent?.trim()) {
                                        if (e.currentTarget.textContent?.trim() === tag.trim()) {
                                            editedTextRef.current = tag.trim();
                                        } else {
                                            editedTextRef.current = e.currentTarget.textContent;
                                        }
                                    } else {
                                        editedTextRef.current = '';
                                    }
                                    console.log(editedTextRef.current);
                                }}
                                onFocus={() => {
                                    setTagIndex(index);
                                    editedTextRef.current = tag.trim();
                                }}
                                onBlur={() => {
                                    if (tagIndex !== undefined) {
                                        setSelectedTags([
                                            ...new Set(
                                                [
                                                    ...selectedTags.slice(0, tagIndex),
                                                    (selectedTags[index] = editedTextRef.current.trim()),
                                                    ...selectedTags.slice(tagIndex + 1),
                                                ]
                                                    .filter((item) => item.length)
                                                    .slice(0, maxTags),
                                            ),
                                        ]);

                                        onChange?.([
                                            ...new Set(
                                                [
                                                    ...selectedTags.slice(0, tagIndex),
                                                    (selectedTags[index] = editedTextRef.current.trim()),
                                                    ...selectedTags.slice(tagIndex + 1),
                                                ]
                                                    .filter((item) => item.length)
                                                    .slice(0, maxTags),
                                            ),
                                        ]);
                                    }
                                    setTagIndex(undefined);
                                    setContentEditable(false);
                                }}
                                className={`flex items-center text-[13px] outline-none truncate cursor-text`}
                            >
                                {tag.trim()}
                            </p>

                            {closeIcon ? (
                                <img
                                    src={closeIcon}
                                    alt="close icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedTags(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                        onChange?.(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                    }}
                                />
                            ) : (
                                <CloseIcon
                                    className={`w-3 h-auto shrink-0 stroke-black cursor-pointer hover:scale-125 transition-all ease-in-out hover:stroke-red-600 ${selectedTagCloseIconClass}`}
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedTags(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                        onChange?.(selectedTags.filter((selectTag: string) => selectTag !== tag).slice(0, maxTags));
                                    }}
                                />
                            )}
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
