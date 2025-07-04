interface SignupcredentialsProps{
    username:string
    email:string
    password:string
}

interface LogincredentialsProps{
    email:string
    password:string
}


const baseurl='https://n4vj10uc10.execute-api.ap-south-1.amazonaws.com'

export const signup=async({username,email,password}:SignupcredentialsProps)=>{
    if(!email||!username||!password) return alert('All Fields Are Required')

try {
        const res=await fetch(`${baseurl}/api/v1/auth/signup`,{
        method:"POST",
        credentials:"include",
        headers:{
              'Content-type':"application/json"
        },
        body:JSON.stringify({
            username,email,password
        })
    })

    return res.json();
} catch (error) {
    console.error("Network error during signup:", error);
    alert("Network error. Please try again.");
    return null;
  }
}


export const login=async({email,password}:LogincredentialsProps)=>{
    if(!email||!password) return alert('All Fields Are Required')

try {
        const res=await fetch(`${baseurl}/api/v1/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
              'Content-type':"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    })

    return res.json();
} catch (error) {
    console.error("Network error during login:", error);
    alert("Network error. Please try again.");
    return null;
  }
}

export const logout=async()=>{
 try {
        const res=await fetch(`${baseurl}/api/v1/auth/logout`,{
        method:"DELETE",
        credentials:"include",
    })

    alert('logout successfull');
    return res.json();
} catch (error) {
    console.error("Network error during logout:", error);
    alert("Network error. Please try again.");
    return null;
  }

}

export const verify=async()=>{
 try {
        const res=await fetch(`${baseurl}/api/v1/auth/verify`,{
        method:"GET",
        credentials:"include",
    })

    console.log(res);
    
    return res.json();
} catch (error) {
    console.error("Network error during verify:", error);

    return null;
  }

}
