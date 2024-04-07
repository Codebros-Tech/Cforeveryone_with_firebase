export const navigation = [
    { name: 'Dashboard', to: '/dashboard'},
    { name: "Codes", to: '/codes'},
    { name: "My Codes", to: '/mycodes'},
    { name: "Users", to: '/users'},
    { name: "Contact Us", to: '/contact'},
    { name: "Chats", to: '/chats'},
]

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
