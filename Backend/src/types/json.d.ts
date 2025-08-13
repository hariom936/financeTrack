type Anything =
  undefined
  | null
  | boolean
  | number
  | string
  | Date
  | object
  | Anything[]
  | JsonObject;
export interface Json {
  [key: string]: Anything;
}
