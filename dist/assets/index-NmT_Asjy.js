import{c as I}from"./supabase-BjBirDo4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();class R{constructor(){this.routes=new Map,this.currentRoute=null,this.middlewares=[],this.params={}}register(t,i){this.routes.set(t,i)}use(t){this.middlewares.push(t)}async navigate(t,i={}){this.params=i;for(const s of this.middlewares)if(await s(t)===!1)return;const r=this.routes.get(t);if(!r){console.error(`Route not found: ${t}`);return}this.currentRoute=t,window.history.pushState({path:t,params:i},"",t);const o=document.getElementById("app");if(o){o.innerHTML="";const s=await r(i);s instanceof HTMLElement?o.appendChild(s):typeof s=="string"&&(o.innerHTML=s)}}back(){window.history.back()}getCurrentRoute(){return this.currentRoute}getParams(){return this.params}}const g=new R;window.addEventListener("popstate",e=>{e.state&&e.state.path&&g.navigate(e.state.path,e.state.params||{})});const j="https://jnqynypefthinysddrka.supabase.co",B="ele",h=I(j,B),b={async signUp(e,t,i){const{data:r,error:o}=await h.auth.signUp({email:e,password:t,options:{data:{full_name:i},emailRedirectTo:void 0}});if(o)throw o;if(r.user)try{const{error:s}=await h.from("profiles").insert([{id:r.user.id,email:r.user.email,full_name:i}]);s&&!s.message.includes("duplicate")&&console.error("Profile creation error:",s)}catch(s){console.error("Profile insert failed:",s)}return r},async signIn(e,t){const{data:i,error:r}=await h.auth.signInWithPassword({email:e,password:t});if(r)throw r;return i},async signOut(){const{error:e}=await h.auth.signOut();if(e)throw e},async getCurrentUser(){const{data:{user:e},error:t}=await h.auth.getUser();if(t)throw t;return e},async getProfile(e){const{data:t,error:i}=await h.from("profiles").select("*").eq("id",e).maybeSingle();if(i)throw i;return t},async updateProfile(e,t){const{data:i,error:r}=await h.from("profiles").update(t).eq("id",e).select().single();if(r)throw r;return i},onAuthStateChange(e){return h.auth.onAuthStateChange((t,i)=>{e(t,i)})}},y={async createProduct(e){const t=await b.getCurrentUser();if(!t)throw new Error("User not authenticated");const{data:i,error:r}=await h.from("products").insert([{...e,user_id:t.id}]).select().single();if(r)throw r;return i},async getProducts(e={}){const t=await b.getCurrentUser();if(!t)throw new Error("User not authenticated");let i=h.from("products").select("*, product_images(*)").eq("user_id",t.id).order("created_at",{ascending:!1});e.status&&(i=i.eq("status",e.status)),e.marketplace&&(i=i.eq("marketplace",e.marketplace)),e.search&&(i=i.or(`title.ilike.%${e.search}%,description.ilike.%${e.search}%`));const{data:r,error:o}=await i;if(o)throw o;return r},async getProduct(e){const{data:t,error:i}=await h.from("products").select("*, product_images(*)").eq("id",e).single();if(i)throw i;return t},async updateProduct(e,t){const{data:i,error:r}=await h.from("products").update(t).eq("id",e).select().single();if(r)throw r;return i},async deleteProduct(e){const{error:t}=await h.from("products").delete().eq("id",e);if(t)throw t},async uploadProductImage(e,t,i=0){const r=t.name.split(".").pop(),s=`product-images/${`${e}_${i}_${Date.now()}.${r}`}`,{error:c}=await h.storage.from("products").upload(s,t);if(c)throw c;const{data:{publicUrl:u}}=h.storage.from("products").getPublicUrl(s),{data:d,error:p}=await h.from("product_images").insert([{product_id:e,image_url:u,order_index:i}]).select().single();if(p)throw p;return d},async getStats(){const e=await b.getCurrentUser();if(!e)throw new Error("User not authenticated");const{data:t,error:i}=await h.from("products").select("status, marketplace").eq("user_id",e.id);if(i)throw i;return{total:t.length,active:t.filter(o=>o.status==="active").length,paused:t.filter(o=>o.status==="paused").length,draft:t.filter(o=>o.status==="draft").length,mercadoLivre:t.filter(o=>o.marketplace==="ml").length,shopee:t.filter(o=>o.marketplace==="shopee").length}}},q={pt:{splash_loading:"Carregando...",login_title:"Bem-vindo",login_subtitle:"Faça login para continuar",login_email:"E-mail",login_password:"Senha",login_button:"Entrar",login_forgot:"Esqueceu a senha?",login_signup:"Não tem conta? Cadastre-se",login_error:"E-mail ou senha incorretos",home_title:"Início",home_stats_total:"Total de Produtos",home_stats_active:"Ativos",home_stats_ml:"Mercado Livre",home_welcome:"Olá, {{name}}!",home_quick_register:"Cadastro Rápido",home_share_title:"Compartilhar",home_marketplaces:"Marketplaces Conectados",products_title:"Produtos",products_all:"Todos",products_ml:"Mercado Livre",products_shopee:"Shopee",products_paused:"Pausados",products_search:"Buscar produtos...",products_sort:"Ordenar",products_empty:"Nenhum produto encontrado",products_add_first:"Cadastre seu primeiro produto",register_title:"Cadastrar Produto",register_photo:"Tirar Foto",register_voice:"Descrever por Voz",register_gallery:"Escolher da Galeria",register_manual:"Preencher Manual",register_coming_soon:"Em breve",photo_tips_title:"Dicas para Fotos Perfeitas",photo_tips_subtitle:"Siga estas dicas para melhorar suas vendas",photo_tips_lighting:"Boa iluminação natural",photo_tips_background:"Fundo neutro e limpo",photo_tips_angles:"Diferentes ângulos",photo_tips_details:"Detalhes importantes",photo_tips_start:"Começar",photo_capture_title:"Tire as Fotos",photo_capture_subtitle:"Tire até 3 fotos do produto",photo_capture_button:"Tirar Foto",photo_capture_gallery:"Escolher da Galeria",photo_capture_continue:"Continuar",photo_review_title:"Revisar Fotos",photo_review_subtitle:"Você pode adicionar ou remover fotos",photo_review_add:"Adicionar Foto",photo_review_continue:"Continuar",ai_processing_title:"Analisando Produto",ai_processing_subtitle:"Nossa IA está criando a melhor descrição",ai_processing_analyzing:"Analisando imagens",ai_processing_category:"Identificando categoria",ai_processing_description:"Gerando descrição",ai_processing_price:"Sugerindo preço",product_review_title:"Revisar Produto",product_review_subtitle:"Confira e ajuste as informações",product_review_title_label:"Título",product_review_description_label:"Descrição",product_review_category_label:"Categoria",product_review_price_label:"Preço",product_review_save:"Salvar Produto",success_title:"Produto Cadastrado!",success_subtitle:"Seu produto foi cadastrado com sucesso",success_share_title:"Compartilhar",success_marketplaces_title:"Publicar em Marketplaces",success_new_product:"Cadastrar Outro",success_view_products:"Ver Meus Produtos",help_title:"Ajuda",help_search:"Como podemos ajudar?",help_quick_title:"Ajuda Rápida",help_whatsapp:"WhatsApp",help_email:"E-mail",help_videos:"Vídeos Tutoriais",help_faq_title:"Perguntas Frequentes",profile_title:"Perfil",profile_marketplaces:"Vender em Marketplaces",profile_limit:"Solicitação de Limite",profile_invoices:"Central de Faturas",profile_language:"Idioma",profile_tour:"Tour Guiado",profile_settings:"Configurações",profile_logout:"Sair",nav_home:"Início",nav_products:"Produtos",nav_register:"Cadastrar",nav_help:"Dicas",nav_profile:"Perfil",common_cancel:"Cancelar",common_confirm:"Confirmar",common_save:"Salvar",common_delete:"Excluir",common_edit:"Editar",common_back:"Voltar",common_next:"Próximo",common_loading:"Carregando...",common_error:"Ocorreu um erro",common_success:"Sucesso!",common_coming_soon:"🔒 Funcionalidade em desenvolvimento"},en:{splash_loading:"Loading...",login_title:"Welcome",login_subtitle:"Sign in to continue",login_email:"Email",login_password:"Password",login_button:"Sign In",login_forgot:"Forgot password?",login_signup:"Don't have an account? Sign up",login_error:"Incorrect email or password",home_title:"Home",home_stats_total:"Total Products",home_stats_active:"Active",home_stats_ml:"Mercado Libre",home_welcome:"Hello, {{name}}!",home_quick_register:"Quick Register",home_share_title:"Share",home_marketplaces:"Connected Marketplaces",products_title:"Products",products_all:"All",products_ml:"Mercado Libre",products_shopee:"Shopee",products_paused:"Paused",products_search:"Search products...",products_sort:"Sort",products_empty:"No products found",products_add_first:"Register your first product",register_title:"Register Product",register_photo:"Take Photo",register_voice:"Describe by Voice",register_gallery:"Choose from Gallery",register_manual:"Fill Manually",register_coming_soon:"Coming soon",photo_tips_title:"Tips for Perfect Photos",photo_tips_subtitle:"Follow these tips to improve your sales",photo_tips_lighting:"Good natural lighting",photo_tips_background:"Neutral and clean background",photo_tips_angles:"Different angles",photo_tips_details:"Important details",photo_tips_start:"Start",photo_capture_title:"Take Photos",photo_capture_subtitle:"Take up to 3 product photos",photo_capture_button:"Take Photo",photo_capture_gallery:"Choose from Gallery",photo_capture_continue:"Continue",photo_review_title:"Review Photos",photo_review_subtitle:"You can add or remove photos",photo_review_add:"Add Photo",photo_review_continue:"Continue",ai_processing_title:"Analyzing Product",ai_processing_subtitle:"Our AI is creating the best description",ai_processing_analyzing:"Analyzing images",ai_processing_category:"Identifying category",ai_processing_description:"Generating description",ai_processing_price:"Suggesting price",product_review_title:"Review Product",product_review_subtitle:"Check and adjust the information",product_review_title_label:"Title",product_review_description_label:"Description",product_review_category_label:"Category",product_review_price_label:"Price",product_review_save:"Save Product",success_title:"Product Registered!",success_subtitle:"Your product was successfully registered",success_share_title:"Share",success_marketplaces_title:"Publish on Marketplaces",success_new_product:"Register Another",success_view_products:"View My Products",help_title:"Help",help_search:"How can we help?",help_quick_title:"Quick Help",help_whatsapp:"WhatsApp",help_email:"Email",help_videos:"Tutorial Videos",help_faq_title:"Frequently Asked Questions",profile_title:"Profile",profile_marketplaces:"Sell on Marketplaces",profile_limit:"Limit Request",profile_invoices:"Invoice Center",profile_language:"Language",profile_tour:"Guided Tour",profile_settings:"Settings",profile_logout:"Sign Out",nav_home:"Home",nav_products:"Products",nav_register:"Register",nav_help:"Tips",nav_profile:"Profile",common_cancel:"Cancel",common_confirm:"Confirm",common_save:"Save",common_delete:"Delete",common_edit:"Edit",common_back:"Back",common_next:"Next",common_loading:"Loading...",common_error:"An error occurred",common_success:"Success!",common_coming_soon:"🔒 Feature in development"},es:{splash_loading:"Cargando...",login_title:"Bienvenido",login_subtitle:"Inicia sesión para continuar",login_email:"Correo electrónico",login_password:"Contraseña",login_button:"Iniciar Sesión",login_forgot:"¿Olvidaste tu contraseña?",login_signup:"¿No tienes cuenta? Regístrate",login_error:"Correo o contraseña incorrectos",home_title:"Inicio",home_stats_total:"Total de Productos",home_stats_active:"Activos",home_stats_ml:"Mercado Libre",home_welcome:"¡Hola, {{name}}!",home_quick_register:"Registro Rápido",home_share_title:"Compartir",home_marketplaces:"Marketplaces Conectados",products_title:"Productos",products_all:"Todos",products_ml:"Mercado Libre",products_shopee:"Shopee",products_paused:"Pausados",products_search:"Buscar productos...",products_sort:"Ordenar",products_empty:"No se encontraron productos",products_add_first:"Registra tu primer producto",register_title:"Registrar Producto",register_photo:"Tomar Foto",register_voice:"Describir por Voz",register_gallery:"Elegir de la Galería",register_manual:"Llenar Manual",register_coming_soon:"Próximamente",photo_tips_title:"Consejos para Fotos Perfectas",photo_tips_subtitle:"Sigue estos consejos para mejorar tus ventas",photo_tips_lighting:"Buena iluminación natural",photo_tips_background:"Fondo neutro y limpio",photo_tips_angles:"Diferentes ángulos",photo_tips_details:"Detalles importantes",photo_tips_start:"Comenzar",photo_capture_title:"Tomar Fotos",photo_capture_subtitle:"Toma hasta 3 fotos del producto",photo_capture_button:"Tomar Foto",photo_capture_gallery:"Elegir de la Galería",photo_capture_continue:"Continuar",photo_review_title:"Revisar Fotos",photo_review_subtitle:"Puedes agregar o eliminar fotos",photo_review_add:"Agregar Foto",photo_review_continue:"Continuar",ai_processing_title:"Analizando Producto",ai_processing_subtitle:"Nuestra IA está creando la mejor descripción",ai_processing_analyzing:"Analizando imágenes",ai_processing_category:"Identificando categoría",ai_processing_description:"Generando descripción",ai_processing_price:"Sugiriendo precio",product_review_title:"Revisar Producto",product_review_subtitle:"Verifica y ajusta la información",product_review_title_label:"Título",product_review_description_label:"Descripción",product_review_category_label:"Categoría",product_review_price_label:"Precio",product_review_save:"Guardar Producto",success_title:"¡Producto Registrado!",success_subtitle:"Tu producto fue registrado con éxito",success_share_title:"Compartir",success_marketplaces_title:"Publicar en Marketplaces",success_new_product:"Registrar Otro",success_view_products:"Ver Mis Productos",help_title:"Ayuda",help_search:"¿Cómo podemos ayudarte?",help_quick_title:"Ayuda Rápida",help_whatsapp:"WhatsApp",help_email:"Correo",help_videos:"Videos Tutoriales",help_faq_title:"Preguntas Frecuentes",profile_title:"Perfil",profile_marketplaces:"Vender en Marketplaces",profile_limit:"Solicitud de Límite",profile_invoices:"Centro de Facturas",profile_language:"Idioma",profile_tour:"Tour Guiado",profile_settings:"Configuraciones",profile_logout:"Salir",nav_home:"Inicio",nav_products:"Productos",nav_register:"Registrar",nav_help:"Consejos",nav_profile:"Perfil",common_cancel:"Cancelar",common_confirm:"Confirmar",common_save:"Guardar",common_delete:"Eliminar",common_edit:"Editar",common_back:"Volver",common_next:"Siguiente",common_loading:"Cargando...",common_error:"Ocurrió un error",common_success:"¡Éxito!",common_coming_soon:"🔒 Funcionalidad en desarrollo"}};class F{constructor(){this.currentLanguage=localStorage.getItem("language")||"pt"}setLanguage(t){q[t]&&(this.currentLanguage=t,localStorage.setItem("language",t),window.dispatchEvent(new CustomEvent("languageChange",{detail:t})))}getLanguage(){return this.currentLanguage}t(t,i={}){const r=t.split(".");let o=q[this.currentLanguage];for(const c of r)o=o==null?void 0:o[c];if(!o)return console.warn(`Translation not found for key: ${t}`),t;let s=o;return Object.keys(i).forEach(c=>{s=s.replace(`{{${c}}}`,i[c])}),s}}const a=new F;function H(){const e=document.createElement("div");return e.className="splash-screen",e.innerHTML=`
    <style>
      .splash-screen {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--gradient-purple-blue);
        color: white;
      }

      .splash-logo {
        font-size: 48px;
        font-weight: 900;
        margin-bottom: var(--spacing-8);
        letter-spacing: -1px;
        text-align: center;
      }

      .splash-loader {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
        position: relative;
      }

      .splash-loader-bar {
        height: 100%;
        background: white;
        border-radius: 2px;
        animation: loading 1.5s ease-in-out;
        transform-origin: left;
      }

      @keyframes loading {
        0% {
          transform: scaleX(0);
        }
        100% {
          transform: scaleX(1);
        }
      }

      .splash-text {
        margin-top: var(--spacing-6);
        font-size: 14px;
        font-weight: 300;
        opacity: 0.9;
      }
    </style>

    <div class="splash-logo">Lojista</div>
    <div class="splash-loader">
      <div class="splash-loader-bar"></div>
    </div>
    <div class="splash-text">${a.t("splash_loading")}</div>
  `,e}function m(e,t="info"){const i=document.querySelector(".snackbar");i&&i.remove();const r=document.createElement("div");r.className=`snackbar ${t}`,r.textContent=e,document.body.appendChild(r),setTimeout(()=>{r.classList.add("fade-out"),setTimeout(()=>r.remove(),300)},3e3)}function D(e,t="BRL"){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:t}).format(e)}function N(e,t){let i;return function(...o){const s=()=>{clearTimeout(i),e(...o)};clearTimeout(i),i=setTimeout(s,t)}}function G(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function U(e){return e.length>=6}async function V(e,t=1200,i=.8){return new Promise((r,o)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=c=>{const u=new Image;u.src=c.target.result,u.onload=()=>{const d=document.createElement("canvas");let p=u.width,l=u.height;p>t&&(l=l*t/p,p=t),d.width=p,d.height=l,d.getContext("2d").drawImage(u,0,0,p,l),d.toBlob(x=>{r(new File([x],e.name,{type:"image/jpeg"}))},"image/jpeg",i)},u.onerror=o},s.onerror=o})}function w(e,t={}){const i=document.createElement("div");i.className="modal-overlay fade-in",i.onclick=s=>{s.target===i&&!t.preventClose&&o()};const r=document.createElement("div");r.className="modal-content slide-up",typeof e=="string"?r.innerHTML=e:r.appendChild(e),i.appendChild(r),document.body.appendChild(i);function o(){i.classList.add("fade-out"),setTimeout(()=>i.remove(),300)}return{overlay:i,modal:r,close:o}}const n={home:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',package:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.55 4.24"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>',lightbulb:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',camera:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>',mic:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>',image:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>',edit:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>',trash:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',search:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',share:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>',arrowRight:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',globe:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',sparkles:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',tag:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>',spinner:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'};function O(e){const t=document.createElement("div");t.className="onboarding-screen",t.innerHTML=`
    <style>
      .onboarding-screen {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: white;
        padding: var(--spacing-8) var(--spacing-6);
      }

      .onboarding-skip {
        align-self: flex-end;
        color: var(--text-secondary);
        font-size: 16px;
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-2);
      }

      .onboarding-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--spacing-6) 0;
      }

      .onboarding-video {
        width: 100%;
        max-width: 500px;
        aspect-ratio: 16/9;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: var(--border-radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--spacing-8);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }

      .onboarding-video-icon {
        width: 80px;
        height: 80px;
        color: rgba(255,255,255,0.5);
      }

      .onboarding-title {
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--spacing-4);
        line-height: 1.2;
      }

      .onboarding-features {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
        margin: var(--spacing-8) 0;
        text-align: left;
        width: 100%;
        max-width: 400px;
      }

      .onboarding-feature {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        font-size: 16px;
        color: var(--text-secondary);
      }

      .onboarding-feature-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        flex-shrink: 0;
      }

      .onboarding-feature-icon svg {
        width: 24px;
        height: 24px;
        color: white;
      }

      .onboarding-actions {
        width: 100%;
        max-width: 400px;
        padding: var(--spacing-6) 0;
      }

      .onboarding-cta {
        width: 100%;
        padding: var(--spacing-5);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: var(--border-radius-lg);
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .onboarding-cta:hover {
        transform: translateY(-2px);
      }

      .onboarding-cta:active {
        transform: translateY(0);
      }
    </style>

    <button class="onboarding-skip" id="skipBtn">Pular</button>

    <div class="onboarding-content">
      <div class="onboarding-video">
        <div class="onboarding-video-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <h1 class="onboarding-title">Cadastro de produtos em<br>segundos</h1>

      <div class="onboarding-features">
        <div class="onboarding-feature">
          <div class="onboarding-feature-icon">
            ${n.camera}
          </div>
          <div>Tire foto, fale ou descreva</div>
        </div>

        <div class="onboarding-feature">
          <div class="onboarding-feature-icon">
            ${n.sparkles}
          </div>
          <div>Deixe a IA fazer o resto</div>
        </div>

        <div class="onboarding-feature">
          <div class="onboarding-feature-icon">
            ${n.share}
          </div>
          <div>Compartilhe em redes sociais e nos maiores marketplaces</div>
        </div>
      </div>
    </div>

    <div class="onboarding-actions">
      <button class="onboarding-cta" id="startBtn">Iniciar Jornada</button>
    </div>
  `;const i=t.querySelector("#skipBtn"),r=t.querySelector("#startBtn");return i.addEventListener("click",e),r.addEventListener("click",e),t}async function P(){return localStorage.getItem("hasSeenOnboarding")?M():O(()=>{localStorage.setItem("hasSeenOnboarding","true"),document.querySelector("#app").innerHTML="",document.querySelector("#app").appendChild(M())})}function M(){const e=document.createElement("div");e.className="login-screen",e.innerHTML=`
    <style>
      .login-screen {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .login-header {
        background: var(--gradient-purple-blue);
        color: white;
        padding: var(--spacing-12) var(--spacing-6) var(--spacing-8);
        text-align: center;
        border-radius: 0 0 32px 32px;
      }

      .login-header h1 {
        color: white;
        font-size: 32px;
        font-weight: 900;
        margin-bottom: var(--spacing-2);
      }

      .login-header p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        font-weight: 300;
      }

      .login-content {
        flex: 1;
        padding: var(--spacing-8) var(--spacing-6);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-6);
      }

      .login-demo-info {
        background: #EFF6FF;
        border: 2px solid #DBEAFE;
        border-radius: var(--border-radius);
        padding: var(--spacing-4);
        text-align: center;
        color: #1E40AF;
        font-size: 14px;
      }

      .login-demo-info strong {
        display: block;
        margin-bottom: var(--spacing-2);
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-5);
      }

      .login-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
        margin-top: var(--spacing-4);
      }

      .login-forgot {
        text-align: center;
        font-size: 14px;
        color: var(--primary-purple);
        margin-top: var(--spacing-2);
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>

    <div class="login-header">
      <h1>${a.t("login_title")}</h1>
      <p>${a.t("login_subtitle")}</p>
    </div>

    <div class="login-content">
      <div class="login-demo-info">
        <strong>Demo Account</strong>
        <div>Email: demo@lojista.app</div>
        <div>Password: demo123</div>
      </div>

      <form class="login-form" id="loginForm">
        <div class="input-group">
          <label class="input-label" for="email">${a.t("login_email")}</label>
          <input
            type="email"
            id="email"
            class="input-field"
            placeholder="seu@email.com"
            value="demo@lojista.app"
            required
          />
          <span class="error-message" id="emailError"></span>
        </div>

        <div class="input-group">
          <label class="input-label" for="password">${a.t("login_password")}</label>
          <input
            type="password"
            id="password"
            class="input-field"
            placeholder="••••••"
            value="demo123"
            required
          />
          <span class="error-message" id="passwordError"></span>
        </div>

        <div class="login-actions">
          <button type="submit" class="btn btn-primary btn-lg">
            ${a.t("login_button")}
          </button>
          <div class="login-forgot">${a.t("login_forgot")}</div>
        </div>
      </form>
    </div>
  `;const t=e.querySelector("#loginForm"),i=e.querySelector("#email"),r=e.querySelector("#password"),o=e.querySelector("#emailError"),s=e.querySelector("#passwordError"),c=t.querySelector('button[type="submit"]');return t.addEventListener("submit",async u=>{u.preventDefault(),o.textContent="",s.textContent="",i.classList.remove("input-error"),r.classList.remove("input-error");const d=i.value.trim(),p=r.value;let l=!1;if(G(d)||(o.textContent="Email inválido",i.classList.add("input-error"),l=!0),U(p)||(s.textContent="Senha deve ter no mínimo 6 caracteres",r.classList.add("input-error"),l=!0),!l){c.disabled=!0,c.textContent=a.t("common_loading"),console.log("Attempting login with:",d);try{let v;try{console.log("Trying signIn..."),v=await b.signIn(d,p),console.log("SignIn successful:",v)}catch(x){console.log("SignIn failed, trying signUp...",x.message),v=await b.signUp(d,p,"Lili Cliente"),console.log("SignUp result:",v)}if(v&&(v.user||v.session))console.log("Authentication successful, navigating to home"),m(a.t("common_success"),"success"),setTimeout(()=>{g.navigate("/home")},500);else throw console.error("No user or session in result:",v),new Error("Authentication failed")}catch(v){console.error("Login error:",v),m(v.message||a.t("login_error"),"error"),c.disabled=!1,c.textContent=a.t("login_button")}}}),e}function k(){const e=document.createElement("nav");e.className="bottom-nav",e.innerHTML=`
    <style>
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
        z-index: var(--z-navbar);
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        color: var(--text-secondary);
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 12px;
        font-weight: 500;
        min-width: 60px;
      }

      .nav-item svg {
        width: 24px;
        height: 24px;
      }

      .nav-item.active {
        color: var(--primary-purple);
      }

      .nav-item:not(.nav-center):hover {
        color: var(--primary-purple);
        transform: translateY(-2px);
      }

      .nav-center {
        position: relative;
        margin: 0 8px;
      }

      .nav-fab {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--gradient-purple);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all 0.2s ease;
        margin-bottom: 20px;
      }

      .nav-fab:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: var(--shadow-xl);
      }

      .nav-fab svg {
        width: 28px;
        height: 28px;
      }
    </style>

    <button class="nav-item" data-route="/home">
      ${n.home}
      <span>${a.t("nav_home")}</span>
    </button>

    <button class="nav-item" data-route="/products">
      ${n.package}
      <span>${a.t("nav_products")}</span>
    </button>

    <div class="nav-center">
      <button class="nav-fab" id="nav-register">
        ${n.plus}
      </button>
    </div>

    <button class="nav-item" data-route="/help">
      ${n.lightbulb}
      <span>${a.t("nav_help")}</span>
    </button>

    <button class="nav-item" data-route="/profile">
      ${n.user}
      <span>${a.t("nav_profile")}</span>
    </button>
  `,e.querySelectorAll(".nav-item").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.route;o&&(g.navigate(o),t(o))})}),e.querySelector("#nav-register").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openRegisterModal"))});function t(r){e.querySelectorAll(".nav-item").forEach(o=>{o.dataset.route===r?o.classList.add("active"):o.classList.remove("active")})}const i=g.getCurrentRoute();return i&&t(i),e}function Y(){const e=document.querySelector(".bottom-nav");if(e){const t=e.querySelectorAll(".nav-item span");t[0].textContent=a.t("nav_home"),t[1].textContent=a.t("nav_products"),t[2].textContent=a.t("nav_help"),t[3].textContent=a.t("nav_profile")}}async function W(){const e=await b.getCurrentUser(),t=e?await b.getProfile(e.id):null,i=await y.getStats().catch(()=>({total:0,active:0,mercadoLivre:0})),r=document.createElement("div");return r.className="home-screen",r.innerHTML=`
    <style>
      .home-screen {
        width: 100%;
        min-height: 100vh;
        padding-bottom: 80px;
        background: var(--bg-gray-50);
      }

      .home-header {
        background: var(--gradient-purple-blue);
        color: white;
        padding: var(--spacing-6);
        padding-top: calc(var(--spacing-6) + env(safe-area-inset-top));
        border-radius: 0 0 24px 24px;
      }

      .home-header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-6);
      }

      .home-welcome {
        font-size: 24px;
        font-weight: 700;
      }

      .language-selector {
        display: flex;
        gap: var(--spacing-2);
        background: rgba(255, 255, 255, 0.2);
        padding: 4px;
        border-radius: 8px;
      }

      .lang-btn {
        padding: 6px 12px;
        background: transparent;
        border: none;
        color: white;
        font-size: 12px;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .lang-btn.active {
        background: white;
        color: var(--primary-purple);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-3);
        margin-top: var(--spacing-4);
      }

      .stat-card {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        padding: var(--spacing-4);
        border-radius: var(--border-radius);
        text-align: center;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 900;
        margin-bottom: var(--spacing-1);
      }

      .stat-label {
        font-size: 12px;
        opacity: 0.9;
        font-weight: 300;
      }

      .home-content {
        padding: var(--spacing-6);
      }

      .section {
        margin-bottom: var(--spacing-8);
      }

      .section-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: var(--spacing-4);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }

      .section-title svg {
        width: 24px;
        height: 24px;
        color: var(--primary-purple);
      }

      .quick-actions {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-4);
      }

      .action-card {
        background: white;
        padding: var(--spacing-5);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: all 0.2s;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .action-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-purple);
      }

      .action-card.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .action-card.disabled:hover {
        transform: none;
        border-color: transparent;
      }

      .action-icon {
        width: 48px;
        height: 48px;
        background: var(--gradient-purple);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-3);
      }

      .action-icon svg {
        width: 24px;
        height: 24px;
      }

      .action-title {
        font-weight: 600;
        margin-bottom: var(--spacing-1);
      }

      .action-subtitle {
        font-size: 13px;
        color: var(--text-secondary);
      }

      .marketplace-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-3);
      }

      .marketplace-card {
        background: white;
        padding: var(--spacing-4);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
      }

      .marketplace-logo {
        width: 40px;
        height: 40px;
        background: var(--bg-gray-100);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 12px;
      }

      .marketplace-info h4 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 2px;
      }

      .marketplace-status {
        font-size: 12px;
        color: #10B981;
        font-weight: 500;
      }

      .marketplace-status.coming-soon {
        color: var(--text-secondary);
      }
    </style>

    <div class="home-header">
      <div class="home-header-top">
        <div class="home-welcome">${a.t("home_welcome",{name:(t==null?void 0:t.full_name)||"Lili"})}</div>
        <div class="language-selector">
          <button class="lang-btn ${a.getLanguage()==="pt"?"active":""}" data-lang="pt">PT</button>
          <button class="lang-btn ${a.getLanguage()==="en"?"active":""}" data-lang="en">EN</button>
          <button class="lang-btn ${a.getLanguage()==="es"?"active":""}" data-lang="es">ES</button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${i.total}</div>
          <div class="stat-label">${a.t("home_stats_total")}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${i.active}</div>
          <div class="stat-label">${a.t("home_stats_active")}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${i.mercadoLivre}</div>
          <div class="stat-label">${a.t("home_stats_ml")}</div>
        </div>
      </div>
    </div>

    <div class="home-content">
      <section class="section">
        <h2 class="section-title">
          ${n.sparkles}
          ${a.t("home_quick_register")}
        </h2>
        <div class="quick-actions">
          <div class="action-card" data-action="photo">
            <div class="action-icon">${n.camera}</div>
            <div class="action-title">${a.t("register_photo")}</div>
            <div class="action-subtitle">Modo IA</div>
          </div>
          <div class="action-card disabled" data-action="voice">
            <div class="action-icon">${n.mic}</div>
            <div class="action-title">${a.t("register_voice")}</div>
            <div class="action-subtitle">${a.t("register_coming_soon")}</div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">
          ${n.share}
          ${a.t("home_marketplaces")}
        </h2>
        <div class="marketplace-grid">
          <div class="marketplace-card">
            <div class="marketplace-logo" style="background: #FFE600; color: #000;">ML</div>
            <div class="marketplace-info">
              <h4>Mercado Livre</h4>
              <div class="marketplace-status">Conectado</div>
            </div>
          </div>
          <div class="marketplace-card">
            <div class="marketplace-logo" style="background: #EE4D2D; color: #fff;">S</div>
            <div class="marketplace-info">
              <h4>Shopee</h4>
              <div class="marketplace-status coming-soon">${a.t("register_coming_soon")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,r.querySelectorAll(".lang-btn").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.lang;a.setLanguage(s),m(`Idioma alterado para ${s.toUpperCase()}`,"success")})}),r.querySelectorAll(".action-card:not(.disabled)").forEach(o=>{o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openRegisterModal"))})}),r.querySelectorAll(".action-card.disabled").forEach(o=>{o.addEventListener("click",()=>{m(a.t("common_coming_soon"),"warning")})}),r.appendChild(k()),r}async function Q(){let e=[],t="all",i="";const r=document.createElement("div");r.className="products-screen",r.innerHTML=`
    <style>
      .products-screen {
        width: 100%;
        min-height: 100vh;
        padding-bottom: 80px;
        background: var(--bg-gray-50);
      }

      .products-header {
        background: white;
        padding: var(--spacing-6);
        padding-top: calc(var(--spacing-6) + env(safe-area-inset-top));
        box-shadow: var(--shadow-sm);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .products-header h1 {
        font-size: 28px;
        margin-bottom: var(--spacing-4);
      }

      .search-box {
        position: relative;
        margin-bottom: var(--spacing-4);
      }

      .search-box input {
        width: 100%;
        padding: var(--spacing-3) var(--spacing-4) var(--spacing-3) 44px;
        border: 2px solid var(--border-gray);
        border-radius: var(--border-radius);
        font-size: 16px;
      }

      .search-box svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
      }

      .filter-tabs {
        display: flex;
        gap: var(--spacing-2);
        overflow-x: auto;
        padding-bottom: var(--spacing-2);
      }

      .filter-tabs::-webkit-scrollbar {
        display: none;
      }

      .filter-tab {
        padding: var(--spacing-2) var(--spacing-4);
        background: var(--bg-gray-100);
        border: 2px solid transparent;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s;
      }

      .filter-tab.active {
        background: var(--primary-purple);
        color: white;
      }

      .products-content {
        padding: var(--spacing-4);
      }

      .products-grid {
        display: grid;
        gap: var(--spacing-4);
      }

      .product-card {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: all 0.2s;
      }

      .product-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .product-image {
        width: 100%;
        height: 200px;
        background: var(--bg-gray-100);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        position: relative;
        overflow: hidden;
      }

      .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .product-badge {
        position: absolute;
        top: var(--spacing-2);
        right: var(--spacing-2);
        padding: 4px 8px;
        background: var(--primary-purple);
        color: white;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .product-info {
        padding: var(--spacing-4);
      }

      .product-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: var(--spacing-2);
        color: var(--text-primary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .product-description {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: var(--spacing-3);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .product-price {
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-purple);
      }

      .product-marketplace {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--text-secondary);
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-12) var(--spacing-6);
      }

      .empty-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto var(--spacing-4);
        color: var(--text-secondary);
        opacity: 0.3;
      }

      .empty-icon svg {
        width: 100%;
        height: 100%;
      }

      .empty-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: var(--spacing-2);
      }

      .empty-description {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-6);
      }
    </style>

    <div class="products-header">
      <h1>${a.t("products_title")}</h1>

      <div class="search-box">
        ${n.search}
        <input
          type="text"
          id="searchInput"
          placeholder="${a.t("products_search")}"
        />
      </div>

      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">${a.t("products_all")}</button>
        <button class="filter-tab" data-filter="ml">${a.t("products_ml")}</button>
        <button class="filter-tab" data-filter="shopee">${a.t("products_shopee")}</button>
        <button class="filter-tab" data-filter="paused">${a.t("products_paused")}</button>
      </div>
    </div>

    <div class="products-content">
      <div class="products-grid" id="productsGrid"></div>
    </div>
  `;const o=r.querySelector("#productsGrid"),s=r.querySelector("#searchInput"),c=r.querySelectorAll(".filter-tab");async function u(){try{const l={};t!=="all"&&(t==="paused"?l.status="paused":l.marketplace=t),i&&(l.search=i),e=await y.getProducts(l),d()}catch(l){console.error("Error loading products:",l),p()}}function d(){if(e.length===0){p();return}o.innerHTML=e.map(l=>{var E,L,S;const v=(L=(E=l.product_images)==null?void 0:E[0])==null?void 0:L.image_url,x=l.price?D(l.price):"-",C=l.marketplace==="ml"?"ML":((S=l.marketplace)==null?void 0:S.toUpperCase())||"";return`
        <div class="product-card">
          <div class="product-image">
            ${v?`<img src="${v}" alt="${l.title}">`:n.image}
            ${l.is_ai_generated?'<div class="product-badge">IA</div>':""}
          </div>
          <div class="product-info">
            <h3 class="product-title">${l.title}</h3>
            <p class="product-description">${l.description}</p>
            <div class="product-footer">
              <div class="product-price">${x}</div>
              ${C?`<div class="product-marketplace">${C}</div>`:""}
            </div>
          </div>
        </div>
      `}).join("")}function p(){o.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">${n.package}</div>
        <h2 class="empty-title">${a.t("products_empty")}</h2>
        <p class="empty-description">${a.t("products_add_first")}</p>
        <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('openRegisterModal'))">
          ${n.camera}
          ${a.t("register_photo")}
        </button>
      </div>
    `}return c.forEach(l=>{l.addEventListener("click",()=>{c.forEach(v=>v.classList.remove("active")),l.classList.add("active"),t=l.dataset.filter,u()})}),s.addEventListener("input",N(l=>{i=l.target.value.trim(),u()},500)),await u(),r.appendChild(k()),r}function X(){const e=document.createElement("div");return e.className="help-screen",e.innerHTML=`
    <style>
      .help-screen {
        width: 100%;
        min-height: 100vh;
        padding-bottom: 80px;
        background: var(--bg-gray-50);
      }

      .help-header {
        background: var(--gradient-purple-blue);
        color: white;
        padding: var(--spacing-6);
        padding-top: calc(var(--spacing-6) + env(safe-area-inset-top));
      }

      .help-header h1 {
        color: white;
        font-size: 28px;
        margin-bottom: var(--spacing-4);
      }

      .help-search {
        position: relative;
      }

      .help-search input {
        width: 100%;
        padding: var(--spacing-3) var(--spacing-4) var(--spacing-3) 44px;
        border: none;
        border-radius: var(--border-radius);
        font-size: 16px;
      }

      .help-search svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
      }

      .help-content {
        padding: var(--spacing-6);
      }

      .help-section {
        margin-bottom: var(--spacing-8);
      }

      .help-section-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: var(--spacing-4);
      }

      .quick-help-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-3);
      }

      .quick-help-card {
        background: white;
        padding: var(--spacing-4);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        opacity: 0.5;
      }

      .quick-help-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .quick-help-icon {
        width: 48px;
        height: 48px;
        margin: 0 auto var(--spacing-2);
        color: var(--primary-purple);
      }

      .quick-help-icon svg {
        width: 100%;
        height: 100%;
      }

      .quick-help-title {
        font-size: 14px;
        font-weight: 600;
      }

      .faq-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
      }

      .faq-item {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
      }

      .faq-question {
        padding: var(--spacing-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
      }

      .faq-question:hover {
        background: var(--bg-gray-50);
      }

      .faq-answer {
        padding: 0 var(--spacing-4) var(--spacing-4);
        color: var(--text-secondary);
        display: none;
      }

      .faq-item.open .faq-answer {
        display: block;
      }
    </style>

    <div class="help-header">
      <h1>${a.t("help_title")}</h1>
      <div class="help-search">
        ${n.search}
        <input
          type="text"
          placeholder="${a.t("help_search")}"
          disabled
        />
      </div>
    </div>

    <div class="help-content">
      <section class="help-section">
        <h2 class="help-section-title">${a.t("help_quick_title")}</h2>
        <div class="quick-help-grid">
          <div class="quick-help-card">
            <div class="quick-help-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="quick-help-title">${a.t("help_whatsapp")}</div>
          </div>

          <div class="quick-help-card">
            <div class="quick-help-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <div class="quick-help-title">${a.t("help_email")}</div>
          </div>

          <div class="quick-help-card">
            <div class="quick-help-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
              </svg>
            </div>
            <div class="quick-help-title">${a.t("help_videos")}</div>
          </div>
        </div>
      </section>

      <section class="help-section">
        <h2 class="help-section-title">${a.t("help_faq_title")}</h2>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <span>Como cadastrar um produto?</span>
              ${n.arrowRight}
            </div>
            <div class="faq-answer">
              Use o botão + na navegação inferior e escolha "Tirar Foto". Nossa IA irá analisar as imagens e criar automaticamente o cadastro.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              <span>Como conectar marketplaces?</span>
              ${n.arrowRight}
            </div>
            <div class="faq-answer">
              Funcionalidade em desenvolvimento. Em breve você poderá conectar Mercado Livre, Shopee e outros marketplaces.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              <span>Quantas fotos posso adicionar?</span>
              ${n.arrowRight}
            </div>
            <div class="faq-answer">
              Você pode adicionar até 3 fotos por produto para melhor visualização.
            </div>
          </div>
        </div>
      </section>
    </div>
  `,e.querySelectorAll(".quick-help-card").forEach(t=>{t.addEventListener("click",()=>{m(a.t("common_coming_soon"),"warning")})}),e.querySelectorAll(".faq-question").forEach(t=>{t.addEventListener("click",()=>{t.parentElement.classList.toggle("open")})}),e.appendChild(k()),e}async function Z(){var r;const e=await b.getCurrentUser(),t=e?await b.getProfile(e.id):null,i=document.createElement("div");return i.className="profile-screen",i.innerHTML=`
    <style>
      .profile-screen {
        width: 100%;
        min-height: 100vh;
        padding-bottom: 80px;
        background: var(--bg-gray-50);
      }

      .profile-header {
        background: var(--gradient-purple-blue);
        color: white;
        padding: var(--spacing-8) var(--spacing-6);
        padding-top: calc(var(--spacing-8) + env(safe-area-inset-top));
        text-align: center;
      }

      .profile-avatar {
        width: 80px;
        height: 80px;
        background: white;
        color: var(--primary-purple);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-4);
        font-size: 32px;
        font-weight: 700;
      }

      .profile-name {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: var(--spacing-1);
      }

      .profile-email {
        font-size: 14px;
        opacity: 0.9;
      }

      .profile-content {
        padding: var(--spacing-6);
      }

      .profile-menu {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }

      .profile-menu-item {
        background: white;
        padding: var(--spacing-4);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: var(--shadow-sm);
      }

      .profile-menu-item:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-md);
      }

      .profile-menu-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .profile-menu-item.disabled:hover {
        transform: none;
      }

      .profile-menu-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
      }

      .profile-menu-icon {
        width: 40px;
        height: 40px;
        background: var(--bg-gray-50);
        color: var(--primary-purple);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .profile-menu-icon svg {
        width: 20px;
        height: 20px;
      }

      .profile-menu-info {
        display: flex;
        flex-direction: column;
      }

      .profile-menu-title {
        font-weight: 600;
        margin-bottom: 2px;
      }

      .profile-menu-subtitle {
        font-size: 12px;
        color: var(--text-secondary);
      }

      .profile-menu-right svg {
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
      }

      .profile-menu-item.danger {
        border: 2px solid #FEE2E2;
      }

      .profile-menu-item.danger .profile-menu-icon {
        background: #FEE2E2;
        color: #EF4444;
      }

      .profile-menu-item.danger .profile-menu-title {
        color: #EF4444;
      }
    </style>

    <div class="profile-header">
      <div class="profile-avatar">
        ${((r=t==null?void 0:t.full_name)==null?void 0:r.charAt(0).toUpperCase())||"L"}
      </div>
      <div class="profile-name">${(t==null?void 0:t.full_name)||"Lili Cliente"}</div>
      <div class="profile-email">${(t==null?void 0:t.email)||"demo@lojista.app"}</div>
    </div>

    <div class="profile-content">
      <div class="profile-menu">
        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_marketplaces")}</div>
              <div class="profile-menu-subtitle">${a.t("register_coming_soon")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_limit")}</div>
              <div class="profile-menu-subtitle">${a.t("register_coming_soon")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_invoices")}</div>
              <div class="profile-menu-subtitle">${a.t("register_coming_soon")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">${n.globe}</div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_language")}</div>
              <div class="profile-menu-subtitle">${a.getLanguage().toUpperCase()}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" x2="12.01" y1="17" y2="17"></line>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_tour")}</div>
              <div class="profile-menu-subtitle">${a.t("register_coming_soon")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item disabled">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_settings")}</div>
              <div class="profile-menu-subtitle">${a.t("register_coming_soon")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>

        <div class="profile-menu-item danger" id="logoutBtn" style="margin-top: var(--spacing-6);">
          <div class="profile-menu-left">
            <div class="profile-menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
            </div>
            <div class="profile-menu-info">
              <div class="profile-menu-title">${a.t("profile_logout")}</div>
            </div>
          </div>
          <div class="profile-menu-right">${n.arrowRight}</div>
        </div>
      </div>
    </div>
  `,i.querySelectorAll(".profile-menu-item.disabled").forEach(o=>{o.addEventListener("click",()=>{m(a.t("common_coming_soon"),"warning")})}),i.querySelector("#logoutBtn").addEventListener("click",async()=>{try{await b.signOut(),m("Logout realizado com sucesso","success"),g.navigate("/login")}catch(o){console.error("Logout error:",o),m(a.t("common_error"),"error")}}),i.appendChild(k()),i}async function K(e){return console.warn("Gemini API key not configured, using mock data"),J()}function J(){return{title:"Produto Cadastrado",description:"Produto de qualidade. Edite esta descrição com mais detalhes sobre o produto.",category:"Geral",tags:"novo, qualidade, promoção"}}function ee(){const e=document.createElement("div");e.innerHTML=`
    <style>
      .register-modal-header {
        padding: var(--spacing-6);
        text-align: center;
        border-bottom: 1px solid var(--border-gray);
      }

      .register-modal-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: var(--spacing-2);
      }

      .register-options {
        padding: var(--spacing-6);
        display: grid;
        gap: var(--spacing-4);
      }

      .register-option {
        padding: var(--spacing-5);
        border: 2px solid var(--border-gray);
        border-radius: var(--border-radius-lg);
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
        cursor: pointer;
        transition: all 0.2s;
        background: white;
      }

      .register-option:hover:not(.disabled) {
        border-color: var(--primary-purple);
        transform: translateX(4px);
      }

      .register-option.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .register-option-icon {
        width: 56px;
        height: 56px;
        background: var(--gradient-purple);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .register-option.disabled .register-option-icon {
        background: var(--bg-gray-200);
        color: var(--text-secondary);
      }

      .register-option-icon svg {
        width: 28px;
        height: 28px;
      }

      .register-option-info {
        flex: 1;
      }

      .register-option-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .register-option-subtitle {
        font-size: 14px;
        color: var(--text-secondary);
      }
    </style>

    <div class="register-modal-header">
      <h2 class="register-modal-title">${a.t("register_title")}</h2>
    </div>

    <div class="register-options">
      <div class="register-option" data-option="photo">
        <div class="register-option-icon">${n.camera}</div>
        <div class="register-option-info">
          <div class="register-option-title">${a.t("register_photo")}</div>
          <div class="register-option-subtitle">Modo IA - Rápido e fácil</div>
        </div>
      </div>

      <div class="register-option disabled" data-option="voice">
        <div class="register-option-icon">${n.mic}</div>
        <div class="register-option-info">
          <div class="register-option-title">${a.t("register_voice")}</div>
          <div class="register-option-subtitle">${a.t("register_coming_soon")}</div>
        </div>
      </div>

      <div class="register-option disabled" data-option="gallery">
        <div class="register-option-icon">${n.image}</div>
        <div class="register-option-info">
          <div class="register-option-title">${a.t("register_gallery")}</div>
          <div class="register-option-subtitle">${a.t("register_coming_soon")}</div>
        </div>
      </div>

      <div class="register-option disabled" data-option="manual">
        <div class="register-option-icon">${n.edit}</div>
        <div class="register-option-info">
          <div class="register-option-title">${a.t("register_manual")}</div>
          <div class="register-option-subtitle">${a.t("register_coming_soon")}</div>
        </div>
      </div>
    </div>
  `;const t=w(e);e.querySelectorAll(".register-option:not(.disabled)").forEach(i=>{i.addEventListener("click",()=>{t.close(),A()})}),e.querySelectorAll(".register-option.disabled").forEach(i=>{i.addEventListener("click",()=>{m(a.t("common_coming_soon"),"warning")})})}let f=[];function A(){te()}function te(){const e=document.createElement("div");e.innerHTML=`
    <style>
      .tips-container {
        padding: var(--spacing-6);
      }

      .tips-header {
        text-align: center;
        margin-bottom: var(--spacing-6);
      }

      .tips-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: var(--spacing-2);
      }

      .tips-subtitle {
        color: var(--text-secondary);
      }

      .tips-list {
        display: grid;
        gap: var(--spacing-4);
        margin-bottom: var(--spacing-8);
      }

      .tip-item {
        display: flex;
        align-items: start;
        gap: var(--spacing-3);
        padding: var(--spacing-4);
        background: var(--bg-gray-50);
        border-radius: var(--border-radius);
      }

      .tip-icon {
        width: 40px;
        height: 40px;
        background: var(--gradient-purple);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .tip-text {
        flex: 1;
        padding-top: 8px;
        font-weight: 500;
      }
    </style>

    <div class="tips-container">
      <div class="tips-header">
        <h2 class="tips-title">${a.t("photo_tips_title")}</h2>
        <p class="tips-subtitle">${a.t("photo_tips_subtitle")}</p>
      </div>

      <div class="tips-list">
        <div class="tip-item">
          <div class="tip-icon">${n.sparkles}</div>
          <div class="tip-text">${a.t("photo_tips_lighting")}</div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">${n.check}</div>
          <div class="tip-text">${a.t("photo_tips_background")}</div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">${n.camera}</div>
          <div class="tip-text">${a.t("photo_tips_angles")}</div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">${n.search}</div>
          <div class="tip-text">${a.t("photo_tips_details")}</div>
        </div>
      </div>

      <button class="btn btn-primary btn-lg" style="width: 100%;" id="startCapture">
        ${a.t("photo_tips_start")}
      </button>
    </div>
  `;const t=w(e);e.querySelector("#startCapture").addEventListener("click",()=>{t.close(),$()})}function $(){f=[];const e=document.createElement("div");e.innerHTML=`
    <style>
      .capture-container {
        padding: var(--spacing-6);
      }

      .capture-header {
        text-align: center;
        margin-bottom: var(--spacing-6);
      }

      .photo-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-3);
        margin-bottom: var(--spacing-6);
      }

      .photo-slot {
        aspect-ratio: 1;
        background: var(--bg-gray-100);
        border: 2px dashed var(--border-gray);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .photo-slot img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .photo-slot-empty {
        color: var(--text-secondary);
      }

      .capture-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
      }

      input[type="file"] {
        display: none;
      }
    </style>

    <div class="capture-container">
      <div class="capture-header">
        <h2>${a.t("photo_capture_title")}</h2>
        <p class="text-muted">${a.t("photo_capture_subtitle")}</p>
      </div>

      <div class="photo-grid" id="photoGrid">
        <div class="photo-slot"><div class="photo-slot-empty">${n.camera}</div></div>
        <div class="photo-slot"><div class="photo-slot-empty">${n.camera}</div></div>
        <div class="photo-slot"><div class="photo-slot-empty">${n.camera}</div></div>
      </div>

      <div class="capture-actions">
        <button class="btn btn-primary btn-lg" id="captureBtn">
          ${n.camera}
          ${a.t("photo_capture_button")}
        </button>
        <button class="btn btn-secondary" id="continueBtn" disabled>
          ${a.t("photo_capture_continue")}
        </button>
      </div>

      <input type="file" id="fileInput" accept="image/*" capture="environment" multiple />
    </div>
  `;const t=w(e,{preventClose:!0}),i=e.querySelector("#fileInput"),r=e.querySelector("#captureBtn"),o=e.querySelector("#continueBtn"),s=e.querySelector("#photoGrid");r.addEventListener("click",()=>{f.length<3?i.click():m("Máximo de 3 fotos","warning")}),i.addEventListener("change",async u=>{const d=u.target.files[0];if(d)try{const p=await V(d),l=new FileReader;l.onload=v=>{f.push({file:p,preview:v.target.result}),c()},l.readAsDataURL(p)}catch{m("Erro ao processar imagem","error")}i.value=""});function c(){s.querySelectorAll(".photo-slot").forEach((d,p)=>{f[p]&&(d.innerHTML=`<img src="${f[p].preview}" alt="Foto ${p+1}">`)}),o.disabled=f.length===0,f.length>0&&(o.classList.remove("btn-secondary"),o.classList.add("btn-primary"))}o.addEventListener("click",()=>{t.close(),z()})}function z(){const e=document.createElement("div");e.innerHTML=`
    <style>
      .photo-review-container {
        padding: var(--spacing-6);
      }

      .photo-review-header {
        text-align: center;
        margin-bottom: var(--spacing-6);
      }

      .photo-review-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: var(--spacing-2);
      }

      .photo-review-subtitle {
        color: var(--text-secondary);
      }

      .photos-review-grid {
        display: grid;
        gap: var(--spacing-4);
        margin-bottom: var(--spacing-6);
      }

      .photo-review-item {
        position: relative;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .photo-review-item img {
        width: 100%;
        height: auto;
        display: block;
      }

      .photo-review-item-actions {
        position: absolute;
        top: var(--spacing-3);
        right: var(--spacing-3);
        display: flex;
        gap: var(--spacing-2);
      }

      .photo-review-item-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .photo-review-item-btn:hover {
        background: white;
        transform: scale(1.1);
      }

      .photo-review-item-btn svg {
        width: 20px;
        height: 20px;
      }

      .photo-review-item-btn.delete svg {
        color: var(--error-red);
      }

      .photo-review-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
      }
    </style>

    <div class="photo-review-container">
      <div class="photo-review-header">
        <h2 class="photo-review-title">Revisar Fotos</h2>
        <p class="photo-review-subtitle">Confira as fotos antes de continuar</p>
      </div>

      <div class="photos-review-grid" id="photosReviewGrid"></div>

      <div class="photo-review-actions">
        <button class="btn btn-primary btn-lg" id="confirmPhotos">
          ${n.check}
          Confirmar Fotos
        </button>
        <button class="btn btn-outline" id="retakePhotos">
          ${n.camera}
          Tirar Novas Fotos
        </button>
      </div>
    </div>
  `;const t=w(e,{preventClose:!0}),i=e.querySelector("#photosReviewGrid");f.forEach((r,o)=>{const s=document.createElement("div");s.className="photo-review-item",s.innerHTML=`
      <img src="${r.preview}" alt="Foto ${o+1}">
      <div class="photo-review-item-actions">
        <button class="photo-review-item-btn delete" data-index="${o}">
          ${n.trash}
        </button>
      </div>
    `,i.appendChild(s)}),e.querySelectorAll(".photo-review-item-btn.delete").forEach(r=>{r.addEventListener("click",o=>{const s=parseInt(o.currentTarget.dataset.index);f.splice(s,1),t.close(),f.length===0?$():z()})}),e.querySelector("#confirmPhotos").addEventListener("click",()=>{t.close(),ie()}),e.querySelector("#retakePhotos").addEventListener("click",()=>{t.close(),$()})}async function ie(){const e=document.createElement("div");e.innerHTML=`
    <style>
      .ai-container {
        padding: var(--spacing-8);
        text-align: center;
      }

      .ai-animation {
        width: 120px;
        height: 120px;
        margin: 0 auto var(--spacing-6);
        position: relative;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ai-animation svg {
        width: 60px;
        height: 60px;
        color: white;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }

      .ai-circle {
        position: absolute;
        width: 140px;
        height: 140px;
        border: 3px solid transparent;
        border-top-color: #667eea;
        border-radius: 50%;
        animation: spin 1.5s linear infinite;
        top: -10px;
        left: -10px;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .ai-steps {
        display: grid;
        gap: var(--spacing-3);
        margin-top: var(--spacing-8);
        text-align: left;
      }

      .ai-step {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        padding: var(--spacing-4);
        background: var(--bg-gray-50);
        border-radius: var(--border-radius-lg);
        transition: all 0.3s;
      }

      .ai-step.active {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border-left: 3px solid #667eea;
      }

      .ai-step.completed {
        background: rgba(16, 185, 129, 0.1);
        border-left: 3px solid #10b981;
      }

      .ai-step-icon {
        width: 28px;
        height: 28px;
        color: var(--text-secondary);
      }

      .ai-step.active .ai-step-icon {
        color: #667eea;
      }

      .ai-step.completed .ai-step-icon {
        color: #10b981;
      }

      .ai-step-text {
        flex: 1;
        font-weight: 500;
      }
    </style>

    <div class="ai-container">
      <div class="ai-animation">
        ${n.sparkles}
        <div class="ai-circle"></div>
      </div>

      <h2>IA Analisando Produto</h2>
      <p class="text-muted">Aguarde enquanto processamos as imagens</p>

      <div class="ai-steps">
        <div class="ai-step" data-step="analyzing">
          <div class="ai-step-icon">${n.search}</div>
          <div class="ai-step-text">Analisando imagens...</div>
        </div>
        <div class="ai-step" data-step="category">
          <div class="ai-step-icon">${n.tag}</div>
          <div class="ai-step-text">Identificando categoria...</div>
        </div>
        <div class="ai-step" data-step="description">
          <div class="ai-step-icon">${n.edit}</div>
          <div class="ai-step-text">Gerando descrição...</div>
        </div>
        <div class="ai-step" data-step="tags">
          <div class="ai-step-icon">${n.sparkles}</div>
          <div class="ai-step-text">Criando tags...</div>
        </div>
      </div>
    </div>
  `;const t=w(e,{preventClose:!0}),i=["analyzing","category","description","tags"];let r=0;(()=>{const s=e.querySelectorAll(".ai-step"),c=setInterval(()=>{r>0&&(s[r-1].classList.remove("active"),s[r-1].classList.add("completed")),r<i.length?(s[r].classList.add("active"),r++):clearInterval(c)},1e3)})();try{_=await re(f),setTimeout(()=>{t.close(),T()},4500)}catch(s){console.error("AI processing error:",s),_={title:"Produto",description:"Descreva seu produto aqui",category:"Sem categoria",tags:""},setTimeout(()=>{t.close(),T()},4500)}}async function re(e){console.log("Generating product data from AI with",e.length,"photos");try{return await K(e)}catch(t){return console.error("Error generating product data:",t),{title:"Produto Cadastrado",description:"Descreva seu produto aqui",category:"Geral",tags:"novo"}}}let _={};function T(){const e=document.createElement("div");e.innerHTML=`
    <style>
      .review-container {
        padding: var(--spacing-6);
        max-height: 80vh;
        overflow-y: auto;
      }

      .review-header {
        text-align: center;
        margin-bottom: var(--spacing-6);
      }

      .review-header h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: var(--spacing-2);
      }

      .review-photos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-6);
        padding: var(--spacing-4);
        background: var(--bg-gray-50);
        border-radius: var(--border-radius-lg);
      }

      .review-photo {
        aspect-ratio: 1;
        border-radius: var(--border-radius);
        overflow: hidden;
      }

      .review-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .review-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-5);
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        padding: 4px 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }

      .ai-badge svg {
        width: 14px;
        height: 14px;
      }
    </style>

    <div class="review-container">
      <div class="review-header">
        <h2>Revisar Produto</h2>
        <p class="text-muted">Confira e edite as informações geradas pela IA</p>
        <div style="margin-top: var(--spacing-3);">
          <span class="ai-badge">${n.sparkles} Gerado por IA</span>
        </div>
      </div>

      <div class="review-photos" id="reviewPhotos"></div>

      <form class="review-form" id="reviewForm">
        <div class="input-group">
          <label class="input-label">Nome do Produto</label>
          <input type="text" class="input-field" id="productTitle" value="${_.title||""}" required />
        </div>

        <div class="input-group">
          <label class="input-label">Descrição</label>
          <textarea class="input-field" id="productDescription" required>${_.description||""}</textarea>
        </div>

        <div class="input-group">
          <label class="input-label">Categoria</label>
          <input type="text" class="input-field" id="productCategory" value="${_.category||""}" required />
        </div>

        <div class="input-group">
          <label class="input-label">Tags (separadas por vírgula)</label>
          <input type="text" class="input-field" id="productTags" value="${_.tags||""}" placeholder="ex: casual, verão, conforto" />
        </div>

        <button type="submit" class="btn btn-primary btn-lg">
          ${n.check}
          Salvar Produto
        </button>
      </form>
    </div>
  `;const t=w(e,{preventClose:!0}),i=e.querySelector("#reviewPhotos");f.forEach((o,s)=>{const c=document.createElement("div");c.className="review-photo",c.innerHTML=`<img src="${o.preview}" alt="Foto ${s+1}">`,i.appendChild(c)});const r=e.querySelector("#reviewForm");r.addEventListener("submit",async o=>{o.preventDefault();const s=r.querySelector('button[type="submit"]');s.disabled=!0,s.innerHTML=`${n.spinner} Salvando...`;try{const c={title:e.querySelector("#productTitle").value,description:e.querySelector("#productDescription").value,category:e.querySelector("#productCategory").value,tags:e.querySelector("#productTags").value,price:0,status:"active",is_ai_generated:!0},u=await y.createProduct(c);for(let d=0;d<f.length;d++)await y.uploadProductImage(u.id,f[d].file,d);t.close(),oe(u)}catch(c){console.error("Error saving product:",c),m("Erro ao salvar produto","error"),s.disabled=!1,s.innerHTML=`${n.check} Salvar Produto`}})}function oe(e){const t=document.createElement("div");t.innerHTML=`
    <style>
      .success-container {
        padding: var(--spacing-8);
        text-align: center;
      }

      .success-animation {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-6);
        animation: successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        position: relative;
      }

      @keyframes successPop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }

      .success-animation svg {
        width: 64px;
        height: 64px;
        color: white;
      }

      .success-animation::before {
        content: '';
        position: absolute;
        width: 140px;
        height: 140px;
        border: 3px solid #10b981;
        border-radius: 50%;
        opacity: 0.3;
        animation: ripple 1.5s ease-out infinite;
      }

      @keyframes ripple {
        0% { transform: scale(1); opacity: 0.3; }
        100% { transform: scale(1.3); opacity: 0; }
      }

      .success-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: var(--spacing-2);
        color: #10b981;
      }

      .success-subtitle {
        font-size: 16px;
        color: var(--text-secondary);
        margin-bottom: var(--spacing-8);
      }

      .share-section {
        background: var(--bg-gray-50);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-5);
        margin-bottom: var(--spacing-4);
      }

      .share-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: var(--spacing-3);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }

      .share-title svg {
        width: 20px;
        height: 20px;
      }

      .marketplace-section {
        background: var(--bg-gray-50);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-5);
        margin-bottom: var(--spacing-6);
      }

      .marketplace-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: var(--spacing-3);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }

      .marketplace-title svg {
        width: 20px;
        height: 20px;
      }

      .marketplace-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
      }

      .marketplace-btn {
        padding: var(--spacing-4);
        border: 2px solid var(--border-gray);
        border-radius: var(--border-radius-lg);
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
      }

      .marketplace-btn.active {
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.05);
      }

      .marketplace-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .marketplace-badge {
        font-size: 12px;
        color: var(--text-secondary);
        background: var(--bg-gray-200);
        padding: 2px 8px;
        border-radius: 12px;
      }

      .share-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-3);
        margin-bottom: var(--spacing-4);
      }

      .share-btn {
        padding: var(--spacing-4);
        border: 2px solid var(--border-gray);
        border-radius: var(--border-radius-lg);
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-2);
      }

      .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      .share-btn.whatsapp:hover {
        border-color: #25D366;
        background: rgba(37, 211, 102, 0.05);
      }

      .share-btn.instagram:hover {
        border-color: #E4405F;
        background: rgba(228, 64, 95, 0.05);
      }

      .share-btn.tiktok:hover {
        border-color: #000000;
        background: rgba(0, 0, 0, 0.05);
      }

      .share-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .share-btn.whatsapp .share-icon {
        color: #25D366;
      }

      .share-btn.instagram .share-icon {
        color: #E4405F;
      }

      .share-btn.tiktok .share-icon {
        color: #000000;
      }

      .share-label {
        font-size: 14px;
        font-weight: 600;
      }

      .success-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
      }
    </style>

    <div class="success-container">
      <div class="success-animation">
        ${n.check}
      </div>

      <h2 class="success-title">Produto Cadastrado!</h2>
      <p class="success-subtitle">Seu produto foi cadastrado com sucesso</p>

      <div class="share-section">
        <h3 class="share-title">${n.share} Compartilhe:</h3>
        <div class="share-buttons">
          <button class="share-btn instagram" id="shareInstagram">
            <div class="share-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
            <span class="share-label">IG</span>
          </button>

          <button class="share-btn whatsapp" id="shareWhatsapp">
            <div class="share-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <span class="share-label">WA</span>
          </button>

          <button class="share-btn tiktok" id="shareTiktok">
            <div class="share-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </div>
            <span class="share-label">TT</span>
          </button>
        </div>
      </div>

      <div class="marketplace-section">
        <h3 class="marketplace-title">${n.package} Publique:</h3>
        <div class="marketplace-buttons">
          <button class="marketplace-btn active" id="publishMercadoLivre">
            <span class="marketplace-label">Mercado Livre</span>
          </button>

          <button class="marketplace-btn disabled" id="publishShopee">
            <span class="marketplace-label">Shopee</span>
            <span class="marketplace-badge">Em breve</span>
          </button>

          <button class="marketplace-btn disabled" id="publishShein">
            <span class="marketplace-label">Shein</span>
            <span class="marketplace-badge">Em breve</span>
          </button>
        </div>
      </div>

      <div class="success-actions">
        <button class="btn btn-primary btn-lg" id="newProduct">
          Cadastrar Outro Produto
        </button>
        <button class="btn btn-outline" id="viewProducts">
          Ver Meus Produtos
        </button>
        <button class="btn btn-outline" id="goHome" style="background: transparent; border: none; color: var(--text-secondary);">
          Voltar ao Início
        </button>
      </div>
    </div>
  `;const i=w(t),r=(e==null?void 0:e.title)||"Produto",o=`${window.location.origin}/products/${(e==null?void 0:e.id)||""}`;t.querySelector("#shareInstagram").addEventListener("click",()=>{m("Abra o Instagram e compartilhe manualmente","info")}),t.querySelector("#shareWhatsapp").addEventListener("click",()=>{const s=`Olha esse produto que acabei de cadastrar: ${r}`,c=`https://wa.me/?text=${encodeURIComponent(s+" "+o)}`;window.open(c,"_blank")}),t.querySelector("#shareTiktok").addEventListener("click",()=>{m("Abra o TikTok e compartilhe manualmente","info")}),t.querySelector("#publishMercadoLivre").addEventListener("click",()=>{m("Publicação no Mercado Livre em breve","info")}),t.querySelectorAll(".marketplace-btn.disabled").forEach(s=>{s.addEventListener("click",()=>{m("Marketplace em breve","info")})}),t.querySelector("#newProduct").addEventListener("click",()=>{i.close(),f=[],A()}),t.querySelector("#viewProducts").addEventListener("click",()=>{i.close(),g.navigate("/products")}),t.querySelector("#goHome").addEventListener("click",()=>{i.close(),g.navigate("/home")})}window.addEventListener("openRegisterModal",ee);async function ae(){const e=document.getElementById("app");e.innerHTML="",e.appendChild(H()),b.onAuthStateChange((t,i)=>{var r;console.log("Auth state changed:",t,(r=i==null?void 0:i.user)==null?void 0:r.email)}),g.use(async t=>{if(!["/login","/"].includes(t))try{if(!await b.getCurrentUser())return console.log("No user found, redirecting to login"),g.navigate("/login"),!1}catch(r){return console.error("Auth error:",r),g.navigate("/login"),!1}return!0}),g.register("/",P),g.register("/login",P),g.register("/home",W),g.register("/products",Q),g.register("/help",X),g.register("/profile",Z),window.addEventListener("languageChange",()=>{Y();const t=g.getCurrentRoute();t&&g.navigate(t)});try{const t=await b.getCurrentUser();setTimeout(()=>{t?g.navigate("/home"):g.navigate("/login")},1500)}catch{setTimeout(()=>{g.navigate("/login")},1500)}}ae();
