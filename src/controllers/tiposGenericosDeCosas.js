import prisma from "../database/db_prisma.js";

export const nuevoTipoArreglo = async (req, res) =>{
  try {
    let { tipo_arreglo } = req.body;
    let nuevoTipoArreglo = await prisma.tipo_arreglo.upsert({
      where:{ tipo_arreglo: tipo_arreglo },
      update:{ tipo_arreglo: tipo_arreglo },
      create:{ tipo_arreglo: tipo_arreglo }
    });
    res.json(nuevoTipoArreglo);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
export const listarTiposArreglos = async (req, res) =>{
  try {
    let listaTiposArreglos = await prisma.tipo_arreglo.findMany();
    res.json(listaTiposArreglos);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}

