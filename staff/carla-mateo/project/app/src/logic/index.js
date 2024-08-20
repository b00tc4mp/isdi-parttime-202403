import getUserName from "./getUserName"
import isUserLoggedIn from "./isUserLoggedIn"
import loginAdmin from "./loginAdmin"
import logoutUser from "./logoutUser"
import registerAdmin from "./registerAdmin"
import registerUser from "./registerUser"
import createTask from "./createTask"
import getAllUsers from "./getAllUsers"
import deleteTask from "./deleteTask"
import getAllTasks from "./getAllTasks"
import getUserRole from "./getUserRole"
import updateDataUser from "../../../api/logic/updateDataUser"
import deleteUser from "./deleteUser"


const logic = {
    getUserName,
    isUserLoggedIn,
    loginAdmin,
    logoutUser,
    registerAdmin,
    registerUser,
    createTask,
    getAllUsers,
    deleteTask,
    getAllTasks,
    getUserRole,
    updateDataUser,
    deleteUser

}

export default logic