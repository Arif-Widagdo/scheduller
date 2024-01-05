export const now = (timezone = 7) => {
    const date = new Date();
    date.setHours(date.getHours() + timezone);

    return date;
};
