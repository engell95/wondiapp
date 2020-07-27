const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxZjAyNTMzNzMyMzBhOTU4NTE1MTJiMDk1Mzc0ODQ2ZjM0ZTJkYWIwYjE5NTNhZjA3NDVmY2Q4YjkxNjNlN2VkMmJmNDU1NjZjYWQ1ZTNjIn0.eyJhdWQiOiIxIiwianRpIjoiMjFmMDI1MzM3MzIzMGE5NTg1MTUxMmIwOTUzNzQ4NDZmMzRlMmRhYjBiMTk1M2FmMDc0NWZjZDhiOTE2M2U3ZWQyYmY0NTU2NmNhZDVlM2MiLCJpYXQiOjE1OTE4NDI1NzEsIm5iZiI6MTU5MTg0MjU3MSwiZXhwIjoxNjIzMzc4NTcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.KD8h6KWuFw9e-NQYCyZNJT9FxO7zEe6nQ5BYqu6FBDxrAkNwTxml-8j6KCl6Pvy0z8E6-USe90XipzEu7fSbns9TM9SPPQzO8xZwrA21nboRQlqa7h4QlFYSRkkJrkzFjoQUaKXgarPHmpW2Ycwedp6z2e_IugddCoJ8Lmoh1C_ViLkGOpV9-zDjoxGpxvxU8yC47XBb4Pi1Yz468Jz5ys91pSFZVABeWxkvUBRsxeGqSNEvkZIQjCu_vUtfneSq634yc4xrQKDjsgabV4WBzr2WBtKAmvXbbRG9DK8Ysjsbyz_9zoQNAZLGM3KAGhRB7nJD1eHvLkke_84TXNkhO9BFo6rg7U2x1OnuDsz8PFUdJ12qwnjnN707qYLi-FYxENLaiCFLN-lsFLaXNfcBX1xN0_vVZxBn_ZtqdIv6HcdmAiRH_kNkW_ERzWYomhpwwZZnmL2fQdfwXCrSTkwX4LVNqk4jVxx0_uJAUpKtOA2wsVM1RDsSDGLeTaM7gP8DsfCVVM-EX_550SRwBTLw_X12a7uZJVbilnQwS7uP3r7LLK41UlpgMjP4K4eH-FTS79phq1LHpnMWMGOTHwFrRIObh7dLGWFRLTT8xmBqGMLMj0aG4NSiYslnH66TAYRT6aw9fbU6Ku_SlhpPYAD449V9y4vjQf0C61jp12HwDEI';
const construc = 'https://test.wondiapp.com/api/';

//Rutas
    //Shop
    const category       = construc+'cat-empresa/list';
    const categoryshop   = construc+'empresas/categoria/';
    const shop           = construc+'empresas/';
    //Budget
    const budget         = construc+'presupuesto/';
    const budgetpost     = budget  +'crear';
    //Search
    const search         = construc+'productos/autocomplete/list';
    const result         = construc+'buscar';
    //General
    const suggestions    = construc+'empresas/categoria/';
    const products       = construc+'empresas/categoria/';
    //Promocion
    const promo          = construc+'promociones/';
    const promofull      = construc+'promociones/list';
    //User
    const user           = construc+'usuario/registro';
    const check          = construc+'islogged';
    const login          = construc+'llogin';
    const usercatg       = construc+ 'preferencias/categoriasxusiaro/add';
    const userdet        = construc+'usuario/';
    //Home
    const bestprice      = construc+'precios/productos/lits';
    const Similary       = construc+'buscar/productos/list/';
    const more_budgets   = construc+'productos/presupuestos/list';
    const best_search    = construc+'productos/buscados/list';
    const listproduxuser = construc+'usuario/productos/';

