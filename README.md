# 💎 Jewelry E-commerce Store

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform for jewelry sales with Stripe payment integration.

![Jewelry Store](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-orange)
![Stripe](https://img.shields.io/badge/Stripe-Payment-purple)

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse jewelry by categories (rings, necklaces, earrings, bracelets)
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, update quantities, persistent cart state
- **Search & Filter**: Find products by category and price range
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 💳 Payment & Checkout
- **Stripe Integration**: Secure payment processing
- **Order Management**: Complete order tracking and confirmation
- **Cart Persistence**: Items saved across browser sessions

### 🔧 Technical Features
- **RESTful API**: Clean, scalable backend architecture
- **Security**: Helmet.js, rate limiting, CORS protection
- **Performance**: Compression middleware, optimized images
- **Modern UI**: Framer Motion animations, React Icons
- **State Management**: React Context for cart management

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Stripe** - Payment processing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── payments.js
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── videos/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── config/
│   └── package.json
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing

### 1. Clone the Repository
```bash
git clone https://github.com/rahimahsiddiqi/jewellery-store.git
cd jewellery-store
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Database Setup
```bash
# Seed the database with sample data
npm run seed
```

### 5. Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
npm run server    # Backend only (port 5000)
npm run frontend  # Frontend only (port 3000)
```

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Categories
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent

## 🎨 Pages & Components

### Pages
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Product catalog with filtering
- **Categories** (`/categories`) - Browse by jewelry type
- **Product Detail** (`/product/:id`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Payment and order completion
- **Order Success** (`/order-success`) - Order confirmation
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

### Key Components
- **Layout** - Navigation and footer wrapper
- **CheckoutForm** - Stripe payment form
- **CartContext** - Global cart state management

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API request throttling
- **CORS** - Cross-origin protection
- **Input Validation** - Express-validator middleware
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git:
```bash
heroku create your-app-name
git push heroku main
```

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NODE_ENV=production
```

## 📱 Features in Detail

### Shopping Cart
- Persistent cart state using React Context
- Add/remove items with quantity management
- Real-time price calculations
- Local storage backup

### Payment Processing
- Stripe Elements integration
- Secure payment intent creation
- Order confirmation and tracking
- Error handling and validation

### Product Management
- Category-based organization
- High-quality product images
- Detailed product descriptions
- Price and availability tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rahimah Siddiqi**
- GitHub: [@rahimahsiddiqi](https://github.com/rahimahsiddiqi)

## 🙏 Acknowledgments

- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

For support, email support@jewelrystore.com or create an issue in this repository.

---

⭐ **Star this repository if you found it helpful!**
