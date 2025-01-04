export type TextStyle = {
  id: string
  name: string
  description: string
  prompt: string
}

export type TextLength = 'concise' | 'moderate' | 'detailed'

export const TEXT_STYLES: TextStyle[] = [
  {
    id: 'formal',
    name: 'Make it Formal',
    description: 'Perfect for business emails and official documents',
    prompt: 'Convert this into formal language suitable for professional communication:'
  },
  {
    id: 'simple',
    name: 'Make it Simple',
    description: 'Easy to understand, everyday language',
    prompt: 'Simplify this text to make it clear and easy to understand:'
  },
  {
    id: 'friendly',
    name: 'Make it Friendly',
    description: 'Warm and approachable tone',
    prompt: 'Make this text more friendly and conversational while keeping it professional:'
  },
  {
    id: 'direct',
    name: 'Make it Direct',
    description: 'Clear and straight to the point',
    prompt: 'Make this more concise and direct:'
  },
  {
    id: 'casual',
    name: 'Make it Casual',
    description: 'Relaxed and informal tone',
    prompt: 'Convert this into a more casual, relaxed tone:'
  },
  {
    id: 'professional',
    name: 'Make it Professional',
    description: 'Polished and business-appropriate',
    prompt: 'Transform this into professional language:'
  },
  {
    id: 'clear',
    name: 'Make it Clear',
    description: 'Remove jargon and complexity',
    prompt: 'Make this clearer by removing any complex language or jargon:'
  },
  {
    id: 'positive',
    name: 'Make it Positive',
    description: 'Optimistic and constructive tone',
    prompt: 'Rephrase this to have a more positive and constructive tone:'
  }
]

