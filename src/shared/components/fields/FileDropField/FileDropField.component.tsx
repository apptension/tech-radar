import { useDropzone } from 'react-dropzone';
import { StyledLabel, TextError } from '../fields.styles';
import { AcceptedFilesContainer, Container, DropzoneContainer, InfoText } from './FileDropField.styles';

interface FileDropFieldProps {
  label: string;
  error?: string;
  infoText: string;
  maxFiles?: number;
  value?: File;
  onChange: (e: any) => void;
}

export const FileDropField = ({ label, value, error, maxFiles = 1, infoText, onChange }: FileDropFieldProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    onDrop(acceptedFiles) {
      onChange(acceptedFiles[0]);
    },
  });

  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        <InfoText>{infoText}</InfoText>
      </DropzoneContainer>
      {value && (
        <AcceptedFilesContainer>
          <li>{value.name}</li>
        </AcceptedFilesContainer>
      )}
      {error && <TextError>{error}</TextError>}
    </Container>
  );
};
