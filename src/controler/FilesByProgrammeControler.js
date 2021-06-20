export const getFilteredFIles = (materiaValues) =>{
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