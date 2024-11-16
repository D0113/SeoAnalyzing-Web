/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import {
    ErrorMessageDialog,
    LoadingScreen,
    SearchForm,
    SearchResults
} from "../components";
import { getBingSeoAnalyzing, getGoogleSeoAnalyzing } from "../services";
import { ISearchResponseModel } from "../models";
import { SearchTitleLabel } from "./constants";

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
    const [searchResult, setSearchResult] = useState<ISearchResponseModel[]>([]);
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
            <h2 css={styles.title}>{SearchTitleLabel}</h2>
            <SearchForm onSubmit={onSubmit} />
            {!!searchResult.length && <SearchResults items={searchResult} />}
            <ErrorMessageDialog isOpen={isShowErrorMessage} onClose={() => setIsShowErrorMessage(false)} />
            <LoadingScreen isOpen={isLoading} />
        </div>
    );
};

export default Search;
