// handle error
function error_message(err){
  if(err.errmsg){
    return 'username is already'
  }else if(err.errors.email){
    return err.errors.email.message
  }else if(err.errors.phone){
    return err.errors.phone.message
  }
}

module.exports = error_message