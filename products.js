/* ===== PRODUCTS: photos + products yahin badlein (dono pages ye file padhte hain) =====
 home:1 likha product home page par bhi dikhta hai; collection.html par sab dikhte hain. */
/* =========== IMAGES: yahan apni photos ke links badlein ===========
 Har product ke andar: '_' = default photos, aur har color ke naam ke saamne uski photos ki list.
 Color ki list khali ([]) ho to default photo + us color ki tint dikhti hai. */
const IMG={
'Down Shirt':{_:['https://i.ibb.co/zhz8H6K7/cotton-long-sleeve-button-down-shirt-7-mpotyt3678m2-mppx6dh3-1.webp'],'White':['https://i.ibb.co/bjMJx456/a5c67fda5dcb515c02266cc7e870029e-2.jpg'],'natural green':['https://i.ibb.co/gFL32t6P/a5c67fda5dcb515c02266cc7e870029e.jpg'],'Beige':[]},
'Modern Mandarin Collar Shirt':{_:['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80'],'White':[],'Sand':[],'Navy':[]},
'Polo T-Shirt':{_:['https://i.ibb.co/pv3HrbCF/1fc23e43-fff0-44e4-a8bb-a39e82844ffc.jpg' , 'https://i.ibb.co/cSx6nyDH/0ee1a9d8-ecf4-427a-a38e-3103fdd02199.jpg','https://i.ibb.co/DgDZCn8f/966830630-03.jpg','https://i.ibb.co/Q7YD3Fx8/1792308507099.jpg'],'Olive Green':[],'Black':[],'Navy':[]},
'Crew Neck T-Shirt':{_:['https://i.ibb.co/vvBTqf3p/498385413.jpg','https://i.ibb.co/YF5j4cgv/498385413x.jpg','https://i.ibb.co/JwKWfPnQ/498385413y.jpg','https://i.ibb.co/Sw3HbLTT/498385413z.jpg','https://i.ibb.co/9HzJQtrN/1792486770000.jpg'],'Grey':[],'white':[]},
'Linen Summer Shirt':{_:['https://i.pinimg.com/1200x/22/d3/40/22d3409a338ada0f476bc361ee015f92.jpg','https://old-money.com/cdn/shop/files/6_06e263ab-9ace-408d-b77a-663111a9c9c4.jpg?v=1757060299&width=960'],'Off-White':['https://i.pinimg.com/1200x/bd/6c/f9/bd6cf9e39bb3ea86086bb1f89c789ee6.jpg'],'Sage':[],'Navy':[]}
};
const HEX={'White':'#ffffff','Sky Blue':'#7db7e8','Beige':'#d9c3a0','Sand':'#d8c9a8','Navy':'#1f3a5f','Olive Green':'#6b7d3a','Black':'#111111','Grey':'#8a8a8a','Off-White':'#f1ead8','Sage':'#9caf88','natural green':'#6e7c69','white':'#ffffff'};
const P=[
{row:'Shirts',home:1,n:'Down Shirt',tag:'Work & Casual',o:'Long-staple Egyptian cotton grown in mineral-rich soil.',t:'50s two-ply compact yarn engineered for a crisp finish.'},
{row:'Shirts',n:'Modern Mandarin Collar Shirt',tag:'Signature Series',o:'Premium European flax linen blended with organic cotton.',t:'60s count fine-spun threads for an airy, sophisticated feel.'},
{row:'T-Shirts',home:1,n:'Polo T-Shirt',tag:'Best Seller',o:'Indian organic Khaki cotton yarn.',t:'Inspired by the historic Khaki of India’s royal expeditions and rugged desert wear, crafted into an ultra-soft modern staple.'},
{row:'T-Shirts',n:'Crew Neck T-Shirt',tag:'Everyday Essential',o:'Indian combed organic cotton.',t:'180 GSM soft-touch jersey knit.'},
{row:'Shirts',n:'Linen Summer Shirt',tag:'Summer Edit',o:'Pure flax linen from European fields.',t:'Breathable weave, pre-washed for softness.'}
];
