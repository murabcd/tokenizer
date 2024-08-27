# Tokenizer

This Next.js 14 application serves as an AI model calculator and tokenizer, helping users estimate token counts and costs for various AI models.

## Features

- Select from a range of AI models (cloud-based and local)
- Calculate token count for input text using gpt-3-encoder
- Estimate costs based on selected model and token count
- User-friendly interface with model search and detailed information
- Responsive design using Tailwind CSS
- Lucide React icons for enhanced UI

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or Yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/muradpm/tokenizer.git
   ```

2. Navigate to the project directory:

   ```
   cd tokenizer
   ```

3. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

4. Run the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Select an AI model from the dropdown or search for a specific model.
2. Enter your text in the input area.
3. View the calculated token count (using gpt-3-encoder) and estimated cost.
4. Hover over model names for additional information.

## Built With

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [GPT-3-encoder](https://www.npmjs.com/package/gpt-3-encoder)

## License

This project is open source and available under the [MIT License](LICENSE).
