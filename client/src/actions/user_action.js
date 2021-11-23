// import config_store from '../Store/config_store'

// const store = config_store()

//user actions 
export const add_user = ({
    userID = "",
    emailID = "",
    type = ""
    
} = {}) => {

    return {
        type: 'add_user',
        user: {
            emailID,
            userID,
            type
         
        }
    }

}

export const remove_user = () => {

    return {
        type: 'remove_user',
        user: {
            userID: "",
            emailID: "",
            type: ""
          
        }
    }

}



