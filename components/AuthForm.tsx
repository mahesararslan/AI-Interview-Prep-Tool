"use client"

import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { auth } from "@/firebase/client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import { Form } from "@/components/ui/form"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"

import { signIn, signUp } from "@/lib/actions/auth.action"

type FormType = "sign-in" | "sign-up"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setAuthError(null)
    
    try {
      if (type === "sign-up") {
        const { name, email, password } = data

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        })

        if (!result.success) {
          toast.error(result.message)
          setIsLoading(false)
          return
        }

        toast.success("Account created successfully. Please sign in.")
        router.push("/sign-in")
      } else {
        const { email, password } = data

        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredential.user.getIdToken()
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.")
          setIsLoading(false)
          return
        }

        await signIn({
          email,
          idToken,
        })

        toast.success("Signed in successfully.")
        router.push("/")
      }
    } catch (error: any) {
      console.log(error)
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setAuthError("Invalid email or password")
      } else {
        toast.error(`There was an error: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 transform -skew-y-6"></div>
          <div className="relative bg-gray-900 py-8 px-6 flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
                <Image src="/logo2.png" alt="MockMate" width={180} height={180} />
            </div>
            <p className="text-gray-400 text-center">Practice job interviews with AI</p>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            {isSignIn ? "Sign in to your account" : "Create a new account"}
          </h3>

          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-center">
              {authError}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {!isSignIn && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input
                      {...form.register("name")}
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    {...form.register("email")}
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    {...form.register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-500 hover:text-gray-300 focus:outline-none"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {isSignIn && (
                <div className="text-right">
                  <Link href="/sign-up" className="text-sm text-blue-500 hover:text-blue-400">
                    Forgot your password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading
                  ? isSignIn
                    ? "Signing In..."
                    : "Signing Up..."
                  : isSignIn
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>
          </Form>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-400">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="ml-2 text-blue-500 hover:text-blue-400 font-medium"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm