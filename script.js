"use strict";

/* LERO LERO — CARTA DIGITAL DEMOSTRATIVA
 * Nombres y precios tomados de las páginas públicas de cada categoría.
 * Si el negocio cambia su carta, actualiza estos datos manualmente.
 * Incluye carrito y generación de pedido por WhatsApp. Sin cobro en línea.
 */
const CATEGORIES = [
  {id:"todos",label:"Todo el menú",icon:"✳",heading:"Para todos los gustos.",subtitle:"LA CARTA COMPLETA"},
  {id:"pizzas",label:"Pizzas",icon:"🍕",heading:"De estas no dejas orillas.",subtitle:"RECIÉN HORNEADAS"},
  {id:"pastas",label:"Pastas",icon:"🍝",heading:"Un abrazo en cada bocado.",subtitle:"PASTAS DE LA CASA"},
  {id:"entradas",label:"Entradas",icon:"🥖",heading:"Para abrir el apetito.",subtitle:"AL CENTRO DE LA MESA"},
  {id:"ensaladas",label:"Ensaladas",icon:"🥗",heading:"Frescas y con personalidad.",subtitle:"ALGO MÁS LIGERO"},
  {id:"hamburguesas",label:"Hamburguesas",icon:"🍔",heading:"Para chuparse los dedos.",subtitle:"PAN ARTESANAL"},
  {id:"alitas",label:"Alitas y boneless",icon:"🍗",heading:"Elige tu salsa favorita.",subtitle:"PARA COMPARTIR"},
  {id:"crepas",label:"Crepas",icon:"🥞",heading:"Dulces o saladas, tú eliges.",subtitle:"EL ANTOJO PERFECTO"},
  {id:"postres",label:"Postres",icon:"🍰",heading:"Siempre queda un huequito.",subtitle:"EL GRAN FINAL"},
  {id:"bebidas",label:"Bebidas y café",icon:"☕",heading:"¿Con qué brindamos hoy?",subtitle:"CAFÉ Y BEBIDAS"},
  {id:"carta",label:"A la carta",icon:"🍽️",heading:"Algo especial para ti.",subtitle:"PLATOS FUERTES"}
];

