import React from 'react';
import { EmptyListProps } from './EmptyList.interface';

const EmptyList = ({ theme, clickHandler, inputValue, resolveStatus }: EmptyListProps) => {
    return (
        <div className=" w-full bg-white rounded-xl">
            <button
                onClick={clickHandler}
                className={`w-full flex gap-2 cursor-pointer rounded-lg px-2 py-[7px] ${
                    theme === 'dark' ? 'text-white hover:bg-zGray-700' : 'text-zGray-800 hover:bg-zDark-12'
                }`}
            >
                <span>افزودن</span>
                <span className="truncate">"{inputValue}"</span>
                {resolveStatus === undefined && (
                    <>
                        <span className="w-6 h-6 animate-spin border-2 border-dashed rounded-full mr-5" />
                        <div>در حال افزودن</div>
                    </>
                )}
            </button>
        </div>
    );
};

export default EmptyList;
