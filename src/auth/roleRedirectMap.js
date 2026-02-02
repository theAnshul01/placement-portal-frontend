export const roleRedirectMap = {
    STUDENT: "/student",
    RECRUITER: "/recruiter",
    OFFICER: "/officer"
}

export const getRedirectPathByRole = (role) => {
    return roleRedirectMap[role] || "/"
}