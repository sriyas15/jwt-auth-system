import jwt from "jsonwebtoken";

export const generateTokens = (res, userId) => {

    const accessToken = jwt.sign(
        { _id: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { _id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return accessToken;
};