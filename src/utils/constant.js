export const navigation = [
    { name: 'Dashboard', to: '/dashboard'},
    { name: "Codes", to: '/codes'},
    { name: "Contact Us", to: '/contact'},
]

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
