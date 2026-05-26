// ============================================================
// CASA ORENSE — CATALOG DATA
// catalog-data.js
// Edit product entries here to update all catalog pages.
// Image paths: assets/products/{category}/{subcategory}/{name}-1-flat.svg
//              assets/products/{category}/{subcategory}/{name}-1-model.svg
// Replace .svg with .jpg or .png once you drop in real images.
// ============================================================

const CATALOG = {

  // ── PRICE HELPERS ──────────────────────────────────────────
  // All prices in PHP
  // Designer-tier ranges:
  //   Tops: 28,000 – 95,000
  //   Outerwear: 95,000 – 320,000
  //   Bottoms: 35,000 – 145,000
  //   Shoes: 75,000 – 145,000
  //   Bags: 85,000 – 380,000

  sizes: {
    clothing: ['XS','S','M','L','XL','XXL'],
    shoes_mens: ['39','40','41','42','43','44','45'],
    shoes_womens: ['35','36','37','38','39','40'],
    bags: ['OS'], // one size
  },

  sizeChart: {
    clothing: {
      headers: ['Size','Chest (cm)','Waist (cm)','Hips (cm)','Shoulder (cm)'],
      rows: [
        ['XS',  '82–86',  '62–66',  '88–92',  '40'],
        ['S',   '87–91',  '67–71',  '93–97',  '42'],
        ['M',   '92–96',  '72–76',  '98–102', '44'],
        ['L',   '97–101', '77–81',  '103–107','46'],
        ['XL',  '102–108','82–88',  '108–114','48'],
        ['XXL', '109–116','89–96',  '115–122','50'],
      ]
    },
    shoes: {
      headers: ['EU','UK','US (M)','US (W)','cm'],
      rows: [
        ['38','5','5.5','7','24'],
        ['39','6','6.5','8','25'],
        ['40','7','7.5','9','26'],
        ['41','7.5','8','9.5','26.5'],
        ['42','8','8.5','10','27'],
        ['43','9','9.5','11','28'],
        ['44','9.5','10','11.5','28.5'],
        ['45','10','10.5','12','29'],
      ]
    }
  },

  // ── MEN TOPS ───────────────────────────────────────────────
  men_shirts: [
    { id:'m-sh-1',  name:'Black Textured Shirt',             price:34000, badge:'New', desc:'Crisp poplin in deep midnight. French seams throughout, mother-of-pearl buttons.' },
    { id:'m-sh-2',  name:'Black Viscose Linen Shirt',        price:36000, badge:null,  desc:'Heavyweight Oxford weave with spread collar and single barrel cuffs.' },
    { id:'m-sh-3',  name:'Brushes Embro Embroidered Shirt',  price:38000, badge:null,  desc:'Minimalist band collar in enzyme-washed twill. Relaxed boxy silhouette.' },
    { id:'m-sh-4',  name:'Dark Olive Button Up Linen Shirt', price:42000, badge:'Exclusive', desc:'Slim-fit formal shirt in 140s two-ply cotton. Barrel cuffs, spread collar.' },
    { id:'m-sh-5',  name:'Ecru Jacquard Shirt',              price:78000, badge:null,  desc:'Semi-sheer silk habotai. Dropped shoulders, elongated hem.' },
    { id:'m-sh-6',  name:'Floral Embroidered Shirt',         price:32000, badge:null,  desc:'Crinkled linen in stone. Relaxed fit with patch chest pocket.' },
    { id:'m-sh-7',  name:'Khaki Textured Shirt',             price:58000, badge:'New', desc:'Hand-dyed ombré in ash to black. Limited run of 30 pieces.' },
    { id:'m-sh-8',  name:'Leaf Embroidered Shirt',           price:45000, badge:null,  desc:'Architectural oblique seaming. Cotton-modal blend, structured silhouette.' },
    { id:'m-sh-9',  name:'Navy Blue Jacquared Shirt',        price:39000, badge:null,  desc:'Tonal shadow check in charcoal. Two-button collar, single patch pocket.' },
    { id:'m-sh-10', name:'Sand Viscose Linen Shirt',         price:52000, badge:'Exclusive', desc:'Overshirt cut in brushed cotton flannel. Double chest pockets, boxy fit.' },
    { id:'m-sh-11', name:'Sky Blue Button Up Shirt',         price:68000, badge:null,  desc:'High-lustre satin weave in onyx. Notched collar, slim fit.' },
    { id:'m-sh-12', name:'White Button Up Shirt',            price:74000, badge:'New', desc:'Fine plissé texture in pearl-black. Extended back hem, dropped shoulders.' },
    { id:'m-sh-13', name:'White Textured Shirt',             price:41000, badge:null,  desc:'Western yoke detail in dense twill. Snap-button placket, flap pockets.' },
  ],

  men_tshirts: [
    { id:'m-ts-1', name:'InShards Washed T-Shirt',          price:18000, badge:null,  desc:'Heavyweight cotton interlock. Relaxed fit with dropped shoulders.' },
    { id:'m-ts-2', name:'Love is Gambling T-Shirt',         price:16000, badge:null,  desc:'Slim fit Supima cotton. Embossed Casa Orense insignia at chest.' },
    { id:'m-ts-3', name:'Probinsya T-Shirt',                price:22000, badge:'New', desc:'Extended hem for layering. Cotton-modal blend, barely-there weight.' },
    { id:'m-ts-4', name:'Taga Bundok T-Shirt',              price:19000, badge:null,  desc:'Enzyme-washed for instant vintage feel. Relaxed box fit.' },
  ],

  // ── MEN OUTERWEAR ──────────────────────────────────────────
  men_cardigans: [
    { id:'m-cd-1', name:'Brushed Faux Cardigan',            price:85000, badge:null,  desc:'Fine merino rib in deep obsidian. Button-through placket, patch pockets.' },
    { id:'m-cd-2', name:'Drapé Knit Cardigan',              price:95000, badge:'Exclusive', desc:'Draped open-front in felted wool. Oversized, floor-grazing proportions.' },
  ],

  men_hoodies: [
    { id:'m-hd-1', name:'Cable Knit Hoodie',                price:68000, badge:null, desc:'Heavyweight French terry. Garment-dyed in midnight, kangaroo pocket.' },
    { id:'m-hd-2', name:'Washed Hoodie',                    price:72000, badge:'New', desc:'Full-zip in dense cotton fleece. Exposed brass zip, minimalist.' },
  ],

  men_jackets: [
    { id:'m-jk-1', name:'Bombadier Leather Jacket',         price:285000, badge:'Exclusive', desc:'Architectural drape in double-faced cashmere. Asymmetric hem.' },
    { id:'m-jk-2', name:'Caban Jacket',                     price:195000, badge:null,  desc:'Oversized trench in water-resistant gabardine. Storm flap.' },
    { id:'m-jk-3', name:'Embroieded Parade Jacket',         price:245000, badge:'New', desc:'Soft lamb nappa in matte black. Minimal hardware, clean lines.' },
    { id:'m-jk-4', name:'Faux Jacket',                      price:145000, badge:null,  desc:'Unstructured single-button in wool-silk. Clean lapel, no padding.' },
    { id:'m-jk-5', name:'Fireman Clasps Corduroy Jacket',   price:118000, badge:null,  desc:'Technical field jacket in waxed cotton. Four flap pockets.' },
    { id:'m-jk-6', name:'Floral Wash Denim',                price:265000, badge:'Exclusive', desc:'Double-breasted in heavyweight melton. Peak lapel, notched back vent.' },
    { id:'m-jk-7', name:'Frogging Parade Jacket',           price:138000, badge:null,  desc:'Lightweight down-filled puffer. Matte nylon shell, boxy silhouette.' },
    { id:'m-jk-8', name:'Japanese Denim Jacket',            price:215000, badge:'New', desc:'Clean moto cut in vegetable-tanned lamb. Minimal zip details.' },
  ],

  // ── MEN BOTTOMS ────────────────────────────────────────────
  men_cargos: [
    { id:'m-cg-1', name:'Black Parachute Cargos',           price:65000, badge:null,  desc:'Six-pocket slim cargo in stretch twill. Articulated knee, tapered leg.' },
    { id:'m-cg-2', name:'Grey Parachute Cargos',            price:58000, badge:'New', desc:'Relaxed cargo in enzyme-washed cotton. Drawstring ankle.' },
    { id:'m-cg-3', name:'Tan Parachute Cargos',             price:72000, badge:null,  desc:'Wide-leg silhouette with articulated cargo pockets. Cotton ripstop.' },
  ],

  men_jeans: [
    { id:'m-jn-1', name:'Bleached Denim Jeans',              price:45000, badge:null,  desc:'12oz selvedge denim in raw black. Slim through thigh, tapered from knee.' },
    { id:'m-jn-2', name:'Japanese Denim Jeans',              price:62000, badge:null,  desc:'Medium-weight denim in faded charcoal. Clean straight fit.' },
    { id:'m-jn-3', name:'Washed Denim Jeans',                price:40000, badge:'New', desc:'Stretch denim with subtle abrasion at knees. Skinny silhouette.' },
    { id:'m-jn-4', name:'Worn Out Denim Jeans',              price:48000, badge:'Exclusive', desc:'Oversized wide leg in indigo-black. High rise, floor-length.' },
  ],

  men_shorts: [
    { id:'m-st-1', name:'Bermuda Jorts',                  price:32000, badge:null,  desc:'Slim-fit chino shorts in stretch cotton. Above-knee length, clean front.' },
    { id:'m-st-2', name:'Faded Grey Jorts',             price:28000, badge:'New', desc:'Relaxed linen in natural ecru. Elasticated back waist.' },
    { id:'m-st-3', name:'Floral Wash Jorts',    price:35000, badge:null,  desc:'Technical fabric with waterproof coating. Minimal 2-pocket design.' },
    { id:'m-st-4', name:'Worn Out Jorts',       price:25000, badge:null,  desc:'Lightweight mesh jersey. Drawstring waist, minimalist.' },
  ],

  men_trousers: [
    { id:'m-tr-1', name:'Black Pleated Trousers',    price:88000, badge:'Exclusive', desc:'Double-pleat, wide-leg in light wool. Side adjusters, no belt loops.' },
    { id:'m-tr-2', name:'Relaxed Pleated Trousers',       price:75000, badge:null,  desc:'Slim-cut in 110s wool. Clean front, slightly tapered.' },
    { id:'m-tr-3', name:'Tan Pleated Trousers',price:65000, badge:'New', desc:'Track-pant silhouette in silk-satin. Luxe athleisure hybrid.' },
  ],

  // ── WOMEN TOPS ─────────────────────────────────────────────
  women_blouses: [
    { id:'w-bl-1', name:'Embroidered Blouse',   price:68000, badge:'New', desc:'Floaty silk georgette with pintuck detail. V-neck, relaxed fit.' },
    { id:'w-bl-2', name:'White Pleated Blouse',     price:72000, badge:null,  desc:'Cascading ruffle at front placket. Charcoal silk-chiffon.' },
  ],

  women_shirts: [
    { id:'w-sh-1', name:'Brown CutWork Embroidery Shirt',        price:36000, badge:null,  desc:'Oversized fit in crisp white poplin. Architectural back pleat.' },
    { id:'w-sh-2', name:'CutWork Embroidery Shirt',         price:34000, badge:'New', desc:'Cropped tie-front in natural linen. Puff sleeves, relaxed body.' },
    { id:'w-sh-3', name:'Embroidered Shirt',     price:82000, badge:'Exclusive', desc:'Sheer cotton organza. Covered buttons, barely-there construction.' },
    { id:'w-sh-4', name:'Floral CutWork Embroidery Shirt',        price:88000, badge:null,  desc:'Silk habotai in oyster. Band collar, pearl-snap buttons.' },
    { id:'w-sh-5', name:'Navy Blue Linen',    price:58000, badge:null,  desc:'Wrap construction in ponte. Elongated hem, wrap tie.' },
    { id:'w-sh-6', name:'Striped Poplin Shirt',      price:95000, badge:'Exclusive', desc:'Structured corset boning over classic shirt. Cotton-poplin.' },
    { id:'w-sh-7', name:'White Linen Puff Shirt', price:74000, badge:'New', desc:'Asymmetric hem with waterfall drape at one side. Silk-blend.' },
    { id:'w-sh-8', name:'White Poplin Shirt',     price:62000, badge:null,  desc:'Dramatic bishop sleeves in cotton voile. Fitted body.' },
  ],

  women_sleeveless: [
    { id:'w-sl-1', name:'Guipure Laced Top',             price:28000, badge:null,  desc:'Minimal column silhouette in silk-modal. Thin straps, relaxed fit.' },
    { id:'w-sl-2', name:'Sequin Top',   price:45000, badge:'New', desc:'Boned structured bodice in stretch crepe. Strapless option.' },
    { id:'w-sl-3', name:'Striped Knit Top',        price:38000, badge:null,  desc:'Delicate laser cutwork in matte jersey. Adjustable straps.' },
  ],

  women_tshirts: [
    { id:'w-ts-1', name:'Hers T-Shirt',        price:18000, badge:null,  desc:'Cropped to natural waist. Supima cotton, fine rib.' },
    { id:'w-ts-2', name:'Linen Blend',      price:20000, badge:'New', desc:'Heavily oversized in compact jersey. Dropped shoulders.' },
    { id:'w-ts-3', name:'Mama Knows',      price:22000, badge:null,  desc:'Extended hem. Scoop neck, relaxed in cotton-modal.' },
    { id:'w-ts-4', name:'Manuja Waldia',         price:16000, badge:null,  desc:'Second-skin fit in fine jersey. Embossed logo at hem.' },
  ],

  // ── WOMEN OUTERWEAR ────────────────────────────────────────
  women_cardigans: [
    { id:'w-cd-1', name:'Crochet Cardigan',   price:145000, badge:'Exclusive', desc:'Cocooning wrap silhouette in pure cashmere. Oversized, ties at waist.' },
    { id:'w-cd-2', name:'CutWork Knit Cardigan',   price:78000, badge:null,   desc:'Cropped ribbed cardigan. Fine merino, fitted through body.' },
    { id:'w-cd-3', name:'Open Knit Cardigan',    price:115000, badge:'New', desc:'Floor-length duster in open-weave merino. Dramatic and minimal.' },
    { id:'w-cd-4', name:'Pointelle Knit Cardigan',   price:98000, badge:null,   desc:'Boucle weave in ivory-fleck. Mid-length, relaxed buttons.' },
    { id:'w-cd-5', name:'Rustic Knit Cardigan',  price:82000, badge:null,   desc:'Cable-knit cropped at waist. Heavy merino with patch pockets.' },
  ],

  women_jackets: [
    { id:'w-jk-1', name:'Black Parade Jacket',     price:320000, badge:'Exclusive', desc:'Column silhouette in bias-cut wool. Floor-length, single button.' },
    { id:'w-jk-2', name:'Clasped Marl Jacket',     price:295000, badge:null,   desc:'Belted trench in gabardine. Oversized, storm flap, D-ring belt.' },
    { id:'w-jk-3', name:'Denim Parade Jacket',  price:225000, badge:'New', desc:'Cropped blazer in soft lamb leather. Notched lapel, single button.' },
    { id:'w-jk-4', name:'Suede Work Jacket',price:285000, badge:'Exclusive', desc:'Exaggerated shoulder structure in pressed wool. A/W statement coat.' },
    { id:'w-jk-5', name:'White Parade Jacket',    price:265000, badge:null,   desc:'Fully sheer organza jacket over lining. Worn as second layer.' },
  ],

  // ── WOMEN BOTTOMS ──────────────────────────────────────────
  women_jeans: [
    { id:'w-jn-1', name:'Bleached Low Rise Jeans',   price:52000, badge:'New', desc:'Barrel-leg silhouette in raw indigo. High rise, relaxed through seat.' },
    { id:'w-jn-2', name:'Dark Low Rise Jeans',        price:44000, badge:null,  desc:'Skin-tight in stretch denim. Raw black, invisible zip fly.' },
    { id:'w-jn-3', name:'Ripped Barrel Jeans',         price:56000, badge:'Exclusive', desc:'70s-inspired flare from knee. High waist, cropped at ankle.' },
    { id:'w-jn-4', name:'Washed Low Rise Jeans',   price:48000, badge:null,  desc:'Classic straight in washed grey denim. Mid-rise, five-pocket.' },
  ],

  women_shorts: [
    { id:'w-st-1', name:'Ecru Shorts',        price:38000, badge:null,  desc:'Knee-length bermuda in stretch crepe. Pleat front, clean lines.' },
    { id:'w-st-2', name:'Embroidered Linen Blend Shorts',   price:32000, badge:'New', desc:'Very high-rise in white denim. Raw hem, invisible button fly.' },
    { id:'w-st-3', name:'MidWaist Bermuda Jorts',      price:55000, badge:'Exclusive', desc:'Faux-leather in matte black. High rise, zip fly, minimal.' },
    { id:'w-st-4', name:'Mid Waist Dark Wash Jorts',     price:58000, badge:null,  desc:'Relaxed straight in natural linen. Elasticated back waist.' },
    { id:'w-st-5', name:'Mid Waist Ripped Jorts',      price:42000, badge:null,  desc:'Micro-length in plissé fabric. High waist, side zip.' },
    { id:'w-st-6', name:'Pleated Shorts',       price:24000, badge:null,  desc:'Stretch jersey. Comfort waistband, seamless construction.' },
    { id:'w-st-7', name:'Pointelle Knit Shorts',    price:45000, badge:'New', desc:'Midi-short in brushed crepe. Concealed side pockets, clean front.' },
  ],

  women_skirts: [
    { id:'w-sk-1', name:'Embroidered Belted Skirt',    price:68000, badge:'Exclusive', desc:'Handkerchief hem in silk charmeuse. Asymmetric cut, hi-lo effect.' },
    { id:'w-sk-2', name:'Floral Print Skirt',       price:75000, badge:null,  desc:'Floor-length column in matte crepe. Side slit, clean waistband.' },
    { id:'w-sk-3', name:'Satin Skirt',      price:62000, badge:'New', desc:'Box-pleat midi in lightweight wool. Pressed pleats, side zip.' },
    { id:'w-sk-4', name:'Seamed Denim Skirt',      price:88000, badge:'Exclusive', desc:'Above-knee in soft lamb leather. Back zip, straight silhouette.' },
    { id:'w-sk-5', name:'Denim Skirt',     price:58000, badge:null,  desc:'Bias-cut in silk satin. Midi length, delicate side seam.' },
  ],

  women_trousers: [
    { id:'w-tr-1', name:'Black Trousers',    price:88000, badge:'Exclusive', desc:'Ultra-wide palazzo in silk charmeuse. High waist, floor-length.' },
    { id:'w-tr-2', name:'Ecru Trouser',   price:72000, badge:null,  desc:'Slim cut in 110s wool. Clean front, invisible side pockets.' },
    { id:'w-tr-3', name:'Pin Stripe Trousers',         price:95000, badge:'New', desc:'Wide leg in plissé fabric. High waist, dramatic volume.' },
    { id:'w-tr-4', name:'Sky Blue Trousers',    price:78000, badge:'Exclusive', desc:'Slim faux-leather. High rise, zip ankles, sculpted silhouette.' },
    { id:'w-tr-5', name:'Palazzo Trousers', price:82000, badge:null,  desc:'Fluid silk-blend. Drawstring waist, wide through leg.' },
    { id:'w-tr-6', name:'Wrap Style Bow Trousers',  price:115000, badge:null,  desc:'Centre pintuck creates column line. Cropped at ankle, straight fit.' },
  ],

  // ── SHOES ──────────────────────────────────────────────────
  shoes_mens: [
    { id:'sh-m-1', name:'Obscura Penny Loafers',           price:98000, badge:null,  desc:'Hand-welted calfskin derby. Antique leather sole, burnished toe.' },
    { id:'sh-m-2', name:'Forma Penny Loafers',            price:88000, badge:null,  desc:'Cap-toe in polished calf. Goodyear welt, stacked leather heel.' },
    { id:'sh-m-3', name:'Burgundy Penny Loafers',             price:105000, badge:'Exclusive', desc:'Penny loafer in soft calf. Gold bar, leather stacked heel.' },
    { id:'sh-m-4', name:'Meridian Penny Loafers',   price:125000, badge:'New', desc:'Chelsea in pebbled calf. Elastic gore, stacked block heel.' },
    { id:'sh-m-5', name:'Leather Clogs',         price:138000, badge:null,  desc:'Knee-high lace-up in matte leather. Commando sole.' },
    { id:'sh-m-6', name:'Jesus 5000',               price:82000, badge:null,  desc:'Backless mule in polished calf. Square toe, low stacked heel.' },
  ],

  shoes_womens: [
    { id:'sh-w-1', name:'Column Ballerinas',    price:112000, badge:'New', desc:'Block heel in nude nappa. Featherweight insole, architectural toe.' },
    { id:'sh-w-2', name:'Stiletto Ballerinas',         price:145000, badge:'Exclusive', desc:'Blade-thin heel in patent leather. Pointed toe, ankle strap.' },
    { id:'sh-w-3', name:'Forma Leather Ballerinas',    price:118000, badge:null,  desc:'Chelsea boot in suede. Block heel, elasticated gore.' },
  ],

  // ── BAGS ───────────────────────────────────────────────────
  bags_impress: [
    { id:'bg-im-1', name:'Impress I Amana',  price:285000, badge:'Exclusive', desc:'Rigid structured tote in pebbled calf. Polished gold bar closure.' },
    { id:'bg-im-2', name:'Impress II Chestnut', price:225000, badge:null,  desc:'Minimal envelope in smooth calf. Invisible magnetic closure.' },
    { id:'bg-im-3', name:'Impress III Dark Matter',      price:165000, badge:'New', desc:'Compact chain bag in quilted lambskin. Fine gold chain strap.' },
    { id:'bg-im-4', name:'Impress IV Camel',         price:295000, badge:null,  desc:'Hard-shell box bag in polished calf. Brass lock closure.' },
    { id:'bg-im-5', name:'Impress V Macassar',          price:345000, badge:null,  desc:'Open-top shopper in smooth calf. Double leather handle.' },
    { id:'bg-im-6', name:'Impress VI Twilight',       price:138000, badge:'New', desc:'Minimal crossbody in grained calf. Adjustable strap, slip pocket.' },
    { id:'bg-im-7', name:'Impress VII Graphite',       price:158000, badge:'Exclusive', desc:'Under-arm baguette in python-embossed leather.' },
    { id:'bg-im-8', name:'Impress VIII Portfolio',     price:175000, badge:null,  desc:'Document portfolio in smooth calf. Zip closure, card slots.' },
    { id:'bg-im-9', name:'Impress IX Harbor',          price:225000, badge:null,  desc:'Weekend duffle in full-grain vegetable leather. Brass zipper.' },
  ],

  bags_klasiko: [
    { id:'bg-kl-1', name:'Klasiko I Saddle Bag',       price:445000, badge:null,  desc:'Classic saddle bag silhouette in vegetable-tanned calf.' },
    { id:'bg-kl-2', name:'Klasiko II Mini Flap',        price:165000, badge:'Exclusive', desc:'Signature turn-lock flap. Quilted lambskin, chain strap.' },
    { id:'bg-kl-3', name:'Klasiko III Bordeaux',     price:478000, badge:null,  desc:'Structured top-handle in smooth calf. Optional long strap.' },
    { id:'bg-kl-4', name:'Klasiko IV Camel',      price:335000, badge:'New', desc:'Drawstring bucket in grained calf. Magnetic snap, internal zip.' },
    { id:'bg-kl-5', name:'Klasiko V Cognac',         price:98000,  badge:null,  desc:'Slim belt bag in smooth calf. Adjustable strap, gold hardware.' },
    { id:'bg-kl-6', name:'Klasiko VI Mini Grey Matter',      price:115000, badge:null,  desc:'Structured camera-bag shape. Calf leather, detachable strap.' },
    { id:'bg-kl-7', name:'Klasiko VII Mini Sand',price:125000, badge:'New', desc:'Soft drawstring tote in pebbled calf. Double-rolled handles.' },
    { id:'bg-kl-8', name:'Klasiko VIII Mini Silver',   price:88000,  badge:null,  desc:'Mini wristlet clutch in patent calf. Wrist loop, internal card slots.' },
  ],

  bags_shine: [
    { id:'bg-sh-1', name:'Shine I Blacker Better',      price:245000, badge:'Exclusive', desc:'Full metallic in polished gold-tone leather. Statement evening piece.' },
    { id:'bg-sh-2', name:'Shine II Blue Minaudière',price:380000, badge:'Exclusive', desc:'Hand-set crystal minaudière. Brass frame, satin lining, limited.' },
  ],
};

