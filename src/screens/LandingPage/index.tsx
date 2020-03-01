import * as React from "react";
import * as style from "./style.scss"

interface ILandingPageProps {
    appName: string
}

class LandingPage extends React.Component<ILandingPageProps> {
    render () {
        return (
            <div className={style.container}>
                <div>
                    <h1>{this.props.appName}</h1>
                    <p>App is running</p>
                </div>
            </div>
        )
    }
}

export default LandingPage;