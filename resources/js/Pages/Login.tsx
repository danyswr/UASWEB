'use client'

import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import { Eye, EyeOff, Dumbbell, Swords, Shield, Flame, Trophy, User } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

interface FormData {
  email: string
  password: string
}

export default function LoginPage() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('login'), {
      preserveState: true,
      onSuccess: () => {
        Inertia.visit(route('dashboard'))
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col lg:flex-row">
      <HeroSection />
      <LoginForm
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

function HeroSection() {
  return (
    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      <div className="mb-8 flex items-center justify-center lg:justify-start">
        <div className="bg-black p-3 rounded-2xl shadow-lg mr-4">
          <Dumbbell className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          RPG Gym Quest
        </h1>
      </div>
      <p className="text-xl lg:text-2xl text-gray-600 mb-8">
        Transform your fitness journey into an epic adventure
      </p>
      <div className="grid grid-cols-2 gap-6 mb-12">
        <FeatureCard icon={Swords} title="Battle Workouts" description="Conquer challenging exercise routines" />
        <FeatureCard icon={Shield} title="Level Up" description="Gain experience and improve your stats" />
        <FeatureCard icon={Flame} title="Daily Quests" description="Complete tasks to earn rewards" />
        <FeatureCard icon={Trophy} title="Leaderboards" description="Compete with friends and other heroes" />
      </div>
    </div>
  )
}

interface LoginFormProps {
  data: FormData
  setData: (key: keyof FormData, value: string) => void
  errors: Record<string, string>
  processing: boolean
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
}

function LoginForm({ data, setData, errors, processing, showPassword, setShowPassword, handleSubmit }: LoginFormProps) {
  return (
    <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Welcome back, Hero!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Input 
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
                />
                <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg mt-4" disabled={processing}>
              {processing ? 'Logging in...' : 'Submit'}
            </Button>
          </form>
          <div className="text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-black">
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-black rounded-lg transition duration-200">
              Google
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-black rounded-lg transition duration-200">
              Discord
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            New to RPG Gym Quest?{" "}
            <a href="/register" className="text-black font-semibold hover:underline">
              Create your character
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex-shrink-0">
        <div className="bg-black p-3 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

