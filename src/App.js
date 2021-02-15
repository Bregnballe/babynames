import React, { useState, useRef } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetchNames } from "./hooks/useFetchNames";
import { useInView } from "react-intersection-observer";
import {Input} from "./components/input/Input"
import {Container} from "./components/container/Container"
import {List} from "./components/list/List"
import {Divider} from "./components/divider/Divider"
import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from '../src/themes/DefaultTheme'
import { GlobalStyle } from '../src/themes/GlobalStyle'

export const App = () => {
    const [ref, inView] = useInView();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const limit = 50;
    const initialController = useRef(null);
    const additionalController = useRef(null);

    const {data, total, isLoading} = useFetchNames(debouncedSearchTerm, inView, limit, initialController, additionalController)


    // HANDLE SEARCH INPUT CHANGE
    const handleChange = (value) => {
        initialController.current && initialController.current.abort();
        additionalController.current && additionalController.current.abort();
        setSearchTerm(value);
    }

    // CREATE NAMES LIST 
    let nameList = data && data.map((item, i) => { 
        return i === data.length - limit ? 
        (<Container key={item._id} ref={ref} as="li" p={3}>{item.name}</Container>)
        : 
        (<Container key={item._id} as="li" p={3}>{item.name}</Container>)
    });
    // place ref on first listitem loaded



    return (
        <ThemeProvider theme={DefaultTheme}>
            <GlobalStyle/>
            <Container pt={3} fluid={true} fixed="top" background="white">
                <Container mx={"auto"} maxWidth="medium" style={{boxShadow: data.length > 0 ? "0 0.333em 0 rgba(0,0,0,0.1)" : null, borderBottom: data.length > 0 ? "0.167em solid #d0d0d0" : null, }}>
                    <Input
                        autoFocus={true}
                        componentSize="medium" 
                        fluid={true} 
                        handleChange={handleChange}
                        hasLabel={false}
                        id="input" 
                        textAlign="left" 
                        textPlaceholder="Search for names" 
                        value={searchTerm}
                    />
                    <Container pt={4} pb={1}>
                    {total && <p>Total names: {total}</p>}
                    </Container>
                </Container>
            </Container>
            
            <Container my={6} mx={"auto"} fluid={true} maxWidth="medium">
            {data.length > 0 ?
                <List>{nameList}</List> 
                : null }
                <Container pt={1}>
                {isLoading ? <p>...loading</p> : <p>No more results</p>}
                </Container>
            </Container>
        </ThemeProvider>
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


