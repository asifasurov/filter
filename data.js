const productlist = document.getElementById("productlist")
const categorylist = document.getElementById("categorylist")
const searchinput = document.getElementById("searchinput")
let data = []

// function getProduct(){
//     fetch('https://69baf21fb3dcf7e0b4be8434.mockapi.io/Product')
//     .then(res => res.json())
//     .then(data => {
//         data.map(data => productlist.innerHTML += ``)
// })
// }
// getProduct()


function getCategory() {
    fetch('https://69baf21fb3dcf7e0b4be8434.mockapi.io/category')
        .then(res => res.json())
        .then(inf => {
            inf.map(inf => categorylist.innerHTML += `<li onclick="selectCat('${inf.name}')" class="bg-[#432dd7] rounded-xl p-3 text-white cursor-pointer">${inf.name}</li>`)
        })
}
fetch('https://69baf21fb3dcf7e0b4be8434.mockapi.io/Product')
    .then(res => res.json())
    .then(getData => {
        data = getData
        getDataRender(data)
        console.log(data);
        
       
})
getCategory()



function getDataRender(data) {
    
    if (data.length === 0) {
        productlist.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h2 class="text-xl font-semibold text-gray-500">Üzr istəyirik, bu kateqoriyada məhsul tapılmadı! 😕</h2>
            </div>`;
        return; 
    }

    
    productlist.innerHTML = data.map(d => `
        <div class="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
            <div class="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                <img src="${d.image}" class="w-full h-full object-contain" />
            </div>
            <div class="flex gap-2 mt-4">
                <h5 class="text-base font-semibold text-slate-900">${d.title}</h5>
                <h6 class="text-base text-slate-900 font-bold ml-auto">${d.price}$</h6>
            </div>
            <p class="text-slate-600 text-[13px] mt-2">${d.category}</p>
            </div>
    `).join("");
}


function selectCat(name) {
    const rst = (name === 'all') ? data : data.filter(f => f.category === name)
    getDataRender(rst)
}




searchinput.addEventListener('input', (e) =>{
  // console.log(e.target.value);
  searchData(e.target.value)
  
})

function searchData(searchinput){
  const key = searchinput.toLowerCase()
  const filtr = data.filter(item => item.title.toLowerCase().includes(key))
  getDataRender(filtr)
}




