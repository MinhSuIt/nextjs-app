import axios from '@/utils/axios'
import qs from 'qs'
//page-location in page-model
// export const indexHeaderCategories ='categories?fields[categories]=';
export const indexHeaderCategories = {
    fields: {
        categories: 'id,name,slug'
    }
};
// export const indexFeatureFeatureProduct = 'products?fields[products]=id,name,slug,price&fields[categories]=id,name&filter[type]=features';
export const indexFeatureFeatureProduct = {
    fields: {
        products: 'id,name,slug,price',
        categories: 'id,name'
    },
    filter: {
        type: 'features'
    }
};
export const indexNewestFeatureProduct = {
    fields: {
        products: 'id,name,slug,price',
        categories: 'id,name'
    },
    filter: {
        type: 'news'
    }
};
// export const productProductProduct = 'products?include=categories.attributes&fields[products]=id,name,slug,price&fields[categories]=id,name';
export const productProductProduct = {
    include: 'categories.attributes',
    fields: {
        products: 'id,name,slug,price',
        categories: 'id,name'
    },
    rangePrice: true
};
// export const categoryCategoryCategory = 'categories?include=attributes.attributeOptions&fields[categories]=id,name,slug&fields[attributes]=id,name';
export const categoryCategoryCategory = {
    include: 'attributes.attributeOptions',
    fields: {
        categories: 'id,name,slug',
        attributes: 'id,name'
    }
};


export const request = (method, url, queryJson, data = {}) => {
    return axios({
        url,
        method,
        data,
        params: queryJson,
        paramsSerializer: function (params) {
            return qs.stringify(params, { encode: false })
        },
    });
}

