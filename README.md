# Personal Finance Tracker: A MERN Stack project





   You can view the site [HERE](https://c8d4l5sp-5173.inc1.devtunnels.ms/login)
  
# 💰 Expense Tracker (MERN)

An easy-to-use Expense & Income Tracker built with the MERN stack, helping you stay on top of your finances by visualizing where your money comes from and where it goes.


# 🚀 Features

✅ User Authentication – Secure login & signup using JWT

✅ Add Income & Expenses – Track multiple sources (salary, freelance, stocks, rent, groceries, etc.)

✅ Dashboard Overview – Get a quick glance at total balance, income, and expenses

✅ Charts & Visualizations – Clear graphs for better financial insights (last 30/60 days overview)

✅ Download Data – Export income & expenses for record-keeping

✅ Responsive UI – Clean and modern interface built with React

✅ Tested with Postman – Robust APIs verified and documented

# 🛠️ Tech Stack

Frontend: React.js + TailwindCSS (shadcn/ui for components)

Backend: Node.js + Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token)

API Testing: Postman

# 🔧 Installation & Setup

Clone the repo and install dependencies:

                git clone https://github.com/your-username/expense-tracker.git

                cd expense-tracker

                cd server
                npm install

                cd ../client
                npm install


Create a .env file in the server folder:

                PORT=5000
                MONGO_URI=your_mongodb_connection_string
                JWT_SECRET=your_jwt_secret


Run the project:

Run backend:
                  
                cd server
                npm run dev

Run frontend:

                cd ../client
                npm start

# 📌 API Endpoints 
Method	Endpoint	Description

POST	   /api/auth/register	Register new user

POST	   /api/auth/login	Login user

GET	    /api/income	Fetch all incomes

POST	    /api/income	Add income

GET	   /api/expense	Fetch all expenses

POST	   /api/expense	Add expense

   
# Sample Screenshots:
Login Page

![WhatsApp Image 2025-08-25 at 21 28 33_c6ae3603](https://github.com/user-attachments/assets/970709ad-1a9c-4b27-8a39-b3c1f0bb60d7)

Sign Up page

![bb8e555b594940f688498858bfefc0dc](https://github.com/user-attachments/assets/ea1740c2-7c9f-44a4-a93d-b8fb4580f894)

Income overview page 

![22691fab87f6472cb76aede2d4b31f23](https://github.com/user-attachments/assets/a3f8edb4-4819-49a3-bfbf-65420245f17d)

Expense overview page


![0fb23b5abc884ba59ce9aecdf3c7e67e](https://github.com/user-attachments/assets/ff7dc0b6-89f5-4d6f-bf8a-fb0a62fd0b6b)

Dashboard

![a80e23ef47204b63b60df441c3d3f8b2](https://github.com/user-attachments/assets/5bc426d7-2f00-447a-8656-cc7a0091b2c7)

![2231d1a1ff7544d4bdcd4e157c643183](https://github.com/user-attachments/assets/efb42e05-f43d-467e-8fdc-0c0d107bcc79)

![703a2fb3d8b0435bb441ec4f8e5dfa8a](https://github.com/user-attachments/assets/0818d6db-669f-4f8a-8952-8f638a718a89)



# 🧑‍💻 Future Enhancements

🔔 Expense alerts & budget goals

📱 Mobile-friendly PWA support

📊 Advanced analytics (monthly/yearly reports)

🌍 Multi-currency support

# 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

# 📜 License

This project is licensed under the MIT License – feel free to use, modify, and share!
