import { AlertColor } from "@mui/material/Alert"

export interface AddNewTaskDialogProps {
    visible: boolean
    onHide: () => void
    handleClick: (msg:string,sev: AlertColor | undefined) => void
}