// Flat lookup by ID (used by product modal)
CATALOG.all = Object.values(CATALOG)
  .filter(v => Array.isArray(v))
  .flat();

CATALOG.findById = (id) => CATALOG.all.find(p => p.id === id);

// ── IMAGE PATH HELPERS ─────────────────────────────────────
// Maps the category prefix portion of a product ID to its folder path.
// ID format: {prefix}-{number}  e.g. "m-sh-1", "sh-m-2", "bg-im-3"
// The number is always the LAST dash-segment; everything before it is the prefix.
const _IMG_MAP = {
  'm-sh': 'men/tops/shirts',
  'm-ts': 'men/tops/tshirts',
  'm-cd': 'men/outerwear/cardigans',
  'm-hd': 'men/outerwear/hoodies',
  'm-jk': 'men/outerwear/jackets',
  'm-cg': 'men/bottoms/cargos',
  'm-jn': 'men/bottoms/jeans',
  'm-st': 'men/bottoms/shorts',
  'm-tr': 'men/bottoms/trousers',

  'w-bl': 'women/tops/blouses',
  'w-sh': 'women/tops/shirts',
  'w-sl': 'women/tops/sleeveless',
  'w-ts': 'women/tops/tshirts',
  'w-cd': 'women/outerwear/cardigans',
  'w-jk': 'women/outerwear/jackets',
  'w-jn': 'women/bottoms/jeans',
  'w-st': 'women/bottoms/shorts',
  'w-sk': 'women/bottoms/skirts',
  'w-tr': 'women/bottoms/trousers',

  'sh-m': 'shoes/mens',
  'sh-w': 'shoes/womens',

  'bg-im': 'bags/impress',
  'bg-kl': 'bags/klasiko',
  'bg-sh': 'bags/shine',
};

