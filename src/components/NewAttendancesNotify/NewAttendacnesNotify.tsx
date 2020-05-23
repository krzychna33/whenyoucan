import * as React from "react";
import {Button} from "@material-ui/core";
import * as style from "./style.scss";

interface INewAttendacnesNotifyProps {
    onRefresh(): any
}

export const NewAttendancesNotify: React.FC<INewAttendacnesNotifyProps> = (props: INewAttendacnesNotifyProps) => {

    return (
        <div className={style.container}>
            <h4>There are new attendances by other users!</h4>
            <div>
                <Button onClick={props.onRefresh} variant={"contained"} color={"primary"}>Refresh calendar</Button>
            </div>
        </div>
    )
}