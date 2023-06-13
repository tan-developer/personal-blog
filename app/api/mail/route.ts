import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: "blogtanngocph@gmail.com",
     pass: "goqqsjbzmzpcuuxj"
  }
});
export async function POST(request: Request) {

  const {name , message , email , subject} = await request.json();

  if(name && message && email && subject) {
    const mailOptions = {
      from: "blogtanngocph@gmail.com",
      to: "tan.devloper@gmail.com",
      subject: "Nodemailer Test",
      html:`
      <div class="">From : ${name} via ${email}</div>
      <div class="">Subject : ${subject}</div>
      <div class="">${message}</div>
      `
   };
   transporter.sendMail(mailOptions, function(error :any, info :any){
    if(error){
    }else{
    }
 });


    return new NextResponse("OK" , {status : 200})
  } else {
    return new NextResponse("Missing information" , {status :401})
  }


}
