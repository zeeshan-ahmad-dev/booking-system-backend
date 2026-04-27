export const restrictTo = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            
            const err = new Error("You are not allowed");
            err.status = 403;
            return next(err);
        }

        next();
    }
}