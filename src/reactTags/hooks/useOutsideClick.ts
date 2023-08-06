import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: any, input?: boolean, selectedTag?: boolean) => {
    const ref = useRef<any>();

    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (input) {
                    if (!document.getElementById('input')?.contains(event.target)) {
                        callback();
                    }
                } else if (selectedTag) {
                    if (!document.querySelector('.selectedTag')?.contains(event.target)) {
                        callback();
                    }
                } else {
                    callback();
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [callback, input, ref, selectedTag]);

    return ref;
};
