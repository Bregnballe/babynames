import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetchNames } from "./hooks/useFetchNames";
import { useInView } from "react-intersection-observer";
import {Name} from "./components/Name"
import {List} from "./components/List"


export const App = () => {
    const [ref, inView] = useInView();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const limit = 50;
    const initialController = useRef(null);
    const additionalController = useRef(null);

    const {data, total, remaining, isLoading} = useFetchNames(debouncedSearchTerm, inView, limit, initialController, additionalController)


    // HANDLE SEARCH INPUT CHANGE
    const handleChange = (e) => {
        initialController.current && initialController.current.abort();
        additionalController.current && additionalController.current.abort();
        setSearchTerm(e.currentTarget.value);
    }

    // HANDLE ABORT CLICK
    const handleOnClick = () => {
        initialController.current && initialController.current.abort();
        additionalController.current && additionalController.current.abort();
    }

    // CREATE NAMES LIST 
    let nameList = data.map((item, i) => { 
        return i === data.length - limit ? 
        (<Name key={item._id} ref={ref}>{item.name}</Name>)
        : 
        (<Name key={item._id}>{item.name}</Name>)
    });
    // place ref on first listitem loaded



    return (
    <>
        <input
            style={{position: "fixed", top: "0px"}}
            autoFocus
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search"
        />
        <button  style={{position: "fixed", top: "128px"}} onClick={handleOnClick}>abort</button>
        <p
        style={{position: "fixed", top: "24px"}}
        >Total: {total}</p> 
        <p
        style={{position: "fixed", top: "48px"}}
        >Remaining: {remaining}</p> 
        <p
        style={{position: "fixed", top: "72px"}}
        >{isLoading && "...loading"}</p> 

        <List>{nameList}</List>

    </>  
    );
}

export default App;



/*
<InfiniteScroll
dataLength={data.length}
next={fetchAdditionalData}
loader={<p>...loading</p>}
hasMore={remaining > 0}
scrollThreshold={0.5}
endMessage={<p>the end</p>}
>
<List>{nameList}</List>
</InfiniteScroll>
*/