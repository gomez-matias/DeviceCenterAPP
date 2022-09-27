
import prisma from "../database/db_prisma.js";
import { Prisma } from "@prisma/client";


export const renderNuevaOrdenPage = async (req, res) => {
  try {
    res.render('nuevaOrden');
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured'});
  } 
}

export const crearNuevaOrden = async (req, res) => {
  try {
    let {detalles,dni,domicilio,falla,imei,marca,modelo_comercial,modelo_exacto,nombre,telefono,tipo_equipo, usuario, usuario_rol} = req.body;
    let arrayData = [ 
      dni, nombre, telefono, domicilio, 
      modelo_exacto, modelo_comercial, marca, tipo_equipo,
      imei,
      usuario, usuario_rol,
      detalles, falla]
    let dataOrden = arrayData.map(e => String(e));
    const result = await prisma.$queryRaw`CALL nueva_orden (${Prisma.join(dataOrden)})`;    
    let { f0 } = result[0];
    let id_orden = Number(f0);
    if( isNaN(id_orden) ){
      let message =  'Error Creando la Orden, Intente Nuevamente ó Contacte al Admin';
      res.json({message})
    }
    else{
      let message = 'Orden Creada Correctamente';
      res.json({message, id_orden})
      // let string = encodeURIComponent(id_orden);
      // res.redirect('/pdf/' + string);
    }
  } catch (error) {
    let message = 'Error Creando la Orden, Contacte al Admin' + error;
    res.json({message})
  }
}

export const generarPDFdeOrden = async (req, res) => {
  try {
    let id_orden = req.params.id_orden;
    let response = await prisma.orden.findMany({
      where:{
        id: Number(id_orden)
      },
      select:{
        id: true, fecha_creacion: true, detalles: true, falla: true,
        cliente:{
          select:{
            dni: true,
            nombre: true,
            telefono: true,
            domicilio: true,

          }
        },
        equipo_imei:{
          select:{
            imei: true,
            equipo:{
              select:{
                modelo_exacto: true,
                modelo_comercial: true,
                marca: true,
                tipo_equipo: true
              }
            }
          }
        },
        usuario:{
          select:{
            usuario_nombre: true,
            rol: true
          }
        }
      }
    })
    let { fecha_creacion, cliente, equipo_imei, usuario, ...detallesFallas } = response[0];
    let fecha = fecha_creacion.toLocaleDateString('en-GB');
    let hora = fecha_creacion.toLocaleTimeString('en-US');
    let { equipo, imei } = equipo_imei; 
    let datosOrden = { ...cliente, ...equipo, imei, ...usuario, ...detallesFallas, fecha, hora}
    // res.json(datosOrden);
    res.render('ordenPDF', {layout : 'pdf', datosOrden})
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const listarOrdenPorID = async (req, res) => {
  try {
    let id_orden = req.params.id_orden;
    let ordenEncontrada = await prisma.orden.findUnique({
      where:{
        id: Number(id_orden)
      }
    });
    res.json(ordenEncontrada);
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const listarOrdenes = async (req, res) => {
  try {
    let listaOrdenes = await prisma.orden.findMany();
    res.json(listaOrdenes);
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const editarOrden = async (req, res) => {
  try {
    let { id_orden, id_cliente, id_equipo_imei, detalles, falla, id_usuario } = req.body;
    let ordenActualizada = await prisma.orden.update({
      where: {
        id: id_orden,
      },
      data: {
        id_cliente: id_cliente,
        id_equipo_imei: id_equipo_imei,
        detalles: detalles,
        falla: falla,
        id_usuario: id_usuario,
      },
    });
    res.json(ordenActualizada);
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

// export const listarOrdenes = async (req, res) => {
//   try {
//     res.render('listaOrdenes')
//   } catch (error) {
//     let message = error;
//     res.json({message})
//   }
// }