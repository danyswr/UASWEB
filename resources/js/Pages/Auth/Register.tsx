'use client'

import { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { Eye, EyeOff, Dumbbell, Swords, Shield, Flame, Trophy, User, Sword, BoxIcon, Brain, Ruler, Weight, Calendar, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from "@/Components/ui/slider"
import { Progress } from "@/Components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import axios from 'axios'

interface FormData {
  name: string
  email: string
  password: string
  password_confirmation: string
  tanggal_lahir: string
  gender: string
  role: Role | null
  berat_badan: number
  tinggi_badan: number
  age: number
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

interface Role {
  id: number;
  name: string;
  description: string;
}

const classes = [
  { name: 'Warrior', icon: Sword, strength: 8, agility: 5, intelligence: 3 },
  { name: 'Archer', icon: BoxIcon, strength: 5, agility: 8, intelligence: 5 },
  { name: 'Mage', icon: Brain, strength: 3, agility: 5, intelligence: 8 },
]

export default function RegisterAndCreateCharacter() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    tanggal_lahir: '',
    gender: '',
    role: null,
    berat_badan: 70,
    tinggi_badan: 170,
    age: 25,
  })
  const [characterData, setCharacterData] = useState<CharacterData>({
    class: '',
    height: 170,
    weight: 70,
    age: 25,
    strength: 0,
    agility: 0,
    intelligence: 0,
  })
  const [roles, setRoles] = useState<Role[]>([]);
  const [errors, setErrors] = useState({});
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    fetch('/api/roles')
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error('Error fetching roles:', error));
  }, []);

  const { data: formdata, setData, post, processing, errors: formErrors } = useForm<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    tanggal_lahir: '',
    gender: '',
    role: null,
    berat_badan: 70,
    tinggi_badan: 170,
    age: 25,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        try {
          // Use Inertia's router instead of fetch
          router.post('/register', {
            ...formData,
            role: formData.role?.name,
            ...characterData
          }, {
            onSuccess: () => {
              router.visit('/dashboard')
            },
            onError: (errors) => {
              setErrors(errors)
            }
          })
        } catch (error) {
          console.error('Error registering and creating character:', error)
        }
      }
    }
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


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
                    formData={formData}
                    setFormData={setFormData}
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
                    roles={roles}
                    formData={formData}
                    setFormData={setFormData}
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
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
  processing: boolean
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (show: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
}

function RegisterForm({
  formData,
  setFormData,
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
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
  roles: Role[]
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

function CharacterCreationForm({
  characterData,
  setCharacterData,
  handleClassSelect,
  handleCharacterSubmit,
  roles,
  formData,
  setFormData
}: CharacterCreationFormProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [hasSelectedClass, setHasSelectedClass] = useState(false);

  const nextRole = () => {
    setDirection('next');
    setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
  };

  const prevRole = () => {
    setDirection('prev');
    setCurrentRoleIndex((prevIndex) => (prevIndex - 1 + roles.length) % roles.length);
  };

  const handleRoleSelect = () => {
    setFormData({ ...formData, role: roles[currentRoleIndex] });
    setHasSelectedClass(true);
  };

  const handleBackToClassSelection = () => {
    setHasSelectedClass(false);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!hasSelectedClass ? (
          <motion.div
            key="class-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">Choose Your Class</h3>
            <div className="relative min-h-[400px]">
              <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6">
                <span className="text-2xl font-bold">{roles[currentRoleIndex].name}</span>
                <div className="w-32 h-32 relative overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={currentRoleIndex}
                      src={`/roles/${roles[currentRoleIndex].name.toLowerCase()}.png`}
                      alt={`${roles[currentRoleIndex].name} class`}
                      className="w-full h-full object-contain absolute inset-0"
                      custom={direction}
                      initial={(custom) => ({ x: custom === 'next' ? 100 : -100, opacity: 0 })}
                      animate={{ x: 0, opacity: 1 }}
                      exit={(custom) => ({ x: custom === 'next' ? -100 : 100, opacity: 0 })}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.5
                      }}
                    />
                  </AnimatePresence>
                </div>
                <p className="text-center text-gray-600">{roles[currentRoleIndex].description}</p>
                <Button
                  className="w-full max-w-[200px]"
                  variant={formData.role?.id === roles[currentRoleIndex].id ? 'default' : 'outline'}
                  onClick={handleRoleSelect}
                >
                  {formData.role?.id === roles[currentRoleIndex].id ? 'Selected' : 'Choose This Class'}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={prevRole}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={nextRole}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              {roles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentRoleIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero-customization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mt-8"
          >
            <h4 className="text-xl font-semibold mb-4 text-center">Customize Your Hero</h4>
            <div className="flex items-center justify-center mb-6">
              <img
                src={`/roles/${formData.role?.name.toLowerCase()}.png`}
                alt={`${formData.role?.name} class`}
                className="w-24 h-24 object-contain"
              />
              <div className="ml-4">
                <h5 className="text-lg font-semibold">{formData.role?.name}</h5>
                <p className="text-sm text-gray-600">{formData.role?.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Height (cm)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.tinggi_badan]}
                    onValueChange={(value) => setFormData({ ...formData, tinggi_badan: value[0] })}
                    max={220}
                    min={140}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.tinggi_badan}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  Weight (kg)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.berat_badan]}
                    onValueChange={(value) => setFormData({ ...formData, berat_badan: value[0] })}
                    max={150}
                    min={40}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.berat_badan}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Age (years)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[formData.age]}
                    onValueChange={(value) => setFormData({ ...formData, age: value[0] })}
                    max={100}
                    min={16}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.age}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleBackToClassSelection}
                variant="outline"
                className="w-full mr-2"
              >
                Back to Class Selection
              </Button>
              <Button
                onClick={handleCharacterSubmit}
                className="w-full ml-2 bg-black hover:bg-gray-800 text-white"
              >
                Create Your Hero
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

