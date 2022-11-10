const postData = async (event) => {
  event.preventDefault()

  const productID = new URLSearchParams(window.location.search).get('product')

  const method = productID ? 'PUT' : 'POST'
  const endpoint = productID
    ? 'https://striveschool-api.herokuapp.com/api/product/' + productID
    : 'https://striveschool-api.herokuapp.com/api/product/'

  // Get the values from the form after it has been submitted
  const name = document.querySelector('#name').value
  const description = document.querySelector('#description').value
  const price = document.querySelector('#price').value
  const platform = document.querySelector('#platform').value

  // Create the product object using the values assigned from above
  const product = {
    name: name, //REQUIRED
    description: description, //REQUIRED
    brand: platform, //REQUIRED
    imageUrl:
      'https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80', //REQUIRED
    price: price, //REQUIRED
  }

  const response = await fetch(endpoint, {
    method: method,
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
    },
  })
  window.location.assign('index.html')
}

const getData = async () => {
  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/product/',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
      },
    },
  )

  const products = await response.json()

  console.log(products)

  products.forEach((element) => {
    createCard(element)
  })
}

const createCard = function (element) {
  const container = document.querySelector('.row')

  const newCol = document.createElement('div')
  const newCard = document.createElement('div')
  const newImage = document.createElement('img')
  const newCardbody = document.createElement('div')
  const titleLink = document.createElement('a')
  const newTitle = document.createElement('h5')
  const price = document.createElement('a')
  const hideBook = document.createElement('a')

  hideBook.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-1')
  hideBook.setAttribute('href', 'manage.html?product=' + element._id)
  hideBook.innerHTML = 'Edit'
  hideBook.setAttribute('onclick', 'removeBook(event)')
  price.classList.add('btn', 'btn-primary', 'btn-sm')
  price.innerHTML = 'Buy: $' + element.price
  price.setAttribute('onclick', 'addToCart(event)')
  price.setAttribute('id', element.title)

  newTitle.classList.add('card-title')
  titleLink.setAttribute('href', 'game.html?product=' + element._id)
  newCardbody.classList.add('card-body')
  newCardbody.classList.add('text-center')
  newTitle.innerText = element.name
  newTitle.setAttribute('href', element._id)
  newImage.setAttribute('src', element.imageUrl)
  newImage.setAttribute('alt', element.name)
  newImage.classList.add('card-img-top')
  newCard.classList.add('card', 'mt-5')
  newCol.classList.add('col-3')

  titleLink.appendChild(newTitle)
  newCard.appendChild(newImage)
  newCardbody.appendChild(titleLink)
  newCardbody.appendChild(price)
  newCardbody.appendChild(hideBook)
  newCard.appendChild(newCardbody)
  newCol.appendChild(newCard)
  container.appendChild(newCol)
}

const showDetails = async function () {
  const productid = new URLSearchParams(window.location.search).get('product')
  console.log(productid)

  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/product/' + productid,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
      },
    },
  )

  const products = await response.json()

  const image = document.querySelector('#image')
  const name = document.querySelector('.card-title')
  const description = document.querySelector('#description')

  image.setAttribute('src', products.imageUrl)
  name.innerHTML = products.name
  description.innerHTML = products.description
}

const isUpdate = function () {
  const productID = new URLSearchParams(window.location.search).get('product')
  if (productID) {
    const button = document.querySelector('#delete-button')
    button.classList.remove('d-none')
  }
}
