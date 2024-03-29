const asyncHandler=(fn)=> async  (req,res,next)=>{
    try {

        await fn(req,res,next)
        
    } catch (error) {
        console.log("Error "+ error);
       return  res.status(400).json({
        success:false,
        message:"A error occur"
    })
        
    }
}


export {asyncHandler}