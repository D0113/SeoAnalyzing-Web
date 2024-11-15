/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { 
    css,
    Box,
    Button,
    Typography,
    Modal
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { BtnCloseLabel, MessageContent, MessageTitle } from './constants';

interface SearchResultProps {
    isOpen: boolean;
    onClose: () => void;
}

const styles = {
    contentWrapper: css({
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        backgroundColor: "White",
        padding: "16px 24px",
    }),
    errorTitle: css({
        fontWeight: "bold"
    }),
    errorContent: css({
        fontSize: "14px",
        paddingLeft: "29px",
        marginTop: "6px"
    }),
    iconColor: css({
        color: "red",
        position: "relative",
        top: "5px",
        marginRight: "5px"
    }),
    btnClose: css({
        float: "right",
        marginTop: "2px"
    })
};

const ErrorMessageDialog: React.FC<SearchResultProps> = ({ isOpen, onClose })  => {

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box css={styles.contentWrapper}>
                    <Typography css={styles.errorTitle} id="modal-modal-title" variant="h6" component="h2">
                        <ErrorIcon css={styles.iconColor} /> {MessageTitle}
                    </Typography>
                    <Typography css={styles.errorContent} id="modal-modal-description" variant="body1">
                        {MessageContent}
                    </Typography>
                    <Button css={styles.btnClose} onClick={onClose} variant="outlined" color="error">
                        {BtnCloseLabel}
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default ErrorMessageDialog;
