const users = require('../model/userSchema');

exports.addUser = async(req,res)=>{

    console.log(`Inside add user function`);
    console.log(req.file);
    
    const{fname,lname,email,mobile,gender,status,location} = req.body
    try {
        const preuser = await users.findOne({email})
        if (preuser){
            res.status(406).json("User already exist!!!")
        }
        else{
            const newuser = new users({
                fname,lname,email,mobile,gender,status,profile:req.file.filename,location
            })
            console.log(newuser);

            await newuser.save()
            res.status(200).json(newuser)
        }

        
    } 
    catch (error) {
        res.status(401).json("Error"+error)
    }


}

exports.getUser = async(req,res)=>{
    console.log(`Inside get user function`);
    const search = req.query.search
    const query = {
        fname:{$regex:search, $options:"i"}
    }

    try {
        const allusers = await users.find(query)
        res.status(200).json(allusers)
        
    } 
    catch (error) {
        res.status(401).json(error)

    }

}

exports.deleteUser = async(req,res)=>{

    const{id} = req.params

    try {
        const removeData = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeData)
    }
     catch (error) {
        res.status(401).json(error)

    }
    

}

exports.editUser = async(req,res)=>{
    const{id} = req.params
    const{fname,lname,email,mobile,gender,status,location,profile} = req.body
    const file = req.file?req.file:profile
    try {
        const updateUser= await users.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,status,profile:file.filename,location},{new:true})
            await updateUser.save()
            res.status(200).json(updateUser)
        
    } catch (error) {
        res.status(401).json(error)

    }



}
