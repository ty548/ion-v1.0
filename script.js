:root {
    --primary: #4F46E5;
    --secondary: #14B8A6;
    --accent: #EC4899;
    --bg-dark: #111827;
    --bg-light: #F9FAFB;
    --text-main: #F9FAFB;
    --text-dark: #1F2937;
    --glass-bg: rgba(31, 41, 55, 0.5);
    --glass-border: rgba(55, 65, 81, 0.5);
}

body { 
    font-family: 'Inter', sans-serif; 
    background-color: var(--bg-dark); 
    color: var(--text-main); 
    overflow-x: hidden; 
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 { 
    font-family: 'Inter', sans-serif; 
    font-weight: 700; 
    line-height: 1.2;
}

.glassmorphism { 
    background: var(--glass-bg); 
    backdrop-filter: blur(12px); 
    -webkit-backdrop-filter: blur(12px); 
    border-bottom: 1px solid var(--glass-border); 
}

/* Add all other custom CSS rules here */
