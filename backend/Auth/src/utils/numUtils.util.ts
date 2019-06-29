export const getRandomInt = (min, max) => { // min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
};
