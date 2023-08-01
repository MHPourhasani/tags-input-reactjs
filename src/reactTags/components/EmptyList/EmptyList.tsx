import React from 'react';
import { EmptyListProps } from './EmptyList.interface';
import AddingLoading from '../AddingLoading/AddingLoading';

const EmptyList = ({ theme, clickHandler, inputValue, isLoading, emptyListClassName }: EmptyListProps) => {
    return (
        <button
            onClick={clickHandler}
            disabled={isLoading}
            className={`w-full flex gap-2 cursor-pointer border border-zSecondary-400 rounded-lg px-2 py-[7px] disabled:cursor-wait ${
                theme === 'dark' ? 'text-white bg-bg-dark hover:bg-zGray-700' : 'text-zGray-800 bg-bg-light hover:bg-zSecondary-300'
            } ${emptyListClassName}`}
        >
            <span>افزودن</span>
            <span className="truncate">{`"${inputValue}"`}</span>
            {isLoading && <AddingLoading theme={theme} loadingText="در حال افزودن" />}
        </button>
    );
};

export default EmptyList;
