import { useCallback, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/catalogue'
import { ProductCard } from '../components/ProductCard'
import { ProductDialog } from '../components/ProductDialog'
import { filterProducts, getCategories } from '../utils/catalogue'

export function ProductsPage() {
  const categories = useMemo(() => getCategories(products), [])
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All Products'
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const matches = useMemo(() => filterProducts(products, query, category), [query, category])
  const hasFilters = Boolean(query.trim()) || category !== 'All Products'
  const setCategory = (value) => setSearchParams(value === 'All Products' ? {} : { category: value })
  const reset = () => { setQuery(''); setSearchParams({}) }
  const closeDialog = useCallback(() => setSelectedProduct(null), [])

  return (
    <>
      <section className="catalogue-hero"><div className="container"><span className="eyebrow eyebrow-light">Product catalogue</span><h1>Explore our product range.</h1><p>Find solar, electrical and security products. Search by name or choose a category below.</p></div></section>
      <section className="catalogue-section" aria-label="Product catalogue results">
        <div className="container">
          <h2 className="sr-only">Catalogue results</h2>
          <div className="catalogue-toolbar">
            <div className="search-field"><label htmlFor="product-search">Search products</label><div><Search aria-hidden="true" /><input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, category or keyword" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}</div></div>
            <div className="filter-heading"><SlidersHorizontal /><span>Filter by category</span></div>
            <div className="category-filters" aria-label="Product categories">{['All Products', ...categories].map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
          </div>
          <div className="results-row" aria-live="polite"><p><strong>{matches.length}</strong> {matches.length === 1 ? 'product' : 'products'} found</p>{hasFilters && <button className="clear-filters" type="button" onClick={reset}>Clear filters <X /></button>}</div>
          {matches.length > 0 ? <div className="product-grid">{matches.map((product, index) => <ProductCard key={product.id} product={product} onView={setSelectedProduct} eager={index < 4} />)}</div> : <div className="empty-state"><Search /><h2 id="catalogue-heading">No products match your search</h2><p>Try another name or clear the filters to see the complete catalogue.</p><button className="button button-primary" type="button" onClick={reset}>Clear all filters</button></div>}
        </div>
      </section>
      <ProductDialog product={selectedProduct} onClose={closeDialog} />
    </>
  )
}
