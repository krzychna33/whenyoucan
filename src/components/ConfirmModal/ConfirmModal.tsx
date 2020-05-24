import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from "./style.scss"
import * as closeIcon from "../../assets/img/x.svg";
import classNames from 'classnames';
import {Button} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const ModalTrigger = ({trigger, onClick}: any) => (<div onClick={onClick}>{trigger}</div>)

const ModalContent = ({content, title, cancelAction, approveAction, approveButton}: any) => {

    const closeByBackground = (event: any) => {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            cancelAction();
        }
    }
    return ReactDOM.createPortal(
        <div className={classNames({
            [style.modal]: true,
            ["animated fadeIn"]: true
        })}
            onClick={closeByBackground}
        >
            <div className={style.modalBox}>
                <CloseIcon onClick={cancelAction}/>
                <div className={style.modalBox__content}>
                    <h3>{title || "Are you sure?"}</h3>
                    <p>{content}</p>
                </div>
                <div className={style.modalBox__buttons}>
                    <div>
                        <Button
                            onClick={() => cancelAction()}
                            color={"primary"}
                            variant={"contained"}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={() => approveAction()}
                            color={"primary"}
                            variant={"contained"}
                        >
                            {approveButton}
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

interface IConfirmModalProps {
    onApprove(): any,
    label: string,
    content: any,
    approveButton: string,
    title?: string,

}

interface IConfirmModalState {
    isOpen: boolean
}

class ConfirmModal extends React.Component<IConfirmModalProps, IConfirmModalState> {
    constructor(props: IConfirmModalProps) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    };

    cancelAction = () => {
        this.closeModal();
    };

    approveAction = () => {
        this.props.onApprove();
        this.closeModal();
    }
    render() {
        const {label, content, approveButton, title} = this.props;
        return (
            <React.Fragment>
                <ModalTrigger trigger={this.props.children} onClick={() => {this.setState({isOpen: !this.state.isOpen})}}/>
                {
                    this.state.isOpen && <ModalContent title={title} content={content} approveButton={approveButton} cancelAction={this.cancelAction} approveAction={this.approveAction}/>
                }
            </React.Fragment>
        );
    }
}

export default ConfirmModal;