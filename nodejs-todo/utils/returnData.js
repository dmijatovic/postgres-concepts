
module.exports=(resp)=>{
  const json = {
    status: 200,
    statusText:"OK",
  }
  // if (resp.rows && resp.rows.length === 1){
  //   json['data'] = resp.rows[0]
  // } else {
  //   json['data'] = resp.rows
  // }
  json['data'] = resp.rows
  return json
}