export function getCategories(products) {
  return [...new Set(products.map((product) => product.category))]
}

export function filterProducts(products, query = '', category = 'All Products') {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  return products.filter((product) => {
    const matchesCategory = category === 'All Products' || product.category === category
    const searchable = [product.name, product.category, product.brand, ...(product.keywords || [])]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase()
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
  })
}
