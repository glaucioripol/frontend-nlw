import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import "./styles.css";

interface IProps {
  onFileUploaded: (file: File) => void;
}

export const Dropzone: React.FC<IProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const [file] = acceptedFiles;
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file)
  }, [onFileUploaded]);
  // isDragActive - é para saber se o usuario ta com o arquivo em cima
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUploadCloud />
          Arraste e solte uma image ou clique e selecione uma foto do
          estabelecimento
        </p>
      )}
    </div>
  );
};