//Shop
    //Lista las categorias de empresa
    export const fetchCategory =  () => {
        return fetch(category, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista las empresas que pertenecen a una categoría
    export const fetchShop =  (id) => {
        return fetch(categoryshop+id+'/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Detalles de una empresa con promociones
    export const fetchShopD =  (data) => {
        return fetch(shop+data.id_shop+'/'+data.id_user+'/detalle', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de sucursales por empresa
    export const fetchSuc =  (id) => {
        return fetch(shop+id+'/sucursales/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista las Productos que pertenecen a una Empresa
    export const fetchProductShop =  (id) => {
        return fetch(shop+id+'/productos/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Agregar una empresa a los favoritos de un usuario
    export const Postfavemp =  (data) => {
        return fetch(shop+'addfavemp', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                user_id:data.user_id,
                Cod_Empresa: data.Cod_Empresa,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Remover una empresa de los favoritos de un usuario
    export const deletefavemp =  (data) => {
        return fetch(shop+data.Cod_Empresa+'/'+data.user_id+'/removefavemp', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//Budget
    //Lista presupuestos por usuario
    export const fetchBudget =  (id) => {
        return fetch(budget+id+'/list', {
            method: 'GET',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Detalle presupuestos
    export const fetchBudgetD =  (id) => {
        return fetch(budget+id+'/detail', {
            method: 'GET',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Eliminar presupuesto
    export const Destroybudget =  (id) => {
        return fetch(budget+id+'/destroy', {
            method: 'GET',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Crear presupuestos
    export const PostBudget =  (data) => {  
        return fetch(budgetpost, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                UserId: data.user,
                N_Presupuesto: data.name,
                Date:data.date
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Añadir detalle de presupuesto a un presupuesto en específico
    export const PostBudgetD =  (data,budgetid) => {
        return fetch(budget+budgetid+'/detalle/add', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                CProducto: data.prod,
                CSucursal: data.suc,
                Cant: data.cant,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Quitar detalle de presupuesto a un presupuesto en específico
    export const DeleteBudget =  (data,budgetid) => {
        return fetch(budget+budgetid+'/detalle/remove', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                CProducto: data.prod,
                CSucursal: data.suc,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Edita datos de presupuesto
    export const EditBudget =  (data,budgetid) => {
        return fetch(budget+budgetid+'/edit', {
            method: 'PATCH',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                N_Presupuesto: data.name,
                Date: data.date,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Api eliminar cantidad de un producto
    export const AmountBudget =  (data,budgetid) => {
        return fetch(budget+budgetid+'/detalle/changeamount', {
            method: 'PATCH',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                CProducto: data.prod,
                CSucursal: data.suc,
                Amount: data.cant,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//Search
    //lista de nombres de productos para auto completar AQUI
    export const fetchSearch =  (val) => {
        return fetch(search, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                busqueda: val
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Busqueda 
    export const fetchResult =  (data) => {
        return fetch(result, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                busqueda: data.search,
                usuario: data.user
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//General
    export const fetchSuggestions = (id) => {
        return fetch(suggestions+id+'/list', {
            method: 'GET',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    export const fetchProducts = (id) => {
        return fetch(products+id+'/list', {
            method: 'GET',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//Promocion
     export const fetchPromofull =  () => {
        return fetch(promofull, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    export const fetchPromo =  (id) => {
        return fetch(promo+id+'/listbycatg', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const fetchPromoprod =  (id) => {
        return fetch(promo+id+'/productos', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//user
    export const fetchhistory =  (id) => {
        return fetch(construc+'historial/'+id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const fetchuserdet =  (id) => {
        return fetch(userdet+id+'/detalle', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const PostUserCatg =  (user_id,catempresa) => {

        const user = 'user_id='+user_id+'&';

        const cat_empresa = Object.keys(catempresa).map((key) => {
        return 'cat_empresa['+encodeURIComponent(key)+']=' + encodeURIComponent(catempresa[key].Cod_Cat_Empresa);
        }).join('&');

        const consolidado = user+cat_empresa;

        return fetch(usercatg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer '+token,
            },
            body: consolidado,
               
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const ResetSocial =  (data) => {
        return fetch(construc+'password/social', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const ResetPass =  (data) => {
        return fetch(construc+'password/reset', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const Postsesiones =  (data) => {
        return fetch(construc+'sesiones', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                user_id: data.user_id,
                Tip_Disp: data.Tip_Disp,
                Dispositivo: data.Dispositivo,
                OS: data.OS,
                Id_dispositivo: data.Id_dispositivo,
                Nombre_dispositivo: data.Nombre_dispositivo,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const Postvisprod =  (data) => {
        return fetch(construc+'visualizacion', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                user_id: data.user_id,
                Cod_Producto: data.Cod_Producto,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const Useredit =  (data) => {
        return fetch(userdet+'edit', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                Cod_usuario:data.Cod_usuario,
                Nombre: data.Nombre,
                genero: data.genero,
                email: data.email,
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const passwordreset =  (data) => {
        return fetch(construc+'password/lreset', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
               Cod_usuario: data.Cod_usuario, 
               Password: data.Password
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const PostUser =  (data) => {
        return fetch(user, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                Nombre: data.name,
                User: data.user,
                email: data.email,
                genero:data.gener,
                password: data.pass,
                password_confirmation: data.passc
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const Postcheck =  (data) => {
        return fetch(check, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                id: data.user,
                code: data.token
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }

    export const Postlogin =  (data) => {
        console.log(data)
        return fetch(login, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                email:data.email,
                //username: data.username,
                password: data.password
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
//home
    //Lista de productos con precios bajos (wondi select)
    export const fetchBestprice =  () => {
        return fetch(bestprice, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de productos similares a tus busquedas
    export const fetchSimilary =  (id) => {
        return fetch(Similary+id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de productos mas presupuestos en las ultimas 24 horas
    export const fetchMorebudgets =  () => {
        return fetch(more_budgets, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de productos mas buscados en general en las ultimas 24 horas
    export const fetchBestsearch =  () => {
        return fetch(best_search, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //detalles de un producto
    export const fetchproddet =  (id) => {
        return fetch(construc+'productos/'+id+'/detail', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de productos destacados para un usuario
    export const fetchListprodxuser =  (id) => {
        return fetch(listproduxuser+id+'/lits', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }
    //Lista de productos destacados para un usuario full
    export const fetchListprodxuserfull =  (id) => {
        console.log(id)
        return fetch(listproduxuser+id+'/litsfull', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }