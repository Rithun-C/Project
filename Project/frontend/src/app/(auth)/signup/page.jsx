"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { api, ENDPOINT } from "@/lib/api"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [department, setDepartment] = useState("")
  const [section, setSection] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [departments, setDepartments] = useState([])
  const [sections, setSections] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(ENDPOINT.departments)
        if (response.data && response.data.departments) {
          setDepartments(response.data.departments)
        }
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [])

  useEffect(() => {
    const fetchSections = async () => {
      if (!department) return

      try {
        const response = await api.get(`${ENDPOINT.departmentSections(department)}`)
        if (response.data && response.data.sections) {
          setSections(response.data.sections)
        }
      } catch (error) {
        console.error("Error fetching sections:", error)
        setSections([])
        setSection("")
      }
    }

    fetchSections()
  }, [department])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await api.post(ENDPOINT.studentRegister, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        department,
        section,
      })
      if (res.data.status === "success") {
        dispatch(userLoggedInDetails(res.data.user))
        router.push("/login")
      } else {
        console.log("message", res.data.message)
      }
    } catch (err) {
      console.log("err: ", err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" }
    if (password.length < 6) return { strength: 1, label: "Weak" }
    if (password.length < 10) return { strength: 2, label: "Medium" }
    return { strength: 3, label: "Strong" }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create an account</h1>
          <p className="mt-2 text-sm text-slate-600">Join us to get started with your journey</p>
        </div>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-slate-700">
                  First name
                </Label>
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-slate-700">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-slate-700">
                Department
              </Label>
              <Select
                value={department}
                onValueChange={(value) => {
                  setDepartment(value)
                  setSection("") // Reset section when department changes
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {department && (
              <div className="space-y-2">
                <Label htmlFor="section" className="text-slate-700">
                  Section
                </Label>
                <Select value={section} onValueChange={setSection}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((sect) => (
                      <SelectItem key={sect.value} value={sect.value}>
                        {sect.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="border-slate-200 focus-visible:ring-slate-400"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="border-slate-200 pr-10 focus-visible:ring-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Password strength:</span>
                    <span
                      className={cn(
                        "font-medium",
                        passwordStrength.strength === 1 && "text-red-500",
                        passwordStrength.strength === 2 && "text-amber-500",
                        passwordStrength.strength === 3 && "text-green-500",
                      )}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="mt-1 flex h-1 gap-1">
                    <div
                      className={cn(
                        "h-full w-1/3 rounded-full",
                        passwordStrength.strength >= 1 ? "bg-red-500" : "bg-slate-200",
                      )}
                    />
                    <div
                      className={cn(
                        "h-full w-1/3 rounded-full",
                        passwordStrength.strength >= 2 ? "bg-amber-500" : "bg-slate-200",
                      )}
                    />
                    <div
                      className={cn(
                        "h-full w-1/3 rounded-full",
                        passwordStrength.strength >= 3 ? "bg-green-500" : "bg-slate-200",
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="border-slate-200 pr-10 focus-visible:ring-slate-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {confirmPassword && confirmPassword !== password && (
                <div className="mt-2 text-red-500 text-xs">Passwords do not match</div>
              )}
            </div>

            <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-white"></div>
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
