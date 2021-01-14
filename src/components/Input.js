import React, { useState, useMemo } from "react";


export const Input = (props) => {
    const [inputState, setInputState] = useState("");


    const debouncedChange = useMemo((value) =>
        debounce(props.handleChange(value), 500),[]
    )

    /*########### CHANGE INPUT STATE ###########*/
    const handleChange = (e) => {
        setInputState(e.currentTarget.value);

        debouncedChange(e.currentTarget.value)
    };

    return (
            <input
                autoFocus
                onChange={handleChange}
                value={inputState}
                placeholder="Search"
            />
    );
};

/*
useCallback is specifically designed for inline functions. For cases like this you need to use useMemo:

 const throttledMethod = React.useMemo(
        () => _.throttle(abc, 500 ),
        [abc],
    );*/