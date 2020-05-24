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

export const getRandomColorList = (count: number): string[] => {
    const colorsList: string[] = [];
    let attempts = 0;
    while (colorsList.length < count) {
        attempts++;
        let color = getRandomColor()
        if (attempts > 100) {
            colorsList.push(color)
        } else {
            if (!colorsList.find((item) => item == color)) {
                colorsList.push(color)
            }
        }
    }
    return colorsList
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

