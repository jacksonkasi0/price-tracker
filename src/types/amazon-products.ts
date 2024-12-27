export interface AmazonProduct {
  title: string
  seller_name: string
  brand: string
  description: string
  initial_price: number
  currency: string
  availability: string
  reviews_count: number
  categories: string[]
  parent_asin: string
  asin: string
  buybox_seller: string
  number_of_sellers: number
  root_bs_rank: number
  answered_questions: number
  domain: string
  images_count: number
  url: string
  video_count: number
  image_url: string
  item_weight: string
  rating: number
  product_dimensions: string
  seller_id: string
  date_first_available: any
  discount: string
  model_number: string
  manufacturer: string
  department: string
  plus_content: boolean
  upc: string
  video: boolean
  top_review: string
  final_price_high: any
  final_price: number
  variations: Variation[]
  delivery: string[]
  features: string[]
  format: any
  buybox_prices: BuyboxPrices
  ingredients: string
  origin_url: any
  bought_past_month: number
  is_available: boolean
  root_bs_category: string
  bs_category: string
  bs_rank: number
  badge: string
  images: string[]
  country_of_origin: string
  product_details: ProductDetail[]
  prices_breakdown: PricesBreakdown
  unit_price: UnitPrice
  other_sellers_prices: OtherSellersPrice[]
  measurement: Measurement
  product_rating_object: ProductRatingObject
  sustainability_features: any
  climate_pledge_friendly: boolean
  coupon: Coupon
  categories_with_urls: CategoriesWithUrl[]
}

export interface Variation {
  asin: string
  currency?: string
  name: string
  price: any
  unit: any
  unit_price: any
}

export interface BuyboxPrices {
  discount: string
  final_price: number
  initial_price: number
  sns_price: SnsPrice
}

export interface SnsPrice {
  base_price: number
}

export interface ProductDetail {
  type: string
  value: string
}

export interface PricesBreakdown {
  deal_type: any
  list_price: any
  typical_price: number
}

export interface UnitPrice {
  price: number
  unit: string
}

export interface OtherSellersPrice {
  delivery?: string
  price: any
  price_per_unit: number
  seller_name: string
  seller_rating: number
  seller_url?: string
  ships_from: string
  unit: string
}

export interface Measurement {
  unit_num: any
  unit_type: any
}

export interface ProductRatingObject {
  five_star: number
  four_star: number
  one_star: number
  three_star: number
  two_star: number
}

export interface Coupon {
  discount_unit: any
  discount_value: any
}

export interface CategoriesWithUrl {
  category_name: string
  url: string
}
