export const getRandomColor = (): string => {
    const colors = [
        "2a9d8f",
        "e76f51",
        "1d3557",
        "9bf6ff",
        "9b5de5",
        "5f0f40",
        "0496ff",
        "390099",
        "8ac926",
        "191263",
        "ce4257",
        "0d1b2a",
        "edf67d",
        "4f772d",
        "ff9f1c",
        "779be7"
    ];
    let color = '#';
    color += colors[Math.floor(Math.random() * 16)];
    return color.toUpperCase();
}