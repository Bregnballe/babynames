import React, { useState, useEffect, useCallback } from "react";
//import { useFetch } from "./hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
//import { debounce } from 'lodash';

import { useDebounce } from "./hooks/useDebounce";

import {Name} from "./components/Name"
import {List} from "./components/List"


export const App = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState("")
    const [remaining, setRemaining] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    //const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const limit = 50;
    const initialController = new AbortController();
    const additionalController = new AbortController();

    // GENERAL FETCH API DATA
    const getInitialData = async (queryString, controller) => {
        additionalController.abort();
        const response = await fetch(`http://localhost:5000/names?limit=${limit}${queryString}`,{signal: controller.signal});
        const responseData = await response.json();
        return responseData
    }

    const getAdditionalData = async (queryString, controller) => {
        initialController.abort();
        const response = await fetch(`http://localhost:5000/names?limit=${limit}${queryString}`,{signal: controller.signal});
        const responseData = await response.json();
        return responseData
    }


// load initial data
// scroll -> fetch -> cancelled
// search -> fetch
// scroll -> won't fetch (Maybe abortcontrollers`?)


    //FETCHING ADDITIONAL DATA ON SCROLL
    const fetchAdditionalData = async () => {
        initialController.abort();
        
        if (remaining > 0) {
        const queryString = debouncedSearchTerm ? `&initial=false&search=${debouncedSearchTerm}` : '&initial=false';

        const additionalData = await getAdditionalData(queryString, additionalController)
        additionalData.names ? setData([...data, ...additionalData.names]) : setData(data);
        additionalData.total ? setRemaining(additionalData.total-additionalData.names.length) : setRemaining(remaining);
    }
    };

    //FETCHING INITIAL DATA ON FIRST RENDER OR SEARCH
    useEffect(() => {
        let mounted = true;

        const fetchInitialData = async () => {

            if (!mounted) return setData([]);
            
            //setData([]);
            additionalController.abort();

            const queryString = debouncedSearchTerm ? `&initial=true&search=${debouncedSearchTerm}` : '&initial=true';

            const initialData = await getInitialData(queryString, initialController)
            initialData.names ? setData(initialData.names) : setData([]) ;
            initialData.total ? setTotal(initialData.total) : setTotal("0");
            initialData.total ? setRemaining(initialData.total-initialData.names.length) : setRemaining("0");
        
        };

        fetchInitialData();


        return () => {
            mounted = false;
            initialController.abort();
        }
        
    }, [debouncedSearchTerm]);



    // HANDLE SEARCH INPUT CHANGE
    const handleChange = (e) => {
        initialController.abort();
        additionalController.abort();
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
        <p
        style={{position: "fixed", top: "12px"}}
        >Total: {total}</p> 
        <p
        style={{position: "fixed", top: "36px"}}
        >Remaining: {remaining}</p> 
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
