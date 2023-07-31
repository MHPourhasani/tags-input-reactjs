import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import { SelectedTagsListProps } from './SelectedTagsList.interface';
import Input from '../Input/Input';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const SelectedTagsList = ({
    theme,
    mode,
    maxTags,
    selectedTags,
    setSelectedTags,
    onChange,
    selectedTagClassName,
    selectedTagCloseIconClass,
    inputPlaceholder,
    inputValue,
    inputChangeHandler,
    inputKeyDown,
    setShowDropdown,
    inputClassName,
    resolveStatus,
}: SelectedTagsListProps) => {
    const [contentEditable, setContentEditable] = useState(false);
    const [] = useState('');

    const selectedTagsKeyDown = (e: any) => {
        if (mode === 'array-of-string') {
            setContentEditable(true);
            if (e.key === 'Enter') {
                setContentEditable(false);
            }
        }
    };

    const clickHandler = () => {
        if (mode === 'array-of-string') setContentEditable(true);
    };

    // useEffect(() => {
    //   first

    //   return () => {
    //     second
    //   }
    // }, [third])

    // 1. Listen for changes of the contenteditable element

    const handleClickOutside = () => {
        setShowDropdown(false);
    };

    const ref: any = useOutsideClick(handleClickOutside);

    return (
        <div className="w-full flex flex-wrap gap-2 ml-3">
            {selectedTags &&
                !!selectedTags.length &&
                selectedTags.map((tag: string) => (
                    <span
                        title={tag}
                        key={tag}
                        ref={ref}
                        onClick={clickHandler}
                        onKeyDown={selectedTagsKeyDown}
                        className={`w-fit max-w-[400px] h-8 px-2 rounded-[4px] flex items-center gap-2.5 text-sm cursor-default focus:border-2 focus:border-zSecondary-400 hover:scale-105 ${
                            theme === 'dark' ? 'bg-zDark-5' : 'bg-zGray-300'
                        } ${selectedTagClassName}`}
                    >
                        <p
                            dir="auto"
                            contentEditable={contentEditable}
                            // role="textbox"
                            onInput={(e) => {
                                e.preventDefault();

                                let text: string = '';
                                if (e.currentTarget.textContent) {
                                    text = e.currentTarget.textContent;
                                }
                                // console.log(text)

                                if (tag !== text) {
                                    // const findTag = selectedTags.find((item) => item === tag);
                                    const tagIndex = selectedTags.indexOf(tag);
                                    console.log(tagIndex);
                                    // console.log(e.currentTarget);
                                    setSelectedTags([...selectedTags.filter((item) => item !== tag), (selectedTags[tagIndex] = text)]);
                                    // setSelectedTags([
                                    //     ...selectedTags.slice(0, tagIndex),
                                    //     ...selectedTags.slice(tagIndex + 1),
                                    // ].splice(tagIndex,1,text));

                                    // setSelectedTags(
                                    //     [...selectedTags.slice(0, tagIndex), (selectedTags[tagIndex] = text), ...selectedTags.slice(tagIndex + 1)]
                                    //         .filter((tag: string, index: number) => selectedTags.indexOf(tag) === index)
                                    //         .slice(0, maxTags),
                                    // );
                                }
                                // console.log(text);
                            }}
                            className="text-[13px] outline-none truncate"
                        >
                            {tag ? tag : selectedTags.filter((i) => i !== tag)}
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
                setShowDropdown={setShowDropdown}
                inputClassName={inputClassName}
                selectedTags={selectedTags}
                resolveStatus={resolveStatus}
            />
        </div>
    );
};

export default SelectedTagsList;
