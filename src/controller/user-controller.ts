import userService from "../service/user-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class UserController {
  findAll = asyncErrorHandler(async (req, res) => {
    const users = await userService.findAll();

    res.status(200).json({ users: users.filter((user) => user.has_access) });
  });

  findAllNotifications = asyncErrorHandler(async (req, res) => {
    const users = await userService.findAll();

    res.status(200).json({ users: users.filter((user) => !user.has_access) });
  });

  save = asyncErrorHandler(async (req, res) => {
    const user = await userService.save(req.body);

    res.status(200).json({
      message: "user created successfully",
      user,
    });
  });

  toggleAccessUser = asyncErrorHandler(async (req, res) => {
    const { userId, access } = req.body;
    await userService.toggleAccessUser(access, userId);

    res.status(200).json({
      message: "updated user successfully",
    });
  });
}

const userController = new UserController();

export default userController;
