import React, { useState, useEffect, useCallback } from "react";
//import { useFetch } from "./hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
//import { debounce } from 'lodash';

import { useDebounce } from "./hooks/useDebounce";

import {Name} from "./components/Name"
import {List} from "./components/List"


export const App = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const limit = 100;
    const controller = new AbortController();

//TEST

    // GENERAL FETCH API DATA
    const getData = async (queryString, controller) => {
        const response = await fetch(`http://localhost:5000/names?limit=${limit}${queryString}`,{signal: controller.signal});
        const responseData = await response.json();
        return responseData
    }


    //FETCHING ADDITIONAL DATA ON SCROLL
    const fetchAdditionalData = async () => {
        
        const queryString = debouncedSearchTerm ? `&initial=false&search=${debouncedSearchTerm}` : '&initial=false';
        console.log("fetching additional data");

        const additionalData = await getData(queryString, controller)
        setData([...data, ...additionalData.names]);
    };

    //FETCHING INITIAL DATA ON FIRST RENDER OR SEARCH
    useEffect(() => {
        let mounted = true;
        

        const fetchInitialData = async () => {

            if (!mounted) return setData([]);
            
            setData([]);

            const queryString = debouncedSearchTerm ? `&initial=true&search=${debouncedSearchTerm}` : '&initial=true';
            console.log("fetching initial data");
            const initialData = await getData(queryString, controller)
            setData(initialData.names);
        
        };

        fetchInitialData();


        return () => {
            mounted = false;
            controller.abort();
        }
        
    }, [debouncedSearchTerm]);



    // HANDLE SEARCH INPUT CHANGE
    const handleChange = (e) => {
        setSearchTerm(e.currentTarget.value);
    }



    let nameList = data.map((item) => <Name key={item._id}>{item.name}</Name>);



    return (
    <>
        <input
            style={{position: "fixed"}}
            autoFocus
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search"
        />
        <InfiniteScroll
            dataLength={data.length}
            next={fetchAdditionalData}
            loader={<p>...loading</p>}
            hasMore={true}
            scrollThreshold={0.1}
        >
        <List>{nameList}</List>
        </InfiniteScroll>
    </>  
    );
}

export default App;