// Cada entrada: [nombre, precio MXN, descripción].
const DATA = {
  pizzas: [
    ["Queso",250,"Salsa de tomate y queso mozzarella."],
    ["Margarita",280,"Salsa de tomate, queso mozzarella, mozzarella fresco y albahaca italiana."],
    ["Pepperoni",270,"Salsa de tomate, queso mozzarella y pepperoni."],
    ["Bella",310,"Salsa de tomate, mozzarella, jamón, champiñones, portobello y aceite de trufa."],
    ["Hawaiana",280,"Salsa de tomate, mozzarella, jamón, piña natural y tocino."],
    ["Vivaldi",320,"Salsa de tomate, mozzarella, aceitunas negras, jamón, champiñones, portobello y aceite de trufa."],
    ["Lero Lero",320,"Salsa de tomate, provolone ahumado, arúgula, prosciutto, jitomate deshidratado, higos y balsámico."],
    ["Pera metantito",310,"Mozzarella, crema, roquefort, pera al vino tinto, nuez tostada y reducción de balsámico."],
    ["Burrata",320,"Salsa de tomate, burrata, prosciutto, jitomate deshidratado, higo, arúgula y balsámico."],
    ["Nórdica",330,"Mozzarella, crema, camarón salteado al ajo en mantequilla y espárragos."],
    ["4 quesos",310,"Salsa de tomate, mozzarella, brie, roquefort y queso de cabra."],
    ["Toscana",320,"Salsa de tomate, mozzarella, prosciutto, arúgula, parmesano, aceitunas negras y jitomate cherry."],
    ["Pomodoro",280,"Salsa de tomate, mozzarella, jitomate, queso de cabra cenizo y aceite de olivo."],
    ["Santa Sabina",300,"Salsa de tomate, mozzarella, portobello, champiñones y aceite de trufa."],
    ["Caprese",310,"Salsa de tomate, mozzarella fresco, albahaca, jitomate, aceitunas negras, arúgula y aceite de olivo."],
    ["Ché",310,"Salsa de tomate, mozzarella, provolone ahumado, chorizo argentino, aceitunas negras y pimiento verde."],
    ["Canibal",310,"Salsa de tomate, mozzarella, carne molida, jamón, tocino y pepperoni."],
    ["Magnolia",310,"Salsa de tomate, mozzarella, jamón, piña, tocino, carne molida, cebolla y pimiento verde."],
    ["Romina",300,"Salsa de tomate, mozzarella, pimiento verde, champiñón, pepperoni y cebolla."],
    ["Marinera",330,"Mozzarella, queso de cabra, crema, camarones al ajo, cebolla morada y salsa de chipotle."],
    ["Xolito",320,"Mozzarella, queso de cabra, salsa de huitlacoche, flor de calabaza, portobello y champiñón."],
    ["Serenata",310,"Salsa de tomate, mozzarella, jamón, pepperoni, cebolla, pimiento verde y provolone ahumado."],
    ["Nutella",275,"Pizza dulce rellena de Nutella con fruta, azúcar glass y mermelada de frutos rojos."],
    ["Combo para los chamacos",150,"Pizza infantil (hawaiana, pepperoni o queso) y bebida seleccionada."]
  ],
  pastas: [
    ["Fussili Lero Lero",225,"Fussili a la mantequilla con ajo, espárrago, prosciutto, tomate cherry y parmesano."],
    ["Fussili nórdico",230,"Fussili en crema y parmesano, con peperoncino, camarón y espárrago."],
    ["Fussili a la boscaiola",220,"Crema con vino blanco, champiñón, portobello, tocino y parmesano."],
    ["Fussili 4 quesos",220,"Salsa de roquefort, brie, parmesano y provolone ahumado."],
    ["Espagueti Alfredo",205,"Espagueti en salsa de crema con queso parmesano."],
    ["Espagueti pomodoro",205,"Salsa pomodoro, jitomate cherry, aceituna negra, albahaca y parmesano."],
    ["Espagueti carbonara",220,"Espagueti con crema, tocino y queso parmesano."],
    ["Espagueti a la boloñesa",225,"Salsa boloñesa tradicional y queso parmesano."],
    ["Espagueti a la arrabiata",220,"Pomodoro, ajo, parmesano y chorizo argentino con un toque picante."],
    ["Espagueti al burro",215,"Mantequilla, sal, pimienta, ajo y parmesano."],
    ["Pomodoro Chicken Pasta",245,"Espagueti pomodoro con pollo, cebolla morada, pepperoncino y albahaca."],
    ["Extra de chorizo argentino",50,"Complemento para pasta."],
    ["Extra de pollo",55,"Complemento para pasta."],
    ["Extra de camarón",65,"Complemento para pasta."],
    ["Extra de atún",65,"Complemento para pasta."]
  ],
  entradas: [
    ["Pizzeta",70,"Pan de ajo horneado con finas hierbas, aceite de oliva, ajo y parmesano."],
    ["Bolitas de queso",150,"Esferas rellenas de mozzarella con aderezo de chipotle."],
    ["Dinamitas",180,"Esferas de mozzarella con jalapeño y tocino crujiente; aderezo de chipotle."],
    ["Queso provolone ahumado",150,"Queso sellado con jitomate confitado, orégano, peperoncino y aceite de olivo."],
    ["Espárragos",189,"Asados con hierbas, ajo, aceite de olivo y vino blanco; envueltos en prosciutto."],
    ["Papas gajo",145,"Horneadas con sal y la receta secreta de la casa."],
    ["Sweet Camote",159,"Tiras de camote doradas, crujientes y sazonadas al momento."],
    ["Papas a la francesa",125,"Papas crujientes sazonadas, con salsa hot de la casa."],
    ["Papas alzadas",159,"Papas a la francesa con aceite de trufa, parmesano y albahaca fresca."],
    ["Papas pecadoras",189,"Papas a la francesa con ragú de boloñesa, cebolla caramelizada y jalapeño."]
  ],
  ensaladas: [
    ["Lero Lero",190,"Lechugas y arúgula, betabel rostizado, nuez caramelizada, queso de cabra y vinagreta de ajonjolí."],
    ["Mandarina",175,"Queso de cabra, nuez, arándano, mandarina y aderezo de miel con mostaza."],
    ["Eva",175,"Pera al vino tinto, nuez, queso de cabra, arándano y aderezo balsámico."],
    ["Mediterránea",175,"Lechugas, jitomate cherry, aceitunas, queso de cabra, champiñones y balsámico."],
    ["Frutos rojos",210,"Zarzamora, fresa, blueberry, nuez, queso de cabra, camarones y aderezo de frutos rojos."],
    ["Caprese",190,"Jitomate, mozzarella fresco, albahaca, aceituna negra y vinagre balsámico."]
  ],
  hamburguesas: [
    ["Lero Lero La Clásica",235,"Res con gouda, mozzarella, cebolla caramelizada, vegetales, chipotle y pepinillos."],
    ["Rouge BBQ",269,"Pollo crujiente con BBQ de frutos rojos, quesos, tocino y cebolla caramelizada."],
    ["Beso Maracuyá",289,"Res, plátano macho dorado, quesos y salsa de maracuyá con habanero."],
    ["Beso de Pastor",280,"Pollo al pastor, piña asada, quesos, cebolla caramelizada y guacamole."],
    ["Mar y Fuego",299,"Camarones salteados, tocino, mozzarella fresco, vegetales y miel pepperoncino."],
    ["BBQ Reserva",279,"Pechuga de pollo, tocino, BBQ, provoleta, lechuga, jitomate y jalapeño."],
    ["Dulce Fuego",269,"Pollo crujiente con salsa hot, BBQ de frutos rojos, provoleta y tocino."],
    ["Salvaje",309,"Res, chorizo argentino, quesos, cebolla caramelizada y jalapeño."],
    ["Verde Fino",270,"Pollo a la plancha, espárragos al ajo, parmesano, vegetales y chipotle."]
  ],
  alitas: [
    ["Alitas · 7 piezas",245,"Alitas crujientes con salsa y aderezo a elegir."],
    ["Alitas · 14 piezas",409,"Alitas crujientes con salsa y aderezo a elegir."],
    ["Alitas · 21 piezas",509,"Alitas crujientes con salsa y aderezo a elegir."],
    ["Alitas · 28 piezas",699,"Alitas crujientes con salsa y aderezo a elegir."],
    ["Boneless · 250 g",289,"Cubos de pechuga crujientes, con salsa y aderezo a elegir."],
    ["Boneless · 500 g",499,"Cubos de pechuga crujientes, con salsa y aderezo a elegir."],
    ["Boneless · 750 g",695,"Cubos de pechuga crujientes, con salsa y aderezo a elegir."],
    ["Salsa extra",30,"Too Hot, mango habanero, maracuyá habanero, tamarindo habanero, hot, BBQ frutos rojos, miel pepperoncino o BBQ."],
    ["Aderezo extra",30,"Blue Cheese o Ranch."]
  ],
  crepas: [
    ["Hawaiana",130,"Crepa salada con jamón, gouda, mozzarella y piña natural."],
    ["Española",145,"Crepa salada con jamón serrano, gouda, mozzarella y pomodoro."],
    ["Nutella",115,"Crepa dulce. Incluye dos toppings a elegir."],
    ["Dulce de leche",115,"Crepa dulce. Incluye dos toppings a elegir."],
    ["Mermelada de frutos rojos",115,"Crepa dulce. Incluye dos toppings a elegir."],
    ["Strudel",150,"Manzana, azúcar, canela, nuez y bola de gelato."],
    ["Cheesecake",150,"Queso crema, leche condensada, mermelada de zarzamora y gelato."],
    ["Extra de topping",15,"Nuez, plátano, fresa, lechera o queso crema."],
    ["Bola de gelato extra",25,"Complemento para crepas dulces."]
  ],
  postres: [
    ["Tiramisú",150,"Soleta, mascarpone especial y café de la casa."],
    ["Rebanada de pastel «Bruce»",150,"Pastel de chocolate semiamargo acompañado de gelato de vainilla."],
    ["Cheesecake NY",150,"Tarta de queso crema estilo Nueva York con salsa de frutos rojos."],
    ["Tarta de manzana",150,"Tarta de manzana con crumble de canela y gelato de vainilla."],
    ["Pannacotta",145,"Pannacotta de vainilla con salsa artesanal de frutos rojos."],
    ["Pizza de Nutella",275,"Pizza rellena de Nutella con fruta y azúcar glass."],
    ["Bomba bites",125,"Bolitas horneadas con azúcar glass, Nutella o dulce de leche."]
  ],
  bebidas: [
    ["Tinto Lero Lero",95,"Refresher de la casa."],
    ["Limonada con frutos rojos",69,"Bebida refrescante."],
    ["Limonada",59,"Bebida refrescante."],
    ["Mazapán frío",75,"Bebida fría."],
    ["Horchata oaxaqueña",69,"Bebida refrescante."],
    ["Té helado lavanda",69,"Té frío."],
    ["Latte frío",65,"Café con leche, frío."],
    ["Capuccino",65,"Café frío o caliente."],
    ["Moka",70,"Café frío o caliente."],
    ["Latte",65,"Café frío o caliente."],
    ["Latte Vainilla",75,"Café frío o caliente."],
    ["Caramel latte",75,"Café frío o caliente."],
    ["Espresso americano",50,"Café de la casa."],
    ["Horchata con espresso",75,"Horchata y espresso."],
    ["Malteadas",115,"Pregunta por los sabores disponibles."],
    ["Frappés",89,"Horchata, mazapán, taro, chai, moka, caramel, chocolate, frutos rojos y más."],
    ["Amargo especial",79,"Chocolate frío o caliente."],
    ["Dulce Oaxaca",79,"Chocolate frío o caliente."],
    ["Brownie",79,"Chocolate frío o caliente."],
    ["Horchata",69,"Bebida artesanal fría o caliente."],
    ["Pinole con cacao",70,"Bebida artesanal fría o caliente."],
    ["Lavanda tea",69,"Bebida artesanal fría o caliente."],
    ["Chai tea",69,"Bebida artesanal fría o caliente."],
    ["Tisanas",69,"Bebida artesanal fría o caliente."],
    ["Taro",75,"Bebida fría o caliente."],
    ["Chai latte",75,"Bebida fría o caliente."],
    ["Mazapán",75,"Bebida fría o caliente."],
    ["Vaso de leche entera",30,"Bebida."],
    ["Smoothie de fresa",80,"Smoothie de fruta."],
    ["Smoothie de mango",80,"Smoothie de fruta."],
    ["Smoothie de frutos rojos",80,"Smoothie de fruta."],
    ["Refresco · 355 ml",45,"Bebida embotellada."],
    ["Agua mineral · 355 ml",45,"Bebida embotellada."],
    ["Mineral preparada · 355 ml",45,"Bebida embotellada."]
  ],
  carta: [
    ["Atún sellado",299,"Lomo de atún a la plancha con aceite de ajo, espárragos y sal de mar."],
    ["Pollo Pepperoncino",259,"Pechuga asada con miel infusionada con pepperoncino y espárragos."],
    ["Sandwich Napolitano",279,"Doble pollo empanizado, pomodoro, queso gratinado y papas a la francesa."],
    ["Muslo Red BBQ",269,"Muslo de pollo glaseado con BBQ de frutos rojos y papas a la francesa."]
  ]
};

