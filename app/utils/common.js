import toast from "react-hot-toast";
import { handleRedirect } from "../lib/utils";


export const getFullName = (user) =>{  
    let fullname = (user?.firstname??'') + ' ' + (user?.lastname??'');
    return fullname
}


export const start = (role, push=null) => {
  // const role = user?.user_role;
  setTimeout(() => {
      handleRedirect(role, push);
  }, 300);
}

export const logout = () => {
  localStorage.removeItem('exam-system-user');
  localStorage.removeItem('access-exam-sysyem');
};