import { factories, targets } from "config/constant";
import { Request, Response } from "express";
import { createProduct, getProductById, handleDeleteProduct, updateProductById } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = []
    const oldData = {
        name: '',
        price: '',
        detailDesc: '',
        shortDesc: '',
        quantity: '',
        factory: '',
        target: ''
    }
    return res.render('admin/product/create.ejs', {
        errors, oldData, factories, targets
    })
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema

    const validate = ProductSchema.safeParse(req.body)

    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`)
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render('admin/product/create.ejs', {
            errors, oldData, factories, targets
        })
    }

    const file = req?.file?.filename ?? null;

    // handle create product
    await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, file)

    return res.redirect('/admin/product')
}

const getViewProduct = async (req: Request, res: Response) => {
    const errors = []
    const { id } = req.params
    // Get product id
    const product = await getProductById(id)

    return res.render('admin/product/detail.ejs', {
        errors, product, factories, targets
    })
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    await handleDeleteProduct(+id)
    return res.redirect("/admin/product")
}

const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema

    const validate = ProductSchema.safeParse(req.body)

    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`)
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render('admin/product/create.ejs', {
            errors, oldData
        })
    }

    const file = req?.file?.filename ?? null;

    // handle create product
    await updateProductById(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, file)

    return res.redirect('/admin/product')
}


export { getAdminCreateProductPage, getViewProduct, postAdminCreateProduct, postUpdateProduct, postDeleteProduct };

