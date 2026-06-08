const cookieConfig = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1h
}

class CookiesService {
    getData = (req, key) => {
        return req.cookies[key]
    }

    setData = (res, key, value) => {
        res.cookie(key, value, cookieConfig)
    }

    clearData = (res, key) => {
        res.clearCookie(key)
    }
}

module.exports = new CookiesService();