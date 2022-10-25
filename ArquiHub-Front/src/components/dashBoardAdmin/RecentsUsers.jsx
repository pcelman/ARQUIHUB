import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../redux/slices/user/userActions"
function RecentsUsers () {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.user.allUsers)
    const recentsUsers = allUsers.slice(-5)
    useEffect(() => {
    dispatch(getAllUsers())
    }, [dispatch])

    

    return (
        <div className="">
            <h2 className="mt-10 font-bold">New users:</h2>
            <div className="flex flex-col">
            {
                recentsUsers && recentsUsers.map((user) => {
                    return (
                        <div className=" bg-gray-100 flex  justify-center items-center p-2 pr-0 pl-2 my-3">
                            <p className="capitalize w-1/4">{user.name}</p>
                            <p className="font-semibold w-2/4">{user.email}</p>
                            <p className="w-1/4">{user.createdAt.slice(0, 10)}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default RecentsUsers