const ITEMS = Object.entries(DATA).flatMap(([category, entries]) =>
  entries.map(([name, price, description], index) => ({id:`${category}-${index}`,category,name,price,description}))
);
const $ = selector => document.querySelector(selector);
const categoryBar = $("#categoryBar");
const grid = $("#menuGrid");
const searchInput = $("#menuSearch");
const resultsCount = $("#resultsCount");
const heading = $("#categoryHeading");
const kicker = $("#categoryKicker");
const resetButton = $("#resetButton");
const emptyState = $("#emptyState");
const dialog = $("#productDialog");
let currentCategory = "todos";
let query = "";
const pesos = amount => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(amount);
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function renderCategories() {
  categoryBar.replaceChildren();
  CATEGORIES.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-chip";
    button.dataset.category = category.id;
    button.setAttribute("aria-pressed",String(category.id===currentCategory));
    const icon = document.createElement("span");
    icon.className="chip-icon";
    icon.textContent=category.icon;
    button.append(icon,document.createTextNode(category.label));
    button.addEventListener("click",()=>{
      currentCategory=category.id;
      render();
    });
    categoryBar.append(button);
  });
}

function makeCard(item,index) {
  const category=CATEGORIES.find(c=>c.id===item.category);
  const article=document.createElement("article");
  article.className=`menu-card theme-${item.category}`;
  article.style.setProperty("--item-index",Math.min(index,16));
  const visual=document.createElement("div");
  visual.className="card-visual";
  visual.setAttribute("aria-hidden","true");
  const glyph=document.createElement("span");glyph.className="card-glyph";glyph.textContent=category.icon;
  const corner=document.createElement("span");corner.className="card-corner";corner.textContent="LERO ✳ LERO";
  visual.append(glyph,corner);
  const body=document.createElement("div");body.className="card-body";
  const label=document.createElement("span");label.className="card-category";label.textContent=category.label;
  const title=document.createElement("h4");title.textContent=item.name;
  const desc=document.createElement("p");desc.textContent=item.description;
  const footer=document.createElement("div");footer.className="card-footer";
  const price=document.createElement("strong");price.className="card-price";price.textContent=pesos(item.price);
  const button=document.createElement("button");button.type="button";button.className="card-more";
  button.setAttribute("aria-label",`Personalizar y agregar ${item.name} al carrito`);button.textContent="＋";
  button.addEventListener("click",()=>openProduct(item));
  footer.append(price,button);body.append(label,title,desc,footer);article.append(visual,body);
  return article;
}

