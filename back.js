let jumlah = 0 ; 
let makanan = []
let intruksi = document.getElementsByClassName("instruction")[0] ; 
let gambar = document.getElementsByClassName("gambar")[0] ; 
let asal = document.getElementsByClassName("asal")[0] ;
let nama = document.getElementsByClassName("menu")[0] ; 
let allMealList = [] ; 
let content = document.getElementById("content");
let iterate = "abcdefghijklmnopqrstuvwxyz"; 

let list =  document.getElementById("list") ; 
console.log(list.getElementsByClassName);
let text = document.getElementsByClassName("bahan")[0] ;




function Mencari(el) {
    list.textContent = "" ;
    let jumlahHuruf = el.value.length
    let sortir = allMealList.filter(e => e.strMeal.slice(0,jumlahHuruf).toLowerCase() == el.value.toLowerCase() );

    if (sortir.length == 0) {
        list.textContent = "The Dish Does not Exist" ;
    }else{
        
        sortir.forEach(e => addBox(e.strMeal,e.strArea,e.strMealThumb))
    }
    console.log(sortir);
    
    
}


function addBox(nama,negara,gambar_makanan) {

    let el = document.createElement("div") ;
    el.className = "isi_list" ; 
    list.appendChild(el) ; 
    let gambar = document.createElement("img") ; 
    gambar.className = "gambar_list" ; 
    gambar.setAttribute('src',gambar_makanan) ; 
    el.appendChild(gambar) ; 
    let menu = document.createElement("div") ; 
    menu.textContent = nama ; 
    menu.className = "menu_makanan"
    
    
    menu.style.marginLeft = "5px";
    let asal = document.createElement("div") ; 
    asal.textContent = negara ; 
    asal.style.fontSize = "12px" ; 
    asal.style.fontWeight = "400"
    el.appendChild(menu) ;
    menu.appendChild(asal) ; 
    
    let recipe =  document.createElement("button");
    recipe.textContent = "See the recipe >>"  ;
    
    recipe.className = "resep" ;
    recipe.style.marginBottom = "5px"  ; 
    recipe.setAttribute("onclick","Show(this)") ; 
    recipe.setAttribute("onmousemove","garis_bawah(this)") ; 
    recipe.setAttribute("onmouseout","garis_hilang(this)") ; 
    el.appendChild(recipe) ; 

} ; 

function garis_hilang(elemen) {
    elemen.style.textDecoration = "none"
}

function garis_bawah(elemen) {
    elemen.style.textDecoration = "underline" ;
};

function ListRecipe(obj) {
    for (let index = 1; index <= 20; index++) {
        let teks = document.createElement("div") ;
        if (obj[`strIngredient${index}`] != "" && obj[`strIngredient${index}`] != null) {
            teks.textContent = obj[`strMeasure${index}`]+" "+obj[`strIngredient${index}`] ;
            text.appendChild(teks)
            
        }
    }
   
}

function Show(elemen) {
    text.textContent =""
    let elemenClicked =  elemen.parentElement.getElementsByClassName("menu_makanan")[0].firstChild.nodeValue ; 
    Utama(elemenClicked) ;
}

function Utama(nama_makanan) {
    let fil = allMealList.filter(e => nama_makanan== e.strMeal)[0] ; 
    nama.textContent = fil.strMeal ; 
    asal.textContent = fil.strArea ; 
    gambar.setAttribute("src",fil.strMealThumb) ;
    intruksi.textContent = fil.strInstructions ; 

    ListRecipe(fil) ; 
   nama.scrollIntoView({behavior:"smooth"})

}
function Show2(elemen) {
    text.textContent =""
    let elemennya = elemen.parentElement.firstChild.textContent
    Utama(elemennya)
 

    
}


//e.strMeal,e.strArea,e.strMealThumb
//#140D04


async function reload() {
    if (localStorage.getItem("nama_makanan")) {
        let nama_nama_makanan = localStorage.getItem("nama_makanan").split(",");
        makanan = nama_nama_makanan;
        jumlah = localStorage.getItem("jumlah")
        
        for (let index = 0; index < localStorage.getItem("jumlah"); index++) {
            
            BuatSimpanMakanan(nama_nama_makanan[index]) ;
            
        }
        
    }
}


async function Menambahkan() {
    let promise = []
    for (let index = 0; index < iterate.length; index++) {
        let api  = `https://www.themealdb.com/api/json/v1/1/search.php?f=${iterate[index]}` ; 
        promise.push(fetch(api).then(a=> a.json()).then(e =>  {if (e.meals != undefined) {
            e.meals.forEach(e=> {
                addBox(e.strMeal,e.strArea,e.strMealThumb); allMealList.push(e)
            })
        }})) ;        
    } ; 
    await Promise.all(promise) ; 
    await reload()
    
}

function Addfavorite() {
    let baru = document.createElement("div") ;
    baru.className = "list_favorite" ; 
    content.appendChild(baru)
} ;

function ShowFavorite() {
    content.style.display = "flex" ;
    
}
function Hide() {
    content.style.display = "none" ;
    
}
function stay() {
    content.style.display ="flex"
}
function out() {
    content.style.display= "none"
}

function saveFavorite() {
    let nama_menu = document.getElementsByClassName("menu")[0].textContent ; 
    if (!makanan.some(e => e == nama_menu)) {
    jumlah++ ; 
    makanan.push(nama_menu) ;
    localStorage.setItem("jumlah",jumlah) ;
    localStorage.setItem(`nama_makanan`,makanan) ;
    console.log(makanan);
    console.log(localStorage.getItem("nama_makanan").split(","));
    BuatSimpanMakanan(nama_menu);
    }
    
}

function BuatSimpanMakanan(nama_menu) {
    
    
    
        let elemen = document.createElement("div") ; 
        elemen.className = "list_favorite";
        content.appendChild(elemen)
        let ambilDataMakanan = allMealList.filter(e=> e.strMeal == nama_menu) ; 
        
        
    
        let judul = document.createElement("div") ; 
        judul.textContent = ambilDataMakanan[0].strMeal ;
        judul.className = "judul"
        
        let recipe =  document.createElement("div");
        recipe.textContent = "See the recipe >>"  ;
        recipe.className = "resep2" ; 
        recipe.setAttribute("onclick","Show2(this)")
        let gambar_makanan =document.createElement("img") ; 
        gambar_makanan.className = "gambar_makanan" ; 
        gambar_makanan.setAttribute("src",ambilDataMakanan[0].strMealThumb) ; 
    
        let dlt = document.createElement("button") ; 
        dlt.className = "delete" ; 
        dlt.textContent ="X"
        dlt.setAttribute("onclick" ,"Delete(this)")
    
    
        elemen.appendChild(gambar_makanan) ;
        elemen.appendChild(judul) ; 
        judul.appendChild(recipe) ;
        elemen.appendChild(dlt)
    
    
    
    
    
}

function Delete(el) {
    jumlah--
    localStorage.setItem("jumlah",jumlah)
    let yangdiapus = el.parentElement.getElementsByClassName("judul")[0].firstChild.textContent
    let updt = localStorage.getItem("nama_makanan").split(",").filter(e => e != yangdiapus) ; 
    console.log(updt);
    console.log(yangdiapus);
    
    makanan = updt
    localStorage.setItem("nama_makanan",updt)
    
    
    el.parentElement.remove() ; 
}
Menambahkan()
console.log(allMealList);



