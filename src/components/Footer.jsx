export default function Footer() {
    return (
        <footer className="footer mt-5 dark:bg-neutral light:shadow text-black dark:text-neutral-content">
            <div className={"max-w-7xl flex items-center gap-x-5 text-black dark:text-white py-5 px-5"}>
                <div className={"text-xl font-bold"}>
                    {import.meta.env.VITE_APP_NAME}
                </div>

                <div>
                    Terms and Conditions
                </div>
            </div>
        </footer>
    )
}