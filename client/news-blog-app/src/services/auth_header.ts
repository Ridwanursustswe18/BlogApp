
  
  type UserInfo = {
    token: string;
  };
export default function authHeader(){
    const userString = localStorage.getItem("token") 
    
    
   
    if(userString){
     
        return {Authorization : `Bearer ${userString}`};

    }
    

}