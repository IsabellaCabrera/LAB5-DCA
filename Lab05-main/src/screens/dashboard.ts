import styles from './styles.css'
import { addObserver, appState } from "../store/store";

// IMPORTAMOS NUESTRO COMPONENTE DE NUESTRO PRODUCTO
import Product, { Attribute } from '../components/product/product';

// IMPORTAMOS NUESTRO COMPONENTE DE EL CARRITO DE COMPRAS
import ShoppingCartItem , { AttributeShoppingCart } from "../components/shoppingCartItem/shoppingCartItem";

//Importamos nuestra API desde services
import { getProducts } from "../services/getProducts";

class Dashboard extends HTMLElement {
	// defino mi arreglo para meterle los productos
    products: Product[] = [];

	// defino mi arreglo para meterle los productos(DELCARRITO)s
    shoppingCart: ShoppingCartItem[] = [];
	// este se usará para relalizar la peticipn a la API
	dataProducts: any[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		// Agregamos el observadoe akii eso significa que al arreglo de
		// observadores que esta en store.ts se le agrega esta clase paara que pueda escuchar cambios
		addObserver(this) 
		
	}

	async connectedCallback() { 
		// Aqui se hace la peticion a la API y deevuevbe la promesa y se alpacenan en this.dataProducts
		this.dataProducts = await getProducts();

		// Se llama a la funcion que crea las cards de los productos para que se muestre en el DOMM
		this.createCardsProduct();

		// Se llama a la funcion que crea las cards de del carrito de compras para que se muestre en el DOMMM
		this.createCardsShoppingItem();
		this.render();
	}

	createCardsProduct ()  {
		this.dataProducts.forEach((productData: any) => {
			const product = this.ownerDocument.createElement('product-card') as Product;
			product.setAttribute(Attribute.image, productData.image);
			product.setAttribute(Attribute.titleproduct, productData.title);
			product.setAttribute(Attribute.description, productData.description);
			product.setAttribute(Attribute.category, productData.category);
			product.setAttribute(Attribute.price, productData.price);
			product.setAttribute(Attribute.rating, productData.rating.rate); 
			// pusheo toda esta info a mi arreglo de productos que defini al principio
			this.products.push(product);
		 
			});
		}

		createCardsShoppingItem ()  {
            appState.shoppingList.forEach((element: any) => {
                const product = this.ownerDocument.createElement('shopping-card') as ShoppingCartItem; 
                product.setAttribute(AttributeShoppingCart.image, element.image);
                product.setAttribute(AttributeShoppingCart.titleproduct, element.title);
                product.setAttribute(AttributeShoppingCart.price, element.price);
                	// pusheo toda esta info a mi arreglo de productos que defini al principio
                this.shoppingCart.push(product);
        
            });
        }

	render() {
		if (this.shadowRoot){
			this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="../src/index.css">
    <h1>Store Products</h1>
    <hr>
    <div class="dashboard-container">
        <div class="container-products"></div>
        <div class="container-shopping">
		<h1>Cart Products</h1> </div>
    </div>
`;

	
	
		   const container = this.shadowRoot?.querySelector('.container-products');

		//    hAGO Iteracion sobre mi arreglo de productos(products) que previammente defini vacio
		// y despues le setie atributos a ellos
		   this.products.forEach((product) => {
			// le hago appendchild de toda la iteracion a container es decir a mi clase de (.container-products)
			   container?.appendChild(product);
		   });
	
		   const containerShoppingCartItem = this.shadowRoot?.querySelector('.container-shopping');

		   //    hAGO Iteracion sobre mi arreglo de productos pal CARRITO(shoppingCart) que previammente defini vacio
		// y despues le setie atributos a ellos
		   this.shoppingCart.forEach((productShopping) => {
			// le hago appendchild de toda la iteracion a container(containerShoppingCartItem) 
			// es decir a mi clase de (.container-shopping)
			containerShoppingCartItem?.appendChild(productShopping);
		   });

		}
		const cssProduct = this.ownerDocument.createElement("style");
            cssProduct.innerHTML = styles;
            this.shadowRoot?.appendChild(cssProduct);
	
	}
}

customElements.define('app-dashboard', Dashboard);