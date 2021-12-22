const token = JSON.parse(localStorage.getItem('authToken'))

export const headers = {
    'Authorization': `Bearer ${token}`
}