'use client'

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TextStyle, TextLength, TEXT_STYLES } from '../app/types'

interface FormalizationSettingsProps {
  selectedStyle: TextStyle
  setSelectedStyle: (style: TextStyle) => void
  tone: number
  setTone: (tone: number) => void
  length: TextLength
  setLength: (length: TextLength) => void
}

export function FormalizationSettings({
  selectedStyle,
  setSelectedStyle,
  tone,
  setTone,
  length,
  setLength
}: FormalizationSettingsProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label>Style</Label>
          <Select 
            value={selectedStyle.id} 
            onValueChange={(value) => {
              const style = TEXT_STYLES.find(s => s.id === value)
              if (style) setSelectedStyle(style)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              {TEXT_STYLES.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  <div className="flex flex-col">
                    <span>{style.name}</span>
                    <span className="text-sm text-muted-foreground">{style.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Formality Tone ({Math.round(tone * 100)}%)</Label>
          <Slider
            value={[tone]}
            onValueChange={([value]) => setTone(value)}
            max={1}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Response Length</Label>
          <RadioGroup
            value={length}
            onValueChange={(value) => setLength(value as TextLength)}
            className="grid grid-cols-3 gap-2"
          >
            <div>
              <RadioGroupItem value="concise" id="concise" className="peer sr-only" />
              <Label
                htmlFor="concise"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Concise
              </Label>
            </div>
            <div>
              <RadioGroupItem value="moderate" id="moderate" className="peer sr-only" />
              <Label
                htmlFor="moderate"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Moderate
              </Label>
            </div>
            <div>
              <RadioGroupItem value="detailed" id="detailed" className="peer sr-only" />
              <Label
                htmlFor="detailed"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Detailed
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

