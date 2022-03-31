
// rendering of home page

module.exports.homepage = async(req,res)=>{
    return res.render('home',{
        title:'Employee Review System'
    })
}