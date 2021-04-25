
export const checkUserIsAdmin = currentUser => {
    if (!currentUser)
        return false;
    const { userRoles } = currentUser;
    if (userRoles == 'admin') return true;

    return false;
}