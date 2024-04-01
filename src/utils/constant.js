export const people = [
    {
        name: 'Funwi Kelsea Ndohnwi',
        role: 'Full Stack Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Nyuh Delbert Kimbi',
        role: 'App Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Prosper',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Bezia Precious',
        role: 'Marketting Guy',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];


export const navigation = [
    { name: 'Dashboard', to: '/dashboard'},
    { name: "Codes and Issues", to: '/codes'},
    { name: "Users", to: '/users'},
    { name: "Chats", to: '/chats'},
    { name: "Contact Us", to: '/contact'},
    { name: "Notifications", to: '/notifications'},
]

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
