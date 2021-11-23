const user_global_state = {
    userID: "",
    emailID: "",
    type:""

}


export default (state = user_global_state, action) => {
    switch (action.type) {
        case 'add_user':
            {

                return action.user
            }
        case 'remove_user':
            {
                return action.user
            }


        default:
            {
                return state;
            }
    }
} 