# 💰 Personal Finance Report

A modern and comprehensive web application for intelligent personal finance management, built with **Next.js** and designed to help you track your monthly expenses with precision and style.

---

## 🚀 Key Features

### 📊 Comprehensive Financial Management
- Monthly salary tracking with **Colombian peso (COP)** currency formatting  
- Customizable titles for your financial reports  
- Detailed tracking of specific expenses (transportation and personal expenses)  
- Automatic data persistence using **localStorage**  

### 🏠 Fixed Expenses Management
- Dynamic management of fixed expenses with predefined categories:
  - 🚗 **Transportation** – Track mobility expenses  
  - 🏠 **Rent** – Monitor housing expenses  
  - 🛒 **Food** – Manage grocery expenses  
  - 🐷 **Savings** – Set monthly savings goals  
  - 💳 **Personal Expenses** – Track discretionary spending  

- Full **CRUD functionality**: Add, edit, and delete expenses easily  
- Intuitive iconography for quick category identification  

### 📈 Variable Expenses Management
- Flexible management of expenses that vary monthly  
- Customizable categorization (debts, extraordinary expenses, etc.)  
- Complete functionality for creating, editing, and deleting expenses  

### 📋 Smart Reports
- Automatic financial analysis with real-time calculations  
- Budget control summary by category  
- Available funds calculation after all expenses  
- Remaining expenses tracking for specific categories  

---

## 🛠️ Technologies Used
- **Next.js 14** – React framework with App Router  
- **React 18** – User interface library  
- **TypeScript** – Static typing for JavaScript  
- **Tailwind CSS** – Utility-first CSS framework  
- **shadcn/ui** – Reusable UI components  
- **Lucide React** – Modern and consistent icons  

---

## 🎨 Design and UX

### Intelligent Color System
- **Blue/Indigo**: Primary financial data and fixed expenses  
- **Green/Emerald**: Positive analysis and favorable results  
- **Purple**: Variable expenses and special categories  
- Smooth gradients for modern visual effects  

### Optimized User Experience
- Automatic number formatting with thousand separators  
- Real-time validation for numeric fields  
- Informative states when no data is available  
- Immediate visual feedback for all user actions  
- Fully responsive design for all devices  

---

## 🚀 Installation and Usage

### Prerequisites
- Node.js **18.0** or higher  
- npm, yarn, pnpm, or bun  

### Local Installation
```bash
# Clone the repository
git clone https://github.com/johanjof/Reporte_finanzas_general.git
cd Reporte_finanzas_general

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Now open your browser and visit:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Main application layout
│   └── page.tsx             # Main page with all logic
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── theme-provider.tsx   # Theme provider
├── lib/
│   └── utils.ts             # Utilities and helpers
└── public/                  # Static assets
```

---

## 💡 How to Use the Application

### 1. Initial Setup
- Enter your monthly salary in the designated field  
- Customize the title of your financial report  
- Configure your transportation and personal expenses monthly  

### 2. Fixed Expenses Management
- Click **"Add Fixed Expense"** to add new categories  
- Edit any existing expense by clicking the edit button  
- Delete expenses you no longer need with the delete button  

### 3. Variable Expenses Management
- Use **"Add Variable Expense"** for monthly changing expenses  
- Manage debts, extraordinary expenses, and other variable expenses  
- Modify or delete as needed  

### 4. Report Analysis
- Review the automatic financial summary  
- Check your available funds after all expenses  
- Analyze category-specific tracking to optimize your budget  

---

## 🌐 Deployment

### Vercel (Recommended)
The application is optimized for deployment on **Vercel**:
1. Connect your repository to Vercel  
2. Vercel will automatically detect it as a Next.js project  
3. Deployment will occur automatically  

👉 Live application: [https://reporte-finanzas-general.vercel.app/](https://reporte-finanzas-general.vercel.app/)  

### Other Platforms
You can also deploy on:  
- Netlify  
- Railway  
- DigitalOcean App Platform  
- Any platform that supports Next.js  

---

## 🤝 Contributing
Contributions are welcome! To improve the application:

1. Fork the project  
2. Create a feature branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---

## 📝 License
This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.  

---

## 🔗 Useful Links
- [Next.js Documentation](https://nextjs.org/docs)  
- [shadcn/ui Documentation](https://ui.shadcn.com)  
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
