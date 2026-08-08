import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../styles/UploadCard.css";

function UploadCard({
  file,
  setFile,
  text,
  setText,
  loading,
  onGenerate
}) {

  const onDrop = useCallback((acceptedFiles)=>{

      if(acceptedFiles.length>0){

          setFile(acceptedFiles[0]);

      }

  },[setFile]);

  const {getRootProps,getInputProps}=useDropzone({

      onDrop,

      accept:{

          "text/csv":[".csv"]

      }

  });

  return(

<div className="upload-card">

<h2>Upload CSV Dataset</h2>

<div {...getRootProps()} className="drop-area">

<input {...getInputProps()} />

<FaCloudUploadAlt className="upload-icon"/>

<p>

Drag & Drop CSV Here

</p>

<span>

or click to browse

</span>

</div>

{
file &&

<div className="filename">

Selected :

<b>{file.name}</b>

</div>

}

<textarea

placeholder="Example : Create HR Analytics Dashboard"

value={text}

onChange={(e)=>setText(e.target.value)}

/>

<button

disabled={loading}

onClick={()=>onGenerate(text,file)}

>

{

loading ?

"Generating..."

:

"Generate Dashboard"

}

</button>

</div>

);

}

export default UploadCard;