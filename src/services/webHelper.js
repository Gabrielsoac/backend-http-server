export const getIdParam = (url, host) => {
    const parsedUrl = new URL(url, `http://${host}`);
    const path = parsedUrl.pathname;
    const match = path.match(/^\/([a-f\d]{24})$/i);
    if (match === null) throw new Error('Invalid ID');
    return match[1];
}