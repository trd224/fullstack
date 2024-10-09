// const USER_ROUTE = 'user';
// const PRODUCT_ROUTE = 'product';

// export const API_ENDPOINTS = {
//     [USER_ROUTE]: {
//         signup: `${USER_ROUTE}/signup`,
//         login: `${USER_ROUTE}/login`,
//         all: `${USER_ROUTE}/all`,
//         byId: (id: string | number) => `${USER_ROUTE}/${id}`
//     },
//     [PRODUCT_ROUTE]: {
//         list: `${PRODUCT_ROUTE}/list`,
//         detail: `${PRODUCT_ROUTE}/detail`
//     }
// }


export const API_ENDPOINTS = {
    user: {
        signup: `user/signup`,
        login: `user/login`,
        all: `user/all`,
        byId: (id: string | number) => `user/${id}`
    },
    product: {
        list: `product/list`,
        detail: `product/detail`
    }
}