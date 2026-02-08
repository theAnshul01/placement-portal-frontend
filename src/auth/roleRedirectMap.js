export const roleRedirectMap = {
    STUDENT: "/student",
    RECRUITER: "/recruiter",
    OFFICER: "/officer",
    ADMIN: "/admin"
}

export const getRedirectPathByRole = (role) => {
    return roleRedirectMap[role] || "/"
}