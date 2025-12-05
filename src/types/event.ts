export interface Venue {
  name: string
  city: string
  street?: string
  zipCode?: number
  address?: string
  lat?: number
  lng?: number
}

export interface Event {
  id: string
  copyright?: string
  title: string
  start: string
  end?: string
  venue: Venue
  doorsOpen?: string
  doorsClose?: string
  sold_out?: boolean
  minPrice?: { value: number; currency: string }
  maxPrice?: { value: number; currency: string }
  image?: { id: string; credit?: string }
  description?: string
  subtitle?: string
  seats?: number

  
}

export interface EventContentProps {
  event: Event | null
  imgSrc?: string
  formattedDate?: string
  formattedTime?: string
  
 
  
}
export interface CartEntry { event: Event | null; qtyMin: number; qtyMax: number }

