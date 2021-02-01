import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useInView } from "react-intersection-observer";
import {Name} from "./components/Name"
import {List} from "./components/List"


export const App = () => {
    const [ref, inView] = useInView();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState("")
    const [remaining, setRemaining] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const limit = 50;
    const firstUpdate = useRef(true);
    const initialController = useRef(null);
    const additionalController = useRef(null);



    // GENERAL FETCH API DATA
    const getData = async (queryString, controller) => {
        console.log('Getting data') 
        try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:5000/names?limit=${limit}${queryString}`,{signal: controller.signal});
        const responseData = await response.json();
        return responseData
        }
        catch (err) {
            if (err.name === 'AbortError') { // handle abort()
                console.error(err);
                return []
            } 
            else {
                throw err;
            }
        }
    }


    //FETCHING ADDITIONAL DATA ON SCROLL
    useEffect(() => {
        console.log("inView: ", inView)
        additionalController.current = new AbortController(); 
        
        if (!inView && !firstUpdate.current && !isLoading && remaining > 0) {
            // if user has scrolled passed ref
            // it is not the first fetch request
            // data is not being loaded already
            // data remains
        
            const fetchAdditionalData = async () => {

                const queryString = debouncedSearchTerm ? `&startId=${data[data.length-1]._id}&search=${debouncedSearchTerm}` : `&startId=${data[data.length-1]._id}`;
                 // if there is a search term include it in query

                const additionalData = await getData(queryString, additionalController.current)
                additionalData.names ? setData([...data, ...additionalData.names]) : setData(data);
                additionalData.total ? setRemaining(additionalData.total-additionalData.names.length) : setRemaining(remaining);
                setIsLoading(false)
            
            };

            fetchAdditionalData();

        }

        return () => {
            additionalController.current.abort();
        }
    
    }, [inView]);


    //FETCHING INITIAL DATA ON FIRST RENDER OR SEARCH
    useEffect(() => {

        firstUpdate.current = false;
        initialController.current = new AbortController(); 

        const fetchInitialData = async () => {
            
            const queryString = 
            debouncedSearchTerm ? `&search=${debouncedSearchTerm}` 
            : '';
            // if there is a search term include it in query

            const initialData = await getData(queryString, initialController.current)
            initialData && window.scrollTo(0, 0);
            initialData.names ? setData(initialData.names) : setData([]) ;
            initialData.total ? setTotal(initialData.total) : setTotal("0");
            initialData.total ? setRemaining(initialData.total-initialData.names.length) : setRemaining("0");
            setIsLoading(false);
        
        };

        fetchInitialData();


        return () => {
            initialController.current.abort();
            additionalController.current.abort();
        }
        
    }, [debouncedSearchTerm]);



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