import userService from "../service/user-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class UserController {
  findAll = asyncErrorHandler(async (req, res) => {
    const users = await userService.findAll();

    res.status(200).json({ users });
  });

  save = asyncErrorHandler(async (req, res) => {
    const user = await userService.save(req.body);

    res.status(200).json({
      message: "user created successfully",
      user,
    });
  });
}

const userController = new UserController();

export default userController;
