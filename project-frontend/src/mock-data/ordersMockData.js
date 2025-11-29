export const mockOrderList = [
  {
    "id": 1,
    "user_id": 1,
    "status": "pending",
    "order_type": "delivery",
    "delivery_address": "Testikatu 1, Helsinki",
    "pizzeria_address": "Pizzeria A, Keskuskatu 5, Helsinki",
    "price": 24.9,
    "products": [
      {
        "id": 2,
        "name": "Pepperoni",
        "ingredients": "Tomato sauce, mozzarella, pepperoni",
        "price": 11.9,
        "category": 1,
        "description": "Spicy pepperoni pizza"
      },
      {
        "id": 8,
        "name": "Coca-Cola 0.33l",
        "ingredients": null,
        "price": 3,
        "category": 3,
        "description": "Soft drink"
      },
      {
        "id": 10,
        "name": "Tiramisu",
        "ingredients": "Mascarpone, coffee, ladyfingers, cocoa powder",
        "price": 6.5,
        "category": 4,
        "description": "Traditional Italian tiramisu"
      }
    ]
  },
  {
    "id": 2,
    "user_id": 2,
    "status": "pending",
    "order_type": "delivery",
    "delivery_address": "Esimerkkitie 10, Espoo",
    "pizzeria_address": "Pizzeria B, Rantakatu 3, Espoo",
    "price": 19.4,
    "products": [
      {
        "id": 3,
        "name": "Quattro Formaggi",
        "ingredients": "Tomato sauce, mozzarella, gorgonzola, parmesan, goat cheese",
        "price": 12.9,
        "category": 1,
        "description": "Four cheese pizza for cheese lovers"
      },
      {
        "id": 9,
        "name": "Sparkling Water 0.5l",
        "ingredients": null,
        "price": 2.5,
        "category": 3,
        "description": "Sparkling mineral water"
      }
    ]
  },
  {
    "id": 3,
    "user_id": null,
    "status": "pending",
    "order_type": "pickup",
    "delivery_address": "N/A",
    "pizzeria_address": "Pizzeria C, Satamakatu 2, Vantaa",
    "price": 11.9,
    "products": [
      {
        "id": 2,
        "name": "Pepperoni",
        "ingredients": "Tomato sauce, mozzarella, pepperoni",
        "price": 11.9,
        "category": 1,
        "description": "Spicy pepperoni pizza"
      }
    ]
  },
  {
    "id": 4,
    "user_id": 1,
    "status": "pending",
    "order_type": "eat here",
    "delivery_address": "N/A",
    "pizzeria_address": "Pizzeria A, Keskuskatu 5, Helsinki",
    "price": 23.4,
    "products": [
      {
        "id": 4,
        "name": "Vegetarian",
        "ingredients": "Tomato sauce, mozzarella, bell pepper, red onion, mushrooms, olives",
        "price": 11.5,
        "category": 1,
        "description": "Veggie pizza with fresh vegetables"
      },
      {
        "id": 8,
        "name": "Coca-Cola 0.33l",
        "ingredients": null,
        "price": 3,
        "category": 3,
        "description": "Soft drink"
      },
      {
        "id": 11,
        "name": "Chocolate Lava Cake",
        "ingredients": "Chocolate cake, molten chocolate center, vanilla ice cream",
        "price": 7,
        "category": 4,
        "description": "Warm chocolate cake with soft center"
      }
    ]
  },
  {
    "id": 5,
    "user_id": 2,
    "status": "new",
    "order_type": "delivery",
    "delivery_address": "Kivikatu 8, Vantaa",
    "pizzeria_address": "Pizzeria C, Satamakatu 2, Vantaa",
    "price": 32.4,
    "products": [
      {
        "id": 5,
        "name": "Spaghetti Bolognese",
        "ingredients": "Spaghetti, beef ragu, tomato sauce, parmesan",
        "price": 12.5,
        "category": 2,
        "description": "Classic Italian meat pasta"
      },
      {
        "id": 8,
        "name": "Coca-Cola 0.33l",
        "ingredients": null,
        "price": 3,
        "category": 3,
        "description": "Soft drink"
      },
      {
        "id": 10,
        "name": "Tiramisu",
        "ingredients": "Mascarpone, coffee, ladyfingers, cocoa powder",
        "price": 6.5,
        "category": 4,
        "description": "Traditional Italian tiramisu"
      }
    ]
  },
  {
    "id": 6,
    "user_id": null,
    "status": "new",
    "order_type": "pickup",
    "delivery_address": "N/A",
    "pizzeria_address": "Pizzeria B, Rantakatu 3, Espoo",
    "price": 15.0,
    "products": [
      {
        "id": 7,
        "name": "Penne Arrabbiata",
        "ingredients": "Penne, spicy tomato sauce, garlic, chili, parsley",
        "price": 11.5,
        "category": 2,
        "description": "Spicy vegetarian pasta"
      },
      {
        "id": 9,
        "name": "Sparkling Water 0.5l",
        "ingredients": null,
        "price": 2.5,
        "category": 3,
        "description": "Sparkling mineral water"
      }
    ]
  },
  {
    "id": 7,
    "user_id": 1,
    "status": "new",
    "order_type": "eat here",
    "delivery_address": "N/A",
    "pizzeria_address": "Pizzeria A, Keskuskatu 5, Helsinki",
    "price": 20.4,
    "products": [
      {
        "id": 6,
        "name": "Chicken Alfredo",
        "ingredients": "Penne, chicken, cream, parmesan, garlic",
        "price": 13.5,
        "category": 2,
        "description": "Creamy chicken pasta with parmesan"
      },
      {
        "id": 11,
        "name": "Chocolate Lava Cake",
        "ingredients": "Chocolate cake, molten chocolate center, vanilla ice cream",
        "price": 7,
        "category": 4,
        "description": "Warm chocolate cake with soft center"
      }
    ]
  }
]
