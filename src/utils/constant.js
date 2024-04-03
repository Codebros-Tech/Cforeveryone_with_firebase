export const navigation = [
    { name: 'Dashboard', to: '/dashboard'},
    { name: "Codes and Issues", to: '/codes'},
    { name: "Contact Us", to: '/contact'},
]

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
