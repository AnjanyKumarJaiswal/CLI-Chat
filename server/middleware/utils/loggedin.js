export async function isLoggedIn(req,res,next){
    req.user ? next() : res.status(401).send({"Error message":"UnAuthorise"})
}

export async function isLoggedOut(req,res,next){
    req.user ? next() : res.status(500)
}

