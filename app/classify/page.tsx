"use client"

import type React from "react"
import { useState } from "react"
import { Moon, Sun, Upload, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ClassifyPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [imageResults, setImageResults] = useState<string[]>([])
  const [textResults, setTextResults] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleClassify = async () => {
    setIsLoading(true)
    setImageResults([])
    setTextResults([])

    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${backendUrl}/classify`, {
        method: 'POST',
        body: formData,
      });

        if (response.ok) {
          const data = await response.json()
          if (data.status === "success") {
            const result = data.result
            setImageResults([`Prediction: ${result.prediction} (${result.confidence})`])
          } else {
            setImageResults(["Error: Failed to classify image"])
          }
        } else {
          setImageResults(["Error: Server error"])
        }
      } catch (error) {
        setImageResults(["Error: Network error"])
        console.error(error)
      }
    }

    if (text) {
      // Simulate text classification (you can add a separate API endpoint for text if needed)
      setTextResults(["Sentiment: Positive (92.1%)", "Language: English (99.8%)", "Category: Technology (85.4%)"])
    }

    setIsLoading(false)
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">A</span>
                  </div>
                  <span className="font-mono font-bold text-xl">AnalyzeAI</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center text-sm hover:text-primary transition-colors">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Home
                </Link>
                <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold text-center mb-8 font-mono">AI Classification</h1>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                isDragging ? "border-primary bg-primary/10" : "border-gray-300 dark:border-gray-700"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                <div>
                  <p className="text-lg font-medium">Drag and drop your image here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
                </div>
                <Input type="file" accept="image/*" className="hidden" id="file-upload" onChange={handleFileChange} />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors"
                >
                  Select Image
                </Label>
                {file && (
                  <p className="text-sm font-medium text-green-500">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="text-input">Text Input</Label>
              <Input
                id="text-input"
                placeholder="Enter your text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleClassify}
              className="w-full py-6 text-lg font-medium"
              disabled={!file && !text || isLoading}
            >
              {isLoading ? "Classifying..." : "Classify Now"}
            </Button>

            {(imageResults.length > 0 || textResults.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-primary/5">
                    <CardTitle>Image Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {imageResults.length > 0 ? (
                      <ul className="space-y-2">
                        {imageResults.map((result, index) => (
                          <li key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
                            {result}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No image results yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-primary/5">
                    <CardTitle>Text Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {textResults.length > 0 ? (
                      <ul className="space-y-2">
                        {textResults.map((result, index) => (
                          <li key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
                            {result}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No text results yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>

        <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400 font-mono">
            Powered by AI
          </div>
        </footer>
      </div>
    </div>
  )
}