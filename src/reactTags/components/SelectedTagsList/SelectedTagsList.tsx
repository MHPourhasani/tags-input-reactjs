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
    const [, setEditedText] = useState('');
    const [tagIndex, setTagIndex] = useState<number>();
    const editedTextRef = useRef<any>();

    useEffect(() => {
        if (mode === 'array-of-string') {
            setContentEditable(true);
        }
    }, [mode]);

    const selectedTagsKeyDown = (e: any) => {
        if (e.key === 'Enter' && tagIndex !== undefined && editedTextRef.current.trim()) {
            console.log(editedTextRef.current);
            setContentEditable(false);
            setSelectedTags([
                ...new Set(
                    [
                        ...selectedTags.slice(0, tagIndex),
                        (selectedTags[tagIndex] = editedTextRef.current.trim()),
                        ...selectedTags.slice(tagIndex + 1),
                    ].slice(0, maxTags),
                ),
            ]);

            onChange?.([
                ...new Set(
                    [
                        ...selectedTags.slice(0, tagIndex),
                        (selectedTags[tagIndex] = editedTextRef.current.trim()),
                        ...selectedTags.slice(tagIndex + 1),
                    ].slice(0, maxTags),
                ),
            ]);
        }
    };

    const handleClickOutside = () => {
        if (tagIndex !== undefined && editedTextRef.current.trim()) {
            setSelectedTags([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = editedTextRef.current), ...selectedTags.slice(tagIndex + 1)].slice(
                        0,
                        maxTags,
                    ),
                ),
            ]);

            onChange?.([
                ...new Set(
                    [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = editedTextRef.current), ...selectedTags.slice(tagIndex + 1)].slice(
                        0,
                        maxTags,
                    ),
                ),
            ]);
        }
    };

    const ref: any = useOutsideClick(handleClickOutside, false, true);

    const selectedTagOnClick = (e: any) => {
        e.stopPropagation();
    };

    return (
        <div id="selectedTags" className="tag w-full flex flex-wrap gap-2 ml-3">
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
                            contentEditable={contentEditable}
                            onClick={() => {
                                if (mode === 'array-of-string') setContentEditable(true);
                                setTagIndex(index);
                            }}
                            onKeyDown={selectedTagsKeyDown}
                            onInput={(e) => {
                                e.preventDefault();
                                let text: string = '';
                                if (e.currentTarget.textContent) {
                                    text = e.currentTarget.textContent;
                                    setEditedText(text);
                                    editedTextRef.current = text;
                                }
                            }}
                            className={`tagP text-[13px] outline-none truncate ${contentEditable && 'cursor-text'}`}
                        >
                            {tag ? tag : selectedTags.filter((i) => i !== '')}
                            {/* {tag} */}
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
