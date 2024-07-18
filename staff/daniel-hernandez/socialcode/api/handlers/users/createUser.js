import logic from "../../logic/index.js";

const createUser = async (req, res, next) => {
  const { name, surname, email, username, password, repeatedPassword } =
    req.body;

  try {
    await logic.createUser(
      name,
      surname,
      email,
      username,
      password,
      repeatedPassword,
    );
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export default createUser;
