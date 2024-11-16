import { InvalidUrlErrorMessage, RequiredQueryErrorMessage, RequiredUrlErrorMessage } from "../constants";

export const validateSearchQuery = (value: string) => {
    if (!value) {
        return RequiredQueryErrorMessage;
    }
    return "";
};

export const validateSearchUrl = (value: string) => {
    if (!value) {
        return RequiredUrlErrorMessage;
    }
    const regexUrlValidationFormat = /^(?:(ftp|http|https)?:\/\/)?(?:[\w-]+\.)+([a-zA-Z0-9]){2,6}$/;
    const regex = new RegExp(regexUrlValidationFormat);

    if (!regex.test(value)) {
        return InvalidUrlErrorMessage;
    }

    return "";
};
