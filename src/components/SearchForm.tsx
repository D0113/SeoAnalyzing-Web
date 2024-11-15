/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Grid from '@mui/material/Grid2';
import { Button, css, TextField } from "@mui/material";
import { BtnSearchLabel, SearchQueryLabel, SearchUrlLabel } from "./constants";

interface SearchFormProps {
  onSubmit: (keyword: string, targetUrl: string, limit: number) => void;
}

const styles = {
  btnSearchWrapper: css({
    width: "100%",
  }),
  btnSearch: css({
    float: "right",
    padding: "8px 40px"
  }),
  textInput: css({
    height: "56px",
  }),
};

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState("e-settlements");
  const [searchUrl, setSearchUrl] = useState("www.sympli.com.au");
  const [searchQueryError, setSearchQueryError] = useState('');
  const [searchUrlError, setSearchUrlError] = useState('');

  const validateSearchQuery = (value: string) => {
    if (!value) {
      return "Search query is required.";
    }
    return "";
  };

  const validateSearchUrl = (value: string) => {
    if (!value) {
      return "Search url is required.";
    }
    const regexUrlValidationFormat = /^(?:(ftp|http|https)?:\/\/)?(?:[\w-]+\.)+([a-zA-Z0-9]){2,6}$/;
    const regex = new RegExp(regexUrlValidationFormat);

    if (!regex.test(value)) {
      return "Invalid URL format.";
    }

    return "";
  };

  const onSearchQueryChange = (value: string) => {
    const errorMessage = validateSearchQuery(value);
    setSearchQuery(value);
    setSearchQueryError(errorMessage);
  };

  const onSearchUrlChange = (value: string) => {
    const errorMessage = validateSearchUrl(value);
    setSearchUrl(value);
    setSearchUrlError(errorMessage);
  };

  const onSearchBtnClick = () => {
    if (searchQueryError || searchUrlError) {
      return;
    }

    onSubmit(searchQuery, searchUrl, 100)
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          css={styles.textInput}
          fullWidth
          required
          id="outlined-required"
          label={SearchQueryLabel}
          value={searchQuery}
          error={!!searchQueryError}
          helperText={searchQueryError}
          onChange={(value) => {
            onSearchQueryChange(value.target.value);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          css={styles.textInput}
          fullWidth
          required
          id="outlined-required"
          label={SearchUrlLabel}
          value={searchUrl}
          error={!!searchUrlError}
          helperText={searchUrlError}
          onChange={(value) => {
            onSearchUrlChange(value.target.value);
          }}
        />
      </Grid>
      <Grid css={styles.btnSearchWrapper}>
        <Button css={styles.btnSearch}
                disabled={!!searchQueryError || !!searchUrlError}
                variant="contained" 
                onClick={onSearchBtnClick}>
            {BtnSearchLabel}
        </Button>
      </Grid>
    </Grid>

  );
};

export default SearchForm;