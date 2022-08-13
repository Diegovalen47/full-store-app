import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { storeItem, CartItem } from "../models/storeItem";

// Definicion de contratos de tipos
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextProps = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number
  cartItems: CartItem[]
  storeItems: storeItem[]
};

// Creamos el contexto con las diferentes estructuras,
// funciones o variables que queremos usar globalmente
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// Personalizamos el use context para
// que sea expecialmente el contexto
// del carrito de compras
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  // En esta parte nos suscribimos a la API creada localmente
  // para que pueda ser accesible para todos los componentes dentro
  // del shoppinCartContext

  // damos la direccion del localhost
  const url:string = 'http://localhost:4000/product'

  // Variable para guardar el arreglo de items
  const [storeItems, setStoreItems] = useState<storeItem[]>([])

  // funcion asincronica para obtener los datos de la API
  const fetchApi = async () => {

    const response = await fetch(url)
    // Obtenemos la respuesta en formato json
    const responseJSON = await response.json()
    // Guardamos esta respuesta en storeItems
    // haciendo el respectivo casteo de object a storeItem
    setStoreItems(responseJSON as storeItem[])
  }

  // Utilizamos el useEfect para cargar los datos
  // solo una vez al cargar la pagina
  useEffect(() => {
    fetchApi()
  }, [])

  // Variable para saber si la tab del carrito esta abierta
  const [isOpen, setIsOpen] = useState(false);
  // Este hook es para guardar la sesion en local storage
  // y no perder el progreso
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  // con reduce() obtenemos la cantidad de items en el carrito
  // Esto lo hace partiendo de un arreglo
  // que reducimos a un solo valor
  // Inicializando el acumulado en 0 (2do parametro)
  // Funcion a aplicar, en este caso
  // ir sumando todas las cantidades de items (1er parametro)
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  
  // Funciones para cambiar el estado abierto/cerrado
  // de la ventana del carrito
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    // con el find obtenemos el elemeto con el id
    // correspondiente, luego obtenemos el quantity
    // y en caso de que no se encuentre un item con
    // ese id (== null) se pone por defecto en 0
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    // Este caso es muy interesante sobre como funcione el
    // useState(), porque no necesariamente se setea
    // directamente el valor, tambien puede recibir una
    // funcion anonima en caso de que se quiera dar varias
    // posibilidades de los que se quiere cambiar con el setState
    setCartItems((currItems) => {
      // Si se da el caso que el item al que se le quiere aumentar la
      // cantidad no existe en el carrito (== null)
      if (currItems.find((item) => item.id === id) == null) {
        // entonces eso significa que ese item no está en el carrito
        // por ello retornamos el arreglo con los items actuales (...currItems)
        // pero le agregamos un item nuevo con ese id y una cantidad en 1
        return [...currItems, { id, quantity: 1 }];
      } else {
        // En caso de que el item si se encuentre ya en el carrito

        // Devolvemos los elementos actuales pero
        return currItems.map((item) => {
          // iteramos sobre ellos (sin modificar el original ya que usamos map)

          // y si se encuntra el item con su mismo id
          if (item.id === id) {
            // retornamos ese mismo elemento ({...items})
            // pero al atributo quantity le sumamos + 1
            return { ...item, quantity: item.quantity + 1 };
          } else {
            // En otro caso solo retornamos el mismo item
            return item;
          }
        });
      }
    }); // Fin setCartItems()
  }

  // Esta funcion sigue la misma filosofia que
  // la anterior para incrementar
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      // con ayuda de filter obrtenemos un nuevo arreglo
      // con todos los elemtos que cumplen la condicion
      // de no tener el id que se pasa por argumento
      // Por ello: se obtiene un nuevo array sin elemento
      // en cuestion, por ello es "eliminado"
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      // Ahora simplemente todas las estructuras, funcioens
      // o variables definidas anteriormente se pasan por value en
      // el provider para que puedan ser utilizadas por los demas
      // componenetes hijos de este provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        storeItems
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
