class Product {
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <br>
                    <strong>Product Price</strong>: ${product.price}
                    <br>
                    <strong>Product Year</strong>: ${product.year}
                    <br>
                    <a href="#" class="btn btn-danger btn-block" name="delete">Delete</a>
                </div>
            </div>
        
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            // elimina Tarjeta, hijo de div card-body, div card text-center, div
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente', 'info');
        }
    }

    showMessage(message, classMessage){
        const element = document.createElement('div');
        element.className = `alert alert-${classMessage} mt-4`;
        element.appendChild(document.createTextNode(message));

        //mostrar en pantalla

        const container = document.querySelector('.container');
        const app = document.querySelector('#app');

        container.insertBefore(element,app);

        //definir tiempo

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000)
    }
}

//DOM EVENT

document.getElementById('product-form')
    .addEventListener("submit", function(e){
        
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
    
        const product = new Product(name,price,year);
        
        const ui = new UI();

        if (name === '' || price === '' || year === ''){
            ui.showMessage('Los datos no estan completos' , 'danger');
        }else{    
            ui.addProduct(product);
            ui.showMessage('Producto agregado satifactoriamente', 'success');
        }
        
        e.preventDefault();
});

document.getElementById('product-list')
        .addEventListener('click', function(e){
            const ui = new UI();
            ui.deleteProduct(e.target);
        });