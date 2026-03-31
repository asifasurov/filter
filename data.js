const productlist = document.getElementById("productlist")
const categorylist = document.getElementById("categorylist")
const searchinput = document.getElementById("searchinput")
const searhclist = document.getElementById("searhclist")
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
                <h2 class="text-xl font-semibold text-gray-500">Üzr istəyirik, bu kateqoriyada məhsul tapılmadı!</h2>
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
function searhclistData(data) {
    searhclist.innerHTML = data.map(s => `<div onclick="detailData('${s.id}')" class="grid sm:grid-cols-3 cursor-pointer my-3 hover:shadow-2xl items-center border gap-4">
                        <div class="sm:col-span-2 flex sm:items-center max-sm:flex-col gap-6">
                            <div class="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                <img src="${s.image}" class="w-full h-full object-contain">
                            </div>
                            <div>
                                <h4 class="text-[15px] font-semibold text-slate-900">${s.title}</h4>
                                <h6 class="text-xs font-medium text-red-500 cursor-pointer mt-1">Remove</h6>
                                <div class="flex gap-4 mt-4">
                                </div>
                            </div>
                        </div>
                        <div class="sm:ml-auto">
                            <h4 class="text-[15px] font-semibold text-slate-900">${s.price} $</h4>
                        </div>
                  </div>`).join("")
}


function selectCat(name) {
    const rst = (name === 'all') ? data : data.filter(f => f.category === name)
    getDataRender(rst)
}




searchinput.addEventListener('input', (e) =>{
  // console.log(e.target.value);
  searchData(e.target.value)
  e.target.value == "" ? searhclist.style.display = 'none' : searhclist.style.display = 'block' 
  
})

function searchData(searchinput){
  const key = searchinput.toLowerCase()
  const filtr = data.filter(item => item.title.toLowerCase().startsWith(key))
  getDataRender(filtr)
  searhclistData(filtr)
}

function detailData(id) {
    window.location.href = `detail.htm?id=${id}`
    

}




