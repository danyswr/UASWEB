"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dumbbell, Shield, Zap, ChevronDown, Trophy, Coins, Swords, ScrollText, ShoppingBag, Users, Calculator, Settings, LogOut, Heart, Droplet, Sun, Moon, Minimize2, Maximize2, Play, Pause, RotateCcw, Activity, Target, Flame, Footprints, Brain, Smile, Award } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { Progress } from "@/Components/ui/progress"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Slider } from "@/Components/ui/slider"
import { Switch } from "@/Components/ui/switch"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { cn } from "@/lib/utils"

const WORKOUT_DURATION = 30 * 60 // 30 minutes in seconds

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  isFullscreen: boolean
  toggleFullscreen: () => void
}

function Header({ darkMode, setDarkMode, isFullscreen, toggleFullscreen }: HeaderProps) {
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      rotate: -5
    }
  }

  return (
    <header className="flex justify-between items-center mb-8">
      <motion.h1 
        className="text-4xl font-bold"
        variants={titleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.span
          className="inline-block"
          animate={{
            color: darkMode ? "#ffffff" : "#000000",
          }}
          transition={{ duration: 0.3 }}
        >
          Fitness Dashboard
        </motion.span>
      </motion.h1>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setDarkMode(!darkMode)}
                  className={cn(
                    "transition-colors duration-300",
                    darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: darkMode ? 180 : 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {darkMode ? (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent 
              className={cn(
                "font-medium",
                darkMode ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-900"
              )}
            >
              <p>Toggle dark mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleFullscreen}
                  className={cn(
                    "transition-colors duration-300",
                    darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      rotate: isFullscreen ? 180 : 0,
                      scale: isFullscreen ? 0.8 : 1
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Maximize2 className="h-[1.2rem] w-[1.2rem]" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "font-medium",
                darkMode ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-900"
              )}
            >
              <p>Toggle fullscreen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}

export default function Dashboard() {
  const [selectedNav, setSelectedNav] = React.useState("Dashboard")
  const [activeTab, setActiveTab] = React.useState("character")
  const [darkMode, setDarkMode] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [workoutTime, setWorkoutTime] = React.useState(WORKOUT_DURATION)
  const [isWorkoutActive, setIsWorkoutActive] = React.useState(false)
  const [characterStats, setCharacterStats] = React.useState({
    strength: 40,
    endurance: 60,
    speed: 75,
    intelligence: 50,
    charisma: 65
  })
  const [dailyStats, setDailyStats] = React.useState({
    calories: 1200,
    water: 1.5,
    steps: 6000,
    sleep: 7
  })
  const [achievements, setAchievements] = React.useState([
    { id: 1, title: "First Workout", description: "Complete your first workout", achieved: true },
    { id: 2, title: "Strength Master", description: "Reach 100 strength", achieved: false },
    { id: 3, title: "Marathon Runner", description: "Run for 2 hours total", achieved: false },
    { id: 4, title: "Yoga Guru", description: "Complete 10 yoga sessions", achieved: true },
    { id: 5, title: "Weight Lifter", description: "Lift 1000kg total", achieved: false },
  ])
  const [inventory, setInventory] = React.useState([
    { id: 1, name: "Protein Shake", quantity: 5, effect: "+5 Strength" },
    { id: 2, name: "Energy Bar", quantity: 3, effect: "+10 Endurance" },
    { id: 3, name: "Running Shoes", quantity: 1, effect: "+15 Speed" },
  ])

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWorkoutActive && workoutTime > 0) {
      interval = setInterval(() => {
        setWorkoutTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (workoutTime === 0) {
      setIsWorkoutActive(false)
      // Add XP or trigger achievement here
    }
    return () => clearInterval(interval)
  }, [isWorkoutActive, workoutTime])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn(
      "flex min-h-screen transition-colors duration-300",
      darkMode ? "bg-zinc-900 text-zinc-50" : "bg-zinc-50 text-zinc-900"
    )}>
      {/* Sidebar */}
      <motion.div 
        className={cn(
          "w-64 border-r p-6 transition-colors duration-300",
          darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white"
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Dumbbell className="h-6 w-6" />
          <span className="font-semibold text-xl">RPG Gym</span>
        </motion.div>
        
        <nav className="space-y-2">
          {[
            { name: "Dashboard", icon: ScrollText },
            { name: "Battle Arena", icon: Swords },
            { name: "Quests", icon: ScrollText },
            { name: "Shop", icon: ShoppingBag },
            { name: "Guild", icon: Users },
            { name: "Calculator", icon: Calculator },
            { name: "Settings", icon: Settings },
            { name: "Logout", icon: LogOut },
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => setSelectedNav(item.name)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors",
                darkMode
                  ? "text-zinc-400 hover:bg-zinc-700"
                  : "text-zinc-600 hover:bg-zinc-100",
                selectedNav === item.name && (
                  darkMode
                    ? "bg-zinc-700 text-zinc-50 font-medium"
                    : "bg-zinc-100 text-zinc-900 font-medium"
                )
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Header 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
        
        <Tabs defaultValue="character" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="character">Your Character</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="character">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="h-40 w-40">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>HC</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-center">
                          <h2 className="text-3xl font-bold">Hero Name</h2>
                          <Badge variant="outline" className="text-sm">Level 10</Badge>
                        </div>
                        <div className="space-y-4">
                          <StatBar icon={Dumbbell} color="red" value={characterStats.strength} label="Strength" />
                          <StatBar icon={Shield} color="green" value={characterStats.endurance} label="Endurance" />
                          <StatBar icon={Zap} color="blue" value={characterStats.speed} label="Speed" />
                          <StatBar icon={Brain} color="purple" value={characterStats.intelligence} label="Intelligence" />
                          <StatBar icon={Smile} color="yellow" value={characterStats.charisma} label="Charisma" />
                        </div>
                        <div className="pt-4">
                          <h3 className="text-xl font-semibold mb-2">Customize Your Character</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="character-name">Character Name</Label>
                              <Input id="character-name" placeholder="Enter name" />
                            </div>
                            <div>
                              <Label htmlFor="character-class">Character Class</Label>
                              <select id="character-class" className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700">
                                <option>Warrior</option>
                                <option>Mage</option>
                                <option>Rogue</option>
                                <option>Cleric</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <DailyStat icon={Flame} label="Calories Burned" value={dailyStats.calories} unit="kcal" />
                  <DailyStat icon={Droplet} label="Water Intake" value={dailyStats.water} unit="L" />
                  <DailyStat icon={Footprints} label="Steps" value={dailyStats.steps} />
                  <DailyStat icon={Moon} label="Sleep" value={dailyStats.sleep} unit="hours" />
                </div>
              </TabsContent>

              <TabsContent value="workouts">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Workout Timer</h2>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-mono">{formatTime(workoutTime)}</div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="mr-2"
                            onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                          >
                            {isWorkoutActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => {
                              setWorkoutTime(WORKOUT_DURATION)
                              setIsWorkoutActive(false)
                            }}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={(WORKOUT_DURATION - workoutTime) / WORKOUT_DURATION * 100} className="mt-2" />
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {["Legs", "Chest", "Back", "Arms", "Core", "Cardio"].map((part, index) => (
                        <AccordionItem value={part.toLowerCase()} key={part}>
                          <AccordionTrigger className="text-zinc-900 dark:text-zinc-50">
                            {part}
                          </AccordionTrigger>
                          <AccordionContent>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-4"
                            >
                              {[1, 2, 3].map((exercise) => (
                                <motion.div
                                  key={`${part}-${exercise}`}
                                  className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="flex items-center gap-4">
                                    <Activity className="h-6 w-6 text-zinc-500" />
                                    <div>
                                      <span className="font-medium text-zinc-900 dark:text-zinc-50">Exercise {exercise}</span>
                                      <p className="text-sm text-zinc-500 dark:text-zinc-400">3 sets x 12 reps</p>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">Start</Button>
                                </motion.div>
                              ))}
                            </motion.div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quests">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <QuestItem
                      title="Sunday Jog"
                      description="Go for a 5km jog"
                      xp={200}
                      coins={100}
                      progress={75}
                      icon={Flame}
                    />
                    <QuestItem
                      title="Yoga Session"
                      description="Complete a 1-hour yoga session"
                      xp={150}
                      coins={75}
                      progress={50}
                      icon={Target}
                    />
                    <QuestItem
                      title="Weight Training"
                      description="Complete a full body workout"
                      xp={250}
                      coins={125}
                      progress={25}
                      icon={Dumbbell}
                    />
                    <QuestItem
                      title="Meditation"
                      description="Practice mindfulness for 20 minutes"
                      xp={100}
                      coins={50}
                      progress={0}
                      icon={Sun}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <motion.div
                            key={achievement.id}
                            className={cn(
                              "p-4 rounded-lg",
                              achievement.achieved ? "bg-green-100 dark:bg-green-900" : "bg-zinc-100 dark:bg-zinc-800"
                            )}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Award className={cn(
                                  "h-6 w-6",
                                  achievement.achieved ? "text-green-500" : "text-zinc-400"
                                )} />
                                <div>
                                  <h3 className="font-medium">{achievement.title}</h3>
                                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{achievement.description}</p>
                                </div>
                              </div>
                              {achievement.achieved && (
                                <Badge variant="secondary">Achieved!</Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Inventory</h2>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {inventory.map((item) => (
                          <motion.div
                            key={item.id}
                            className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Quantity: {item.quantity}</p>
                              </div>
                              <Badge variant="outline">{item.effect}</Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}

function StatBar({ icon: Icon, color, value, label }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className={`h-6 w-6 text-${color}-500`} />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}/100</span>
        </div>
        <Progress value={value} className="h-2" indicatorClassName={`bg-${color}-500`} />
      </div>
    </div>
  )
}

function QuestItem({ title, description, xp, coins, progress, icon: Icon }) {
  return (
    <motion.div 
      className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-zinc-500" />
          <div>
            <h3 className="font-medium text-lg text-zinc-900 dark:text-zinc-50">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{xp} XP</span>
          <Coins className="h-5 w-5 text-yellow-500 ml-2" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{coins}</span>
        </div>
      </div>
      <Progress value={progress} className="h-2 mb-4" />
      <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
        Start Quest
      </Button>
    </motion.div>
  )
}

function DailyStat({ icon: Icon, label, value, unit }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