// Returns { folder, num } for a given product ID, or null if unrecognised.
CATALOG._imgParts = (id) => {
  const parts = id.split('-');
  const num    = parts[parts.length - 1];          // last segment is always the number
  const prefix = parts.slice(0, -1).join('-');     // everything else is the prefix
  const folder = _IMG_MAP[prefix];
  if (!folder) return null;
  return { folder, num };
};

// Flat / clothing-only image  →  {num}_ClothingOnly.jpg
CATALOG.imgFlat = (id) => {
  const p = CATALOG._imgParts(id);
  if (!p) return 'assets/bags.jpg';
  return `assets/products/${p.folder}/${p.num}_ClothingOnly.jpg`;
};

// On-model image  →  {num}_Model.jpg  (same folder, different suffix)
CATALOG.imgModel = (id) => {
  const p = CATALOG._imgParts(id);
  if (!p) return 'assets/her-library.png';
  return `assets/products/${p.folder}/${p.num}_Model.jpg`;
};

// Get correct size set for a product
CATALOG.getSizes = (id) => {
  if (id.startsWith('sh-')) return id.includes('-m-') ? CATALOG.sizes.shoes_mens : CATALOG.sizes.shoes_womens;
  if (id.startsWith('bg-')) return CATALOG.sizes.bags;
  return CATALOG.sizes.clothing;
};

CATALOG.getSizeChart = (id) => {
  if (id.startsWith('sh-')) return CATALOG.sizeChart.shoes;
  return CATALOG.sizeChart.clothing;
};