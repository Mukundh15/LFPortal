import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
function Message({ type, message }) {
    if (!message) return null;
    return (
        <div className="container mt-3">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity={type}>
                {message}
            </Alert>
        </div>
    );
}
export default Message;
