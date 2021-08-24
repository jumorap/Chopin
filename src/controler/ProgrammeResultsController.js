import ProgrammeResults from "../view/ProgrammeResults";

/**
 * 
 * @param {Obj} materiaValues object with profesores, trabajos, categorias and archivos
 * @param {Array} selection arry with selected filters
 * @returns 
 */
export const getFilteredFIles = (materiaValues, selection) =>{
    let filteredFiles = materiaValues.trabajos.map((file) => {
        let check = 0;
        ["category", "prof", "semester"].forEach((type) => {
          let choosen = selection.filter((filt) => filt.type === type);
          /* console.log(type, "foo", choosen); */
          if (choosen.length) {
            if (
              type === "category" &&
              choosen.find((elem) => elem.value === file.tipo)
            )
              check++;
            if (
              type === "prof" &&
              choosen.find((elem) => elem.value === file.profesor)
            )
              check++;
            if (
              type === "semester" &&
              choosen.find((elem) => elem.value === file.semestre)
            )
              check++;
          } else {
            check++;
          }
        });
        if (check === 3) return file;
      });

      return filteredFiles
}

/**
 * Function cast an object to array
 * @param {Obj} object object to be casted
 * @returns Array with the objects
 */
export const getArrayFromObject = (object)=>{
    const objectArray = [];
    Object.keys(object).forEach((key) => {
      objectArray.push(object[key]);
    });
    //console.log(objectArray);
    return objectArray;
}

export const getFilterCategory = (materiasValue, atribute, type)=>{
  
  let filtersObj = materiasValue[atribute]
  let filtersList = Object.keys(materiasValue[atribute]).sort()  
  let results = []

  for(let i = 0; i < filtersList.length ; i++){
    let elem = filtersList[i]      
    if(Object.keys(filtersObj[elem]).length === 0){ //if the element is empty ex "profesor pato" : {}, then skip
      continue
    }
    results.push({
      id : `${atribute}-${i}`,
      value : elem,
      "type" : type
    })    
    
  }

  return results
    
}

/**The inital value to show in programme results */
export const initialMateriaValue = {
  nombre: "Cargando...",
  profesores: {},
  semestres: {},
  tipos: {},
  trabajos: [
    {
      ID_archivo: "IVwrevYsTiCKMPJrTohW",
      comentarios: "Lamentablemente no hay archivos, sube alguno!",
      profesor: "",
      semestre: "",
      tipo: "No hay archivos disponibles",
      url: "",
    },
  ],
};