const mongoose = require("mongoose");

const OrderSeedData = [
  {
    userId: "user_id_1",
    items: [
      {
        item: "item_id_1",
        quantity: 2,
      },
      {
        item: "item_id_2",
        quantity: 3,
      },
    ],
    state: "ordered",
    total: 150,
    createdAt: "2023-07-12T09:30:00Z",
  },
  {
    userId: "user_id_2",
    items: [
      {
        item: "item_id_3",
        quantity: 1,
      },
    ],
    state: "paid",
    total: 50,
    createdAt: "2023-07-12T14:45:00Z",
  },
  {
    userId: "user_id_3",
    items: [
      {
        item: "item_id_4",
        quantity: 1,
      },
      {
        item: "item_id_5",
        quantity: 2,
      },
    ],
    state: "completed",
    total: 300,
    createdAt: "2023-07-13T11:20:00Z",
  },
  {
    userId: "user_id_1",
    items: [
      {
        item: "item_id_1",
        quantity: 2,
      },
      {
        item: "item_id_2",
        quantity: 3,
      },
    ],
    state: "ordered",
    total: 150,
    createdAt: "2023-07-12T09:30:00Z",
  },
  {
    userId: "user_id_2",
    items: [
      {
        item: "item_id_3",
        quantity: 1,
      },
    ],
    state: "paid",
    total: 50,
    createdAt: "2023-07-12T14:45:00Z",
  },
  {
    userId: "user_id_3",
    items: [
      {
        item: "item_id_4",
        quantity: 1,
      },
      {
        item: "item_id_5",
        quantity: 2,
      },
    ],
    state: "completed",
    total: 300,
    createdAt: "2023-07-13T11:20:00Z",
  },
  {
    userId: "user_id_1",
    items: [
      {
        item: "item_id_1",
        quantity: 2,
      },
      {
        item: "item_id_2",
        quantity: 3,
      },
    ],
    state: "ordered",
    total: 150,
    createdAt: "2023-07-12T09:30:00Z",
  },
  {
    userId: "user_id_2",
    items: [
      {
        item: "item_id_3",
        quantity: 1,
      },
    ],
    state: "paid",
    total: 50,
    createdAt: "2023-07-12T14:45:00Z",
  },
  {
    userId: "user_id_3",
    items: [
      {
        item: "item_id_4",
        quantity: 1,
      },
      {
        item: "item_id_5",
        quantity: 2,
      },
    ],
    state: "completed",
    total: 300,
    createdAt: "2023-07-13T11:20:00Z",
  },
  {
    userId: "user_id_2",
    items: [
      {
        item: "item_id_3",
        quantity: 1,
      },
    ],
    state: "cancelled",
    total: 50,
    createdAt: "2023-07-12T14:45:00Z",
  },
  {
    userId: "user_id_2",
    items: [
      {
        item: "item_id_3",
        quantity: 1,
      },
    ],
    state: "cancelled",
    total: 50,
    createdAt: "2023-07-12T14:45:00Z",
  },
];

module.exports = OrderSeedData;
