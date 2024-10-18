import styles from './product.css'
import { addObserver, dispatch } from "../../store/store";
import { addProductsList } from "../../store/actions";

export enum Attribute {
    "image" = "image",
    "titleproduct" = "titleproduct",
    "description" = "description",
    "category" = "category",
    "price" = "price",
    "rating" = "rating",
}

class Product extends HTMLElement {
    image?: string;
    titleproduct?: string;
    description?: string;
    category?: string;
    price?: number;
    rating?: number;

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.price:
                this.price = newValue ? Number(newValue) : undefined;
                break;
            case Attribute.rating:
                this.rating = newValue ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/product/product.css">
                <div class="product">
                    <div class="image">
                        <img src="${this.image || 'No Image'}">
                    </div>
                    <div class="information">
                        <h3>${this.titleproduct || 'No Title'}</h3>
                        <p>Category: ${this.category || 'No Category'}</p>
                        <p>Description: ${this.description || 'No Description'}</p>
                        <p>Price: ${this.price || 'No Price'}</p>
                        <p>Rating: ${this.rating || 'No Rating'}</p>
                    </div>
                    <button id="add-to-cart">Añadir al carrito</button>
                </div>
            `;

            // Agregar funcionalidad al botón
            const btn = this.shadowRoot.querySelector('#add-to-cart');
            btn?.addEventListener('click', () => {
                dispatch(addProductsList({
                    title: this.titleproduct,
                    price: this.price,
                    description: this.description,
                    category: this.category,
                    image: this.image,
                    rating: this.rating
                }));
            });

            const cssProduct = this.ownerDocument.createElement("style");
            cssProduct.innerHTML = styles;
            this.shadowRoot?.appendChild(cssProduct);
        }
    }
}

customElements.define("product-card", Product);
export default Product;
