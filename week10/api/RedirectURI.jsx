export const getRedirectURI = () => {
    const hostname = window.location.hostname;

    if (hostname === 'localhost') {
        return 'http://localhost:5173/login/auth';
    } else if (hostname === 'week10-umc.netlify.app') {
        return 'https://week10-umc.netlify.app/login/auth';
    } else if (hostname === 'main--week10-umc.netlify.app') {
        return 'https://main--week10-umc.netlify.app/login/auth';
    } else {
        throw new Error('Error: ', error);
    }
};