export function generateInviteCode () {
    const inviteStr = Math.random().toString(36).substr(2, 5).toUpperCase()
    return inviteStr;
}