
export const fileUploadHandler = (e:any, callback:(result: any)=> void) => {
  for(let i = 0; i < e.target.files.length; i++){
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if(event && event.target && event.target.result){
        callback(JSON.parse(event.target.result as string))
      }
    });
    reader.readAsText(e.target.files[i]);
  }
  e.target.value = null;

}