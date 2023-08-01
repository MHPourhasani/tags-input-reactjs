import React from 'react';
import { EmptyListProps } from './EmptyList.interface';

const EmptyList = ({ theme, clickHandler, inputValue, isLoading }: EmptyListProps) => {
    return (
        <button
            onClick={clickHandler}
            disabled={isLoading}
            className={`w-full flex gap-2 cursor-pointer border border-zSecondary-400 rounded-lg px-2 py-[7px] disabled:cursor-wait ${
                theme === 'dark' ? 'text-white bg-bg-dark hover:bg-zGray-700' : 'text-zGray-800 bg-bg-light hover:bg-zSecondary-300'
            }`}
        >
            <span>افزودن</span>
            <span className="truncate">{`"${inputValue}"`}</span>
            {isLoading && (
                <>
                    <span className="w-6 h-6 animate-spin border-2 border-dashed rounded-full mr-5" />
                    <div>در حال افزودن</div>
                </>
            )}
        </button>
    );
};

export default EmptyList;
