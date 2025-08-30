 const allProducts = [
    {
      id: 101,
      name: "Premium Wireless Headphones",
      price: "$299",
      rating: 4.8,
      stock: 34,
      brand: "SoundX",
      category: "Electronics",
      description: "High-fidelity wireless headphones with noise cancellation and 30-hour battery life.",
      features: [
        "Active Noise Cancellation",
        "30 Hours Battery",
        "Bluetooth 5.2",
        "Soft Cushioned Earcups"
      ],
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 102,
      name: "Smart Fitness Watch",
      price: "$199",
      rating: 4.6,
      stock: 75,
      brand: "FitPro",
      category: "Electronics",
      description: "Track your workouts, sleep, heart rate, and more with this all-in-one smart fitness watch.",
      features: [
        "Heart Rate Monitor",
        "Step & Calorie Tracker",
        "Sleep Analysis",
        "Water Resistant"
      ],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60"
    },
    // {
    //   id: 103,
    //   name: "Laptop Stand Pro",
    //   price: "$89",
    //   rating: 4.9,
    //   stock: 58,
    //   brand: "ErgoTech",
    //   category: "Home & Garden",
    //   description: "Ergonomic aluminum laptop stand for comfortable working angles and improved posture.",
    //   features: [
    //     "Adjustable Height",
    //     "Aluminum Body",
    //     "Anti-Slip Pads",
    //     "Supports up to 17'' Laptops"
    //   ],
    //   image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51ca8?w=600&auto=format&fit=crop&q=60"
    // },
    {
      id: 104,
      name: "Wireless Charging Pad",
      price: "$45",
      rating: 4.5,
      stock: 100,
      brand: "ChargeNow",
      category: "Electronics",
      description: "Sleek and fast Qi wireless charging pad compatible with all major phone brands.",
      features: [
        "Fast Charging Support",
        "Qi Certified",
        "Overheat Protection",
        "LED Charging Indicator"
      ],
      image: "https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 105,
      name: "Bluetooth Speaker",
      price: "$129",
      rating: 4.7,
      stock: 42,
      brand: "BoomBox",
      category: "Electronics",
      description: "Portable Bluetooth speaker with deep bass and 20 hours of playtime.",
      features: [
        "20 Hours Battery",
        "Water-Resistant",
        "Built-in Mic",
        "Stereo Sound"
      ],
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 106,
      name: "USB-C Hub",
      price: "$79",
      rating: 4.4,
      stock: 120,
      brand: "Portify",
      category: "Electronics",
      description: "Compact USB-C hub with HDMI, USB 3.0, SD Card, and Ethernet ports.",
      features: [
        "4-in-1 Hub",
        "4K HDMI Output",
        "Ethernet Support",
        "Plug & Play"
      ],
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 107,
      name: "Gaming Mouse",
      price: "$159",
      rating: 4.6,
      stock: 61,
      brand: "ClickX",
      category: "Electronics",
      description: "High-precision gaming mouse with RGB lighting and customizable buttons.",
      features: [
        "16000 DPI Sensor",
        "RGB Lighting",
        "6 Programmable Buttons",
        "Ergonomic Design"
      ],
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 108,
      name: "Mechanical Keyboard",
      price: "$189",
      rating: 4.8,
      stock: 45,
      brand: "KeyZilla",
      category: "Electronics",
      description: "Backlit mechanical keyboard with tactile switches and anti-ghosting technology.",
      features: [
        "Blue Switches",
        "RGB Backlight",
        "Full N-Key Rollover",
        "Detachable USB Cable"
      ],
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 109,
      name: "4K Webcam",
      price: "$199",
      rating: 4.5,
      stock: 88,
      brand: "ViewSharp",
      category: "Electronics",
      description: "Crystal clear 4K webcam for video conferencing, streaming, and content creation.",
      features: [
        "4K UHD Video",
        "Auto Light Correction",
        "Dual Stereo Mics",
        "Plug & Play USB"
      ],
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 201,
      name: "Premium Wireless Headphones",
      price: "$299",
      rating: 4.8,
      brand: "SoundX",
      category: "Electronics",
      stock: 35,
      description: "Experience immersive sound with noise cancellation and 30-hour battery life.",
      features: [
        "Noise Cancellation",
        "30-Hour Battery",
        "Bluetooth 5.2",
        "Ergonomic Fit"
      ],
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 202,
      name: "Smart Fitness Watch",
      price: "$199",
      rating: 4.6,
      brand: "FitPulse",
      category: "Electronics",
      stock: 50,
      description: "Track your health with precision and stay connected on the go.",
      features: [
        "Heart Rate & Sleep Monitor",
        "Waterproof Design",
        "Message Notifications",
        "7-Day Battery Life"
      ],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 203,
      name: "MacBook Pro M3",
      price: "$1999",
      rating: 4.9,
      brand: "Apple",
      category: "Electronics",
      stock: 20,
      description: "Powerhouse M3 chip performance in a sleek and lightweight MacBook Pro.",
      features: [
        "M3 Chipset",
        "Retina Display",
        "20-Hour Battery",
        "Magic Keyboard"
      ],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 204,
      name: "iPhone 15 Pro",
      price: "$999",
      rating: 4.7,
      brand: "Apple",
      category: "Electronics",
      stock: 45,
      description: "Latest iPhone with ProMotion, A17 chip, and incredible camera system.",
      features: [
        "A17 Bionic Chip",
        "48MP Camera",
        "ProMotion Display",
        "Ceramic Shield"
      ],
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 205,
      name: "AirPods Pro",
      price: "$249",
      rating: 4.5,
      brand: "Apple",
      category: "Electronics",
      stock: 60,
      description: "Comfortable, compact, and immersive AirPods with noise cancellation.",
      features: [
        "Active Noise Cancellation",
        "Transparency Mode",
        "MagSafe Charging",
        "Custom Fit Ear Tips"
      ],
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=60"
    }
  ];
  
export default allProducts;