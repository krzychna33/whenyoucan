import {toast} from "react-toastify";

export const getRandomColor = (): string => {
    const colors = [
        "8B1E3F",
        "3C153B",
        "89BD9E",
        "F0C987",
        "DB4C40",
        "DB4C40",
        "9B9ECE",
        "ACADBC",
        "9B9ECE"
    ];
    let color = '#';
    color += colors[Math.floor(Math.random() * colors.length)];
    return color.toUpperCase();
}

export const showErrorsArray = (errors: any) => {
    if (errors) {
        const errorsKeys = Object.keys(errors);
        errorsKeys.forEach((error: any) => {
            toast.error(errors[error].message)
        })
    }
};

export const showErrorMessage = (message: string) => {
    if (message) {
        toast.error(message)
    } else {
        toast.error("Unhandled Error!")
    }
}

