'use client'

import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { Eye, EyeOff, Dumbbell, Swords, Shield, Flame, Trophy, User } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, BoxIcon as Bow, Ruler, Weight, Calendar, Brain } from 'lucide-react'
import { Slider } from "@/Components/ui/slider"
import { Progress } from "@/Components/ui/progress"

interface FormData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface CharacterData {
  class: string
  height: number
  weight: number
  age: number
  strength: number
  agility: number
  intelligence: number
}

const classes = [
  { name: 'Warrior', icon: Sword, strength: 8, agility: 5, intelligence: 3 },
  { name: 'Archer', icon: Bow, strength: 5, agility: 8, intelligence: 5 },
  { name: 'Mage', icon: Brain, strength: 3, agility: 5, intelligence: 8 },
]

export default function RegisterAndCreateCharacter() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [characterData, setCharacterData] = useState<CharacterData>({
    class: '',
    height: 170,
    weight: 70,
    age: 25,
    strength: 0,
    agility: 0,
    intelligence: 0,
  })

  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/register', {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        console.log('Registration successful, proceeding to character creation')
        setStep(2)
      },
      onError: (errors) => {
        console.error('Registration failed:', errors)
      },
    })
  }

  const handleClassSelect = (className: string) => {
    const selectedClass = classes.find(c => c.name === className)
    if (selectedClass) {
      setCharacterData({
        ...characterData,
        class: className,
        strength: selectedClass.strength,
        agility: selectedClass.agility,
        intelligence: selectedClass.intelligence,
      })
    }
  }

  const handleCharacterSubmit = () => {
    console.log('Character created:', characterData)
    router.visit('/dashboard')
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col lg:flex-row">
      <HeroSection />
      <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-2xl bg-white/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">
              {step === 1 ? "Create Your Character" : "Customize Your Hero"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  key="registration"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <RegisterForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    handleSubmit={handleSubmit}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="character-creation"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <CharacterCreationForm
                    characterData={characterData}
                    setCharacterData={setCharacterData}
                    handleClassSelect={handleClassSelect}
                    handleCharacterSubmit={handleCharacterSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
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

interface RegisterFormProps {
  data: FormData
  setData: (key: keyof FormData, value: string) => void
  errors: Record<string, string>
  processing: boolean
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (show: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
}

function RegisterForm({ 
  data, 
  setData, 
  errors, 
  processing, 
  showPassword, 
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleSubmit 
}: RegisterFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Character Name</Label>
          <div className="relative">
            <Input 
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Enter your character name"
              className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">Confirm Password</Label>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder="Confirm your password"
              className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
            />
            <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
        </div>
        <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg mt-4" disabled={processing}>
          {processing ? 'Creating character...' : 'Begin Your Quest'}
        </Button>
      </div>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-black rounded-lg transition duration-200">
          Google
        </Button>
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-black rounded-lg transition duration-200">
          Discord
        </Button>
      </div>
      <div className="text-center text-sm text-gray-600 mt-6">
        Already have a character?{" "}
        <a href="/" className="text-black font-semibold hover:underline">
          Return to your quest
        </a>
      </div>
    </form>
  )
}

interface CharacterCreationFormProps {
  characterData: CharacterData
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>
  handleClassSelect: (className: string) => void
  handleCharacterSubmit: () => void
}

function CharacterCreationForm({
  characterData,
  setCharacterData,
  handleClassSelect,
  handleCharacterSubmit
}: CharacterCreationFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Class</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {classes.map((classOption) => (
            <Button
              key={classOption.name}
              variant={characterData.class === classOption.name ? 'default' : 'outline'}
              className={`h-24 flex flex-col items-center justify-center gap-2 ${
                characterData.class === classOption.name 
                  ? 'bg-black text-white hover:bg-black/90' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleClassSelect(classOption.name)}
            >
              <classOption.icon className="w-8 h-8" />
              <span>{classOption.name}</span>
            </Button>
          ))}
        </div>
      </div>
      {characterData.class && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Height (cm)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[characterData.height]}
                onValueChange={(value) => setCharacterData({ ...characterData, height: value[0] })}
                max={220}
                min={140}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right">{characterData.height}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Weight className="w-4 h-4" />
              Weight (kg)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[characterData.weight]}
                onValueChange={(value) => setCharacterData({ ...characterData, weight: value[0] })}
                max={150}
                min={40}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right">{characterData.weight}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Age (years)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[characterData.age]}
                onValueChange={(value) => setCharacterData({ ...characterData, age: value[0] })}
                max={100}
                min={16}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right">{characterData.age}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Strength</span>
              <span>{characterData.strength}</span>
            </div>
            <Progress value={characterData.strength * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Agility</span>
              <span>{characterData.agility}</span>
            </div>
            <Progress value={characterData.agility * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Intelligence</span>
              <span>{characterData.intelligence}</span>
            </div>
            <Progress value={characterData.intelligence * 10} className="h-2" />
          </div>
        </div>
      )}
      <Button 
        onClick={handleCharacterSubmit} 
        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg mt-4"
        disabled={!characterData.class}
      >
        Create Your Hero
      </Button>
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