function render() {
  renderCategories();
  const category=CATEGORIES.find(c=>c.id===currentCategory);
  heading.textContent=category.heading;
  kicker.textContent=category.subtitle;
  const terms=normalize(query.trim());
  const filtered=ITEMS.filter(item => (currentCategory==="todos"||item.category===currentCategory) &&
    (!terms || normalize(`${item.name} ${item.description} ${CATEGORIES.find(c=>c.id===item.category).label}`).includes(terms)));
  grid.replaceChildren();
  const fragment=document.createDocumentFragment();
  filtered.forEach((item,index)=>fragment.append(makeCard(item,index)));
  grid.append(fragment);
  resultsCount.textContent=`${filtered.length} ${filtered.length===1?"opción":"opciones"}`;
  emptyState.hidden=filtered.length!==0;
  resetButton.hidden=currentCategory==="todos"&&!query;
}
function reset() { currentCategory="todos";query="";searchInput.value="";render();searchInput.focus(); }
function openProduct(item) {
  const category=CATEGORIES.find(c=>c.id===item.category);
  $("#dialogIcon").textContent=category.icon;
  $("#dialogVisual").className=`dialog-visual theme-${item.category}`;
  $("#dialogCategory").textContent=category.label;
  $("#dialogTitle").textContent=item.name;
  $("#dialogDescription").textContent=item.description;
  $("#dialogPrice").textContent=pesos(item.price);
  activeProduct=item;
  productQty=1;
  $("#productNotes").value="";
  updateProductQty();
  if (typeof dialog.showModal==="function") dialog.showModal();
}
searchInput.addEventListener("input",event=>{query=event.target.value;render();});
resetButton.addEventListener("click",reset);
$("#emptyReset").addEventListener("click",reset);
$("#dialogClose").addEventListener("click",()=>dialog.close());
$("#dialogDone").addEventListener("click",addActiveProduct);
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
document.addEventListener("keydown",event=>{
  if(event.key==="/"&&!dialog.open&&!/input|textarea/i.test(document.activeElement.tagName)){
    event.preventDefault();searchInput.focus();
  }
});

