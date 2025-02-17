const userModel = require("../Model/userModel")
const bcrypt = require("bcrypt")
//jdid
const jwt = require("jsonwebtoken")
const TOKEN_SECRET = "salma";
const R_TOKEN_SECRET = "salma";

const {join} = require('path') //bch yaaref eli hua bch yaccedi aala path
//refreshTokens
let refreshTokens = [];

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, R_TOKEN_SECRET, { expiresIn: "15m" });
};
//access tokens
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: "15m" });
};


module.exports = {
 //jdid
    logout: (req, res) => {
        console.log("refreshTokens", refreshTokens)
        refreshTokens = refreshTokens.filter((c) => c != req.body.token);
        console.log("filterfilter", refreshTokens)


        res.status(200).json({
            status: 200,
            message: "Logged out!"
        });
    },
  //jdid
    refresh: (req, res) => {
        const RefreshToken = req.body.token;
        if (!refreshTokens.includes(RefreshToken)) res.status(400).send("Refresh Token Invalid");
        jwt.verify(R_TOKEN_SECRET, TOKEN_SECRET, (err, user) => {
            refreshTokens = refreshTokens.filter((c) => c != RefreshToken);
            const accessToken = generateAccessToken(RefreshToken)
            const refreshToken = generateRefreshToken(RefreshToken)
            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        });
    },

    login: async(req, res) => {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json({
                status: 400,
                message: "email or password not found",
                data: null,
            });
        } else {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                res.status(404).json({
                    status: 400,
                    message: "email or password not found",
                    data: null,
                });
            } else {
                const accessToken = generateAccessToken({ user: req.body.name })
                const refreshToken = generateRefreshToken({ user: req.body.name })

                refreshTokens.push(refreshToken)
                res.status(201).json({
                    status: 201,
                    massage: "success",
                    data: user,
                    accessToken: accessToken, //return de variable access token,resfresh token
                    refreshToken: refreshToken //ta3melhom bch yo5rjouli fel postman 
                });
            }
        }
    },
  //16/06/2023
    verifyMail: async(req,res) => {
        try {
            const { codeVerification } = req.params;
            const user = await userModel.findOne({codeVerification});
            user.codeVerification = undefined,
            user.verified = true,
            user.save()
            return res.sendFile(join (__dirname , "../template/success.html"))
        } catch (error) {
            return res.sendFile(join (__dirname , "../template/error.html"))
        }
    },
}

