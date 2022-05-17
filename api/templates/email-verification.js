const verify_subject_mail = "OTP: For Account Verification @E-Magazine"


const verify_message = (otp) =>{
     return `Dear User, \n\n` 
      + 'Please enter this otp for verifying your email address in E-Magazine : \n\n'
      + 'This OTP expires in 10 minutes'
      + ` ${otp}\n\n`
      + 'This is a auto-generated email. Please do not reply to this email.\n\n'
      + 'Regards\n'
      + 'Admin\n\n'
}

export {verify_subject_mail, verify_message};
