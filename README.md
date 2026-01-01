# Blog Management Application

A modern, full-featured blog management platform built with Next.js 16, TypeScript, and TailwindCSS. This application provides a complete solution for creating, editing, and managing blog posts with a rich text editor, authentication, and responsive design.

## 🚀 Features

### Core Functionality

- **📝 Rich Text Editor**: Advanced Tiptap-based editor with:
  - Text formatting (bold, italic, strikethrough, underline)
  - Code blocks and inline code
  - Ordered and unordered lists
  - Block quotes
  - Syntax highlighting with multi-color support
  - Link management
  - Bubble menu and floating menu for quick formatting
  - Undo/Redo functionality

- **🔐 Authentication System**:
  - User registration with validation
  - Secure login/logout
  - Cookie-based session management
  - Protected routes with middleware
  - Automatic token handling via Axios interceptors

- **📚 Blog Management**:
  - Create new blog posts
  - Edit existing posts
  - Delete posts
  - View individual blog details
  - Search functionality with debouncing
  - Pagination with "Load More" feature
  - Real-time search results

- **🎨 UI/UX**:
  - Responsive design for all screen sizes
  - Dark mode support via next-themes
  - Custom UI components built with Radix UI
  - Toast notifications using Sonner
  - Loading states and error handling
  - Professional typography with Tailwind Typography

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe development
- **TailwindCSS 4** - Utility-first CSS framework

### Key Libraries

- **@tiptap/react** - Rich text editor framework
- **@tanstack/react-query** - Data fetching and state management
- **axios** - HTTP client with interceptors
- **react-hook-form** - Form validation and handling
- **yup** - Schema validation
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional styling

### Development Tools

- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Sass** - CSS preprocessor
- **TypeScript** - Static type checking

## 📁 Project Structure

```
blog-management/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── (root)/                   # Main app routes
│   │   ├── blog/[id]/           # Blog detail page
│   │   ├── create/              # Create blog page
│   │   ├── edit/[id]/           # Edit blog page
│   │   └── page.tsx             # Home page (blog list)
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
│
├── components/                   # Reusable components
│   ├── Header.tsx               # App header with auth
│   ├── Providers.tsx            # React Query provider
│   ├── TextEditor.tsx           # Tiptap editor wrapper
│   ├── tiptap-extension/        # Custom Tiptap extensions
│   ├── tiptap-icons/            # Custom editor icons
│   ├── tiptap-ui/               # Editor UI components
│   └── ui/                      # shadcn/ui components
│
├── context/                      # React Context
│   └── AuthContext.tsx          # Authentication context
│
├── hooks/                        # Custom React hooks
│   ├── use-tiptap-editor.ts    # Tiptap editor hook
│   ├── useAddBlog.ts           # Blog creation mutation
│   ├── useDeleteBlog.ts        # Blog deletion mutation
│   ├── useGetBlog.ts           # Blog fetching query
│   └── useUpdateBlog.ts        # Blog update mutation
│
├── http/                         # API configuration
│   ├── api.error.ts            # Error handling
│   └── http.ts                 # Axios instance setup
│
├── lib/                          # Utility functions
│   ├── auth-actions.ts         # Server actions for auth
│   ├── auth-cookies.ts         # Cookie management
│   ├── tiptap-utils.ts         # Editor utilities
│   └── utils.ts                # General utilities
│
├── schema/                       # Validation schemas
│   ├── authSchema.ts           # Auth form validation
│   └── index.ts                # Schema exports
│
├── types/                        # TypeScript types
│   └── types.ts                # App-wide types
│
├── views/                        # View components
│   ├── auth/                   # Auth views
│   │   ├── LoginView.tsx
│   │   └── RegisterView.tsx
│   └── blogs/                  # Blog views
│       ├── BlogDetailView.tsx
│       ├── BlogsView.tsx
│       ├── CreateView.tsx
│       └── components/         # Blog-specific components
│
├── middleware.ts                # Next.js middleware for auth
└── next.config.ts              # Next.js configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-management
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Authentication Flow

The application implements a secure authentication system:

1. **Registration**: Users create accounts with validated credentials
   - Name (3-50 characters)
   - Valid email address
   - Strong password (min 8 chars, uppercase, lowercase, number, special char)

2. **Login**: Users authenticate with email and password
   - JWT token stored in HTTP-only cookies
   - User data stored in cookies and context

3. **Protected Routes**: Middleware guards routes
   - Public routes: `/login`, `/register`
   - Protected routes: Blog creation, editing, deletion
   - Automatic redirects for unauthorized access

4. **Logout**: Clears cookies and redirects to login

## 🎨 Styling

The project uses a comprehensive styling approach:

- **TailwindCSS** for utility-first styling
- **CSS Modules & SCSS** for component-specific styles
- **CSS Variables** for theming (defined in `styles/_variables.scss`)
- **Keyframe Animations** for smooth transitions
- **Dark Mode** support with next-themes

## 📝 Blog Features

### Creating a Blog

1. Navigate to the create page
2. Enter title and content using the rich text editor
3. Format content with the toolbar
4. Submit to save

### Editing a Blog

1. Click edit on any blog post
2. Modify content in the editor
3. Save changes

### Viewing Blogs

- **List View**: Paginated blog list with search
- **Detail View**: Full blog content with author info
- **Search**: Real-time search with debouncing
- **Load More**: Infinite scroll-like pagination

## 🔧 Custom Components

### TextEditor

Advanced rich text editor with:

- Toolbar with formatting options
- Bubble menu for selected text
- Floating menu for quick actions
- Custom extensions and nodes
- Syntax highlighting

### Custom Tiptap UI Components

- **ColorHighlightButton**: Text highlighting with color picker
- **Badge**: Status and label components
- **Button**: Customizable button variants
- **Tooltip**: Accessible tooltips

## 🌐 API Integration

The app uses Axios with interceptors for:

- Automatic token injection from cookies
- Error handling and retry logic
- Request/response transformation
- Base URL configuration

## 🧩 State Management

- **React Query**: Server state management
  - Automatic caching
  - Background refetching
  - Optimistic updates
  - Query invalidation

- **Context API**: Client state
  - Authentication state
  - User information

## 📱 Responsive Design

Fully responsive across all devices:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)
- Custom breakpoints with `use-is-breakpoint` hook

## 🔐 Security Features

- CSRF protection via cookies
- HTTP-only cookie storage
- Route protection with middleware
- Input validation with Yup schemas
- XSS prevention in rich text editor
- Secure password requirements

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

For other platforms, build the project:

```bash
npm run build
npm run start
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and modern web technologies
