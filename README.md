# AI Course Builder

An intelligent online learning platform that helps users create, manage, and take courses with AI-powered features.

## Features

- **Course Creation**: Create new courses with AI assistance
- **Course Management**: Edit and manage your courses
- **Learning Dashboard**: Track your learning progress
- **AI Tools**: Access AI-powered learning tools
- **Course Exploration**: Browse and discover new courses
- **User Authentication**: Secure user authentication with Clerk
- **Progress Tracking**: Monitor your learning progress
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15.3.3
- **UI Components**: Radix UI, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Neon Database
- **AI Integration**: Google GenAI
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- A Clerk account for authentication
- A Neon Database account
- Google AI API access

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-course_builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
ai-course_builder/
├── app/                    # Next.js app directory
│   ├── course/            # Course-related pages
│   ├── workspace/         # Workspace components
│   └── api/               # API routes
├── components/            # Reusable components
│   └── ui/               # UI components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/              # Static assets
```

## Features in Detail

### Course Creation
- Create new courses with AI assistance
- Customize course content and structure
- Add chapters and learning materials

### Learning Dashboard
- Track your enrolled courses
- Monitor learning progress
- Access course materials

### AI Tools
- AI-powered course generation
- Smart content recommendations
- Learning assistance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
