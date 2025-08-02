export function generateSampleData(count: number) {
  const devices = ["Desktop", "Mobile", "Tablet"]
  const data = []

  for (let i = 0; i < count; i++) {
    const userId = `user_${String(i + 1).padStart(4, "0")}`
    const deviceType = devices[Math.floor(Math.random() * devices.length)]

    // Simulate realistic funnel progression with weighted probabilities
    const productViewed = Math.random() < 0.75 // 75% view products
    const addedToCart = productViewed && Math.random() < 0.35 // 35% of viewers add to cart
    const orderPlaced = addedToCart && Math.random() < 0.68 // 68% of cart users place order
    const paymentCompleted = orderPlaced && Math.random() < 0.85 // 85% complete payment

    data.push({
      user_id: userId,
      device_type: deviceType,
      product_viewed: productViewed,
      added_to_cart: addedToCart,
      order_placed: orderPlaced,
      payment_completed: paymentCompleted,
      session_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    })
  }

  return data
}
