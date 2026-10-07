const loginScreen=document.getElementById("loginScreen"),siteContent=document.getElementById("siteContent");
function unlock(){loginScreen.style.display="none";siteContent.style.display="block"}
if(localStorage.getItem("marufLoggedIn")==="1")unlock();
document.getElementById("showRegister").onclick=()=>{document.getElementById("registerBox").hidden=!document.getElementById("registerBox").hidden};
document.getElementById("registerBtn").onclick=()=>{
 const name=document.getElementById("regName").value.trim(),user=document.getElementById("regUser").value.trim(),pass=document.getElementById("regPass").value;
 if(!name||!user||!pass)return alert("সব তথ্য পূরণ করুন।");
 localStorage.setItem("marufAccount",JSON.stringify({name,user,pass}));
 alert("Account তৈরি হয়েছে। এখন Login করুন।");
};
document.getElementById("loginForm").onsubmit=e=>{
 e.preventDefault();
 const user=document.getElementById("loginUser").value.trim(),pass=document.getElementById("loginPass").value;
 const a=JSON.parse(localStorage.getItem("marufAccount")||"null");
 if(!(a?a.user===user&&a.pass===pass:user==="admin"&&pass==="123456"))return alert("Login তথ্য সঠিক নয়।");
 localStorage.setItem("marufLoggedIn","1");unlock();
};
document.getElementById("logout").onclick=()=>{localStorage.removeItem("marufLoggedIn");location.reload()};

const data={
 ff:[["Weekly Lite","40"],["1X Weekly","155"],["2X Weekly","310"],["Monthly","770"],["25 Diamond","20"],["50 Diamond","35"],["115 Diamond","78"],["240 Diamond","156"],["355 Diamond","237"],["480 Diamond","315"],["610 Diamond","395"],["850 Diamond","558"],["1240 Diamond","795"],["2530 Diamond","1590"],["5060 Diamond","3180"],["10120 Diamond","6360"]],
 like:[["200 Likes","20"],["400 Likes","35"],["600 Likes","55"],["1400 Likes","125"],["3000 Likes","250"],["6000 Likes","475"],["12000 Likes","900"]],
 unipin:[["25 Diamond UniPin Voucher","20"],["50 Diamond UniPin Voucher","35"],["115 Diamond UniPin Voucher","78"],["240 Diamond UniPin Voucher","156"],["610 Diamond UniPin Voucher","395"],["1240 Diamond UniPin Voucher","795"],["2530 Diamond UniPin Voucher","1590"],["Weekly UniPin Voucher","155"],["Monthly UniPin Voucher","770"]],
 evo:[["Evo Access 3D","70"],["Evo Access 7D","118"],["Evo Access 30D","350"]],
 level:[["Level Up Package - Level 6","40"],["Level Up Package - Level 10","70"],["Level Up Package - Level 15","70"],["Level Up Package - Level 20","70"],["Level Up Package - Level 25","70"],["Level Up Package - Level 30","100"]],
 pubg:[["60 UC","125"],["120 UC","240"],["180 UC","345"],["240 UC","460"],["325 UC","600"],["660 UC","1195"],["985 UC","1800"],["1800 UC","2900"],["3850 UC","5850"],["8100 UC","11200"]]
};
const titles={ff:"Free Fire (ID CODE)",like:"Free Fire - 200 Like প্রতিদিন",unipin:"FF UNIPIN VOUCHER",evo:"Evo Access (ID CODE)",level:"New Level Up Pass",pubg:"PUBG MOBILE UC"};
let current="ff";
function render(key){
 current=key;document.getElementById("productTitle").textContent=titles[key];
 document.getElementById("packages").innerHTML=data[key].map((x,i)=>`<button class="package ${i===0?"active":""}" data-name="${x[0]}" data-price="${x[1]}"><b>${x[0]}</b><span>৳ ${x[1]}</span></button>`).join("");
 document.querySelectorAll(".package").forEach(p=>p.onclick=()=>{document.querySelectorAll(".package").forEach(x=>x.classList.remove("active"));p.classList.add("active")});
 document.getElementById("shop").scrollIntoView({behavior:"smooth"});
}
document.querySelectorAll(".game-card").forEach(x=>x.onclick=()=>render(x.dataset.target));
render("ff");
document.querySelectorAll(".payment").forEach(x=>x.onclick=()=>{document.querySelectorAll(".payment").forEach(y=>y.classList.remove("active"));x.classList.add("active")});
document.getElementById("buyBtn").onclick=()=>{
 const id=document.getElementById("playerId").value.trim(),trx=document.getElementById("trx").value.trim(),p=document.querySelector(".package.active");
 if(!id)return alert("আগে Player ID লিখুন।");
 if(!trx)return alert("Payment করার পর Transaction ID লিখুন।");
 const payment=document.querySelector(".payment.active")?.innerText.replace(/\n/g," - ") || "Payment Now";
 const message=`Emon Top Up - NEW ORDER\n\nProduct: ${titles[current]}\nPackage: ${p.dataset.name}\nPrice: ৳ ${p.dataset.price}\nPlayer ID: ${id}\nTransaction ID: ${trx}\nPayment: ${payment}\n\nPlease verify this payment and process the order.`;
 const whatsappNumber="8801960261023";
 const waUrl=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
 window.open(waUrl,"_blank");
};
