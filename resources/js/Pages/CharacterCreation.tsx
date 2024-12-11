'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dumbbell, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import Image from 'next/image'

interface CharacterData {
  gender: 'male' | 'female'
  characterType: 'warrior' | 'mage' | 'rogue'
  height: string
  weight: string
  age: string
}

const characterImages = {
  male: {
    warrior: '/placeholder.svg?height=80&width=80',
    mage: '/placeholder.svg?height=80&width=80',
    rogue: '/placeholder.svg?height=80&width=80',
  },
  female: {
    warrior: '/placeholder.svg?height=80&width=80',
    mage: '/placeholder.svg?height=80&width=80',
    rogue: '/placeholder.svg?height=80&width=80',
  },
}

export default function CharacterCreation() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CharacterData>({
    gender: 'male',
    characterType: 'warrior',
    height: '',
    weight: '',
    age: '',
  })
  const [errors, setErrors] = useState<Partial<CharacterData>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Partial<CharacterData> = {}
    if (step === 1) {
      if (!data.gender) newErrors.gender = "Please select a gender"
      if (!data.characterType) newErrors.characterType = "Please select a character type"
    } else if (step === 2) {
      if (!data.height) newErrors.height = "Please enter your height"
      if (!data.weight) newErrors.weight = "Please enter your weight"
      if (!data.age) newErrors.age = "Please enter your age"
      if (parseInt(data.age) < 18 || parseInt(data.age) > 100) newErrors.age = "Age must be between 18 and 100"
      if (parseInt(data.height) < 100 || parseInt(data.height) > 250) newErrors.height = "Height must be between 100 and 250 cm"
      if (parseInt(data.weight) < 30 || parseInt(data.weight) > 300) newErrors.weight = "Weight must be between 30 and 300 kg"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('/api/character', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (response.ok) {
          router.push('/dashboard')
        } else {
          console.error('Failed to create character')
        }
      } catch (error) {
        console.error('Error creating character:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col lg:flex-row">
      <HeroSection />
      <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-2xl bg-white/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Create Your Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-black h-2.5 rounded-full" style={{ width: `${(step / 2) * 100}%` }}></div>
            </div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-lg font-semibold">Choose Your Gender</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <GenderCard
                        gender="male"
                        selected={data.gender === 'male'}
                        onClick={() => setData({ ...data, gender: 'male' })}
                      />
                      <GenderCard
                        gender="female"
                        selected={data.gender === 'female'}
                        onClick={() => setData({ ...data, gender: 'female' })}
                      />
                    </div>
                    {errors.gender && <div className="text-red-500">{errors.gender}</div>}
                  </div>
                  
                  <div>
                    <Label className="text-lg font-semibold">Choose Your Character Type</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <CharacterTypeCard
                        type="warrior"
                        selected={data.characterType === 'warrior'}
                        onClick={() => setData({ ...data, characterType: 'warrior' })}
                        imageSrc={characterImages[data.gender].warrior}
                      />
                      <CharacterTypeCard
                        type="mage"
                        selected={data.characterType === 'mage'}
                        onClick={() => setData({ ...data, characterType: 'mage' })}
                        imageSrc={characterImages[data.gender].mage}
                      />
                      <CharacterTypeCard
                        type="rogue"
                        selected={data.characterType === 'rogue'}
                        onClick={() => setData({ ...data, characterType: 'rogue' })}
                        imageSrc={characterImages[data.gender].rogue}
                      />
                    </div>
                    {errors.characterType && <div className="text-red-500">{errors.characterType}</div>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-2">
                          <Label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={data.height}
                            onChange={(e) => setData({ ...data, height: e.target.value })}
                            placeholder="Enter your height"
                            className="bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
                          />
                          {errors.height && <div className="text-red-500">{errors.height}</div>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your height in centimeters (100-250 cm)</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-2">
                          <Label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={data.weight}
                            onChange={(e) => setData({ ...data, weight: e.target.value })}
                            placeholder="Enter your weight"
                            className="bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
                          />
                          {errors.weight && <div className="text-red-500">{errors.weight}</div>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your weight in kilograms (30-300 kg)</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={data.age}
                            onChange={(e) => setData({ ...data, age: e.target.value })}
                            placeholder="Enter your age"
                            className="bg-white border-gray-300 focus:border-black focus:ring-black rounded-lg"
                          />
                          {errors.age && <div className="text-red-500">{errors.age}</div>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your age (18-100 years)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-200 text-black hover:bg-gray-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateForm()) setStep(step + 1)
                    }}
                    className="bg-black text-white hover:bg-gray-800 ml-auto"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800 ml-auto"
                  >
                    Create Character
                  </Button>
                )}
              </div>
            </form>
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
        Customize your hero and begin your fitness adventure
      </p>
      <div className="w-full max-w-md">
        <Image
          src="/placeholder.svg?height=300&width=400"
          alt="Character Creation"
          width={400}
          height={300}
          className="w-full h-auto rounded-lg shadow-md"
          priority
        />
      </div>
    </div>
  )
}

interface GenderCardProps {
  gender: 'male' | 'female'
  selected: boolean
  onClick: () => void
}

function GenderCard({ gender, selected, onClick }: GenderCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected ? 'border-black' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Image
          src={`/placeholder.svg?height=64&width=64`}
          alt={gender}
          width={64}
          height={64}
          className={selected ? 'text-black' : 'text-gray-500'}
        />
        <span className={`mt-2 font-semibold ${selected ? 'text-black' : 'text-gray-500'}`}>
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </span>
      </CardContent>
    </Card>
  )
}

interface CharacterTypeCardProps {
  type: 'warrior' | 'mage' | 'rogue'
  selected: boolean
  onClick: () => void
  imageSrc: string
}

function CharacterTypeCard({ type, selected, onClick, imageSrc }: CharacterTypeCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected ? 'border-black' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <Image
          src={imageSrc}
          alt={type}
          width={80}
          height={80}
          className="object-cover mb-2"
        />
        <span className={`font-semibold ${selected ? 'text-black' : 'text-gray-500'}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </CardContent>
    </Card>
  )
}

