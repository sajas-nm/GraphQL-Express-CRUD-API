module.exports.validateRegisterInput=(
    name,
    email,
    password,
    confirmPassword
)=>{
    const errors ={};
    if(name.trim()===''){
        errors.name="name must not be empty";
    }
    if(email.trim()===''){
        errors.email="Email must not be empty";
    }else{
        const regEx=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(!email.match(regEx)){
            errors.email="email must be valid email address"
        }
    }
    if(password===''){
      errors.password="password must not be empty"
    }else if(password !== confirmPassword){
        errors.password="password must match"

    }
    return {
       errors,
       valid:Object.keys(errors).length<1
    } 
}
module.exports.validateLoginInput=(email,password)=>{
      const errors={};
      if(email.trim()==''){

          errors.email="email must not be empty";
      }
      if(password.trim()==''){
        errors.password="password must not be empty";
    }
    return {
        errors,
        valid:Object.keys(errors).length<1
     } 
        
}
module.exports.validateStaffInput=(
    name,
    address,
    nic,
    tel
)=>{
    const errors ={};
    if(name.trim()===''){
        errors.name="name must not be empty";
    }
    if(nic.trim()===''){
        errors.nic="NIC must not be empty";
    }else{
        const regEx=/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
        if(!nic.match(regEx)){
            errors.nic="NIC must be valid email address"
        }
    }
    if(address===''){
      errors.password="password must not be empty"
    }
    if(tel===''){
        errors.tel="Phone number must not be empty"
      }else{
        const regEx=/^[0-9]{10}$/;
        if(!nic.match(regEx)){
            errors.nic="NIC must be valid email address"
        }
  
      }
    return {
       errors,
       valid:Object.keys(errors).length<1
    } 
}