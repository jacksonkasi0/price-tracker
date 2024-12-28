export type AmazonProduct  = {
  url:                     string;
  title:                   string;
  seller_name:             string;
  brand:                   string;
  description:             string;
  initial_price:           number;
  currency:                string;
  availability:            string;
  reviews_count:           number;
  categories:              string[];
  parent_asin:             string;
  asin:                    string;
  buybox_seller:           string;
  number_of_sellers:       number;
  root_bs_rank:            number;
  answered_questions:      number;
  domain:                  string;
  images_count:            number;
  video_count:             number;
  image_url:               string;
  item_weight:             string;
  rating:                  number;
  product_dimensions:      string;
  seller_id:               string;
  date_first_available:    null;
  discount:                string;
  model_number:            string;
  manufacturer:            string;
  department:              string;
  plus_content:            boolean;
  upc:                     string;
  video:                   boolean;
  top_review:              string;
  final_price_high:        null;
  final_price:             number;
  variations:              Variation[];
  delivery:                string[];
  features:                string[];
  format:                  null;
  buybox_prices:           BuyboxPrices;
  ingredients:             string;
  origin_url:              null;
  bought_past_month:       number;
  is_available:            boolean;
  root_bs_category:        string;
  bs_category:             string;
  bs_rank:                 number;
  badge:                   string;
  images:                  string[];
  country_of_origin:       string;
  product_details:         ProductDetail[];
  prices_breakdown:        PricesBreakdown;
  unit_price:              UnitPrice;
  other_sellers_prices:    OtherSellersPrice[];
  measurement:             Measurement;
  product_rating_object:   ProductRatingObject;
  sustainability_features: null;
  climate_pledge_friendly: boolean;
  coupon:                  Coupon;
  categories_with_urls:    CategoriesWithURL[];
}

export type BuyboxPrices = {
  discount:      string;
  final_price:   number;
  initial_price: number;
  sns_price:     SnsPrice;
}

export type SnsPrice = {
  base_price: number;
}

export type CategoriesWithURL = {
  category_name: string;
  url:           string;
}

export type Coupon = {
  discount_unit:  null;
  discount_value: null;
}

export type Measurement = {
  unit_num:  null;
  unit_type: null;
}

export type OtherSellersPrice = {
  delivery:       null | string;
  price:          null;
  price_per_unit: number;
  seller_name:    string;
  seller_rating:  number;
  seller_url:     null | string;
  ships_from:     string;
  unit:           string;
}

export type PricesBreakdown = {
  deal_type:     null;
  list_price:    null;
  typical_price: number;
}

export type ProductDetail = {
  type:  string;
  value: string;
}

export type ProductRatingObject = {
  five_star:  number;
  four_star:  number;
  one_star:   number;
  three_star: number;
  two_star:   number;
}

export type UnitPrice = {
  price: number;
  unit:  string;
}

export type Variation = {
  asin:       string;
  currency:   null | string;
  name:       string;
  price:      null;
  unit:       null;
  unit_price: null;
}
