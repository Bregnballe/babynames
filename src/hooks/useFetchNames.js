import {useState, useEffect, useRef} from 'react'


export const useFetchNames = (debouncedSearchTerm, inView, limit, initialController, additionalController ) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState("")
    const [remaining, setRemaining] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const firstUpdate = useRef(true);

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






    return {data, total, remaining, isLoading}
}