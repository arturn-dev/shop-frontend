const emptyOrder = {
  username: '',
  email: '',
  telNumber: '',
  products: [],
}

let order = JSON.parse(JSON.stringify(emptyOrder));

export default {
  order,
  emptyOrder
};