/* ================================================================
   PEDIDOS POR WHATSAPP — DEMO
   IMPORTANTE: agregar el número oficial de WhatsApp en formato
   internacional, sin + ni espacios (ej. 52XXXXXXXXXX).
   Si queda vacío, WhatsApp abre el mensaje para elegir destinatario.
   No usar el teléfono fijo de la web sin confirmar que tiene WhatsApp.
   ================================================================ */
const WHATSAPP_NUMBER = ""; // CONFIGURAR con el WhatsApp oficial del negocio.
const CART_KEY = "lerolero-cart-demo-v1";
const MAX_QTY = 30;
const getItem = id => ITEMS.find(item => item.id === id);
const readCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(row => row && getItem(row.id) && Number.isInteger(row.quantity) &&
      row.quantity > 0 && row.quantity <= MAX_QTY && typeof row.notes === "string")
      .map(row => ({id:row.id,quantity:row.quantity,notes:row.notes.slice(0,250)}));
  } catch { return []; }
};
let cart = readCart();
let activeProduct = null;
let productQty = 1;
let lastFocusedElement = null;
const drawer = $("#orderDrawer");
const backdrop = $("#cartBackdrop");
const toast = $("#orderToast");
const countItems = () => cart.reduce((sum,row)=>sum+row.quantity,0);
const subtotal = () => cart.reduce((sum,row)=>sum+getItem(row.id).price*row.quantity,0);
function persistCart() {
  try { localStorage.setItem(CART_KEY,JSON.stringify(cart)); } catch {}
}
function updateProductQty() {
  $("#productQuantity").textContent=String(productQty);
  $("#productLineTotal").textContent=activeProduct?pesos(activeProduct.price*productQty):"";
  $("#qtyMinus").disabled=productQty<=1;
  $("#qtyPlus").disabled=productQty>=MAX_QTY;
}
$("#qtyMinus").addEventListener("click",()=>{productQty=Math.max(1,productQty-1);updateProductQty();});
$("#qtyPlus").addEventListener("click",()=>{productQty=Math.min(MAX_QTY,productQty+1);updateProductQty();});
function notify(message) {
  toast.textContent=message;
  toast.classList.add("visible");
  clearTimeout(notify.timeout);
  notify.timeout=setTimeout(()=>toast.classList.remove("visible"),3200);
}
function addActiveProduct() {
  if (!activeProduct) return;
  const notes=$("#productNotes").value.trim();
  const existing=cart.find(row=>row.id===activeProduct.id&&row.notes===notes);
  if (existing) existing.quantity=Math.min(MAX_QTY,existing.quantity+productQty);
  else cart.push({id:activeProduct.id,quantity:productQty,notes});
  persistCart();
  renderCart();
  dialog.close();
  notify(`${activeProduct.name} agregado a tu pedido`);
  openCart();
}
function renderCart() {
  const totalQty=countItems();
  $("#headerCartCount").textContent=totalQty;
  $("#floatingCartCount").textContent=totalQty;
  $("#floatingCart").hidden=totalQty===0;
  $("#drawerCount").textContent=`(${totalQty})`;
  $("#cartEmpty").hidden=totalQty!==0;
  $("#checkoutForm").hidden=totalQty===0;
  $("#drawerFooter").hidden=totalQty===0;
  $("#cartTotal").textContent=pesos(subtotal());
  const lines=$("#cartLines");
  lines.replaceChildren();
  cart.forEach((row,index)=>{
    const item=getItem(row.id);
    const card=document.createElement("article");
    card.className="order-line";
    const title=document.createElement("strong");
    title.textContent=item.name;
    const detail=document.createElement("small");
    detail.textContent=`${pesos(item.price)} c/u`;
    const notes=document.createElement("p");
    notes.className="order-line-notes";
    notes.textContent=row.notes?`Indicaciones: ${row.notes}`:"";
    const sum=document.createElement("strong");
    sum.className="order-line-total";
    sum.textContent=pesos(item.price*row.quantity);
    const controls=document.createElement("div");
    controls.className="order-line-controls";
    const minus=document.createElement("button");
    minus.type="button";minus.textContent="−";minus.setAttribute("aria-label",`Quitar una unidad de ${item.name}`);
    minus.addEventListener("click",()=>changeCartQty(index,-1));
    const qty=document.createElement("span");qty.textContent=String(row.quantity);
    const plus=document.createElement("button");
    plus.type="button";plus.textContent="+";
    plus.disabled=row.quantity>=MAX_QTY;
    plus.setAttribute("aria-label",`Agregar una unidad de ${item.name}`);
    plus.addEventListener("click",()=>changeCartQty(index,1));
    const remove=document.createElement("button");
    remove.type="button";remove.className="order-line-remove";remove.textContent="Eliminar";
    remove.addEventListener("click",()=>{cart.splice(index,1);persistCart();renderCart();});
    controls.append(minus,qty,plus,remove);
    const info=document.createElement("div");
    info.className="order-line-info";info.append(title,detail,notes,controls);
    card.append(info,sum);
    lines.append(card);
  });
}
function changeCartQty(index,change) {
  const row=cart[index];
  if(!row)return;
  row.quantity+=change;
  if(row.quantity<=0)cart.splice(index,1);
  else row.quantity=Math.min(MAX_QTY,row.quantity);
  persistCart();renderCart();
}
function openCart() {
  lastFocusedElement=document.activeElement;
  drawer.inert=false;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  backdrop.hidden=false;
  document.body.classList.add("cart-open");
  $("#closeDrawer").focus();
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
  drawer.inert=true;
  backdrop.hidden=true;
  document.body.classList.remove("cart-open");
  if(lastFocusedElement?.isConnected)lastFocusedElement.focus();
}
$("#headerCart").addEventListener("click",openCart);
$("#floatingCart").addEventListener("click",openCart);
$("#closeDrawer").addEventListener("click",closeCart);
$("#continueShopping").addEventListener("click",closeCart);
backdrop.addEventListener("click",closeCart);
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&drawer.classList.contains("open"))closeCart();
  if(event.key==="Tab"&&drawer.classList.contains("open")){
    const focusables=Array.from(drawer.querySelectorAll('button:not([disabled]),input:not([disabled]),textarea:not([disabled])'))
      .filter(el=>el.getClientRects().length);
    if(!focusables.length)return;
    const first=focusables[0],last=focusables[focusables.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
const fulfillment=()=>document.querySelector('input[name="fulfillment"]:checked').value;
document.querySelectorAll('input[name="fulfillment"]').forEach(radio=>{
  radio.addEventListener("change",()=>{
    $("#deliveryFields").hidden=fulfillment()!=="domicilio";
  });
});
$("#clearCart").addEventListener("click",()=>{
  if(!confirm("¿Vaciar todos los productos del carrito?"))return;
  cart=[];persistCart();renderCart();
});
function prepareMessage() {
  const name=$("#customerName").value.trim();
  if(!name){notify("Escribe tu nombre para continuar");$("#customerName").focus();return null;}
  const mode=fulfillment();
  const address=$("#deliveryAddress").value.trim();
  if(mode==="domicilio"&&!address){
    notify("Agrega tu dirección de entrega");$("#deliveryAddress").focus();return null;
  }
  const lines=[
    "🍕 *PEDIDO DE DEMOSTRACIÓN — LERO LERO*",
    "⚠️ *SOLICITUD DE PRUEBA. NO PREPARAR SIN CONFIRMACIÓN.*",
    "",
    `*Cliente:* ${name}`,
    `*Entrega:* ${mode==="domicilio"?"A domicilio":"Para recoger"}`,
  ];
  const phone=$("#customerPhone").value.trim();
  if(phone)lines.push(`*Teléfono:* ${phone}`);
  if(mode==="domicilio")lines.push(`*Dirección:* ${address}`);
  lines.push("","*PRODUCTOS*");
  cart.forEach((row,index)=>{
    const item=getItem(row.id);
    lines.push(`${index+1}. ${row.quantity} × ${item.name} — ${pesos(item.price*row.quantity)}`);
    if(row.notes)lines.push(`   Nota: ${row.notes}`);
  });
  lines.push("","*Subtotal de productos:* "+pesos(subtotal()));
  if(mode==="domicilio")lines.push("*Envío:* Por confirmar con el restaurante");
  lines.push("*Total final:* Sujeto a confirmación");
  const notes=$("#orderNotes").value.trim();
  if(notes)lines.push("","*Indicaciones generales:* "+notes);
  lines.push("","Precios, disponibilidad y entrega sujetos a confirmación del restaurante.");
  return lines.join("\n");
}
$("#sendWhatsapp").addEventListener("click",()=>{
  if(cart.length===0)return;
  const message=prepareMessage();
  if(!message)return;
  const digits=WHATSAPP_NUMBER.replace(/\D/g,"");
  if(!digits) {
    // No inventamos el número de WhatsApp del restaurante:
    // se abre el diálogo de compartir para seleccionar el destinatario.
    const url=`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank","noopener,noreferrer");
    notify("Selecciona el contacto del restaurante en WhatsApp.");
  } else {
    const url=`https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank","noopener,noreferrer");
  }
});
$("#copyOrder").addEventListener("click",async()=>{
  if(cart.length===0)return;
  const message=prepareMessage();
  if(!message)return;
  try {
    await navigator.clipboard.writeText(message);
    notify("Pedido copiado. Pégalo en WhatsApp.");
  } catch {
    const field=document.createElement("textarea");
    field.value=message;
    field.style.position="fixed";
    field.style.left="-9999px";
    document.body.append(field);
    field.select();
    const copied=document.execCommand("copy");
    field.remove();
    notify(copied?"Pedido copiado. Pégalo en WhatsApp.":"No se pudo copiar; usa el botón de WhatsApp.");
  }
});
renderCart();
render();
