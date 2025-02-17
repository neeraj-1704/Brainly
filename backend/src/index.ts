import express from 'express';
import mongoose from 'mongoose';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectDB, User ,Content } from './db.js'; // Ensure the correct path
import jwt from 'jsonwebtoken';
import {JWT_PASS} from './config.js'
import {useMiddleware} from './middlwares.js'

const app = express();
app.use(express.json({ limit: '16kb' }));

app.use(express.json({ limit: "16kb" }));


app.post('/api/v1/signin', async (req, res) => {

    try {
        const { username, password } = req.body;

        const encryPass = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: encryPass
        });

        res.json({
            message: "User is  register"
        });
    } catch (error) {
        res.json({
            message: "User is register already"
        });
    }

})


// app.post('/api/v1/singup', async (req, res) => {

//     const { username, password } = req.body;
// // logic neew to mod for the encrtpy pass 
//     const user1:| null = await User.findOne({ username , password});
//     console.log("Found user:", user1);

//     if(!user1) {
//         res.json ({
//             message : "User is not found "
//         })
//         return;
//     }

//     // // check for the password 
//     // const isMatch = await bcrypt.compare(password, password);
//     // res.json({
//     //     message: "user is logined in "
//     // })


//     // token creation 
//     if(user1){
//         const token = jwt.sign({
//             id : user1._id      
//         },
//         JWT_PASS
//         )
//     }else {
//         res.status(403).json({
//             message : "token is not found "
//         })
//     }





// })

app.post('/api/v1/content', useMiddleware,  async (req, res) => {

            const {link , title } = req.body;

            const createContent = await Content.create({
                link,
                title,
                //@ts-ignore
                userId : req.userId,
                tags : []
            })

            if(createContent) {
                res.json({
                    message : "the content is created"
                }
                )
            }

})

app.get('/api/v1/share', useMiddleware, async(req, res) => {

    //@ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId : userId
    }).populate('userId', "username")

    res.json({
        content
    })

})

app.get('/api/v1/:shareLink', (req, res) => {

})


connectDB()
    .then(() => {
        app.listen(8000, () => {
            //app.listen(8000, () =>{
            console.log(`Server is runing  at port 8000`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB CONNECTION FAILED !!!", err);
    })

