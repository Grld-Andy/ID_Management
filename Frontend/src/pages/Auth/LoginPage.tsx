import { LoginForm } from "@/components/Auth/LoginForm"

export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            {/* <div className="absolute top-0 left-0 w-full h-full z-0 brightness-90 blur-sm">
                <img
                src="/loginbg.webp"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div> */}
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-blue-50"></div>
            <div className="w-full max-w-sm md:max-w-3xl z-10 shadow-2xl rounded-xl overflow-hidden">
                <LoginForm />
            </div>
        </div>
    )
}
