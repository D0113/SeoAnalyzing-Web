/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import SearchResults from "../components/SearchResults";
import SearchForm from "../components/SearchForm";
import ErrorMessageDialog from "../components/ErrorMessageDialog";
import LoadingScreen from "../components/LoadingScreen";
import { getBingSeoAnalyzing } from "../services/BingSearchService";
import { getGoogleSeoAnalyzing } from "../services/GoogleSearchService";
import { SearchResponseModel } from "../models/searchResponseModel";

const styles = {
    wrapper: css({
        padding: "16px"
    }),
    title: css({
        color: "#18cdb6",
        paddingBlock: "16px"
    })
};

const Search: React.FC = () => {
    const [searchResult, setSearchResult] = useState<SearchResponseModel[]>([]);
    const [isShowErrorMessage, setIsShowErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = (keyword: string, targetUrl: string, limit: number) => {
            setIsLoading(true);
            Promise.all([
                getBingSeoAnalyzing({ searchQuery: keyword, searchUrl: targetUrl, searchLimit: limit }),
                getGoogleSeoAnalyzing({ searchQuery: keyword, searchUrl: targetUrl, searchLimit: limit })
            ]).then(response => {
                setIsLoading(false);
                setSearchResult(response);
            }).catch(err => {
                setIsLoading(false);
                setIsShowErrorMessage(true)
            });
    }

    return (
        <div css={styles.wrapper}>
            <h2 css={styles.title}>Seo Analyzing</h2>
            <SearchForm onSubmit={onSubmit} />
            {!!searchResult.length && <SearchResults items={searchResult} />}
            <ErrorMessageDialog isOpen={isShowErrorMessage} onClose={() => setIsShowErrorMessage(false)}/>
            <LoadingScreen isOpen={isLoading}/>
        </div>
    );
};

export default Search;