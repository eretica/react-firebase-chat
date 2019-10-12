import { UserInfo } from 'firebase'
import { db } from '../helpers/firebase'
import { COLLECTION } from '../firebase/constraints'

export const useUser = () => {
  const updateUser = async (user: UserInfo) => {
    return db
      .collection(COLLECTION.USERS)
      .doc(user.uid)
      .set({
        name: user.displayName,
      })
  }

  return { updateUser }
}
