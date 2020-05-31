import * as React from "react";
import {Link} from "react-router-dom";
import * as style from "./style.scss"
import {Header} from "../../components/Header/Header";
import wycMockup from "../../assets/img/wyc_mockup.png"
import {Button} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Landing extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <Header bgOff={true}/>
                <div className={style.introSection}>
                    <div className={style.introSection__left}>
                        <h1>The new way</h1>
                        <h3>to organize <span>meetings</span></h3>
                        <h3>with friends</h3>
                        <div className={style.introSection__left__desc}>
                            <p>
                                Got frustrated while choosing a time which will be appropriate to every person?
                            </p>
                            <p>Here we are! WhenYouCan is the platform where you can create your own calendar and
                                share it with your friends.</p>

                        </div>
                        <div className={style.introSection__left__btn}>
                            <Link to={"/calendars"}>
                                <Button variant={"contained"} color={"primary"}>Get started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={style.introSection__right}>
                        <img src={wycMockup}/>
                    </div>
                </div>
                <div className={style.howSection}>
                    <div className={style.howSection__head}>
                        <h2>How it works?</h2>
                    </div>
                    <div className={style.howSection__howItems}>
                        <div className={style.howItem}>
                            <div className={style.howItem__num}>1</div>
                            <div className={style.howItem__desc}>
                                <h3>Create new calendar</h3>
                                <p>Register new account or login and make new instance of calendar. You can set up description and
                                minimum number of people excepted in your event.
                                </p>
                            </div>
                        </div>
                        <div className={style.howItem}>
                            <div className={style.howItem__num}>2</div>
                            <div className={style.howItem__desc}>
                                <h3>Add your own times which will be suitable for you</h3>
                                <p>Add your preferred times by clicking on appropriate hours.</p>
                            </div>
                        </div>
                        <div className={style.howItem}>
                            <div className={style.howItem__num}>3</div>
                            <div className={style.howItem__desc}>
                                <h3>Share your calendar by copying the calendar join URL</h3>
                                <p>Copy link and pin and give it to your friends. You can also copy invitation message.</p>
                            </div>
                        </div>
                        <div className={style.howItem}>
                            <div className={style.howItem__num}>4</div>
                            <div className={style.howItem__desc}>
                                <h3>Wait for your friends suitable times and choose the correct one!</h3>
                                <p>Now you have to wait for your friends until they declare their attendances. Hours which are suitable for all people
                                    in your calendar (or minimum people you set up when creating calendar) will be highlighted. All users will also getting
                                    tips which time is "almost good time" for everyone. Thanks to this tips they can adjust their choice.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={style.howSection__getStarted}>
                        <Link to={"/calendars"}>
                            <Button variant={"outlined"} color={"primary"}>Get started</Button>
                        </Link>
                    </div>
                </div>
                <footer>
                    <div>WhenYouCan App | &copy; 2020</div>
                    <div className={style.devBy}>Developed with <FavoriteBorderIcon/> by <a href="http://krzychnadev.ovh/" target="_blank">krzychna33</a></div>
                </footer>
            </div>
        )
    }
}

export default Landing;