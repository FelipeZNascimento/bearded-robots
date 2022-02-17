
export const fileUploadHandler = (e:any, callback:(result: any)=> void) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if(event && event.target && event.target.result){
        callback(JSON.parse(event.target.result as string))
      }
    });
    reader.readAsText(e.target.files[0]);
}