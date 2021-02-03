import React, { useState } from "react";


export const Input = (props) => {
    const [inputState, setInputState] = useState("");

    /*########### CHANGE INPUT STATE ###########*/
    const handleChange = (e) => {
        props.handleChange(e.currentTarget.value);

    };

    return (
            <input
                autoFocus
                onChange={handleChange}
                placeholder="Search"
                value={props.value}
            />
    );
};

/*
useCallback is specifically designed for inline functions. For cases like this you need to use useMemo:

 const throttledMethod = React.useMemo(
        () => _.throttle(abc, 500 ),
        [abc],
    );*/