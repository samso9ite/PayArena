const merchantNameValidate = (merchant_name: null)=>{
        
    if (merchant_name === null) {
        return {status:false, message:"Business Name is Required"}
    }
    
    if (merchant_name !== null) {
        return {status:true, message:"Business Name is valid"}
    }
}
const firstNameValidate = (first_name: null)=>{
    if (first_name === null) {
        return {status:false, message:"First Name is Required"}
    }
    if (first_name !== null) {
        return {status:true, message:"First Name is valid"}
    }
}
const lastNameValidate = (last_name: string | number)=>{
    if (last_name === null) {
        return {status:false, message:"Last Name is Required"}
    }
    if (last_name !== null) {
        return {status:true, message:"Last Name is valid"}
    }
}
const adrressValidate = (address: null)=>{
    if (address === null) {
        return {status:false, message:"Business address is required"}
    }
    if (address !== null) {
        return {status:true, message:"Business address is valid"}
    }
}
const stateValidate = (state: null)=>{
    if (state === null) {
        return {status:false, message:"State is required"}
    }
    if (state !== null) {
        return {status:true, message:"State is valid"}
    }
}
const countryValidate = (country: null)=>{
    if (country === null) {
        return {status:false, message:"Country is Required"}
    }
    if (country !== null) {
        return {status:true, message:"Country is valid"}
    }
}
// const phoneNoValidate = (phone: string, country: any)=>{
        
//     if (phone === "") {
//         return {status:false, message:"Phone number is Required"}
//     }

//     const phoneData = parsePhoneNumber(phone, country)

//     if (phoneData) {
//         if (phoneData.isValid() !== true) { 
//             return {status:false, message:"Phone number is Invalid for this Country"}
//         } 
//         return {status:true, message:"Phone is valid"}
//     }
//     return {status:false, message:"Phone Number or Country is Invalid"}
// }

const emailValidate = (email: string)=>{
    let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;

    if (!email) {
        return {status:false, message:"Email Address is Required"}
    }
    else if (email_reg.test(email) === false) {
        return {status:false, message:"Email Address is invalid"}
    }
    return {status:true, message:"Email Address is valid"}
}

const cleanText = (replaceParam: string)=>{
    let cleanText = replaceParam.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    return cleanText
}
const bvnValidate = (number: string) => {
   let bvn_reg_ex = /^[0-9]{11}$/ ;

   if (!number) {
        return {status:false, message:"BVN is required"}
   }
   else if (bvn_reg_ex.test(number) === false) {
       return {status:false, message:"Invalid BVN"}
   }
   else{
    return {status:true, message:"Valid"}
   }
}
const RCNumberValidate = (rc_number: string) => {
   let cac_reg_ex = /^(RC)?[0-9]{5,9}$/
    if (!rc_number) {
        return {status:false, message:"RC Number is required"}
    }
    else if (cac_reg_ex.test(rc_number) === false) {
        return {status:false, message:"Invalid RC Number"}
    }
    else{
     return {status:true, message:"Valid"}
    }
}
const RCCompanyNameValidate = ( company_name: string) => {
    if (!company_name) {
        return {status:false, message:"Company name is required"}
    }
    else{
     return {status:true, message:"Valid"}
    }
}
const DriverLicenseValidate = (number: string, dob: any) => {
   let DL_reg_ex = /^[a-zA-Z]{3}([ -]{1})?[A-Z0-9]{6,12}$/
   
   if (!number) {
    return {status:false, message:"Driver's License number is required"}
   }
   if (!dob) {
    return {status:false, message:"Date of Birth is required"}
   }

   else if (DL_reg_ex.test(number) === false) {
      return {status:false, message:"Invalid Driver's License"}
    }
    else{
    return {status:true, message:"Valid"}
    }
}
const NINValidate = (number: string) => {
   let nin_reg_ex = /^[0-9]{11}$/
   
   if (!number) {
      return {status:false, message:"National ID Number is required"}
   }
   else if (nin_reg_ex.test(number) === false) {
      return {status:false, message:"Invalid National ID Number"}
  }
  else{
   return {status:true, message:"Valid"}
  }
}
const TINValidate = (number: string) => {
   let tin_reg_ex = /^[0-9]{8,}-[0-9]{4,}$/ ;
   if (!number) {
    return {status:false, message:"Tax ID Number is required"}
   }
   else if (tin_reg_ex.test(number) === false) {
    return {status:false, message:"Invalid Tax ID Number"}
  }
  else{
   return {status:true, message:"Valid"}
  }
}
const VINValidate = (number: string) => {
   let VC_reg_ex = /^[a-zA-Z0-9 ]{9,19}$/
   // if(number.length < 19){
   //    setError("Invalid Voter's Identification Number")
   //    return
   // }
   if (!number) {
      return {status:false, message:"Voter's ID Number is required"}
   }
   else if (VC_reg_ex.test(number) === false) {
      return {status:false, message:"Invalid Voter's Identification Number"}
  }
  else{
   return {status:true, message:"Valid"}
  }
}

const validators = {
    merchantNameValidate,
    firstNameValidate,
    lastNameValidate,
    adrressValidate,
    stateValidate,
    countryValidate,
    // phoneNoValidate,
    emailValidate, 
    cleanText,

    bvnValidate,
    RCNumberValidate,
    RCCompanyNameValidate,
    DriverLicenseValidate,
    NINValidate,
    TINValidate,
    VINValidate,
}

export default validators