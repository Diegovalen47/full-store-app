// Esto viene del modelo de base de 
// Datos definido en el backend con ms sql
export type storeItem = {
  id: number
  name: string
  price: number
}

// Esto se da para los items que 
// van al carrito y la cantidad
export type CartItem = {
  id: number;
  quantity: number;
};