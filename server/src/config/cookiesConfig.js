export const  CookiesOptions={
    // credentials: true,
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'none', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    priority:"high"
}