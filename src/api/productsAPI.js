

export async function downloadProducts(){

    const request = await fetch("https://6a29b31cf59cb8f65f1d812a.mockapi.io/products");

    if(!request.ok) throw new Error("Каталог повреждён! Попробуйте позже.")
    
    const response = await request.json();

    return response;

}