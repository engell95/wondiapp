const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkYTNjYTRkZWNhNTM4NzA2Zjc4NGI3MzM0ODNjMWEyNDU0Y2ExNWFlMzkwZDhjZDgyYWU4ODgzNzIwZDc3NDNiYjk5ODA2Y2MxYTc1OWU4In0.eyJhdWQiOiIxIiwianRpIjoiYWRhM2NhNGRlY2E1Mzg3MDZmNzg0YjczMzQ4M2MxYTI0NTRjYTE1YWUzOTBkOGNkODJhZTg4ODM3MjBkNzc0M2JiOTk4MDZjYzFhNzU5ZTgiLCJpYXQiOjE1NTAxNTQ4NjUsIm5iZiI6MTU1MDE1NDg2NSwiZXhwIjoxNTgxNjkwODY1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LWZGdaHjtINRxgyZy8E5nBoayGVRTwKPSguTqU_AvoBUlhpuFXMT-dIz2MuBAp5ZWNRxb5uKq-BIB-NgMLmPQ2FZK-CosrFr-dGaDcJIuAd2Z-V5LHD_jQTOcDKnMaCjdGVCMkWCmvMnp2E9GZhXjMlA7Bwp-gmJPUH2V6EtPhzvEL1tqxLfLTUT3e3ICmK5QH58l2cib3mxaktxgfE0iFNWhS7tTJPZEOdp-nZVT6la1lIt6sqrIkMiwRXEqAjy4tmiQHs5BFNxt-i7j9J4aPNKahEG3_fEVMg4AN6_v6QIT_NVQVWFl4auE-MZWOO0xrH5AvJX9pvahEvjsquGPmM0qqxserucJw3S3oI6_YmbTdD8FgT2sbU1y7JyNQiKv7ymow893hpBeSJozDXNCeD3Fla8knUXnPfH3446UvD8_YXwywClDy89BWUbmiDwub4-Ww7OowEaq9la-NhhPOUT-i1wmokUan--HtC6MWnTnknCkVeIWF5opcDSx7dY4wxuOKPXYspmAJP0L3XVuVhF38MvwRTjBzK41Rze3qPUAq-tsrl7KNtwMo303j3alE5qBjMm8aqW0TmV07Ckcju8yB6-fWe1f2n-_3aVqMPCuZm2UihZGfOSH9ro_Lncev1VrdIG6I9nkYzMef6oOhrwFsnEjLEQaWaH36PTvp0';
const construc = 'https://test.wondiapp.com/api/';

//Rutas
    //Shop
    const category = construc+'cat-empresa/list';
    const categoryshop = construc+'empresas/categoria/';
    const shop = construc+'empresas/';
    //Budget
    const budget = construc+'presupuesto/';
    const budgetpost = budget+'crear';
    //Search
    const search = construc+'productos/autocomplete/list';
    const result = construc+'buscar/';
    //General
    const suggestions = construc+'empresas/categoria/';
    const products = construc+'empresas/categoria/';
    //User
    const user = construc+'usuario/registro';
    const check = construc+'islogged';
    const login = construc+'llogin';
    const usercatg = construc + 'preferencias/categoriasxusiaro/add';
    const userdet = construc+'usuario/';
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
    //Lista de sucursales de la empresa
    export const fetchShopD =  (id) => {
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
    //lista de nombres de productos para auto completar
    export const fetchSearch =  () => {
        return fetch(search, {
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
    //Busqueda 
    export const fetchResult =  (search) => {
        return fetch(result+search, {
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
//user
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
    export const PostUserCatg =  (data) => {
        return fetch(usercatg, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                user_id: data.user_id,
                cat_empresa: data.catg_id
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
                Nombre: data.nombre,
                User: data.user,
                email: data.email,
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
        return fetch(login, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                email:data.email,
                username: data.username,
                password: data.password
            }),
        })
        .then(Response =>{ 
            return Promise.all([Response, Response.json()])
        })
    }