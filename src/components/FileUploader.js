import React, {useRef} from 'react'

const FileUploader = ({onFileSelectError, onFileSelectSuccess}) => {

    const fileInput = useRef(null);

    const convertToBase64 = (file) => {

        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
    };

    const handleFileInput = async (e) => {

        const file = e.target.files[0];
        if (file.size > 1024000) {
            onFileSelectError({ error: "Älä lataa kuvia, jotka ovat suurempia kuin 1MB." });
        } else {
            const base64 = await convertToBase64(file);
            onFileSelectSuccess(base64);
        }
    };

    return (
        <div className="file-uploader">
            <input type="file" name="image" onChange={handleFileInput}></input>
            <button type="button" onClick={e => fileInput.current && fileInput.current.click()}>Lisää kuva</button>
        </div>
    );

};

export default FileUploader;
