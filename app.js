const loadProduct = async () => {
    const url = `./product.json`
    const res = await fetch(url);
    const data = await res.json();
    displayProduct(data);

}
const displayProduct = data => {
    console.log(data);
    
}

loadProduct();