import records from './products.json'
import { validateProducts } from '../utils/validation'
const result = validateProducts(records)
export const catalogueErrors = result.errors
export default result.products
