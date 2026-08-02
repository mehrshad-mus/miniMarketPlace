import { EditProfileSection } from "@/components/myComponent/EditProfileSection"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { userProfileData } from "@/lib/queries"

export const EditProfile = async ({ params}: { params: Promise<{ editUserProfileWithID: string }> }) => {

    const {editUserProfileWithID} = await params
    const currentUser = await getCurrentUser()
    
    if (!currentUser || !editUserProfileWithID) return <h1>authetication first!</h1>
    
    const userFlag = currentUser.userId === editUserProfileWithID

    const user = await prisma.user.findUnique({ where: { id: editUserProfileWithID } })

    if (!user) return <h1>user dosent exist...</h1>

    return <EditProfileSection data={user} userFlag = {userFlag}/>

}
export default EditProfile