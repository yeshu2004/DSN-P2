"use client"

import { useState } from "react"
import { Moon, Sun, ArrowRight, Zap, Shield, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navigation */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <span className="font-mono font-bold text-xl">AnalyzeAI</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex space-x-6">
                  <Link href="#features" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                  <Link href="#how-it-works" className="hover:text-primary transition-colors">
                    How it works
                  </Link>
                  <Link href="#testimonials" className="hover:text-primary transition-colors">
                    Testimonials
                  </Link>
                </div>
                <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Link href="/classify">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono leading-tight mb-6">
                    Intelligent Analysis for Your Content
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Powerful AI classification for images and text. Get instant insights and make data-driven decisions.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/classify">
                      <Button size="lg" className="px-8 py-6 text-lg">
                        Try It Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="#how-it-works">
                      <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=500&width=800"
                      alt="AI Classification Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Powerful Features</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Our AI-powered platform offers cutting-edge capabilities to analyze and classify your content.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-mono">Instant Analysis</CardTitle>
                    <CardDescription>
                      Get real-time classification results for both images and text in seconds.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our advanced algorithms process your content instantly, providing immediate insights without any
                      delay.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-mono">Privacy Focused</CardTitle>
                    <CardDescription>
                      Your data remains private and secure with our encrypted processing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      We prioritize your privacy with end-to-end encryption and strict data handling policies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-mono">Detailed Insights</CardTitle>
                    <CardDescription>
                      Comprehensive classification with confidence scores and multiple categories.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get detailed breakdowns of classification results with percentage confidence for each category.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Our platform makes content analysis simple and intuitive.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-mono">Upload Content</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag and drop your images or enter text in the input field.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-mono">Process</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click &quot;Classify Now&quot; and our AI algorithms analyze your content.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-mono">Get Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    View detailed classification results with confidence scores.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">What Our Users Say</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Trusted by professionals and businesses worldwide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary font-bold">JD</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Jane Doe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      &quot;This tool has transformed how we analyze our marketing assets. The image classification is
                      incredibly accurate.&quot;
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary font-bold">MS</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Michael Smith</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Data Scientist</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      &quot;The accuracy and speed of the text classification has significantly improved our data processing
                      workflow.&quot;
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary font-bold">AL</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Amanda Lee</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Content Creator</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      &quot;As a content creator, this tool helps me understand how my images and text will be perceived by
                      algorithms.&quot;
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="bg-primary/5 rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Experience the power of AI-driven content analysis. Try our classification tool today.
                </p>
                <Link href="/classify">
                  <Button size="lg" className="px-8 py-6 text-lg">
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="font-mono font-bold">AnalyzeAI</span>
              </div>
              <div className="flex space-x-6 mb-4 md:mb-0">
                <Link href="#features" className="text-sm hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
                  How it works
                </Link>
                <Link href="#testimonials" className="text-sm hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">Made in India</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

