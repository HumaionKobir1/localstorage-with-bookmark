const loadProduct = async () => {
    const url = `./product.json`
    const res = await fetch(url);
    const data = await res.json();
    displayProduct(data);

}
const displayProduct = data => {
    // console.log(data);
    const cards = document.getElementById('cards');
    data.forEach((product) => {
        // console.log(product);
        const card = document.createElement("div");
        card.classList.add("card", "m-2");

        const isBookMarked = checkBookmark(product.id);

        card.innerHTML = `
        <div class="bookmark-icon">

            <i onclick="${isBookMarked ? `handleRemoveBookmark('${product.id}')` : `handleBookmark('${product.name}', '${product.id}', '${product.price}')`}" class="${isBookMarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}"></i>


            


        </div>

        <div class="product-img-container">
          <img
            class="product-img"
            src=${product.image}
            alt=""
          />
        </div>
        <h3>${product.name}</h3>
        <p>The Widget 3000 is the latest and greatest in widget</p>
        <div class="priceAndButtons">
          <h2 class="text-primary">$${product.price}</h2>
          <button class="btn btn-primary">Buy Now</button>
        </div>
          `;
            cards.appendChild(card);
    })
};

// handle book mark
const handleBookmark = (name, id, price) => {
    const previousBookmark = JSON.parse(localStorage.getItem('bookmark'));
    let bookmark = [];
    const product = {name, id, price, bookmark: true};

    if(previousBookmark){
        const isThisProductMarked = previousBookmark.find((pd) => pd.id == id);
        
        if(isThisProductMarked){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "already bookmarked",
                footer: '<a herf=""> Why do I have this issue?</a>',
            });
        }
        else{
            bookmark.push(...previousBookmark, product);
            localStorage.setItem("bookmark", JSON.stringify(bookmark));
            // console.log(bookmark);

        }
    }

    else{
        bookmark.push(product);
        localStorage.setItem("bookmark", JSON.stringify(bookmark));
        
    }
    // console.log(previousBookmark);
};


const handleRemoveBookmark = id => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    // console.log(previousBookmark);
    const restOfThem = previousBookmark.filter((product) => product.id != id);
    console.log(restOfThem);
    localStorage.setItem("bookmark", JSON.stringify(restOfThem));
}


const checkBookmark = id => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    const isBookMarked = previousBookmark?.find(product => product.id == id);

    if(isBookMarked){
        return true;
    }
    else{
        return false;
    }
}

loadProduct();