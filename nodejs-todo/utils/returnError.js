
module.exports=(error,status=500)=>{
  return {
    status,
    statusText:"Server error",
    error
  }
}