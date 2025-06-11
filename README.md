# Prompt Injection & Jailbreak Defense Simulator

An interactive web application to test and evaluate prompt injection attacks and defense mechanisms against AI language models.

## Live Demo

🚀 Try it out: [Prompt Injection Simulator](https://prompt-injection-simulator.vercel.app/)

## Overview

This simulator allows users to:
- Test various prompt injection techniques
- Evaluate system prompt robustness
- Document attack attempts and their outcomes
- Implement and test defense strategies
- Use Safe Mode to pre-check prompts for potential risks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prompt-injection-simulator.git
cd prompt-injection-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Add your OpenAI API key to `.env`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application is deployed on Vercel. You can:
- Fork this repository
- Connect it to your Vercel account
- Add your OpenAI API key to the environment variables
- Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fprompt-injection-simulator)

## Features

### Attack Types Documented

1. Direct System Prompt Revelation
   - Attempt to make the AI reveal its system prompt
   - Defense: Input validation, prompt structure verification

2. Role-Playing Override
   - Attempt to make the AI assume a different role
   - Defense: Role consistency checking

3. Context Manipulation
   - Attempt to manipulate the AI's context understanding
   - Defense: Context validation

4. Instruction Negation
   - Attempt to make the AI ignore its core instructions
   - Defense: Instruction integrity checking

5. Token Manipulation
   - Attempt to exploit token/formatting weaknesses
   - Defense: Input sanitization

### Safe Mode

The Safe Mode feature implements:
- Pattern matching for suspicious keywords
- Semantic analysis of user inputs
- Pre-execution prompt validation
- Risk scoring system

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── simulate/
│   │       └── route.ts    # API endpoint for attack simulation
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx           # Main page component
├── components/
│   ├── AttackSimulator.tsx # Attack input and execution
│   ├── ResultsDisplay.tsx  # Display attack results
│   ├── SafeModeToggle.tsx  # Toggle safe mode
│   └── SystemPromptEditor.tsx # Edit system prompt
└── types/
    └── index.ts           # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.