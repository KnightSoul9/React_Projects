//In this file we are designing the real time text editor 
import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

//the import parameter is control which we passed it is used to transfer the control to the calling parent 
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    
{/* we use the Controller to pass the reference of this particular function anywhere else  */}
    <Controller
    name={name || "content"}
    control={control}//it is used to transfer the control to the calling parent 
    render={({field: {onChange}}) => (

        <Editor
        apiKey='qukjseooms8ouvz0bbd6dvd0qom5opnrxeox3nkogf4bimlo'
        //defining the initial layout content of the editor that what it will content initially
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}

