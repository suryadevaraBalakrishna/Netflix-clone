const userModel = require("../../backend/models/User");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const saltRounds = 10;

exports.createUser = async (request, response) => {
    try {
        const existingUser = await userModel.findOne({ email: request.body.email });
        if (existingUser) {
            const output = {
                status: false,
                message: "User with this email already exists"
            };
            return response.send(output);
        }


        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashedPassword;

        const user = new userModel(request.body);
        const result = await user.save();

        const output = {
            status: true,
            message: "User created successfully",
            data: result
        }
        response.send(output);

    } catch (error) {
        const output = {
            status: false,
            message: error.message
        }
        response.status(500).send(output);
    }
}


exports.loginUser = async (request, response) => {
    try {
        var existingUser = await userModel.findOne({ email: request.body.email });

        if (!existingUser) {
            const output = {
                status: false,
                message: "Invalid email",
                data: null,
            }
            response.send(output);
            return;
        }

        if (await bcrypt.compare(request.body.password, existingUser.password)) {
            var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE);

            const output = {
                status: true,
                message: "Login successful",
                token: token,
                data: existingUser,
            }
            response.send(output);

        } else {
            const output = {
                status: false,
                message: "Invalid password",
                data: null,
            }
            response.send(output);
        }

    }
    catch (error) {
        const output = {
            status: false,
            message: error.message
        }
        response.send(output);
    }
}

exports.viewProfile = async (request, response) => {

    var token = request.headers.authorization;

    if (!token) {
        const output = {
            status: false,
            message: "Token is required",
            data: null,
        }
        response.send(output);
        return;
    }

    token = token.split(" ")[1];
    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await userModel.findOne({ _id: decoded.userData._id });

        if (!userData) {
            const output = {
                status: false,
                message: "user not found",
                data: null,
            }
            response.send(output);
            return;
        } else {
            const output = {
                status: true,
                message: "User profile fetched successfully",
                data: userData,
            }
            response.send(output);
        }

    }
    catch(error){
        const output = {
            status: false,
            message: "Invalid token",
            error: error.message,
            data: null,
        }
        response.send(output);
        return;
    }
}

exports.updateProfile = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            status: false,
            message: "Token is required",
            data: null,
        }
        response.send(output);
        return;
    }

    token = token.split(" ")[1];

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await userModel.findOne({ _id: decoded.userData._id });

        if (!userData) {
            const output = {
                status: false,
                message: "user not found",
                data: null,
            }
            response.send(output);
            return;
        }

        var updateData = {
            name: request.body.name,
            email: request.body.email
        }

        var updatedUser = await userModel.updateOne({
            _id: decoded.userData._id
        }, { $set: updateData })
            .then((result) => {
                const output = {
                    status: true,
                    message: "Profile updated successfully",
                    data: result,
                }
                response.send(output);
            }).catch((error) => {
                const output = {
                    status: false,
                    message: "Profile not updated",
                    error: error.message,
                    data: null,
                }
                response.send(output);
            }
            )




    }  catch(error){
        const output = {
            status: false,
            message: "Invalid token",
            error: error.message,
            data: null,
        }
        response.send(output);
        return;
    }
}

exports.changePassword = async (request, response) => {

  var token = request.headers.authorization;

    if (!token) {
        const output = {
            status: false,
            message: "Token is required",
            data: null,
        }
        response.send(output);
        return;
    }

    token = token.split(" ")[1];



    try{
        const decoded = jwt.verify(token, process.env.KEY_VALUE);

        const userData = await userModel.findOne({ _id: decoded.userData._id });

        if (!userData) {
            const output = {
                status: false,
                message: "user not found",
                data: null,
            }
            response.send(output);
            return;
        }
        
        var verifyPassword=await bcrypt.compare(request.body.current_password, userData.password);

         if(!verifyPassword){
            const output = {
                status: false,
                message: "Current password is incorrect",
                data: null,
            }
            response.send(output);
            return;
        }


        if(request.body.current_password===request.body.new_password){
            const output = {
                status: false,
                message: "New password cannot be same as current password",
                data: null,
            }
            response.send(output);
            return;
        }

        if(request.body.new_password!==request.body.confirm_password){
            const output = {
                status: false,
                message: "New password and confirm password do not match",
                data: null,
            }
            response.send(output);
            return;
        }
        
        var passwordHash=await bcrypt.hash(request.body.new_password, saltRounds);

        var updatedata={
            password:passwordHash   
        }

        var updatedUser = await userModel.updateOne({
            _id: decoded.userData._id
        }, { $set: updatedata })
         .then((result) => {
                const output = {
                    status: true,
                    message: "Password updated successfully",
                    data: result,
                }
                response.send(output);
            }).catch((error) => {
                const output = {
                    status: false,
                    message: "Password not updated",
                    error: error.message,
                    data: null,
                }
                response.send(output);
            }
            )



    }
    catch(error){
        const output = {
            status: false,
            message: "Invalid token",
            error: error.message,
            data: null,
        }
        response.send(output);
        return;
    }
}

exports.resetPassword = async (request, response) => {

  var token = request.headers.authorization;

    if (!token) {
        const output = {
            status: false,
            message: "Token is required",
            data: null,
        }
        response.send(output);
        return;
    }

    token = token.split(" ")[1];



    try{
        const decoded = jwt.verify(token, process.env.KEY_VALUE);

        const userData = await userModel.findOne({ _id: decoded.userData._id });

        if (!userData) {
            const output = {
                status: false,
                message: "user not found",
                data: null,
            }
            response.send(output);
            return;
        }
        
       

        if(request.body.new_password!==request.body.confirm_password){
            const output = {
                status: false,
                message: "New password and confirm password do not match",
                data: null,
            }
            response.send(output);
            return;
        }
        
        var passwordHash=await bcrypt.hash(request.body.new_password, saltRounds);

        var updatedata={
            password:passwordHash   
        }

        var updatedUser = await userModel.updateOne({
            _id: decoded.userData._id
        }, { $set: updatedata })
         .then((result) => {
                const output = {
                    status: true,
                    message: "Password updated successfully",
                    data: result,
                }
                response.send(output);
            }).catch((error) => {
                const output = {
                    status: false,
                    message: "Password not updated",
                    error: error.message,
                    data: null,
                }
                response.send(output);
            }
            )



    }
    catch(error){
        const output = {
            status: false,
            message: "Invalid token",
            error: error.message,
            data: null,
        }
        response.send(output);
        return;
    }
}

exports.forgotPassword=async(request,response)=>{
      var existingUser = await userModel.findOne({ email: request.body.email})

    if (!existingUser) {
        const output = {
            status: false,
            message: 'Invalid Email',
            data: null,
        }
        return response.send(output);
    }

    var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE, {
        expiresIn: '1h'
    })

       // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

     const mailOptions = {
        from: 'Netflix' + process.env.EMAIL_USER,
        to: existingUser.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: http://localhost:5173/reset-password?token=${token}`, // Plain-text version of the message
    };

   
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return response.send({
                status: false,
                message: 'Error sending email',
                data: error
            });
        } else {
            return response.send({
                status: true,
                message: 'Password reset email sent successfully',
                data: null
            });
        }
    });


}





