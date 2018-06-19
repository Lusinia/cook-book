export const INPUT = {
  CATEGORIES: [
    'salad',
    'bakery',
    'barbecue',
    'vegans',
    'fruits',
    'drinks',
    'quick',
    'dishes'
  ],
  INGREDIENTS: [
    'fish',
    'rice',
    'meat',
    'chicken',
    'sugar',
    'tomato',
    'spagetti',
    'cheese',
    'pickles',
    'JEM',
    'cream'
  ]
};


export const loginFields = (values) => [
  {
    title: 'Username',
    type: 'text',
    name: 'username',
    value: values.username
  },
  {
    title: 'Password',
    type: 'password',
    name: 'password',
    value: values.password
  }
];

export const navLinks = {
  isNotLoggedIn: ['Login', 'Register'],
  loggedIn: [' Add new Recipe', 'Logout']
};
