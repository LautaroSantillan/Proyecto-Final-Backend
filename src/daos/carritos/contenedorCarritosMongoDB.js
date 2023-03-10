import asDto from "../../dtos/carritosDTO.js";
import { logger } from "../../utils/logger.js";

export class ContenedorCarritosMongoDB {
    constructor(coleccion){
        this.coleccion = coleccion
    }
    async crearCarrito(email, address, obj ,){
        try{
            if(obj){
                const carritoNuevo = await this.coleccion.create({ email: email, productos: obj , address: address})
                logger.info(`El carrito fue cargado: ${carritoNuevo}, con productos`);
                return asDto(carritoNuevo)
            }else{
                const carritoNuevo = await this.coleccion.create({ email: email, productos: [] , address: address})
                logger.info(`El carrito fue cargado: ${carritoNuevo}, sin productos`);
                return carritoNuevo
            }
        }catch(error){
            logger.error('Error al implementar crearCarrito' , error);
        }
    }
    async updateCart(producto, idCarrito){
        try{
            const carrito = await this.coleccion.findById(idCarrito)
            if (carrito){
                const carritoActualizado = await this.coleccion.findByIdAndUpdate(id, producto, {
                    new: true,
                    runValidators: true
                })
                logger.info('Carrito actualizado')
                return asDto(carritoActualizado)
            } else{
                logger.info('El carrito no existe para actualizar')
                return {error: "No existe el carrito"}
            } 
        }catch(error){
            logger.error('Error al implementar updateCart' , error);
        }
    }
    async pushProduct(email, producto){
        try{
            const carrito = await this.coleccion.findOne({ email: email })
            if (carrito){
                const carritoActualizado = await this.coleccion.findOneAndUpdate(
                    {email: email}, 
                    { $push: { productos: {producto} }}, 
                    {new: true} 
                )
                logger.info('Producto agregado al carrito')
                return asDto(carritoActualizado)
            } else{
                logger.info('El carrito no existe para actualizar')
                return {error: "No existe el carrito"}
            } 
        }catch(error){
            logger.error('Error al implementar pushProducts' , error);
        }
    }
    async getById(id){
        try{
            const carrito = await this.coleccion.findById({_id: id})
            if(carrito){
                logger.info('El carrito fue encontrado con el ID')
                return asDto(carrito)
            }else{
                logger.info("No se encontr?? un carrito con ese ID");
                return null
            }
        }catch(error){
            logger.error('Error al implementar getById' , error);
        }
    }
    async getByEmail(email){
        try{
            const carrito = await this.coleccion.findOne({email: email})
            if(carrito){
                logger.info('El carrito fue encontrado con el EMAIL')
                return asDto(carrito)
            }else{
                logger.info("No se encontr?? un carrito con ese EMAIL");
                return null
            }
        }catch(error){
            logger.error('Error al implementar getById' , error);
        }
    }
    async getAll(){
        try{
            const carritos = await this.coleccion.find({})
            if(carritos.length){
                logger.info('Carritos obtenidos con getAll')
                return asDto(carritos)
            }else{
                logger.info("No hay carrito en el contenedor");
                return null
            }
        }catch(error){
            logger.error('Error al implementar getAll' , error);
        }
    }
    async deleteById(id){
        try{
            const carrito = await this.coleccion.findById({_id: id})
            if(carrito){
                const carritoEliminado = await this.coleccion.deleteOne({_id: id})
                logger.info("Carrito Eliminado");
            }else{
                logger.info("No se encuentra el carrito con ese id");
            }
        }catch(error){
            logger.error('Error al implementar deleteById' , error);
        }
    }
    async deleteProductById(idCarrito, idProducto){
        console.log('se ejecuta');
        try{
            const carrito = await this.coleccion.findById({_id: idCarrito}) 
            const producto = await carrito.productos.findById({_id: idProducto}) 
            console.log(carrito);
            if(carrito){
                await carrito.productos.deleteOne({_id: idProducto})
                logger.info("Producto eliminado del carrito");
                return carrito
            }else{
                logger.info("No se encuentra el carrito");
            }
        }catch(error){
            logger.error('Error al implementar deleteProductById' , error);
        }
    }
    async deleteProductInCart(email, idProducto){
        try{
            const carrito = await this.coleccion.findOne({email: email})
            if(carrito){
                const carritoActualizado = await this.coleccion.findOneAndUpdate(
                    {email: email}, 
                    { $pull: { productos: { _id : idProducto } } } 
                )
                logger.info("Producto eliminado del carrito");
                return asDto(carritoActualizado)
            }else{
                logger.info("No se encuentra el carrito");
            }
        }catch(error){
            logger.error('Error al implementar deleteProductInCart' , error);
        }
    }
    async deleteAll(){
        try{
            const carritos = await this.coleccion.find({})
            if(carritos.length){
                await this.coleccion.deleteMany({})
                logger.info("Carritos eliminados");
            }else{
                logger.info("No hay carritos para eliminar");
            }
        }catch(error){
            logger.error('Error al implementar deleteAll' , error);
        }
    }
    async deleteAllProducts(email){
        try{
            const carrito = await this.coleccion.findOne({email: email})
            if(carrito){
                await this.coleccion.findOneAndUpdate({email}, {$set: {"productos": []}}, {new: true});
                logger.info("Productos eliminados del carrito");
            }else{
                logger.info("No hay carritos para eliminar");
            }
        }catch(error){
            logger.error('Error al implementar deleteAll' , error);
        }
    }
}
