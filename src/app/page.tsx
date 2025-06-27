import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Search, ChevronRight, BookOpen } from "lucide-react"
import { ContributionGrid } from "@/components/features/analytics/contribution-grid"
import { Navigation } from "@/components/layout/navigation"
import { getGreeting } from "@/lib/utils"

export default function HomePage() {
  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-2">{greeting}, Kayu!🌙</h1>
          <p className="text-xl text-gray-600">Nile is on a reading roll</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - What did you read tonight */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg mb-8 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-charcoal">What did you read tonight?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 h-14 bg-sage hover:bg-sage-dark text-white text-lg font-medium"
                    size="lg"
                  >
                    <Camera className="mr-3 h-5 w-5" />
                    Scan book
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-14 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white text-lg"
                    size="lg"
                  >
                    <Search className="mr-3 h-5 w-5" />
                    Search by title
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-charcoal mb-4">Read again today:</h3>
                  <div className="flex space-x-4 items-center">
                    <div className="flex space-x-3">
                      <img
                        src="/placeholder.svg?height=80&width=60&text=Book1"
                        alt="Good Night Moon"
                        className="w-15 h-20 rounded-md shadow-sm"
                      />
                      <img
                        src="/placeholder.svg?height=80&width=60&text=Book2"
                        alt="Hairy Maclary"
                        className="w-15 h-20 rounded-md shadow-sm"
                      />
                      <img
                        src="/placeholder.svg?height=80&width=60&text=Book3"
                        alt="Brown Bear"
                        className="w-15 h-20 rounded-md shadow-sm"
                      />
                      <img
                        src="/placeholder.svg?height=80&width=60&text=Book4"
                        alt="Very Hungry Caterpillar"
                        className="w-15 h-20 rounded-md shadow-sm"
                      />
                    </div>
                    <Button variant="ghost" className="text-gray-600 hover:text-charcoal">
                      More... <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reading Streak Calendar */}
            <Card className="bg-cream shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-sage" />
                  <CardTitle className="text-xl font-semibold text-charcoal">Reading Streak</CardTitle>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-sage mb-1">47</div>
                  <div className="text-gray-600">day streak 🔥</div>
                </div>
              </CardHeader>
              <CardContent>
                <ContributionGrid />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent reads */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Recent reads</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=50&width=40&text=Panda"
                      alt="Panda Activity Book"
                      className="w-10 h-12 rounded shadow-sm"
                    />
                    <span className="text-charcoal font-medium">Panda Activity Book</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=50&width=40&text=Caterpillar"
                      alt="The Very Hungry Caterpillar"
                      className="w-10 h-12 rounded shadow-sm"
                    />
                    <span className="text-charcoal font-medium">The Very Hungry Caterpillar</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=50&width=40&text=Goodnight"
                      alt="Goodnight Moon"
                      className="w-10 h-12 rounded shadow-sm"
                    />
                    <span className="text-charcoal font-medium">Goodnight Moon</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=50&width=40&text=Bear"
                      alt="Brown Bear, Brown Bear"
                      className="w-10 h-12 rounded shadow-sm"
                    />
                    <span className="text-charcoal font-medium">Brown Bear, Brown Bear</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=50&width=40&text=Gruffalo"
                      alt="The Gruffalo"
                      className="w-10 h-12 rounded shadow-sm"
                    />
                    <span className="text-charcoal font-medium">The Gruffalo</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 