export interface Header {
  name: string
  text: string
}

interface Master {
  id: number | null
  name: string | null
}

export interface Color extends Master {}

export interface Employee extends Master{
  age: number | null
  address: string | null
  salary: number | null
  position: string | null
  status: string | null
}

export interface Product extends Master {
  shortName: string | null
  code: string | null
  expectedPrice: number | null
  description: string | null
  color: number | string | null
}