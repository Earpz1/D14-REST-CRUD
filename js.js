const getData = async () => {
  const product = {
    name: 'Call of Duty', //REQUIRED
    description: 'Call of Duty is the best gaming ever created...apparently.', //REQUIRED
    brand: 'PlayStation', //REQUIRED
    imageUrl:
      'https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80', //REQUIRED
    price: 60, //REQUIRED
  }

  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/product/',
    {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
      },
    },
  )

  const products = await response.json()

  console.log(products)
}
